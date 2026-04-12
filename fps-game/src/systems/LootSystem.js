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
        // Clean up extra meshes (e.g., medkit cross)
        if (item.extraMeshes) {
          for (const m of item.extraMeshes) {
            this._scene.remove(m);
            m.geometry.dispose();
            m.material.dispose();
          }
        }
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
    // Merge same-type drops before spawning
    const merged = new Map();
    for (const drop of drops) {
      merged.set(drop.defId, (merged.get(drop.defId) || 0) + drop.count);
    }
    let i = 0;
    for (const [defId, count] of merged) {
      const angle = (i / merged.size) * Math.PI * 2;
      const offset = new THREE.Vector3(Math.cos(angle) * 0.8, 0, Math.sin(angle) * 0.8);
      this._spawnItem(defId, count, pos.clone().add(offset));
      i++;
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
    // Zone spawn regions: [xMin, xMax, zMin, zMax]
    const ZONES = [
      { region: [-55, -15, -60, -20], name: 'Factory' },
      { region: [ 15,  60, -60, -20], name: 'Warehouse' },
      { region: [-15,  15, -15,  15], name: 'Central' },
      { region: [-60, -20,  20,  55], name: 'Apartments' },
      { region: [ 15,  60,  20,  55], name: 'Parking' },
      { region: [-15,  15,  45,  70], name: 'Basement' },
    ];

    // Loot pool per zone (random selection each raid)
    const LOOT_POOL = [
      { defId: 'rifle_ammo',   count: () => 15 + Math.floor(Math.random() * 20) },
      { defId: 'pistol_ammo',  count: () => 10 + Math.floor(Math.random() * 10) },
      { defId: 'shotgun_ammo', count: () => 6 + Math.floor(Math.random() * 8) },
      { defId: 'bandage',      count: () => 1 + Math.floor(Math.random() * 2) },
      { defId: 'medkit',       count: () => 1 },
      { defId: 'painkillers',  count: () => 1 },
      { defId: 'cash',         count: () => 50 + Math.floor(Math.random() * 350) },
      { defId: 'dogtag',       count: () => 1 },
      { defId: 'vss_ammo',     count: () => 10 + Math.floor(Math.random() * 10) },
      { defId: 'mp5_ammo',     count: () => 20 + Math.floor(Math.random() * 20) },
    ];

    // Each zone gets 3-5 random items from the pool
    for (const zone of ZONES) {
      const [xMin, xMax, zMin, zMax] = zone.region;
      const itemCount = 3 + Math.floor(Math.random() * 3);

      // Fisher-Yates to pick random items
      const shuffled = [...LOOT_POOL];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      for (let i = 0; i < itemCount && i < shuffled.length; i++) {
        const x = xMin + Math.random() * (xMax - xMin);
        const z = zMin + Math.random() * (zMax - zMin);
        this._spawnItem(shuffled[i].defId, shuffled[i].count(), new THREE.Vector3(x, 0, z));
      }
    }

    // Key always spawns in basement zone (but at random position within zone)
    const kx = -10 + Math.random() * 20;
    const kz = 50 + Math.random() * 15;
    this._spawnItem('key_basement', 1, new THREE.Vector3(kx, 0, kz));
  }

  _spawnItem(defId, count, pos) {
    const def = ITEM_DEFS[defId];

    // Per-type visual customization
    const ITEM_VISUALS = {
      rifle_ammo:   { color: 0x88dd33, size: 0.22, shape: 'cylinder' },
      pistol_ammo:  { color: 0xaacc44, size: 0.18, shape: 'cylinder' },
      shotgun_ammo: { color: 0xdd8833, size: 0.20, shape: 'cylinder' },
      vss_ammo:     { color: 0x44ccaa, size: 0.22, shape: 'cylinder' },
      mp5_ammo:     { color: 0xbbaa44, size: 0.18, shape: 'cylinder' },
      bandage:      { color: 0xff6644, size: 0.25, shape: 'box' },
      medkit:       { color: 0xff2222, size: 0.45, shape: 'box', glow: true },
      painkillers:  { color: 0xffaa44, size: 0.28, shape: 'box' },
      dogtag:       { color: 0xdddddd, size: 0.25, shape: 'box', glow: true },
      cash:         { color: 0xffdd00, size: 0.20, shape: 'box' },
      key_basement: { color: 0xffdd44, size: 0.30, shape: 'box', glow: true },
      vest_light:   { color: 0x4a8a5a, size: 0.40, shape: 'box', glow: true },
      vest_heavy:   { color: 0x3a6040, size: 0.45, shape: 'box', glow: true },
      helmet:       { color: 0x5a5a6a, size: 0.35, shape: 'sphere', glow: true },
    };
    const vis = ITEM_VISUALS[defId] ?? { color: 0xffffff, size: 0.30, shape: 'box' };

    let geo;
    if (vis.shape === 'cylinder') {
      geo = new THREE.CylinderGeometry(vis.size * 0.5, vis.size * 0.5, vis.size, 6);
    } else if (vis.shape === 'sphere') {
      geo = new THREE.SphereGeometry(vis.size * 0.5, 6, 5);
    } else {
      geo = new THREE.BoxGeometry(vis.size, vis.size, vis.size);
    }

    const mat = new THREE.MeshLambertMaterial({ color: vis.color });
    if (vis.glow) {
      mat.emissive = new THREE.Color(vis.color);
      mat.emissiveIntensity = 0.3;
    }
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(pos.x, vis.size * 0.5 + 0.05, pos.z);
    mesh.castShadow = true;
    this._scene.add(mesh);

    // Medkit: add white cross (tracked for cleanup)
    const extraMeshes = [];
    if (defId === 'medkit') {
      const crossMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const h = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.06, 0.06), crossMat);
      h.position.set(pos.x, vis.size * 0.5 + 0.05, pos.z);
      this._scene.add(h);
      extraMeshes.push(h);
      const v = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.30), crossMat);
      v.position.set(pos.x, vis.size * 0.5 + 0.05, pos.z);
      this._scene.add(v);
      extraMeshes.push(v);
    }

    this._items.push({ mesh, defId, count, pos: pos.clone(), extraMeshes });
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

      const containerColor = isRich ? 0x3a5a6a : color;
      const geo  = new THREE.BoxGeometry(w, h, d);
      const mat  = new THREE.MeshLambertMaterial({ color: containerColor });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, h / 2, z);
      mesh.castShadow    = true;
      mesh.receiveShadow = true;
      mesh.name = name;
      this._scene.add(mesh);

      if (isRich) {
        // Padlock icon on front
        const lockMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
        const lock = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.15, 0.04), lockMat);
        lock.position.set(x, h * 0.4, z + d / 2 + 0.02);
        this._scene.add(lock);
      } else {
        // Crate slat lines
        const slatMat = new THREE.MeshLambertMaterial({ color: 0x5a4a3a });
        for (let sy = 0.15; sy < h - 0.1; sy += 0.22) {
          const slat = new THREE.Mesh(new THREE.BoxGeometry(w + 0.02, 0.04, d + 0.02), slatMat);
          slat.position.set(x, sy, z);
          this._scene.add(slat);
        }
      }

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
