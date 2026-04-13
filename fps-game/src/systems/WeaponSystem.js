/**
 * WeaponSystem
 * Defines all weapons, manages the player's 3 weapon slots,
 * handles switching (1/2/3), reload (R), and fire-rate gating.
 */

// ── Weapon definitions ────────────────────────────────────────────────────────

export const WEAPON_DEFS = {
  rifle: {
    id:          'rifle',
    name:        'AK-74',
    slot:        0,
    damage:      28,           // buffed: high damage per shot ("power" weapon)
    fireRate:    0.12,          // slower fire rate for power role
    magSize:     30,
    reserveMax:  90,
    range:       55,
    spread:      0.022,         // higher spread — trades accuracy for damage
    reloadTime:  2.4,           // faster reload
    pellets:     1,
    tracerColor: 0xffdd44,
    bulletSpeed: 110,
    falloffStart: 0.5,
  },
  pistol: {
    id:          'pistol',
    name:        '格洛克17',
    slot:        1,
    damage:      26,            // reduced: starter weapon
    fireRate:    0.18,          // buffed from 0.32 (much faster fire rate)
    magSize:     17,
    reserveMax:  51,
    range:       30,            // buffed from 28
    spread:      0.015,         // buffed from 0.022
    reloadTime:  1.2,           // buffed from 1.7 (fast reload is niche)
    pellets:     1,
    tracerColor: 0xffee88,
    bulletSpeed: 70,
    falloffStart: 0.4,
  },
  shotgun: {
    id:          'shotgun',
    name:        'MP-133',
    slot:        2,
    damage:      16,
    fireRate:    0.85,
    magSize:     8,
    reserveMax:  24,
    range:       16,
    spread:      0.14,
    reloadTime:  3.2,
    pellets:     8,
    tracerColor: 0xff8844,
    bulletSpeed: 60,
    falloffStart: 0.3,
  },
  vss: {
    id:          'vss',
    name:        'VSS Vintorez',
    slot:        3,
    damage:      95,            // buffed from 88 (true 2-shot kill on most enemies)
    fireRate:    0.55,          // buffed from 0.70 (faster follow-up)
    magSize:     10,
    reserveMax:  30,
    range:       95,
    spread:      0.002,
    reloadTime:  2.6,           // buffed from 3.0
    pellets:     1,
    tracerColor: 0x66ffcc,
    bulletSpeed: 90,
    falloffStart: 0.65,
  },
  mp5: {
    id:          'mp5',
    name:        'MP5',
    slot:        4,
    damage:      16,            // low damage — "accuracy" weapon
    fireRate:    0.065,         // fast fire rate
    magSize:     30,
    reserveMax:  90,
    range:       38,
    spread:      0.012,         // tight spread
    reloadTime:  1.9,
    pellets:     1,
    tracerColor: 0xffdd88,
    bulletSpeed: 80,
    falloffStart: 0.45,
  },
};

// ── Single weapon instance state ──────────────────────────────────────────────

export class WeaponState {
  constructor(def) {
    this.def          = def;
    this.mag          = def.magSize;
    this.reserve      = def.reserveMax;
    this.isReloading  = false;
    this._reloadTimer = 0;
    this._cooldown    = 0;
  }

  get reloadProgress() {
    if (!this.isReloading) return 1;
    return 1 - this._reloadTimer / this.def.reloadTime;
  }

  canFire()  { return !this.isReloading && this._cooldown <= 0 && this.mag > 0; }
  isEmpty()  { return this.mag === 0; }

  /** Call once per frame */
  update(dt) {
    this._cooldown = Math.max(0, this._cooldown - dt);
    if (this.isReloading) {
      this._reloadTimer -= dt;
      if (this._reloadTimer <= 0) this._finishReload();
    }
  }

  /** Spend one shot; auto-reloads if mag empty */
  consumeAmmo() {
    if (this.mag <= 0) return;
    this.mag--;
    this._cooldown = this.def.fireRate;
    if (this.mag === 0 && this.reserve > 0) this.startReload();
  }

  startReload() {
    if (this.isReloading || this.reserve <= 0 || this.mag === this.def.magSize) return;
    this.isReloading  = true;
    this._reloadTimer = this.def.reloadTime;
  }

  addReserve(amount) {
    this.reserve = Math.min(this.def.reserveMax, this.reserve + amount);
  }

  _finishReload() {
    const needed    = this.def.magSize - this.mag;
    const take      = Math.min(needed, this.reserve);
    this.mag       += take;
    this.reserve   -= take;
    this.isReloading = false;
  }
}

// ── Player weapon manager ─────────────────────────────────────────────────────

export class WeaponSystem {
  constructor() {
    this.slots = [
      new WeaponState(WEAPON_DEFS.rifle),
      new WeaponState(WEAPON_DEFS.pistol),
      new WeaponState(WEAPON_DEFS.shotgun),
      new WeaponState(WEAPON_DEFS.vss),
      new WeaponState(WEAPON_DEFS.mp5),
    ];
    this.activeSlot = 0;
  }

  get current() { return this.slots[this.activeSlot]; }

  /**
   * Apply a loadout preset.
   * Sets the active weapon slot and zeros out the other two slots' ammo,
   * so the player truly only has the chosen weapon's ammo.
   * @param {number} slotIdx  0=rifle, 1=pistol, 2=shotgun
   */
  applyLoadout(slotIdx) {
    this.activeSlot = slotIdx;
    for (let i = 0; i < this.slots.length; i++) {
      if (i !== slotIdx) {
        this.slots[i].reserve = 0;
        this.slots[i].mag     = 0;
      } else {
        // Restore chosen weapon to full
        const def = this.slots[i].def;
        this.slots[i].mag     = def.magSize;
        this.slots[i].reserve = def.reserveMax;
        this.slots[i].isReloading  = false;
        this.slots[i]._reloadTimer = 0;
        this.slots[i]._cooldown    = 0;
      }
    }
  }

  /**
   * @param {import('../core/InputManager').InputManager} input
   */
  update(dt, input) {
    // Slot switching
    if (input.justPressed('Digit1')) this.activeSlot = 0;
    if (input.justPressed('Digit2')) this.activeSlot = 1;
    if (input.justPressed('Digit3')) this.activeSlot = 2;
    if (input.justPressed('Digit4')) this.activeSlot = 3;
    if (input.justPressed('Digit5')) this.activeSlot = 4;

    // Reload
    if (input.justPressed('KeyR')) this.current.startReload();

    // Tick ALL slots so reload timers continue while weapon is holstered
    for (const slot of this.slots) slot.update(dt);
  }

  /** Returns true if a shot was actually fired this frame */
  tryFire() {
    if (!this.current.canFire()) return false;
    this.current.consumeAmmo();
    return true;
  }
}
