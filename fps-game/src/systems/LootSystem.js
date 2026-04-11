import * as THREE from 'three';
import { ITEM_DEFS } from './InventorySystem.js';

const PICKUP_RANGE    = 2.0;
const CONTAINER_RANGE = 2.2;

// ── Container loot tables ─────────────────────────────────────────────────────

const _rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/** Returns 2-3 random items drawn from weighted tiers. */
function _rollContainerLoot(tier = 'normal') {
  const tables = {
    normal: [
      { defId: 'cash',        count: () => _rand(80,  250) },
      { defId: 'bandage',     count: () => 1               },
      { defId: 'pistol_ammo', count: () => _rand(10,  17)  },
      { defId: 'rifle_ammo',  count: () => _rand(10,  20)  },
    ],
    rich: [
      { defId: 'cash',        count: () => _rand(300, 700) },
      { defId: 'medkit',      count: () => 1               },
      { defId: 'rifle_ammo',  count: () => _rand(20,  30)  },
      { defId: 'dogtag',      count: () => 1               },
      { defId: 'painkillers', count: () => 1               },
    ],
  };
  const pool   = tables[tier.toLowerCase()] ?? tables.normal;
  const count  = tier === 'rich' ? 3 : 2;
  // Fisher-Yates shuffle (uniform distribution)
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const chosen = shuffled.slice(0, count);
  return chosen.map(e => ({ defId: e.defId, count: e.count() }));
}

/**
 * LootSystem
 * Manages loose item pickups AND interactive loot containers.
 * Press E near either to collect.
 */
export class LootSystem {
  /**
   * @param {THREE.Scene} scene
   */
  constructor(scene) {
    this._scene = scene;
    /** @type {{ mesh: THREE.Mesh, defId: string, count: number, pos: THREE.Vector3 }[]} */
    this._items = [];
    /**
     * Interactive containers (wooden crates / metal boxes).
     * @type {{ mesh: THREE.Mesh, pos: THREE.Vector3, opened: boolean, tier: string }[]}
     */
    this._containers = [];

    this._spawnItems();
    this._spawnContainers();
  }

  // ── Public ─────────────────────────────────────────────────────────────────

  /**
   * Check if player is near any item or container (E key).
   * Returns picked-up { defId, count } or null.
   * Container open returns { defId:'__container__', drops:[...] } so caller
   * can handle the multi-item drop.
   * @param {THREE.Vector3} playerPos
   * @param {boolean}        ePressed
   */
  update(playerPos, ePressed) {
    let pickup = null;

    // ── Containers (priority over loose items) ────────────────────────────────
    for (const c of this._containers) {
      if (c.opened) continue;
      const dist = playerPos.distanceTo(c.pos);
      if (dist < CONTAINER_RANGE) {
        // Pulse
        const s = 1.0 + Math.sin(performance.now() * 0.004) * 0.06;
        c.mesh.scale.set(s, 1, s);

        if (ePressed && !pickup) {
          this._openContainer(c);
          pickup = { defId: '__container__', drops: _rollContainerLoot(c.tier) };
        }
      } else {
        c.mesh.scale.setScalar(1);
      }
    }

    // ── Loose items ───────────────────────────────────────────────────────────
    for (let i = this._items.length - 1; i >= 0; i--) {
      const item = this._items[i];
      const dist = playerPos.distanceTo(item.pos);

      const scale = dist < PICKUP_RANGE ? 1.0 + Math.sin(performance.now() * 0.005) * 0.1 : 1.0;
      item.mesh.scale.setScalar(scale);

      if (ePressed && dist < PICKUP_RANGE && !pickup) {
        pickup = { defId: item.defId, count: item.count };
        this._scene.remove(item.mesh);
        item.mesh.geometry.dispose();
        item.mesh.material.dispose();
        this._items.splice(i, 1);
      }
    }

    return pickup;
  }

  /**
   * Drop loot at position (e.g., from dead enemy).
   * @param {THREE.Vector3} pos
   * @param {{ defId:string, count:number }[]} drops
   */
  dropLoot(pos, drops) {
    for (const drop of drops) {
      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * 1.2,
        0,
        (Math.random() - 0.5) * 1.2
      );
      this._spawnItem(drop.defId, drop.count, pos.clone().add(offset));
    }
  }

  /** Returns hint text for the nearest interactive object, or null */
  getNearbyItemName(playerPos) {
    // Closed containers first
    for (const c of this._containers) {
      if (!c.opened && playerPos.distanceTo(c.pos) < CONTAINER_RANGE) {
        return `[箱子] 按E开箱`;
      }
    }
    // Loose items
    for (const item of this._items) {
      if (playerPos.distanceTo(item.pos) < PICKUP_RANGE) {
        const def = ITEM_DEFS[item.defId];
        return def ? def.name : item.defId;
      }
    }
    return null;
  }

  /**
   * Expose containers for minimap / other systems.
   * @returns {{ pos: THREE.Vector3, opened: boolean }[]}
   */
  get containers() { return this._containers; }

  // ── Private ────────────────────────────────────────────────────────────────

  _spawnItems() {
    // [defId, count, x, z]
    const placements = [

      // ── Zone 1: Factory NW (around -25~-45, -25~-50) ──────────────────────
      ['rifle_ammo',   30, -36, -42],
      ['rifle_ammo',   20, -26, -30],
      ['bandage',       2, -32, -36],
      ['cash',        150, -40, -26],

      // ── Zone 2: Warehouse NE (around 20~50, -20~-50) ──────────────────────
      ['rifle_ammo',   30,  32, -44],
      ['pistol_ammo',  17,  42, -30],
      ['medkit',        1,  36, -36],
      ['cash',        250,  46, -22],

      // ── Zone 3: Central Square (around -15~15, -15~15) ────────────────────
      ['pistol_ammo',  17,  -6,  -6],
      ['bandage',       1,   8,  -4],
      ['dogtag',        1,   0,   6],
      ['cash',        300,  -4,  10],

      // ── Zone 4: Apartment Ruins SW (around -25~-50, 20~50) ────────────────
      ['shotgun_ammo', 12, -30,  32],
      ['bandage',       2, -42,  24],
      ['painkillers',   1, -36,  44],
      ['cash',        100, -26,  38],

      // ── Zone 5: Parking Lot SE (around 20~50, 20~50) ─────────────────────
      ['rifle_ammo',   20,  34,  30],
      ['shotgun_ammo',  8,  44,  36],
      ['pistol_ammo',  17,  28,  44],
      ['cash',        200,  40,  24],

      // ── Zone 6: Basement Approach S (around -15~15, 45~70) ───────────────
      // key_basement hidden here — reward for exploring far south
      ['key_basement',  1,  -2,  60],
      ['medkit',        1,   8,  54],
      ['rifle_ammo',   30,  -8,  50],
      ['cash',        400,   2,  66],
    ];

    for (const [defId, count, x, z] of placements) {
      this._spawnItem(defId, count, new THREE.Vector3(x, 0, z));
    }
  }

  _spawnItem(defId, count, pos) {
    const def   = ITEM_DEFS[defId];
    const color = def ? parseInt(def.color.replace('#', '0x')) : 0xffffff;

    const geo  = new THREE.BoxGeometry(0.35, 0.35, 0.35);
    const mat  = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(pos.x, 0.25, pos.z);
    this._scene.add(mesh);

    this._items.push({ mesh, defId, count, pos: pos.clone() });
  }

  // ── Container system ────────────────────────────────────────────────────────

  _spawnContainers() {
    // Each entry: [x, z, 'normal'|'rich', colorHex, label]
    // Placed inside buildings to reward exploration.
    const configs = [
      // Factory (interior ~X:-56~-24, Z:-60~-40)
      [-42, -48, 'normal', 0x7a5c3a, 'FactoryCrate1'],
      [-34, -55, 'normal', 0x7a5c3a, 'FactoryCrate2'],
      // Warehouse (interior ~X:20~60, Z:-64~-36)
      [ 38, -48, 'normal', 0x6a6a5a, 'WhCrate1'],
      [ 48, -55, 'rich',   0x5a6a6a, 'WhBox1'],
      // Apartment A (interior ~X:-62~-34, Z:31~49)
      [-48,  38, 'normal', 0x7a5c3a, 'AptCrate1'],
      // Parking shed (interior ~X:50~62, Z:45~55)
      [ 56,  50, 'rich',   0x5a6a6a, 'ShedBox1'],
      // Park booth (interior ~X:9.5~14.5, Z:22.5~27.5)
      [ 12,  25, 'normal', 0x7a5c3a, 'BoothCrate1'],
      // Basement approach (open area, high-risk high-reward)
      [  2,  60, 'rich',   0x3a4a5a, 'BasementBox1'],
      // Central square (exposed but accessible)
      [  4,   4, 'normal', 0x6a5a3a, 'CentralCrate1'],
    ];

    for (const [x, z, tier, color, name] of configs) {
      const isRich = tier === 'rich';
      // Rich = metal box (flatter, grey-green); normal = wooden crate (taller, brown)
      const w = isRich ? 0.75 : 0.90;
      const h = isRich ? 0.50 : 0.70;
      const d = isRich ? 0.55 : 0.70;

      const geo  = new THREE.BoxGeometry(w, h, d);
      const mat  = new THREE.MeshLambertMaterial({ color });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, h / 2, z);
      mesh.castShadow    = true;
      mesh.receiveShadow = true;
      mesh.name = name;
      this._scene.add(mesh);

      this._containers.push({
        mesh,
        pos:    new THREE.Vector3(x, 0, z),
        opened: false,
        tier,
      });
    }
  }

  /** Visually mark container as opened and drop its contents nearby. */
  _openContainer(container) {
    container.opened = true;
    // Squash container to show it's been looted
    container.mesh.scale.y   = 0.25;
    container.mesh.position.y *= 0.25;
    container.mesh.material.color.setHex(0x2a2420);
  }
}
