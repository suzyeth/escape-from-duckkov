/**
 * HealthSystem
 * Body-part damage model (Tarkov-style).
 *
 * Parts & base HP:
 *   HEAD      35  – fatal when reaches 0 (or single hit > max HP)
 *   TORSO     85  – fatal when reaches 0
 *   LEFT_ARM  50  – penalises spread when damaged
 *   RIGHT_ARM 50  – penalises spread when damaged
 *   LEFT_LEG  60  – penalises speed when damaged
 *   RIGHT_LEG 60  – penalises speed when damaged
 *
 * No auto-regen; use consumables (H key → InventorySystem.useHealing).
 */

export const PART = {
  HEAD:      'HEAD',
  TORSO:     'TORSO',
  LEFT_ARM:  'LEFT_ARM',
  RIGHT_ARM: 'RIGHT_ARM',
  LEFT_LEG:  'LEFT_LEG',
  RIGHT_LEG: 'RIGHT_LEG',
};

const PART_DEFS = {
  [PART.HEAD]:      { label: '头部', maxHp: 35 },
  [PART.TORSO]:     { label: '躯干', maxHp: 85 },
  [PART.LEFT_ARM]:  { label: '左臂', maxHp: 50 },
  [PART.RIGHT_ARM]: { label: '右臂', maxHp: 50 },
  [PART.LEFT_LEG]:  { label: '左腿', maxHp: 60 },
  [PART.RIGHT_LEG]: { label: '右腿', maxHp: 60 },
};

// Cumulative probability table for random hit location
// head 15%, torso 40%, each limb ~11.25%
const HIT_TABLE = [
  { part: PART.HEAD,      threshold: 0.15 },
  { part: PART.TORSO,     threshold: 0.55 },
  { part: PART.LEFT_ARM,  threshold: 0.66 },
  { part: PART.RIGHT_ARM, threshold: 0.77 },
  { part: PART.LEFT_LEG,  threshold: 0.88 },
  { part: PART.RIGHT_LEG, threshold: 1.00 },
];

export class HealthSystem {
  constructor() {
    this._hp       = {};
    this._bleeding = false;
    // Armor slots
    this._bodyArmorHp     = 0;
    this._bodyArmorMax    = 0;
    this._bodyArmorReduce = 0;
    this._headArmorHp     = 0;
    this._headArmorMax    = 0;
    this._headArmorReduce = 0;
    this._armorJustBroke  = null;
    this.reset();
  }

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  /**
   * Restore all body parts to full HP and clear bleeding.
   * @param {number} hpBonus  extra HP distributed proportionally (from talents)
   */
  reset(hpBonus = 0) {
    // Distribute bonus HP proportionally across parts
    const baseTotal = Object.values(PART_DEFS).reduce((s, d) => s + d.maxHp, 0);
    for (const [key, def] of Object.entries(PART_DEFS)) {
      const bonus = Math.round((def.maxHp / baseTotal) * hpBonus);
      this._hp[key] = def.maxHp + bonus;
      this._maxHp = this._maxHp || {};
      this._maxHp[key] = def.maxHp + bonus;
    }
    this._bleeding = false;
    this._bodyArmorHp = 0;
    this._bodyArmorMax = 0;
    this._bodyArmorReduce = 0;
    this._headArmorHp = 0;
    this._headArmorMax = 0;
    this._headArmorReduce = 0;
    this._armorJustBroke = null;
  }

  /** Get actual max HP for a part (including talent bonus) */
  getPartMax(key) { return this._maxHp?.[key] ?? PART_DEFS[key]?.maxHp ?? 0; }

  // ── Queries ────────────────────────────────────────────────────────────────

  get isAlive() {
    return this._hp[PART.TORSO] > 0 && this._hp[PART.HEAD] > 0;
  }

  get isBleeding()  { return this._bleeding; }

  /**
   * True when either leg HP has reached 0 (fracture — cannot sprint, severe limp).
   */
  get legFractured() {
    return this._hp[PART.LEFT_LEG] <= 0 || this._hp[PART.RIGHT_LEG] <= 0;
  }

  /**
   * True when either arm HP has reached 0 (fracture — severe aim penalty).
   */
  get armFractured() {
    return this._hp[PART.LEFT_ARM] <= 0 || this._hp[PART.RIGHT_ARM] <= 0;
  }

  /** 0–1 fraction of current / max armor HP, or -1 when no armor equipped. */
  get armorPct() {
    if (this._bodyArmorMax > 0) return this._bodyArmorHp / this._bodyArmorMax;
    if (this._headArmorMax > 0) return this._headArmorHp / this._headArmorMax;
    return -1;
  }

  get armorState() {
    return {
      bodyPct: this._bodyArmorMax > 0 ? this._bodyArmorHp / this._bodyArmorMax : -1,
      headPct: this._headArmorMax > 0 ? this._headArmorHp / this._headArmorMax : -1,
      bodyHp: this._bodyArmorHp,
      headHp: this._headArmorHp,
      bodyMax: this._bodyArmorMax,
      headMax: this._headArmorMax,
    };
  }

  get armorHp() { return this._bodyArmorHp; }
  get armorMax() { return this._bodyArmorMax; }
  get bodyArmorHp() { return this._bodyArmorHp; }
  get bodyArmorMax() { return this._bodyArmorMax; }
  get headArmorHp() { return this._headArmorHp; }
  get headArmorMax() { return this._headArmorMax; }

  /** True on the frame armor was destroyed */
  get armorJustBroke() { return this._armorJustBroke; }
  get armorBreakLabel() {
    if (this._armorJustBroke === 'head') return '头盔';
    if (this._armorJustBroke === 'body') return '护甲';
    return null;
  }

  /**
   * Equip or replace armor.
   * @param {{ armorHp: number, reduce: number }} def
   */
  /**
   * @param {{ armorHp: number, reduce: number }} def
   * @param {number} armorBonus  extra reduction from talents (e.g., 0.20)
   */
  equipArmor(def, armorBonus = 0, currentHp = def.armorHp) {
    const hp = Math.max(0, Math.min(def.armorHp, currentHp));
    if (def.headOnly) {
      this._headArmorHp = hp;
      this._headArmorMax = def.armorHp;
      this._headArmorReduce = Math.min(0.85, def.reduce + armorBonus);
    } else {
      this._bodyArmorHp = hp;
      this._bodyArmorMax = def.armorHp;
      this._bodyArmorReduce = Math.min(0.85, def.reduce + armorBonus);
    }
    this._armorJustBroke = null;
  }

  /** Aggregate HP across all parts. */
  get totalHp() {
    return Object.values(this._hp).reduce((s, v) => s + v, 0);
  }

  /** Sum of all part max HP (including talent bonus) */
  get totalMaxHp() {
    if (this._maxHp) return Object.values(this._maxHp).reduce((s, v) => s + v, 0);
    return Object.values(PART_DEFS).reduce((s, d) => s + d.maxHp, 0);
  }

  /**
   * Effective HP fraction for the main health bar (0–1).
   * Uses the LOWER of: overall HP% or critical part (torso/head) HP%.
   */
  get effectiveHpFraction() {
    const overallPct = this.totalHp / this.totalMaxHp;
    const torsoMax   = this.getPartMax(PART.TORSO);
    const headMax    = this.getPartMax(PART.HEAD);
    const torsoPct   = torsoMax > 0 ? this._hp[PART.TORSO] / torsoMax : 0;
    const headPct    = headMax  > 0 ? this._hp[PART.HEAD]  / headMax  : 0;
    const critPct    = Math.min(torsoPct, headPct);
    return Math.min(overallPct, critPct);
  }

  /**
   * Speed multiplier: each leg at <50% HP reduces speed by 20%.
   * Fractured leg (hp = 0): additional -0.3 penalty.
   * Both legs fractured: max 0.3× speed (crawl).
   */
  get speedMultiplier() {
    let mult = 1.0;
    const llHp  = this._hp[PART.LEFT_LEG];
    const rlHp  = this._hp[PART.RIGHT_LEG];
    const llPct = llHp / PART_DEFS[PART.LEFT_LEG].maxHp;
    const rlPct = rlHp / PART_DEFS[PART.RIGHT_LEG].maxHp;
    if (llPct < 0.5) mult -= llHp <= 0 ? 0.5 : 0.2;
    if (rlPct < 0.5) mult -= rlHp <= 0 ? 0.5 : 0.2;
    return Math.max(0.3, mult);
  }

  /**
   * Spread multiplier: each arm at <50% HP increases spread by 40%.
   */
  get spreadMultiplier() {
    let mult = 1.0;
    const laPct = this._hp[PART.LEFT_ARM]  / PART_DEFS[PART.LEFT_ARM].maxHp;
    const raPct = this._hp[PART.RIGHT_ARM] / PART_DEFS[PART.RIGHT_ARM].maxHp;
    if (laPct < 0.5) mult += 0.4;
    if (raPct < 0.5) mult += 0.4;
    return mult;
  }

  /**
   * Returns snapshot of all parts for HUD rendering.
   * @returns {{ key: string, label: string, hp: number, maxHp: number }[]}
   */
  getPartSnapshot() {
    return Object.entries(PART_DEFS).map(([key, def]) => ({
      key,
      label:  def.label,
      hp:     this._hp[key],
      maxHp:  this.getPartMax(key),
    }));
  }

  // ── Damage ────────────────────────────────────────────────────────────────

  /**
   * Apply damage to a specific body part.
   * If part is omitted, a random hit location is rolled.
   * @param {number} amount
   * @param {string|null} part  – PART constant or null for random
   * @returns {string} part that was hit
   */
  takeDamage(amount, part = null) {
    const target = part ?? this._rollHitPart();

    // Armor absorbs damage using separate body/head slots.
    this._armorJustBroke = null;
    if (target === PART.HEAD && this._headArmorHp > 0) {
      const absorbed = amount * this._headArmorReduce;
      this._headArmorHp = Math.max(0, this._headArmorHp - absorbed);
      amount = amount - absorbed;
      if (this._headArmorHp <= 0) this._armorJustBroke = 'head';
    } else if (target !== PART.HEAD && this._bodyArmorHp > 0) {
      const absorbed = amount * this._bodyArmorReduce;
      this._bodyArmorHp = Math.max(0, this._bodyArmorHp - absorbed);
      amount         = amount - absorbed;
      if (this._bodyArmorHp <= 0) this._armorJustBroke = 'body';
    }
    this._hp[target] = Math.max(0, this._hp[target] - amount);
    // 30 % chance to cause bleeding on each hit
    if (!this._bleeding && Math.random() < 0.30) {
      this._bleeding = true;
    }
    return target;
  }

  /**
   * Apply bleed damage (2 HP/s distributed across body). Call every frame while alive.
   * Damage is split: 50% torso, 50% spread to alive limbs.
   * @param {number} dt
   * @returns {number} damage dealt this tick (0 if not bleeding)
   */
  tickBleeding(dt) {
    if (!this._bleeding) return 0;
    const totalDmg = 2.0 * dt;

    // 50% to torso
    const torsoDmg = totalDmg * 0.5;
    this._hp[PART.TORSO] = Math.max(0, this._hp[PART.TORSO] - torsoDmg);

    // 50% spread to limbs that still have HP
    const limbs = [PART.LEFT_ARM, PART.RIGHT_ARM, PART.LEFT_LEG, PART.RIGHT_LEG];
    const aliveLimbs = limbs.filter(p => this._hp[p] > 0);
    if (aliveLimbs.length > 0) {
      const limbDmg = (totalDmg * 0.5) / aliveLimbs.length;
      for (const p of aliveLimbs) {
        this._hp[p] = Math.max(0, this._hp[p] - limbDmg);
      }
    } else {
      // All limbs dead, extra damage goes to torso
      this._hp[PART.TORSO] = Math.max(0, this._hp[PART.TORSO] - totalDmg * 0.5);
    }

    return totalDmg;
  }

  /** Stop the bleed (called by bandage / medkit use). */
  stopBleeding() { this._bleeding = false; }

  /**
   * Heal up to `amount` HP distributed to most damaged parts.
   * @param {number} amount
   */
  heal(amount) {
    let remaining = amount;
    // Heal torso first, then limbs
    const priority = [PART.TORSO, PART.HEAD, PART.LEFT_LEG, PART.RIGHT_LEG, PART.LEFT_ARM, PART.RIGHT_ARM];
    for (const key of priority) {
      if (remaining <= 0) break;
      const max     = this._maxHp?.[key] ?? PART_DEFS[key].maxHp;
      const missing = max - this._hp[key];
      const apply   = Math.min(missing, remaining);
      this._hp[key] += apply;
      remaining     -= apply;
    }
  }

  // ── Private ────────────────────────────────────────────────────────────────

  _rollHitPart() {
    const r = Math.random();
    for (const { part, threshold } of HIT_TABLE) {
      if (r < threshold) return part;
    }
    return PART.TORSO;
  }
}
