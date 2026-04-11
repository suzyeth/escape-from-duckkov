/**
 * HUD
 * All DOM overlay elements: health, weapon, timer, kill feed,
 * damage flash, extraction progress, pickup hint.
 */
export class HUD {
  constructor() {
    this._hud           = document.getElementById('hud');
    this._healthBar     = document.getElementById('health-bar-inner');
    this._healthValue   = document.getElementById('health-value');
    this._healthDanger  = document.getElementById('health-danger');
    this._staminaBar    = document.getElementById('stamina-bar-inner');
    this._staminaWrap   = document.getElementById('stamina-bar-wrap');
    this._ammoCurrent   = document.getElementById('ammo-current');
    this._ammoReserve   = document.getElementById('ammo-reserve');
    this._weaponName    = document.getElementById('weapon-name');
    this._timerEl       = document.getElementById('timer-value');
    this._killFeed      = document.getElementById('kill-feed');
    this._damageFlash   = document.getElementById('damage-flash');
    this._extractBar    = document.getElementById('extract-bar-inner');
    this._extractWrap   = document.getElementById('extract-bar-wrap');
    this._pickupHint    = document.getElementById('pickup-hint');
    this._bodyPartsEl   = document.getElementById('body-parts');
    this._tutorialEl    = document.getElementById('tutorial-hint');
    this._bleedEl       = document.getElementById('bleed-indicator');
    this._armorWrap     = document.getElementById('armor-bar-wrap');
    this._armorBar      = document.getElementById('armor-bar-inner');
    this._healWrap      = document.getElementById('heal-channel-wrap');
    this._healBar       = document.getElementById('heal-channel-inner');
    this._healLabel     = document.getElementById('heal-channel-label');

    this._raidSeconds   = 45 * 60;
    this._flashTimer    = 0;
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  show() { this._hud.style.display = 'block'; }
  hide() { this._hud.style.display = 'none';  }

  /** Call when starting/restarting a raid to reset the timer */
  resetRaid(seconds = 45 * 60) {
    this._raidSeconds = seconds;
  }

  // ── Per-frame ─────────────────────────────────────────────────────────────

  update(dt) {
    this._raidSeconds = Math.max(0, this._raidSeconds - dt);
    this._updateTimer();
    if (this._flashTimer > 0) {
      this._flashTimer -= dt;
      if (this._flashTimer <= 0 && this._damageFlash) {
        this._damageFlash.style.opacity = '0';
      }
    }
  }

  // ── Setters ───────────────────────────────────────────────────────────────

  /**
   * @param {number} value  current stamina
   * @param {number} max    maximum stamina
   */
  /**
   * Armor bar: pct = 0–1 (fraction remaining), -1 = no armor equipped.
   * @param {number} pct
   */
  setArmor(pct) {
    if (!this._armorWrap || !this._armorBar) return;
    if (pct < 0) { this._armorWrap.style.display = 'none'; return; }
    this._armorWrap.style.display = 'block';
    this._armorBar.style.width    = `${Math.max(0, pct) * 100}%`;
    this._armorBar.style.background = pct > 0.5 ? '#66bb88' : pct > 0.2 ? '#aaaa44' : '#bb6644';
  }

  /**
   * Healing channel progress bar: pct 0–1, or -1 to hide.
   * @param {number} pct
   * @param {string} [label]
   */
  setHealChannel(pct, label = '治疗中…') {
    if (!this._healWrap || !this._healBar) return;
    if (pct < 0) { this._healWrap.style.display = 'none'; return; }
    this._healWrap.style.display = 'block';
    this._healBar.style.width    = `${Math.min(1, pct) * 100}%`;
    if (this._healLabel) this._healLabel.textContent = label;
  }

  /** Show/hide the pulsing bleeding indicator. */
  setBleedingState(isBleeding) {
    if (!this._bleedEl) return;
    this._bleedEl.style.display = isBleeding ? 'block' : 'none';
  }

  setStamina(value, max) {
    if (!this._staminaWrap || !this._staminaBar) return;
    const pct = Math.max(0, value / max) * 100;
    // Only show bar when it's not full
    this._staminaWrap.style.display = pct >= 99 ? 'none' : 'block';
    this._staminaBar.style.width    = `${pct}%`;
    this._staminaBar.style.background = pct > 50 ? '#44aaff' : pct > 20 ? '#ffaa44' : '#ff4444';
  }

  setHealth(hp, maxHp) {
    const pct = Math.max(0, hp / maxHp) * 100;
    if (this._healthBar) {
      this._healthBar.style.width      = `${pct}%`;
      this._healthBar.style.background =
        pct > 50 ? '#4caf50' : pct > 25 ? '#ff9800' : '#f44336';
    }
    if (this._healthValue) this._healthValue.textContent = Math.ceil(hp);
    if (this._healthDanger) {
      if (pct <= 20 && pct > 0) {
        this._healthDanger.textContent = '⚠ 危险 — 按H急救';
        this._healthDanger.style.display = 'block';
      } else {
        this._healthDanger.style.display = 'none';
      }
    }
  }

  /** Pass mag = -1 to show RELOADING */
  setWeapon(name, mag, reserve) {
    if (this._weaponName)  this._weaponName.textContent  = name;
    if (this._ammoCurrent) {
      this._ammoCurrent.textContent = mag < 0 ? '↺' : mag;
      this._ammoCurrent.style.color = mag === 0 ? '#f44336' : mag <= 5 && mag > 0 ? '#ff9800' : '#e0e0e0';
      this._ammoCurrent.classList.toggle('low', mag >= 0 && mag <= 5);
    }
    if (this._ammoReserve) this._ammoReserve.textContent = `/ ${reserve}`;
  }

  setExtractProgress(pct) {
    if (!this._extractWrap || !this._extractBar) return;
    if (pct <= 0) {
      this._extractWrap.style.display = 'none';
    } else {
      this._extractWrap.style.display = 'block';
      this._extractBar.style.width    = `${Math.min(1, pct) * 100}%`;
    }
  }

  setPickupHint(text) {
    if (!this._pickupHint) return;
    this._pickupHint.textContent = text || '';
    this._pickupHint.style.display = text ? 'block' : 'none';
  }

  /**
   * Render the body-part HP panel.
   * DOM is built once on first call; subsequent calls only update bar widths/colors.
   * @param {{ key:string, label:string, hp:number, maxHp:number }[]} parts
   */
  setBodyParts(parts) {
    if (!this._bodyPartsEl) return;

    if (!this._bpCache) {
      // Build DOM once and cache element references
      this._bpCache = {};
      this._bodyPartsEl.innerHTML = '';
      for (const p of parts) {
        const row   = document.createElement('div');
        row.className = 'bp-row';

        const label = document.createElement('span');
        label.className = 'bp-label';
        label.textContent = p.label;

        const outer = document.createElement('div');
        outer.className = 'bp-bar-outer';

        const inner = document.createElement('div');
        inner.className = 'bp-bar-inner';
        outer.appendChild(inner);

        const val = document.createElement('span');
        val.className = 'bp-val';

        row.appendChild(label);
        row.appendChild(outer);
        row.appendChild(val);
        this._bodyPartsEl.appendChild(row);

        this._bpCache[p.key] = { inner, val };
      }
    }

    // Update only values — no DOM reconstruction
    for (const p of parts) {
      const cached = this._bpCache[p.key];
      if (!cached) continue;
      const pct   = Math.max(0, p.hp / p.maxHp) * 100;
      const color = pct > 50 ? '#4caf50' : pct > 25 ? '#ff9800' : '#f44336';
      cached.inner.style.width      = `${pct}%`;
      cached.inner.style.background = color;
      cached.val.textContent        = Math.ceil(p.hp);
    }
  }

  /**
   * Show or hide the tutorial hint banner.
   * @param {string|null} text
   */
  setTutorialHint(text) {
    if (!this._tutorialEl) return;
    if (text) {
      this._tutorialEl.textContent = text;
      this._tutorialEl.style.display = 'block';
    } else {
      this._tutorialEl.style.display = 'none';
    }
  }

  /**
   * Highlight the active weapon slot (0/1/2).
   * @param {number} idx
   */
  setActiveWeaponSlot(idx) {
    for (let i = 0; i < 5; i++) {
      const el = document.getElementById(`wslot-${i}`);
      if (el) el.classList.toggle('active', i === idx);
    }
  }

  /**
   * Show fracture warning on a body part (red border).
   * @param {boolean} legFractured
   * @param {boolean} armFractured
   */
  setFractureState(legFractured, armFractured) {
    if (!this._bodyPartsEl) return;
    const leg = legFractured, arm = armFractured;
    const FRAC_PARTS = {
      LEFT_LEG: leg, RIGHT_LEG: leg,
      LEFT_ARM: arm, RIGHT_ARM: arm,
    };
    for (const [key, frac] of Object.entries(FRAC_PARTS)) {
      if (!this._bpCache?.[key]) continue;
      const row = this._bpCache[key].inner.closest?.('.bp-row');
      if (row) row.style.outline = frac ? '1px solid #ff4444' : '';
    }
  }

  showDamageFlash() {
    if (!this._damageFlash) return;
    this._damageFlash.style.opacity = '0.35';
    this._flashTimer = 0.25;
  }

  pushKillFeed(text) {
    if (!this._killFeed) return;
    const el = document.createElement('div');
    el.textContent     = text;
    el.style.opacity   = '1';
    el.style.transition = 'opacity 0.4s';
    this._killFeed.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 400); }, 2800);
  }

  // ── Private ───────────────────────────────────────────────────────────────

  _updateTimer() {
    if (!this._timerEl) return;
    const m = Math.floor(this._raidSeconds / 60);
    const s = Math.floor(this._raidSeconds % 60);
    this._timerEl.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    this._timerEl.style.color = this._raidSeconds < 300 ? '#f44336' : '#c8a96e';
  }
}
