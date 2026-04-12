import * as THREE from 'three';
import { Enemy, ENEMY_TYPES } from '../entities/Enemy.js';

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
    const SPAWN_POINTS = [
      new THREE.Vector3(-60, 0, -60),
      new THREE.Vector3( 60, 0, -60),
      new THREE.Vector3(-60, 0,  60),
      new THREE.Vector3( 60, 0,  60),
      new THREE.Vector3(  0, 0, -70),
      new THREE.Vector3(  0, 0,  70),
    ];

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
    const configs = [

      // ── Zone 1: Factory NW ────────────────────────────────────────────────
      {
        pos: new THREE.Vector3(-38, 0, -38),
        waypoints: [
          new THREE.Vector3(-38, 0, -38),
          new THREE.Vector3(-28, 0, -38),
          new THREE.Vector3(-28, 0, -28),
          new THREE.Vector3(-38, 0, -28),
        ],
      },
      {
        pos: new THREE.Vector3(-24, 0, -44),
        waypoints: [
          new THREE.Vector3(-24, 0, -44),
          new THREE.Vector3(-16, 0, -44),
          new THREE.Vector3(-16, 0, -36),
          new THREE.Vector3(-24, 0, -36),
        ],
      },

      // ── Zone 2: Warehouse NE ─────────────────────────────────────────────
      {
        pos: new THREE.Vector3(28, 0, -40),
        waypoints: [
          new THREE.Vector3(28, 0, -40),
          new THREE.Vector3(40, 0, -40),
          new THREE.Vector3(40, 0, -28),
          new THREE.Vector3(28, 0, -28),
        ],
      },
      {
        pos: new THREE.Vector3(44, 0, -32),
        waypoints: [
          new THREE.Vector3(44, 0, -32),
          new THREE.Vector3(44, 0, -20),
          new THREE.Vector3(36, 0, -20),
          new THREE.Vector3(36, 0, -32),
        ],
      },

      // ── Zone 3: Central Square (4 enemies — high-traffic area) ──────────────
      {
        pos: new THREE.Vector3(-8, 0, -8),
        waypoints: [
          new THREE.Vector3(-8, 0, -8),
          new THREE.Vector3( 8, 0, -8),
          new THREE.Vector3( 8, 0,  8),
          new THREE.Vector3(-8, 0,  8),
        ],
      },
      {
        pos: new THREE.Vector3(12, 0, 2),
        waypoints: [
          new THREE.Vector3(12, 0,  2),
          new THREE.Vector3(18, 0,  2),
          new THREE.Vector3(18, 0, 12),
          new THREE.Vector3(12, 0, 12),
        ],
      },
      {
        pos: new THREE.Vector3(-14, 0, 6),
        waypoints: [
          new THREE.Vector3(-14, 0,  6),
          new THREE.Vector3( -6, 0,  6),
          new THREE.Vector3( -6, 0, 14),
          new THREE.Vector3(-14, 0, 14),
        ],
      },
      {
        pos: new THREE.Vector3(4, 0, -14),
        waypoints: [
          new THREE.Vector3( 4, 0, -14),
          new THREE.Vector3(14, 0, -14),
          new THREE.Vector3(14, 0,  -6),
          new THREE.Vector3( 4, 0,  -6),
        ],
      },

      // ── Zone 4: Apartment Ruins SW ────────────────────────────────────────
      {
        pos: new THREE.Vector3(-36, 0, 28),
        waypoints: [
          new THREE.Vector3(-36, 0, 28),
          new THREE.Vector3(-24, 0, 28),
          new THREE.Vector3(-24, 0, 40),
          new THREE.Vector3(-36, 0, 40),
        ],
      },
      {
        pos: new THREE.Vector3(-44, 0, 18),
        waypoints: [
          new THREE.Vector3(-44, 0, 18),
          new THREE.Vector3(-32, 0, 18),
          new THREE.Vector3(-32, 0, 26),
          new THREE.Vector3(-44, 0, 26),
        ],
      },

      // ── Zone 5: Parking Lot SE ────────────────────────────────────────────
      {
        pos: new THREE.Vector3(30, 0, 26),
        waypoints: [
          new THREE.Vector3(30, 0, 26),
          new THREE.Vector3(44, 0, 26),
          new THREE.Vector3(44, 0, 40),
          new THREE.Vector3(30, 0, 40),
        ],
      },
      {
        pos: new THREE.Vector3(20, 0, 18),
        waypoints: [
          new THREE.Vector3(20, 0, 18),
          new THREE.Vector3(20, 0, 26),
          new THREE.Vector3(30, 0, 26),
          new THREE.Vector3(30, 0, 18),
        ],
      },

      // ── Zone 6: Basement Approach S (3 enemies — guards key area) ────────
      {
        pos: new THREE.Vector3(-10, 0, 52),
        waypoints: [
          new THREE.Vector3(-10, 0, 52),
          new THREE.Vector3(  4, 0, 52),
          new THREE.Vector3(  4, 0, 62),
          new THREE.Vector3(-10, 0, 62),
        ],
      },
      {
        pos: new THREE.Vector3(8, 0, 58),
        waypoints: [
          new THREE.Vector3( 8, 0, 58),
          new THREE.Vector3(-4, 0, 58),
          new THREE.Vector3(-4, 0, 48),
          new THREE.Vector3( 8, 0, 48),
        ],
      },
      {
        pos: new THREE.Vector3(0, 0, 66),
        waypoints: [
          new THREE.Vector3( 0, 0, 66),
          new THREE.Vector3(-8, 0, 60),
          new THREE.Vector3( 8, 0, 60),
        ],
      },

      // ── Roaming: cross-zone patrols ───────────────────────────────────────
      {
        pos: new THREE.Vector3(-4, 0, -30),
        waypoints: [
          new THREE.Vector3( -4, 0, -30),
          new THREE.Vector3(-20, 0, -30),
          new THREE.Vector3(-20, 0, -16),
          new THREE.Vector3(  0, 0, -10),
          new THREE.Vector3(  8, 0, -20),
        ],
      },
      {
        pos: new THREE.Vector3(16, 0, -10),
        waypoints: [
          new THREE.Vector3(16, 0, -10),
          new THREE.Vector3(22, 0,  -4),
          new THREE.Vector3(22, 0,  14),
          new THREE.Vector3(12, 0,  18),
        ],
      },

      // ── Rushers (melee chargers) ───────────────────────────────────────────
      {
        type: 'rusher',
        pos: new THREE.Vector3(-16, 0, -35),
        waypoints: [
          new THREE.Vector3(-16, 0, -35),
          new THREE.Vector3(-10, 0, -35),
          new THREE.Vector3(-10, 0, -28),
          new THREE.Vector3(-16, 0, -28),
        ],
      },
      {
        type: 'rusher',
        pos: new THREE.Vector3(14, 0, 32),
        waypoints: [
          new THREE.Vector3(14, 0, 32),
          new THREE.Vector3(22, 0, 32),
          new THREE.Vector3(22, 0, 40),
          new THREE.Vector3(14, 0, 40),
        ],
      },
      {
        type: 'rusher',
        pos: new THREE.Vector3(-38, 0, 52),
        waypoints: [
          new THREE.Vector3(-38, 0, 52),
          new THREE.Vector3(-30, 0, 52),
          new THREE.Vector3(-30, 0, 58),
          new THREE.Vector3(-38, 0, 58),
        ],
      },

      // ── Tanks (heavy armor) ───────────────────────────────────────────────
      {
        type: 'tank',
        pos: new THREE.Vector3(0, 0, -4),
        waypoints: [
          new THREE.Vector3(0, 0, -4),
          new THREE.Vector3(6, 0, -4),
          new THREE.Vector3(6, 0, 4),
          new THREE.Vector3(0, 0, 4),
        ],
      },
      {
        type: 'tank',
        pos: new THREE.Vector3(50, 0, -50),
        waypoints: [
          new THREE.Vector3(50, 0, -50),
          new THREE.Vector3(56, 0, -50),
          new THREE.Vector3(56, 0, -42),
          new THREE.Vector3(50, 0, -42),
        ],
      },

      // ── Boss (地下室守卫) ─────────────────────────────────────────────────
      {
        type: 'boss',
        pos: new THREE.Vector3(0, 0, 78),
        waypoints: [
          new THREE.Vector3(0, 0, 78),
          new THREE.Vector3(-8, 0, 78),
          new THREE.Vector3(-8, 0, 85),
          new THREE.Vector3(8, 0, 85),
          new THREE.Vector3(8, 0, 78),
        ],
      },

      // ── Elite Bosses (1 per main zone) ────────────────────────────────────
      {
        isElite: true,
        pos: new THREE.Vector3(-36, 0, -46),
        waypoints: [
          new THREE.Vector3(-36, 0, -46),
          new THREE.Vector3(-44, 0, -46),
          new THREE.Vector3(-44, 0, -38),
          new THREE.Vector3(-36, 0, -38),
        ],
      },
      {
        isElite: true,
        pos: new THREE.Vector3(40, 0, -46),
        waypoints: [
          new THREE.Vector3(40, 0, -46),
          new THREE.Vector3(50, 0, -46),
          new THREE.Vector3(50, 0, -38),
          new THREE.Vector3(40, 0, -38),
        ],
      },
      {
        isElite: true,
        pos: new THREE.Vector3(-44, 0, 38),
        waypoints: [
          new THREE.Vector3(-44, 0, 38),
          new THREE.Vector3(-36, 0, 38),
          new THREE.Vector3(-36, 0, 46),
          new THREE.Vector3(-44, 0, 46),
        ],
      },
      {
        isElite: true,
        pos: new THREE.Vector3(2, 0, 58),
        waypoints: [
          new THREE.Vector3( 2, 0, 58),
          new THREE.Vector3(-6, 0, 58),
          new THREE.Vector3(-6, 0, 64),
          new THREE.Vector3( 2, 0, 64),
        ],
      },
    ];

    for (const cfg of configs) {
      const type = cfg.type ?? (cfg.isElite ? 'elite' : 'normal');
      this.enemies.push(new Enemy(this._scene, cfg.pos, cfg.waypoints, type));
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
