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
    damage:      28,
    fireRate:    0.09,   // seconds between shots (full-auto)
    magSize:     30,
    reserveMax:  90,
    range:       65,
    spread:      0.006,  // radians of random deviation
    reloadTime:  2.4,
    pellets:     1,
    tracerColor: 0xffdd44,
  },
  pistol: {
    id:          'pistol',
    name:        '格洛克17',
    slot:        1,
    damage:      38,
    fireRate:    0.32,
    magSize:     17,
    reserveMax:  51,
    range:       28,
    spread:      0.022,
    reloadTime:  1.7,
    pellets:     1,
    tracerColor: 0xffee88,
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
  },
  vss: {
    id:          'vss',
    name:        'VSS Vintorez',
    slot:        3,
    damage:      88,          // high alpha — one-shots head, two-shots torso
    fireRate:    0.70,        // semi-auto feel
    magSize:     10,
    reserveMax:  30,
    range:       95,          // longest range
    spread:      0.002,       // very precise
    reloadTime:  3.0,
    pellets:     1,
    tracerColor: 0x66ffcc,
  },
  mp5: {
    id:          'mp5',
    name:        'MP5',
    slot:        4,
    damage:      22,
    fireRate:    0.075,       // fast full-auto (800 RPM)
    magSize:     30,
    reserveMax:  90,
    range:       38,
    spread:      0.014,
    reloadTime:  1.9,
    pellets:     1,
    tracerColor: 0xffdd88,
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
