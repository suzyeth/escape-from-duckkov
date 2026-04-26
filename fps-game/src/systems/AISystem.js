import * as THREE from 'three';
import { Enemy, ENEMY_TYPES } from '../entities/Enemy.js';
import sceneConfig from '../config/scene.json' assert { type: 'json' };

// Module-level spawn points — avoids re-creating Vector3s every wave
const SPAWN_POINTS = [
  new THREE.Vector3(-60, 0, -60),
  new THREE.Vector3( 60, 0, -60),
  new THREE.Vector3(-60, 0,  60),
  new THREE.Vector3( 60, 0,  60),
  new THREE.Vector3(  0, 0, -70),
  new THREE.Vector3(  0, 0,  70),
];

/**
 * AISystem
 * Spawns and manages all Scav (鸭卒) enemies.
 * Returns enemy shot events each frame for main.js to handle.
 *
 * 12 enemies distributed across 6 zones (2 per zone):
 *   Factory NW  | Warehouse NE | Central Square
 *   Apartments SW | Parking SE  | Basement S
 */
export class AISystem {
  constructor(scene) {
    this._scene   = scene;
    /** @type {Enemy[]} */
    this.enemies  = [];
    this._nextEnemyId = 1;
    this._respawnTimer = 0;
    this._waveCount    = 0;
    this._pruneTimer   = 0;

    this._spawnEnemies();
  }

  // ── Public ─────────────────────────────────────────────────────────────────

  get aliveCount() {
    let count = 0;
    for (const e of this.enemies) if (e.isAlive) count++;
    return count;
  }

  getEnemyById(id) {
    if (!id) return null;
    return this.enemies.find(enemy => enemy.networkId === id) || null;
  }

  getNetworkSnapshot() {
    return this.enemies.map((enemy) => ({
      id: enemy.networkId,
      enemyType: enemy.enemyType,
      x: enemy.position.x,
      z: enemy.position.z,
      facing: enemy._facing,
      health: enemy.health,
      maxHealth: enemy.maxHealth,
      state: enemy.state,
      waypoints: enemy.waypoints.map((wp) => [wp.x, wp.z]),
    }));
  }

  applyNetworkSnapshot(snapshot = [], waveCount = this._waveCount) {
    const seen = new Set();

    for (const data of snapshot) {
      if (!data || !data.id) continue;
      let enemy = this.getEnemyById(data.id);
      if (!enemy) {
        const pos = new THREE.Vector3(Number(data.x) || 0, 0, Number(data.z) || 0);
        const waypoints = Array.isArray(data.waypoints)
          ? data.waypoints.map(([x, z]) => new THREE.Vector3(Number(x) || 0, 0, Number(z) || 0))
          : [];
        enemy = this._createEnemy(pos, waypoints, data.enemyType ?? 'normal');
        this.enemies.push(enemy);
      }
      seen.add(enemy.networkId);
      this._applyEnemySnapshot(enemy, data);
    }

    for (let i = this.enemies.length - 1; i >= 0; i--) {
      if (seen.has(this.enemies[i].networkId)) continue;
      this._disposeEnemy(this.enemies[i]);
      this.enemies.splice(i, 1);
    }

    this._waveCount = Number(waveCount) || 0;
  }

  /**
   * @param {number}            dt
   * @param {THREE.Vector3}     playerPos
   * @param {THREE.Object3D[]}  collidables
   * @param {boolean}           playerFiredRecently
   * @returns {{ origin: THREE.Vector3, dir: THREE.Vector3, damage: number }[]}
   */
  /**
   * @returns {{ shots: object[], eliteAlerted: boolean }}
   */
  update(dt, playerPos, collidables, playerFiredRecently) {
    const shots = [];
    let eliteAlerted = false;
    for (const enemy of this.enemies) {
      if (!enemy.isAlive) continue;
      const result = enemy.update(dt, playerPos, collidables, playerFiredRecently);
      if (result.shot) {
        shots.push({ origin: result.origin, dir: result.dir, damage: result.damage, isMelee: result.isMelee });
      }
      if (result.eliteAlert) eliteAlerted = true;
    }

    // Prune dead enemies every 30s to prevent array growth
    this._pruneTimer += dt;
    if (this._pruneTimer >= 30) {
      this._pruneTimer = 0;
      for (let i = this.enemies.length - 1; i >= 0; i--) {
        if (!this.enemies[i].isAlive) {
          const dead = this.enemies[i];
          this._disposeEnemy(dead);
          this.enemies.splice(i, 1);
        }
      }
    }

    // Wave respawn: check every frame, spawn new enemies periodically
    this._respawnTimer += dt;
    if (this._respawnTimer >= 90) { // every 90 seconds
      this._respawnTimer = 0;
      this._spawnWave(playerPos);
    }

    return { shots, eliteAlerted };
  }

  /**
   * Spawn a small wave of enemies far from the player.
   * @param {THREE.Vector3} playerPos
   */
  _spawnWave(playerPos) {
    // Pick 2-3 spawn points far from player
    const farPoints = SPAWN_POINTS
      .filter(p => p.distanceTo(playerPos) > 30)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2 + Math.floor(Math.random() * 2));

    let spawned = 0;
    for (const pos of farPoints) {
      // Small patrol around spawn
      const wp = [
        pos.clone(),
        new THREE.Vector3(pos.x + 8, 0, pos.z),
        new THREE.Vector3(pos.x + 8, 0, pos.z + 8),
        new THREE.Vector3(pos.x, 0, pos.z + 8),
      ];
      // Random enemy type in wave
      const roll = Math.random();
      let type = 'normal';
      if (roll < 0.05)      type = 'boss';
      else if (roll < 0.15) type = 'elite';
      else if (roll < 0.30) type = 'rusher';
      else if (roll < 0.40) type = 'tank';
      const enemy = this._createEnemy(pos, wp, type);
      // Apply difficulty scaling if set
      if (this._difficultyHpMult) {
        const baseDef = ENEMY_TYPES[type] || ENEMY_TYPES.normal;
        enemy.maxHealth = Math.round(baseDef.hp * this._difficultyHpMult);
        enemy.health = enemy.maxHealth;
        enemy._shootDamage = Math.round(baseDef.damage * this._difficultyDmgMult);
      }
      this.enemies.push(enemy);
      spawned++;
    }
    if (spawned > 0) {
      this._waveCount = (this._waveCount ?? 0) + 1;
    }
  }

  get waveCount() { return this._waveCount ?? 0; }

  /**
   * Check if a hitscan ray (from player shoot) hits any alive enemy.
   * Returns the first hit enemy or null.
   * @param {THREE.Vector3} origin
   * @param {THREE.Vector3} direction  (unit vector)
   * @param {number}        range
   * @returns {Enemy|null}
   */
  checkPlayerHit(origin, direction, range) {
    let closest     = null;
    let closestDist = Infinity;

    for (const enemy of this.enemies) {
      if (!enemy.isAlive) continue;
      const hit = this._rayHitsCapsule(origin, direction, enemy.position, 0.5, range);
      if (hit !== null && hit < closestDist) {
        closestDist = hit;
        closest     = enemy;
      }
    }
    return closest;
  }

  // ── Private ────────────────────────────────────────────────────────────────

  _spawnEnemies() {
    const enemies = sceneConfig.enemies ?? [];
    for (const cfg of enemies) {
      const type = cfg.type ?? 'normal';
      const pos = new THREE.Vector3(cfg.pos[0], 0, cfg.pos[1]);
      const waypoints = cfg.waypoints.map(([x, z]) => new THREE.Vector3(x, 0, z));
      const enemy = this._createEnemy(pos, waypoints, type);
      if (enemy.mesh) {
        enemy.mesh.userData.editable = true;
        enemy.mesh.userData.configRef = cfg;
        enemy.mesh.userData.configKey = 'enemies';
      }
      this.enemies.push(enemy);
    }
  }

  // ── Editor support ────────────────────────────────────────────────────────

  /** Remove every live enemy and dispose resources. */
  clearEnemies() {
    for (const e of this.enemies) {
      this._disposeEnemy(e);
    }
    this.enemies = [];
    this._nextEnemyId = 1;
  }

  /** Rebuild enemies from a fresh scene config (caller already swapped liveConfig). */
  rebuildFromConfig(cfg) {
    this.clearEnemies();
    const enemies = cfg.enemies ?? [];
    for (const entry of enemies) {
      const type = entry.type ?? 'normal';
      const pos = new THREE.Vector3(entry.pos[0], 0, entry.pos[1]);
      const waypoints = (entry.waypoints ?? [entry.pos]).map(([x, z]) => new THREE.Vector3(x, 0, z));
      const enemy = this._createEnemy(pos, waypoints, type);
      if (enemy.mesh) {
        enemy.mesh.userData.editable = true;
        enemy.mesh.userData.configRef = entry;
        enemy.mesh.userData.configKey = 'enemies';
      }
      this.enemies.push(enemy);
    }
  }

  _createEnemy(pos, waypoints, type) {
    const enemy = new Enemy(this._scene, pos, waypoints, type);
    enemy.networkId = `e${this._nextEnemyId++}`;
    return enemy;
  }

  _applyEnemySnapshot(enemy, data) {
    enemy.position.set(Number(data.x) || 0, 0, Number(data.z) || 0);
    enemy._facing = Number(data.facing) || 0;
    enemy.maxHealth = Math.max(1, Number(data.maxHealth) || enemy.maxHealth);
    enemy.health = Math.max(0, Math.min(enemy.maxHealth, Number(data.health) || 0));

    const nextState = Number(data.state);
    enemy.state = Number.isFinite(nextState) ? nextState : enemy.state;

    if (enemy.health <= 0 || enemy.state === 4) {
      if (enemy.isAlive) enemy._die();
      return;
    }

    enemy._syncMesh();
  }

  _disposeEnemy(enemy) {
    if (enemy.mesh) {
      this._scene.remove(enemy.mesh);
      enemy.mesh.traverse?.(child => {
        if (!child.isMesh) return;
        child.geometry?.dispose?.();
        if (Array.isArray(child.material)) {
          child.material.forEach(mat => mat?.dispose?.());
        } else {
          child.material?.dispose?.();
        }
      });
    }
    if (enemy._patrolLine)   { this._scene.remove(enemy._patrolLine);   enemy._patrolLine.geometry?.dispose?.();   enemy._patrolLine.material?.dispose?.(); }
    if (enemy._stateRing)    { this._scene.remove(enemy._stateRing);    enemy._stateRing.geometry?.dispose?.();    enemy._stateRing.material?.dispose?.(); }
    if (enemy._targetMarker) { this._scene.remove(enemy._targetMarker); enemy._targetMarker.geometry?.dispose?.(); enemy._targetMarker.material?.dispose?.(); }
    enemy._waypointMarkers?.forEach(marker => { this._scene.remove(marker); marker.geometry?.dispose?.(); marker.material?.dispose?.(); });
  }

  /**
   * Returns distance along ray to capsule centre, or null if no hit.
   * Simplified: treats enemy as a circle (XZ only) of given radius.
   */
  _rayHitsCapsule(origin, dir, center, radius, maxRange) {
    const ox = origin.x - center.x;
    const oz = origin.z - center.z;
    const dx = dir.x;
    const dz = dir.z;

    const a = dx * dx + dz * dz;
    const b = 2 * (ox * dx + oz * dz);
    const c = ox * ox + oz * oz - radius * radius;
    const disc = b * b - 4 * a * c;

    if (disc < 0) return null;
    const t = (-b - Math.sqrt(disc)) / (2 * a);
    if (t < 0 || t > maxRange) return null;
    return t;
  }
}
