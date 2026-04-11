/**
 * InputManager
 * Centralises keyboard state, mouse delta accumulation, and Pointer Lock lifecycle.
 * MouseDelta is consumed each frame — call consumeMouseDelta() once per update.
 */
export class InputManager {
  constructor(lockTarget) {
    /** @type {HTMLElement} */
    this._lockTarget = lockTarget;

    /** Keyboard state: code → boolean */
    this.keys = {};

    /** Accumulated mouse movement since last consume */
    this._mouseDeltaX = 0;
    this._mouseDeltaY = 0;

    /** Whether the pointer is currently locked */
    this.locked = false;

    /** Track which keys were just pressed this frame */
    this._justPressed = new Set();

    this._bindEvents();
  }

  // ── Public ────────────────────────────────────────────────────────────────

  /** Returns true while the key is held */
  isDown(code) {
    return !!this.keys[code];
  }

  /** Returns true only on the frame the key was pressed */
  justPressed(code) {
    return this._justPressed.has(code);
  }

  /** Consumes and returns the accumulated mouse delta this frame */
  consumeMouseDelta() {
    const dx = this._mouseDeltaX;
    const dy = this._mouseDeltaY;
    this._mouseDeltaX = 0;
    this._mouseDeltaY = 0;
    return { x: dx, y: dy };
  }

  /** Clear justPressed set — call once per frame after processing input */
  endFrame() {
    this._justPressed.clear();
  }

  /** Request pointer lock on the lock target */
  requestLock() {
    this._lockTarget.requestPointerLock();
  }

  /** Release pointer lock */
  releaseLock() {
    document.exitPointerLock();
  }

  destroy() {
    document.removeEventListener('keydown', this._onKeyDown);
    document.removeEventListener('keyup', this._onKeyUp);
    document.removeEventListener('mousemove', this._onMouseMove);
    document.removeEventListener('pointerlockchange', this._onLockChange);
  }

  // ── Private ───────────────────────────────────────────────────────────────

  _bindEvents() {
    this._onKeyDown = (e) => {
      if (!this.keys[e.code]) this._justPressed.add(e.code);
      this.keys[e.code] = true;
    };

    this._onKeyUp = (e) => {
      this.keys[e.code] = false;
    };

    this._onMouseMove = (e) => {
      if (this.locked) {
        this._mouseDeltaX += e.movementX;
        this._mouseDeltaY += e.movementY;
      }
    };

    this._onLockChange = () => {
      this.locked = document.pointerLockElement === this._lockTarget;
    };

    document.addEventListener('keydown', this._onKeyDown);
    document.addEventListener('keyup', this._onKeyUp);
    document.addEventListener('mousemove', this._onMouseMove);
    document.addEventListener('pointerlockchange', this._onLockChange);
  }
}
