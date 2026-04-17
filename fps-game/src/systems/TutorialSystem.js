import { isFirstRun } from './DemoSeed.js';

const STEPS = [
  { id: 'move',    text: 'WASD 移动',              trigger: 'time',     delay: 1.0  },
  { id: 'shoot',   text: '左键射击',                trigger: 'move',     delay: 3.0  },
  { id: 'pickup',  text: 'E 拾取',                  trigger: 'nearLoot', delay: 0    },
  { id: 'extract', text: '到撤离点按 E 撤离',        trigger: 'time',     delay: 45.0 },
];

export class TutorialSystem {
  /**
   * @param {{ showBubble: (text: string, seconds: number) => void }} hud
   */
  constructor(hud) {
    this.hud = hud;
    this.active = isFirstRun();
    this.stepIdx = 0;
    this.t = 0;
    this._moveT = null;   // wall-clock seconds since first move detected
    this._sawLoot = false;
  }

  notifyMove() {
    if (!this.active) return;
    if (this._moveT === null) this._moveT = 0;
  }

  notifyNearLoot() {
    if (!this.active) return;
    this._sawLoot = true;
  }

  update(dt) {
    if (!this.active) return;
    this.t += dt;
    if (this._moveT !== null) this._moveT += dt;
    const s = STEPS[this.stepIdx];
    if (!s) { this.active = false; return; }
    let ready = false;
    if (s.trigger === 'time')     ready = this.t >= s.delay;
    else if (s.trigger === 'move')    ready = this._moveT !== null && this._moveT >= s.delay;
    else if (s.trigger === 'nearLoot') ready = this._sawLoot;
    if (ready) this._show(s);
  }

  _show(step) {
    this.hud.showBubble?.(step.text, 4.0);
    this.stepIdx++;
    // Reset timers relative to next step so `delay` means "after this step showed"
    // EXCEPT for step 4 (extract) which intentionally fires 45s from spawn — reset only for step 2.
    if (step.id === 'move') this._moveT = 0;
  }

  /** Backward-compat no-op for existing callers (e.g., raid-end cleanup). */
  complete() {
    this.active = false;
  }

  /** Backward-compat getter for existing callers. */
  get isActive() {
    return this.active;
  }
}
