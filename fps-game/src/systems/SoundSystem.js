/**
 * SoundSystem — Procedural audio via Web Audio API.
 * No external asset files required; all sounds are synthesised.
 *
 * Call init() once after a user gesture (click/keydown).
 * Then call the play* methods from the game loop.
 */
export class SoundSystem {
  constructor() {
    /** @type {AudioContext|null} */
    this._ctx    = null;
    /** @type {GainNode|null} */
    this._master = null;
    this._ready  = false;

    // Footstep throttle
    this._footTimer = 0;
  }

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  /** Must be called inside a user-gesture handler (e.g. button click). */
  init() {
    if (this._ready) return;
    try {
      this._ctx    = new (window.AudioContext || window.webkitAudioContext)();
      this._master = this._ctx.createGain();
      this._master.gain.value = 0.55;
      this._master.connect(this._ctx.destination);
      // Pre-bake shared noise buffers — reused across all BufferSource nodes
      this._noiseBuf = {
        0.1: this._bakeNoise(0.1),
        0.2: this._bakeNoise(0.2),
        0.5: this._bakeNoise(0.5),
      };
      this._clickBuf = this._bakeClick();
      this._ready  = true;
    } catch {
      // Web Audio API not supported — sounds simply won't play
    }
  }

  /** Resume context if suspended (required in some browsers). */
  resume() {
    if (this._ctx && this._ctx.state === 'suspended') this._ctx.resume();
  }

  // ── Public play methods ────────────────────────────────────────────────────

  /**
   * Gunshot — noise burst shaped for each weapon type.
   * @param {'rifle'|'pistol'|'shotgun'} weaponId
   */
  playShot(weaponId = 'rifle') {
    if (!this._ready) return;
    const ctx = this._ctx;
    const now = ctx.currentTime;

    // Per-weapon feel: cutoff frequency, volume, and decay length
    const cfg = {
      rifle:   { cutoff: 1800, vol: 0.70, decay: 0.18 },
      pistol:  { cutoff: 2400, vol: 0.55, decay: 0.13 },
      shotgun: { cutoff:  900, vol: 0.95, decay: 0.32 },
      vss:     { cutoff: 1200, vol: 0.40, decay: 0.25 },  // suppressed — quiet, longer tail
      mp5:     { cutoff: 2200, vol: 0.60, decay: 0.10 },  // fast, snappy
    }[weaponId] ?? { cutoff: 1800, vol: 0.7, decay: 0.18 };

    const src = this._noiseSource(0.5);

    // Low-pass sweeps from high → cfg.cutoff to give initial crack then thud
    const lpf = ctx.createBiquadFilter();
    lpf.type = 'lowpass';
    lpf.frequency.setValueAtTime(cfg.cutoff * 12, now);
    lpf.frequency.exponentialRampToValueAtTime(cfg.cutoff, now + cfg.decay);

    // Volume envelope: instant attack, exponential decay
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(cfg.vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + cfg.decay * 2.8);

    src.connect(lpf);
    lpf.connect(gain);
    gain.connect(this._master);
    src.start(now);
    src.stop(now + cfg.decay * 3);
  }

  /**
   * Two metallic clicks for reload animation.
   */
  playReload() {
    if (!this._ready) return;
    this._click(0,    0.28);
    this._click(0.18, 0.22);
  }

  /**
   * Footstep thud.
   * @param {boolean} fast  — true when sprinting
   */
  playFootstep(fast = false) {
    if (!this._ready) return;

    // Throttle: one footstep every N seconds based on movement speed
    const interval = fast ? 0.28 : 0.44;
    const now = this._ctx.currentTime;
    if (now - this._footTimer < interval) return;
    this._footTimer = now;

    const src  = this._noiseSource(0.1);
    const lpf  = this._ctx.createBiquadFilter();
    lpf.type   = 'lowpass';
    lpf.frequency.value = 300;

    const gain = this._ctx.createGain();
    gain.gain.setValueAtTime(fast ? 0.22 : 0.16, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    src.connect(lpf);
    lpf.connect(gain);
    gain.connect(this._master);
    src.start(now);
    src.stop(now + 0.15);
  }

  /**
   * Short high-pitched ping when a shot hits an enemy.
   */
  playHitMarker() {
    if (!this._ready) return;
    const ctx = this._ctx;
    const now = ctx.currentTime;

    // Double tone — punchy metallic ding
    const osc1 = ctx.createOscillator();
    osc1.type  = 'sine';
    osc1.frequency.value = 1600;
    const osc2 = ctx.createOscillator();
    osc2.type  = 'sine';
    osc2.frequency.value = 2200;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.10);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this._master);
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.11);
    osc2.stop(now + 0.11);
  }

  /**
   * Satisfying kill confirm — descending two-note chime.
   */
  playKillConfirm() {
    if (!this._ready) return;
    const ctx = this._ctx;
    const now = ctx.currentTime;

    // Note 1 — high
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.value = 1800;
    const g1 = ctx.createGain();
    g1.gain.setValueAtTime(0.22, now);
    g1.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc1.connect(g1); g1.connect(this._master);
    osc1.start(now); osc1.stop(now + 0.16);

    // Note 2 — lower, delayed
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = 1200;
    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(0.18, now + 0.08);
    g2.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    osc2.connect(g2); g2.connect(this._master);
    osc2.start(now + 0.08); osc2.stop(now + 0.30);

    // Low thud
    const src = this._noiseSource(0.2);
    const lpf = ctx.createBiquadFilter();
    lpf.type = 'lowpass';
    lpf.frequency.value = 200;
    const g3 = ctx.createGain();
    g3.gain.setValueAtTime(0.35, now);
    g3.gain.exponentialRampToValueAtTime(0.001, now + 0.20);
    src.connect(lpf); lpf.connect(g3); g3.connect(this._master);
    src.start(now); src.stop(now + 0.22);
  }

  /**
   * Sharp impact sound when player takes damage.
   */
  playDamaged() {
    if (!this._ready) return;
    const ctx = this._ctx;
    const now = ctx.currentTime;

    const src  = this._noiseSource(0.2);
    const lpf  = ctx.createBiquadFilter();
    lpf.type   = 'lowpass';
    lpf.frequency.setValueAtTime(600, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    src.connect(lpf);
    lpf.connect(gain);
    gain.connect(this._master);
    src.start(now);
    src.stop(now + 0.25);
  }

  /**
   * Short beep when inside an extraction zone (call periodically).
   */
  playExtractBeep() {
    if (!this._ready) return;
    const ctx = this._ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type  = 'sine';
    osc.frequency.value = 880;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(this._master);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  /**
   * Low "ammo empty" click when trying to fire with 0 rounds.
   */
  playDryFire() {
    if (!this._ready) return;
    this._click(0, 0.18);
  }

  /**
   * Wooden door creak — low rumble + mid resonance.
   */
  playDoor() {
    if (!this._ready) return;
    const ctx = this._ctx;
    const now = ctx.currentTime;

    // Low wooden thud
    const src = this._noiseSource(0.2);
    const lpf = ctx.createBiquadFilter();
    lpf.type = 'bandpass';
    lpf.frequency.setValueAtTime(180, now);
    lpf.frequency.exponentialRampToValueAtTime(80, now + 0.25);
    lpf.Q.value = 1.8;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.50, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    src.connect(lpf);
    lpf.connect(gain);
    gain.connect(this._master);
    src.start(now);
    src.stop(now + 0.38);

    // Higher creak overtone
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(280 + Math.random() * 60, now + 0.02);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.22);
    const gCreak = ctx.createGain();
    gCreak.gain.setValueAtTime(0.08, now + 0.02);
    gCreak.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc.connect(gCreak);
    gCreak.connect(this._master);
    osc.start(now + 0.02);
    osc.stop(now + 0.24);
  }

  /**
   * Elite alert — sharp rising tone burst when an elite enemy spots the player.
   */
  playEliteAlert() {
    if (!this._ready) return;
    const ctx = this._ctx;
    const now = ctx.currentTime;

    // Rising alarm sweep
    for (let i = 0; i < 2; i++) {
      const osc = ctx.createOscillator();
      osc.type = 'square';
      osc.frequency.setValueAtTime(400, now + i * 0.18);
      osc.frequency.exponentialRampToValueAtTime(900, now + i * 0.18 + 0.14);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.12, now + i * 0.18);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.18 + 0.16);

      osc.connect(gain);
      gain.connect(this._master);
      osc.start(now + i * 0.18);
      osc.stop(now + i * 0.18 + 0.17);
    }
  }

  /**
   * Distant gunshot — muffled, used for ambient atmosphere.
   */
  playDistantShot() {
    if (!this._ready) return;
    const ctx = this._ctx;
    const now = ctx.currentTime;
    const src = this._noiseSource(0.5);
    const lpf = ctx.createBiquadFilter();
    lpf.type = 'lowpass';
    lpf.frequency.setValueAtTime(400, now);
    lpf.frequency.exponentialRampToValueAtTime(80, now + 0.4);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.10, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    src.connect(lpf); lpf.connect(gain); gain.connect(this._master);
    src.start(now); src.stop(now + 0.55);
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  /** Bake a static white-noise AudioBuffer of `duration` seconds. */
  _bakeNoise(duration) {
    const sr  = this._ctx.sampleRate;
    const buf = this._ctx.createBuffer(1, Math.ceil(sr * duration), sr);
    const d   = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  /**
   * Return a new BufferSource pointing to a pre-baked noise buffer.
   * Multiple sources can share the same buffer (buffer is read-only data).
   */
  _noiseSource(duration) {
    const buf = this._noiseBuf?.[duration] ?? this._bakeNoise(duration);
    const src = this._ctx.createBufferSource();
    src.buffer = buf;
    return src;
  }

  /** Pre-bake a click AudioBuffer once at init */
  _bakeClick() {
    const sr  = this._ctx.sampleRate;
    const len = Math.ceil(sr * 0.05);
    const buf = this._ctx.createBuffer(1, len, sr);
    const d   = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 4);
    }
    return buf;
  }

  /** Single metallic transient click, starting `delay` seconds from now. */
  _click(delay = 0, vol = 0.25) {
    const ctx = this._ctx;
    const now = ctx.currentTime + delay;

    const src = ctx.createBufferSource();
    src.buffer = this._clickBuf;

    const hpf = ctx.createBiquadFilter();
    hpf.type  = 'highpass';
    hpf.frequency.value = 1800;

    const gain = ctx.createGain();
    gain.gain.value = vol;

    src.connect(hpf);
    hpf.connect(gain);
    gain.connect(this._master);
    src.start(now);
  }
}
