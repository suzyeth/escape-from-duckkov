import * as THREE from 'three';
import { Enemy } from '../entities/Enemy.js';

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

    this._spawnEnemies();
  }

  // ── Public ─────────────────────────────────────────────────────────────────

  get aliveCount() {
    return this.enemies.filter(e => e.isAlive).length;
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
        shots.push({ origin: result.origin, dir: result.dir, damage: result.damage });
      }
      if (result.eliteAlert) eliteAlerted = true;
    }
    return { shots, eliteAlerted };
  }

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
      this.enemies.push(new Enemy(this._scene, cfg.pos, cfg.waypoints, cfg.isElite ?? false));
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
