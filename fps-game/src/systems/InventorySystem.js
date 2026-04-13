/**
 * InventorySystem
 * Grid-based inventory (Tarkov-style Tetris grid).
 * Items occupy w×h cells; placement finds first available space.
 */

export const ITEM_DEFS = {
  rifle_ammo: {
    id: 'rifle_ammo', name: '5.45mm弹药', w: 1, h: 2,
    color: '#6a7a6a', stackable: true,  maxStack: 60, value: 80,  weight: 0.05,
  },
  pistol_ammo: {
    id: 'pistol_ammo', name: '9mm弹药', w: 1, h: 1,
    color: '#6a6a7a', stackable: true,  maxStack: 50, value: 50,  weight: 0.04,
  },
  shotgun_ammo: {
    id: 'shotgun_ammo', name: '12号弹壳', w: 1, h: 1,
    color: '#8a6a3a', stackable: true,  maxStack: 20, value: 60,  weight: 0.08,
  },
  bandage: {
    id: 'bandage', name: '绷带', w: 1, h: 1,
    color: '#c8b89a', stackable: true,  maxStack: 5,  value: 200, weight: 0.3,
    heals: 5, stopsBleeding: true,  // 主要止血，微量回血
  },
  medkit: {
    id: 'medkit', name: '急救包', w: 2, h: 2,
    color: '#cc4444', stackable: false, value: 900,  weight: 2.0,
    heals: 60, stopsBleeding: false, // 大量回血，不止血
  },
  painkillers: {
    id: 'painkillers', name: '止痛药', w: 1, h: 2,
    color: '#aaaa44', stackable: false, value: 400,  weight: 0.5,
    heals: 30, stopsBleeding: true,  // 中量回血+止血
  },
  dogtag: {
    id: 'dogtag', name: '狗牌', w: 1, h: 1,
    color: '#aaaaaa', stackable: false, value: 500,  weight: 0.2,
  },
  cash: {
    id: 'cash', name: '鸭元', w: 1, h: 1,
    color: '#88aa55', stackable: true,  maxStack: 999, value: 1,  weight: 0.01,
  },
  vss_ammo: {
    id: 'vss_ammo', name: 'SP-6弹药', w: 1, h: 2,
    color: '#5a8a7a', stackable: true, maxStack: 30, value: 120, weight: 0.014,
  },
  mp5_ammo: {
    id: 'mp5_ammo', name: '9mm SMG弹', w: 1, h: 1,
    color: '#7a6a8a', stackable: true, maxStack: 90, value: 55, weight: 0.009,
  },
  key_basement: {
    id: 'key_basement', name: '地下室钥匙', w: 1, h: 1,
    color: '#d4a017', stackable: false, value: 1500, weight: 0.08,
  },
  vest_light: {
    id: 'vest_light', name: '轻型防弹衣', w: 2, h: 3,
    color: '#4a6a5a', stackable: false, value: 1200, weight: 4.5,
    armor: { armorHp: 80,  reduce: 0.40 },
  },
  vest_heavy: {
    id: 'vest_heavy', name: '重型防弹衣', w: 2, h: 3,
    color: '#3a5040', stackable: false, value: 2800, weight: 7.5,
    armor: { armorHp: 150, reduce: 0.60 },
  },
  helmet: {
    id: 'helmet', name: '防弹头盔', w: 2, h: 2,
    color: '#4a4a5a', stackable: false, value: 1800, weight: 1.8,
    armor: { armorHp: 50,  reduce: 0.55, headOnly: true },
  },
  // Blueprints (found in raids, register at base)
  bp_medkit: {
    id: 'bp_medkit', name: '蓝图:急救包', w: 1, h: 1,
    color: '#4488cc', stackable: false, value: 500, weight: 0.01,
    isBlueprint: true,
  },
  bp_vest: {
    id: 'bp_vest', name: '蓝图:防弹衣', w: 1, h: 1,
    color: '#4488cc', stackable: false, value: 800, weight: 0.01,
    isBlueprint: true,
  },
  bp_painkillers: {
    id: 'bp_painkillers', name: '蓝图:止痛药', w: 1, h: 1,
    color: '#4488cc', stackable: false, value: 400, weight: 0.01,
    isBlueprint: true,
  },
  bp_helmet: {
    id: 'bp_helmet', name: '蓝图:头盔', w: 1, h: 1,
    color: '#4488cc', stackable: false, value: 600, weight: 0.01,
    isBlueprint: true,
  },
};

const ROWS = 8;
const COLS = 10;

export class InventorySystem {
  constructor() {
    // grid[row][col] = itemInstanceId | null
    this._grid  = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    /** @type {Map<number, {id:number, def:object, count:number, row:number, col:number}>} */
    this.items  = new Map();
    this._nextId = 1;

    // Starting gear
    this.addItem('rifle_ammo',  60);
    this.addItem('pistol_ammo', 17);
    this.addItem('bandage',      2);
  }

  get rows() { return ROWS; }
  get cols() { return COLS; }

  /**
   * Total carried weight in kg.
   * Weight > 25 kg prevents sprinting; > 35 kg slows walk by 20%.
   */
  get totalWeight() {
    let w = 0;
    for (const item of this.items.values()) {
      w += (item.def.weight ?? 0) * (item.def.stackable ? item.count : 1);
    }
    return w;
  }

  /** Clear all items and the grid (call before applying a fresh loadout). */
  reset() {
    this._grid  = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    this.items  = new Map();
    this._nextId = 1;
  }

  /**
   * Add item by definition id. Returns true if space was found.
   * @param {string} defId
   * @param {number} count
   */
  addItem(defId, count = 1) {
    const def = ITEM_DEFS[defId];
    if (!def) return false;

    // Stack into existing slot for stackables; handle overflow by continuing
    if (def.stackable) {
      for (const item of this.items.values()) {
        if (item.def.id === defId && item.count < def.maxStack) {
          const room = def.maxStack - item.count;
          const take = Math.min(room, count);
          item.count += take;
          count -= take;
          if (count <= 0) return true;
        }
      }
      if (count <= 0) return true;
    }

    // Place new slot (may be called with remaining overflow count)
    const pos = this._findSpace(def.w, def.h);
    if (!pos) return false;  // inventory full

    const id   = this._nextId++;
    const item = { id, def, count: def.stackable ? count : 1, row: pos.row, col: pos.col };
    this.items.set(id, item);
    this._fill(pos.row, pos.col, def.w, def.h, id);
    return true;
  }

  /**
   * Remove one stack of an item by instance id.
   */
  removeItem(instanceId) {
    const item = this.items.get(instanceId);
    if (!item) return;
    this._fill(item.row, item.col, item.def.w, item.def.h, null);
    this.items.delete(instanceId);
  }

  /**
   * Drop (remove) an item by instance id. Returns the item def or null.
   * @param {number} instanceId
   * @returns {object|null}
   */
  dropItem(instanceId) {
    const item = this.items.get(instanceId);
    if (!item) return null;
    const def = item.def;
    this._fill(item.row, item.col, def.w, def.h, null);
    this.items.delete(instanceId);
    return def;
  }

  /**
   * Find the best healing item in inventory (highest heals value).
   * @returns {{ def: object, instanceId: number }|null}
   */
  getBestHealingItem() {
    let best = null;
    for (const [instanceId, item] of this.items.entries()) {
      if (item.def.heals && (!best || item.def.heals > best.def.heals)) {
        best = { def: item.def, instanceId };
      }
    }
    return best;
  }

  /**
   * Consume a healing item by instanceId and return HP healed.
   * @param {string} instanceId
   * @returns {number}
   */
  useHealing(instanceId) {
    const item = this.items.get(instanceId);
    if (!item) return 0;
    const heals = item.def.heals;
    if (item.def.stackable) {
      item.count--;
      if (item.count <= 0) this.removeItem(item.id);
    } else {
      this.removeItem(item.id);
    }
    return heals;
  }

  /**
   * Move an item to a new grid position. Returns true if successful.
   * @param {number} instanceId
   * @param {number} toRow
   * @param {number} toCol
   */
  moveItem(instanceId, toRow, toCol) {
    const item = this.items.get(instanceId);
    if (!item) return false;

    const { w, h } = item.def;

    // Bounds check
    if (toRow < 0 || toCol < 0 || toRow + h > ROWS || toCol + w > COLS) return false;

    // Clear old position
    this._fill(item.row, item.col, w, h, null);

    // Check if new position is free
    if (!this._canPlace(toRow, toCol, w, h)) {
      // Restore old position
      this._fill(item.row, item.col, w, h, instanceId);
      return false;
    }

    // Place at new position
    this._fill(toRow, toCol, w, h, instanceId);
    item.row = toRow;
    item.col = toCol;
    return true;
  }

  /**
   * Swap two items' positions. Returns true if successful.
   * @param {number} idA
   * @param {number} idB
   */
  swapItems(idA, idB) {
    const a = this.items.get(idA);
    const b = this.items.get(idB);
    if (!a || !b) return false;

    // Clear both
    this._fill(a.row, a.col, a.def.w, a.def.h, null);
    this._fill(b.row, b.col, b.def.w, b.def.h, null);

    // Try placing A where B was and B where A was
    const canPlaceA = this._canPlace(b.row, b.col, a.def.w, a.def.h);
    const canPlaceB = this._canPlace(a.row, a.col, b.def.w, b.def.h);

    if (canPlaceA && canPlaceB) {
      const oldARow = a.row, oldACol = a.col;
      a.row = b.row; a.col = b.col;
      b.row = oldARow; b.col = oldACol;
      this._fill(a.row, a.col, a.def.w, a.def.h, idA);
      this._fill(b.row, b.col, b.def.w, b.def.h, idB);
      return true;
    }

    // Restore both
    this._fill(a.row, a.col, a.def.w, a.def.h, idA);
    this._fill(b.row, b.col, b.def.w, b.def.h, idB);
    return false;
  }

  /**
   * Get the item instance id at a given grid cell.
   * @param {number} row
   * @param {number} col
   * @returns {number|null}
   */
  getItemAt(row, col) {
    if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return null;
    return this._grid[row][col];
  }

  // ── Private ────────────────────────────────────────────────────────────────

  _findSpace(w, h) {
    for (let r = 0; r <= ROWS - h; r++) {
      for (let c = 0; c <= COLS - w; c++) {
        if (this._canPlace(r, c, w, h)) return { row: r, col: c };
      }
    }
    return null;
  }

  _canPlace(row, col, w, h) {
    for (let r = row; r < row + h; r++) {
      for (let c = col; c < col + w; c++) {
        if (this._grid[r][c] !== null) return false;
      }
    }
    return true;
  }

  _fill(row, col, w, h, value) {
    for (let r = row; r < row + h; r++) {
      for (let c = col; c < col + w; c++) {
        this._grid[r][c] = value;
      }
    }
  }
}
