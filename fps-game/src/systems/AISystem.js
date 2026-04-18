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
          // Dispose Three.js resources
          dead.mesh.traverse(child => {
            if (child.isMesh) { child.geometry.dispose(); child.material.dispose(); }
          });
          this._scene.remove(dead.mesh);
          if (dead._patrolLine) { this._scene.remove(dead._patrolLine); dead._patrolLine.geometry.dispose(); dead._patrolLine.material.dispose(); }
          if (dead._stateRing) { this._scene.remove(dead._stateRing); dead._stateRing.geometry.dispose(); dead._stateRing.material.dispose(); }
          if (dead._targetMarker) { this._scene.remove(dead._targetMarker); dead._targetMarker.geometry.dispose(); dead._targetMarker.material.dispose(); }
          dead._waypointMarkers?.forEach(m => { this._scene.remove(m); m.geometry.dispose(); m.material.dispose(); });
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
      const enemy = new Enemy(this._scene, pos, wp, type);
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
      this.enemies.push(new Enemy(this._scene, pos, waypoints, type));
    }
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
