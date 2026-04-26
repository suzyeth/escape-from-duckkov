/**
 * SaveSystem
 * Persistent storage via localStorage for meta-progression.
 * Stores: stash items, currency, stats, unlocks, death recovery.
 */

import { ITEM_DEFS } from './InventorySystem.js';

const SAVE_KEY = 'duckkov_save';

const DEFAULT_SAVE = {
  currency: 500,           // starting duckbucks
  stash: [],               // { defId, count, armorHp? }[]
  stats: {
    totalKills: 0,
    totalExtracts: 0,
    totalDeaths: 0,
    bestLoot: 0,
    totalXP: 0,
  },
  unlockedLevels: [0],     // level indices: 0=industrial, 1=port, 2=lab
  deathRecovery: null,     // { levelId, x, z, items: [{defId, count, armorHp?}] } or null
  talents: [],             // unlocked talent IDs
  blueprints: [],          // registered blueprint IDs
};

export class SaveSystem {
  constructor() {
    this._data = this._load();
  }

  // ── Getters ────────────────────────────────────────────────────────────────

  get currency()       { return this._data.currency; }
  get stash()          { return this._data.stash; }
  get stats()          { return this._data.stats; }
  get unlockedLevels() { return this._data.unlockedLevels; }
  get deathRecovery()  { return this._data.deathRecovery; }

  // ── Currency ───────────────────────────────────────────────────────────────

  addCurrency(amount) {
    this._data.currency += amount;
    this._save();
  }

  spendCurrency(amount) {
    if (this._data.currency < amount) return false;
    this._data.currency -= amount;
    this._save();
    return true;
  }

  // ── Stash ──────────────────────────────────────────────────────────────────

  addToStash(defIdOrItem, count = 1) {
    const entry = typeof defIdOrItem === 'string'
      ? { defId: defIdOrItem, count }
      : { ...defIdOrItem };
    const def = ITEM_DEFS[entry.defId];
    if (!def) return false;

    if (def.armor) {
      const armorHp = Math.max(0, Math.min(def.armor.armorHp, entry.armorHp ?? def.armor.armorHp));
      if (armorHp <= 0) return false;
      this._data.stash.push({ defId: entry.defId, count: 1, armorHp });
      this._save();
      return true;
    }

    const stackCount = entry.count ?? count;
    const existing = this._data.stash.find(s => s.defId === entry.defId && s.armorHp == null);
    if (existing) {
      existing.count += stackCount;
    } else {
      this._data.stash.push({ defId: entry.defId, count: stackCount });
    }
    this._save();
    return true;
  }

  removeFromStash(defId, count = 1) {
    let remaining = count;
    for (let i = this._data.stash.length - 1; i >= 0 && remaining > 0; i--) {
      const item = this._data.stash[i];
      if (item.defId !== defId) continue;

      const take = Math.min(item.count ?? 1, remaining);
      item.count = (item.count ?? 1) - take;
      remaining -= take;
      if (item.count <= 0) this._data.stash.splice(i, 1);
    }
    if (remaining > 0) return false;
    this._save();
    return true;
  }

  /** Transfer all items from inventory to stash (on successful extraction) */
  depositInventory(items) {
    for (const item of items) {
      this.addToStash(item);
    }
  }

  // ── Stats ──────────────────────────────────────────────────────────────────

  addKills(n)    { this._data.stats.totalKills += n; this._save(); }
  addExtract()   { this._data.stats.totalExtracts++; this._save(); }
  addDeath()     { this._data.stats.totalDeaths++; this._save(); }
  addXP(n)       { this._data.stats.totalXP += n; this._save(); }

  updateBestLoot(value) {
    if (value > this._data.stats.bestLoot) {
      this._data.stats.bestLoot = value;
      this._save();
    }
  }

  // ── Level Unlock ───────────────────────────────────────────────────────────

  unlockLevel(idx) {
    if (!this._data.unlockedLevels.includes(idx)) {
      this._data.unlockedLevels.push(idx);
      this._save();
    }
  }

  isLevelUnlocked(idx) {
    return this._data.unlockedLevels.includes(idx);
  }

  // ── Death Recovery ─────────────────────────────────────────────────────────

  setDeathRecovery(levelId, x, z, items) {
    this._data.deathRecovery = { levelId, x, z, items };
    this._save();
  }

  clearDeathRecovery() {
    this._data.deathRecovery = null;
    this._save();
  }

  // ── Talents ─────────────────────────────────────────────────────────────────

  get talents() { return this._data.talents || []; }

  addTalent(id) {
    if (!this._data.talents) this._data.talents = [];
    if (!this._data.talents.includes(id)) {
      this._data.talents.push(id);
      this._save();
    }
  }

  // ── Blueprints ─────────────────────────────────────────────────────────────

  get blueprints() { return this._data.blueprints || []; }

  addBlueprint(id) {
    if (!this._data.blueprints) this._data.blueprints = [];
    if (!this._data.blueprints.includes(id)) {
      this._data.blueprints.push(id);
      this._save();
      return true;
    }
    return false;
  }

  // ── Reset ──────────────────────────────────────────────────────────────────

  resetAll() {
    this._data = JSON.parse(JSON.stringify(DEFAULT_SAVE));
    this._save();
  }

  // ── Private ────────────────────────────────────────────────────────────────

  _load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const defaults = JSON.parse(JSON.stringify(DEFAULT_SAVE));
        // Deep merge: per-key spreading for nested objects
        return {
          ...defaults,
          ...parsed,
          stats: { ...defaults.stats, ...(parsed.stats || {}) },
          unlockedLevels: parsed.unlockedLevels || defaults.unlockedLevels,
          stash: Array.isArray(parsed.stash)
            ? parsed.stash.map(item => ({
                defId: item.defId,
                count: Math.max(1, Number(item.count) || 1),
                ...(item.armorHp != null ? { armorHp: Number(item.armorHp) || 0 } : {}),
              }))
            : defaults.stash,
          talents: Array.isArray(parsed.talents) ? parsed.talents : defaults.talents,
          blueprints: Array.isArray(parsed.blueprints) ? parsed.blueprints : defaults.blueprints,
        };
      }
    } catch { /* corrupt save, reset */ }
    return JSON.parse(JSON.stringify(DEFAULT_SAVE));
  }

  _save() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(this._data));
    } catch { /* storage full or unavailable */ }
  }
}
