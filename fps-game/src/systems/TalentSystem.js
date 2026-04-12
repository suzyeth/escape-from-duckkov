/**
 * TalentSystem (PerkPalace)
 * Permanent stat upgrades purchased between raids with currency + XP.
 * Unlocked talents persist in SaveSystem.
 */

/**
 * Talent categories — each category has 3 levels, progressively more expensive.
 * Only need to unlock sequentially within each category. No XP cost, just currency.
 * Simpler, clearer progression than the old system.
 */
export const TALENTS = [
  // ── 生存 ──
  { id: 'hp_1', name: '生命强化 I',   desc: '+20 最大生命',     cost: 200,  category: '生存', effect: { hpBonus: 20 } },
  { id: 'hp_2', name: '生命强化 II',  desc: '+40 最大生命',     cost: 500,  category: '生存', requires: 'hp_1', effect: { hpBonus: 40 } },
  { id: 'hp_3', name: '生命强化 III', desc: '+60 最大生命',     cost: 1200, category: '生存', requires: 'hp_2', effect: { hpBonus: 60 } },

  // ── 机动 ──
  { id: 'spd_1', name: '轻量化 I',   desc: '+8% 移速',         cost: 200,  category: '机动', effect: { speedMult: 1.08 } },
  { id: 'spd_2', name: '轻量化 II',  desc: '+15% 移速',        cost: 500,  category: '机动', requires: 'spd_1', effect: { speedMult: 1.15 } },
  { id: 'sta_1', name: '耐力强化',   desc: '+30 体力上限',      cost: 300,  category: '机动', effect: { staminaBonus: 30 } },

  // ── 战斗 ──
  { id: 'aim_1', name: '精准射击 I',  desc: '-20% 散布',        cost: 300,  category: '战斗', effect: { spreadMult: 0.80 } },
  { id: 'aim_2', name: '精准射击 II', desc: '-35% 散布',        cost: 800,  category: '战斗', requires: 'aim_1', effect: { spreadMult: 0.65 } },
  { id: 'rld_1', name: '快速换弹',   desc: '-25% 换弹时间',     cost: 400,  category: '战斗', effect: { reloadMult: 0.75 } },

  // ── 负重 ──
  { id: 'bag_1', name: '背包扩容 I',  desc: '+8kg 负重上限',    cost: 250,  category: '负重', effect: { weightBonus: 8 } },
  { id: 'bag_2', name: '背包扩容 II', desc: '+15kg 负重上限',   cost: 600,  category: '负重', requires: 'bag_1', effect: { weightBonus: 15 } },
  { id: 'arm_1', name: '护甲精通',   desc: '+20% 护甲效率',     cost: 500,  category: '负重', effect: { armorBonus: 0.20 } },
];

export class TalentSystem {
  /**
   * @param {import('./SaveSystem').SaveSystem} save
   */
  constructor(save) {
    this._save = save;
    // Initialize unlocked talents in save if not present
    try {
      if (!save._data.talents) {
        save._data.talents = [];
        save._save();
      }
    } catch {
      // Fallback if _data is not accessible
    }
  }

  get unlockedIds() {
    try { return this._save._data.talents || []; }
    catch { return []; }
  }

  isUnlocked(id) { return this.unlockedIds.includes(id); }

  canUnlock(id) {
    const talent = TALENTS.find(t => t.id === id);
    if (!talent) return false;
    if (this.isUnlocked(id)) return false;
    if (talent.requires && !this.isUnlocked(talent.requires)) return false;
    if (this._save.currency < talent.cost) return false;
    return true;
  }

  unlock(id) {
    if (!this.canUnlock(id)) return false;
    const talent = TALENTS.find(t => t.id === id);
    this._save.spendCurrency(talent.cost);
    this._save._data.talents.push(id);
    this._save._save();
    return true;
  }

  /** Get aggregated stat bonuses from all unlocked talents */
  getStats() {
    const stats = {
      hpBonus: 0,
      staminaBonus: 0,
      staminaRegen: 1.0,
      speedMult: 1.0,
      spreadMult: 1.0,
      reloadMult: 1.0,
      armorBonus: 0,
      weightBonus: 0,
    };

    for (const id of this.unlockedIds) {
      const talent = TALENTS.find(t => t.id === id);
      if (!talent) continue;
      const e = talent.effect;
      if (e.hpBonus)      stats.hpBonus      += e.hpBonus;
      if (e.staminaBonus) stats.staminaBonus  += e.staminaBonus;
      if (e.staminaRegen) stats.staminaRegen  *= e.staminaRegen;
      if (e.speedMult)    stats.speedMult     *= e.speedMult;
      if (e.spreadMult)   stats.spreadMult    *= e.spreadMult;
      if (e.reloadMult)   stats.reloadMult    *= e.reloadMult;
      if (e.armorBonus)   stats.armorBonus    += e.armorBonus;
      if (e.weightBonus)  stats.weightBonus   += e.weightBonus;
    }

    return stats;
  }
}
