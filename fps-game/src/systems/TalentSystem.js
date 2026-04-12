/**
 * TalentSystem (PerkPalace)
 * Permanent stat upgrades purchased between raids with currency + XP.
 * Unlocked talents persist in SaveSystem.
 */

export const TALENTS = [
  {
    id: 'backpack_1',    name: '背包扩容 I',    desc: '负重上限 +5kg',
    cost: 300,  xpCost: 100,  tier: 1,
    effect: { weightBonus: 5 },
  },
  {
    id: 'backpack_2',    name: '背包扩容 II',   desc: '负重上限 +10kg',
    cost: 800,  xpCost: 300,  tier: 2, requires: 'backpack_1',
    effect: { weightBonus: 10 },
  },
  {
    id: 'vitality_1',   name: '体能训练 I',     desc: '最大生命值 +15',
    cost: 200,  xpCost: 50,   tier: 1,
    effect: { hpBonus: 15 },
  },
  {
    id: 'vitality_2',   name: '体能训练 II',    desc: '最大生命值 +30',
    cost: 600,  xpCost: 200,  tier: 2, requires: 'vitality_1',
    effect: { hpBonus: 30 },
  },
  {
    id: 'endurance_1',  name: '耐力训练 I',     desc: '体力上限 +20，恢复速度 +30%',
    cost: 250,  xpCost: 80,   tier: 1,
    effect: { staminaBonus: 20, staminaRegen: 1.3 },
  },
  {
    id: 'aim_1',        name: '战术瞄准 I',     desc: '射击散布 -15%',
    cost: 400,  xpCost: 150,  tier: 1,
    effect: { spreadMult: 0.85 },
  },
  {
    id: 'aim_2',        name: '战术瞄准 II',    desc: '射击散布 -30%',
    cost: 1000, xpCost: 400,  tier: 2, requires: 'aim_1',
    effect: { spreadMult: 0.70 },
  },
  {
    id: 'speed_1',      name: '轻量化训练',     desc: '移动速度 +10%',
    cost: 350,  xpCost: 120,  tier: 1,
    effect: { speedMult: 1.10 },
  },
  {
    id: 'reload_1',     name: '快速换弹',       desc: '换弹速度 +20%',
    cost: 500,  xpCost: 200,  tier: 1,
    effect: { reloadMult: 0.80 },
  },
  {
    id: 'armor_1',      name: '护甲精通',       desc: '护甲减伤效率 +15%',
    cost: 600,  xpCost: 250,  tier: 1,
    effect: { armorBonus: 0.15 },
  },
];

export class TalentSystem {
  /**
   * @param {import('./SaveSystem').SaveSystem} save
   */
  constructor(save) {
    this._save = save;
    // Initialize unlocked talents in save if not present
    if (!save._data.talents) {
      save._data.talents = [];
      save._save();
    }
  }

  get unlockedIds() { return this._save._data.talents || []; }

  isUnlocked(id) { return this.unlockedIds.includes(id); }

  canUnlock(id) {
    const talent = TALENTS.find(t => t.id === id);
    if (!talent) return false;
    if (this.isUnlocked(id)) return false;
    if (talent.requires && !this.isUnlocked(talent.requires)) return false;
    if (this._save.currency < talent.cost) return false;
    if ((this._save.stats.totalXP || 0) < talent.xpCost) return false;
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
