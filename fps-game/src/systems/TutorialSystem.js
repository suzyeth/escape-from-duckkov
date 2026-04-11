/**
 * TutorialSystem
 * 5-step in-game overlay tutorial shown only on first play.
 * Progress state stored in localStorage under 'duckovTutorialDone'.
 *
 * Steps (auto-advance on condition met):
 *   0 MOVE    – move > 3 units from spawn
 *   1 AIM     – mouse moved (aimWorldPos updated)
 *   2 SHOOT   – fired at least once
 *   3 LOOT    – picked up an item
 *   4 EXTRACT – entered an extraction zone
 *
 * Each step shows a hint bar at the top-centre of the HUD.
 */

const STEPS = [
  {
    key:  'MOVE',
    text: '🦆 WASD 移动角色 — 探索地图',
  },
  {
    key:  'AIM',
    text: '🎯 移动鼠标 瞄准方向',
  },
  {
    key:  'SHOOT',
    text: '🔫 左键 射击 — 先动手者先生还',
  },
  {
    key:  'LOOT',
    text: '📦 靠近物品，按 E 拾取战利品',
  },
  {
    key:  'EXTRACT',
    text: '🚁 找到绿色撤离区，按住 E 撤离',
  },
];

const STORAGE_KEY = 'duckovTutorialDone';

export class TutorialSystem {
  constructor() {
    this._step    = 0;
    this._done    = false;
    this._spawnPos = null;  // set on first update to detect MOVE trigger

    // Skip tutorial if already completed
    if (localStorage.getItem(STORAGE_KEY) === '1') {
      this._done = true;
    }
  }

  // ── Queries ────────────────────────────────────────────────────────────────

  get isActive()       { return !this._done; }
  get currentStep()    { return this._step; }
  get currentText()    { return this._done ? null : STEPS[this._step]?.text ?? null; }

  // ── Per-frame ──────────────────────────────────────────────────────────────

  /**
   * Update tutorial state; returns hint text to display (or null).
   * @param {{
   *   playerPos: THREE.Vector3,
   *   aimMoved:  boolean,
   *   fired:     boolean,
   *   looted:    boolean,
   *   inExtract: boolean,
   * }} state
   * @returns {string|null}
   */
  update(state) {
    if (this._done) return null;

    // Record spawn position once
    if (!this._spawnPos) {
      this._spawnPos = state.playerPos.clone();
    }

    switch (this._step) {
      case 0: // MOVE
        if (state.playerPos.distanceTo(this._spawnPos) > 3) this._advance();
        break;
      case 1: // AIM
        if (state.aimMoved) this._advance();
        break;
      case 2: // SHOOT
        if (state.fired) this._advance();
        break;
      case 3: // LOOT
        if (state.looted) this._advance();
        break;
      case 4: // EXTRACT
        if (state.inExtract) this._advance();
        break;
    }

    return this.currentText;
  }

  /** Mark tutorial complete (e.g., player extracted or died) */
  complete() {
    this._done = true;
    localStorage.setItem(STORAGE_KEY, '1');
  }

  /** Reset for testing (clears localStorage) */
  reset() {
    this._done  = false;
    this._step  = 0;
    this._spawnPos = null;
    localStorage.removeItem(STORAGE_KEY);
  }

  // ── Private ────────────────────────────────────────────────────────────────

  _advance() {
    this._step++;
    if (this._step >= STEPS.length) {
      this.complete();
    }
  }
}
