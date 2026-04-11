/**
 * GameLoop
 * Fixed-timestep update with uncapped render via requestAnimationFrame.
 * Prevents "spiral of death" by capping maximum delta time.
 */
export class GameLoop {
  /** @param {(dt: number) => void} updateFn @param {() => void} renderFn */
  constructor(updateFn, renderFn) {
    this._update = updateFn;
    this._render = renderFn;
    this._running = false;
    this._lastTime = 0;
    this._rafId = null;

    /** Maximum dt to prevent huge jumps after tab-switch or debugger pause */
    this.MAX_DT = 1 / 20; // cap at 50 ms
  }

  start() {
    if (this._running) return;
    this._running = true;
    this._lastTime = performance.now();
    this._rafId = requestAnimationFrame((t) => this._loop(t));
  }

  stop() {
    this._running = false;
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }

  _loop(timestamp) {
    if (!this._running) return;

    const dt = Math.min((timestamp - this._lastTime) / 1000, this.MAX_DT);
    this._lastTime = timestamp;

    this._update(dt);
    this._render();

    this._rafId = requestAnimationFrame((t) => this._loop(t));
  }
}
