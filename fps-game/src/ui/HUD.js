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
    this._helmetWrap    = null;
    this._helmetBar     = null;
    this._healWrap      = document.getElementById('heal-channel-wrap');
    this._healBar       = document.getElementById('heal-channel-inner');
    this._healLabel     = document.getElementById('heal-channel-label');
    this._healthHpText  = document.getElementById('health-hp-text');
    this._healthDisplay = document.getElementById('health-display');
    this._weightDisplay = document.getElementById('weight-display');
    this._weightValue   = document.getElementById('weight-value');
    this._reloadIndicator = document.getElementById('reload-indicator');
    this._reloadBar     = document.getElementById('reload-bar-inner');

    this._raidSeconds   = 45 * 60;
    this._flashTimer    = 0;
    this._onTimerExpire = null;
    this._killCountEl   = document.getElementById('kill-count');
    this._lowHpVignette = document.getElementById('low-health-vignette');

    if (this._armorWrap) {
      this._helmetWrap = this._armorWrap.cloneNode(true);
      this._helmetWrap.id = 'helmet-bar-wrap';
      const label = this._helmetWrap.querySelector('#armor-bar-label');
      if (label) label.id = 'helmet-bar-label';
      if (label) label.textContent = '头盔';
      const outer = this._helmetWrap.querySelector('#armor-bar-outer');
      if (outer) outer.id = 'helmet-bar-outer';
      const inner = this._helmetWrap.querySelector('#armor-bar-inner');
      if (inner) inner.id = 'helmet-bar-inner';
      this._helmetBar = inner;
      this._helmetWrap.style.display = 'none';
      this._armorWrap.insertAdjacentElement('afterend', this._helmetWrap);
    }

    // Cache weapon slot elements
    this._wslots = [];
    for (let i = 0; i < 8; i++) {
      this._wslots.push(document.getElementById(`wslot-${i}`));
    }
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  show() { this._hud.style.display = 'block'; }
  hide() { this._hud.style.display = 'none';  }

  /** Call when starting/restarting a raid to reset the timer */
  resetRaid(seconds = 45 * 60) {
    this._raidSeconds = seconds;
  }

  /** Set callback for when raid timer hits zero */
  onTimerExpire(fn) { this._onTimerExpire = fn; }

  /** Update kill counter display */
  setKillCount(count) {
    if (this._killCountEl) this._killCountEl.textContent = count;
  }

  // ── Per-frame ─────────────────────────────────────────────────────────────

  update(dt) {
    const wasTicking = this._raidSeconds > 0;
    this._raidSeconds = Math.max(0, this._raidSeconds - dt);
    if (wasTicking && this._raidSeconds <= 0 && this._onTimerExpire) {
      this._onTimerExpire();
    }
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
  setArmor(state) {
    if (!this._armorWrap || !this._armorBar) return;
    const bodyPct = typeof state === 'number' ? state : (state?.bodyPct ?? -1);
    const headPct = typeof state === 'number' ? -1 : (state?.headPct ?? -1);

    if (bodyPct < 0) {
      this._armorWrap.style.display = 'none';
    } else {
      this._armorWrap.style.display = 'block';
      this._armorBar.style.width = `${Math.max(0, bodyPct) * 100}%`;
      this._armorBar.style.background = bodyPct > 0.5 ? '#66bb88' : bodyPct > 0.2 ? '#aaaa44' : '#bb6644';
    }

    if (!this._helmetWrap || !this._helmetBar) return;
    if (headPct < 0) {
      this._helmetWrap.style.display = 'none';
    } else {
      this._helmetWrap.style.display = 'block';
      this._helmetBar.style.width = `${Math.max(0, headPct) * 100}%`;
      this._helmetBar.style.background = headPct > 0.5 ? '#77aaff' : headPct > 0.2 ? '#88aacc' : '#bb6644';
    }
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
    if (this._healthHpText) this._healthHpText.textContent = Math.ceil(hp);
    if (this._healthDisplay) {
      this._healthDisplay.classList.toggle('low-hp', pct <= 30 && pct > 0);
    }
    if (this._healthDanger) {
      if (pct <= 20 && pct > 0) {
        this._healthDanger.textContent = '⚠ 危险 — 按H急救';
        this._healthDanger.style.display = 'block';
      } else {
        this._healthDanger.style.display = 'none';
      }
    }
    // Low health vignette
    if (this._lowHpVignette) {
      const vigOpacity = pct <= 40 ? (1 - pct / 40) * 0.8 : 0;
      this._lowHpVignette.style.setProperty('--vig-opacity', vigOpacity);
      this._lowHpVignette.style.opacity = vigOpacity;
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
    for (let i = 0; i < this._wslots.length; i++) {
      const el = this._wslots[i];
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

  setWeight(current, max) {
    if (!this._weightDisplay) return;
    const el = this._weightDisplay;
    const val = this._weightValue;
    if (val) val.textContent = current.toFixed(1);
    el.classList.remove('heavy', 'overloaded');
    if (current > 35) el.classList.add('overloaded');
    else if (current > 25) el.classList.add('heavy');
  }

  /**
   * Show/hide reload progress bar.
   * @param {number} pct 0–1 progress, or -1 to hide
   */
  setReloadProgress(pct) {
    if (!this._reloadIndicator) return;
    if (pct < 0) {
      this._reloadIndicator.style.display = 'none';
    } else {
      this._reloadIndicator.style.display = 'block';
      if (this._reloadBar) this._reloadBar.style.width = `${Math.min(1, pct) * 100}%`;
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

  /**
   * Show a transient onboarding bubble near the top-centre of the screen.
   * @param {string} text
   * @param {number} seconds
   */
  showBubble(text, seconds = 3) {
    let el = this._bubble;
    if (!el) {
      el = document.createElement('div');
      el.id = 'hud-bubble';
      el.style.cssText = 'position:fixed;top:12%;left:50%;transform:translateX(-50%);padding:12px 24px;background:rgba(0,0,0,.75);color:#fff;font-family:"Courier New",monospace;font-size:18px;border:2px solid #fff;border-radius:8px;z-index:500;pointer-events:none;opacity:0;transition:opacity .3s';
      document.body.appendChild(el);
      this._bubble = el;
    }
    el.textContent = text;
    el.style.opacity = '1';
    clearTimeout(this._bubbleT);
    this._bubbleT = setTimeout(() => { el.style.opacity = '0'; }, seconds * 1000);
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
