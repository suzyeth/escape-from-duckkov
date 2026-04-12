/**
 * SaveSystem
 * Persistent storage via localStorage for meta-progression.
 * Stores: stash items, currency, stats, unlocks, death recovery.
 */

const SAVE_KEY = 'duckkov_save';

const DEFAULT_SAVE = {
  currency: 500,           // starting duckbucks
  stash: [],               // { defId, count }[]
  stats: {
    totalKills: 0,
    totalExtracts: 0,
    totalDeaths: 0,
    bestLoot: 0,
    totalXP: 0,
  },
  unlockedLevels: [0],     // level indices: 0=industrial, 1=port, 2=lab
  deathRecovery: null,     // { levelId, x, z, items: [{defId, count}] } or null
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

  addToStash(defId, count = 1) {
    const existing = this._data.stash.find(s => s.defId === defId);
    if (existing) {
      existing.count += count;
    } else {
      this._data.stash.push({ defId, count });
    }
    this._save();
  }

  removeFromStash(defId, count = 1) {
    const idx = this._data.stash.findIndex(s => s.defId === defId);
    if (idx === -1) return false;
    this._data.stash[idx].count -= count;
    if (this._data.stash[idx].count <= 0) {
      this._data.stash.splice(idx, 1);
    }
    this._save();
    return true;
  }

  /** Transfer all items from inventory to stash (on successful extraction) */
  depositInventory(items) {
    for (const item of items) {
      this.addToStash(item.defId, item.count);
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
          stash: Array.isArray(parsed.stash) ? parsed.stash : defaults.stash,
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
