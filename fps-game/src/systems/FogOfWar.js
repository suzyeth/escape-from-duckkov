/**
 * FogOfWar
 * Renders a 2D canvas overlay that masks areas outside the player's vision cone.
 * Player sees a ~120° arc in their facing direction; everything else is dark fog.
 *
 * Uses the mouse screen position directly to determine vision direction,
 * avoiding complex world-to-screen angle conversion issues with the 45° camera.
 */
export class FogOfWar {
  constructor() {
    this._canvas = document.createElement('canvas');
    this._canvas.id = 'fog-of-war';
    this._canvas.style.cssText = `
      position: fixed; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 5; opacity: 0.85;
    `;
    document.body.appendChild(this._canvas);
    this._ctx = this._canvas.getContext('2d');

    this._resize();
    window.addEventListener('resize', () => this._resize());

    // Config
    this._fovAngle  = Math.PI * 0.67;  // ~120° vision arc
    this._viewRange = 0.42;            // fraction of screen height for vision radius
    this._enabled   = true;

    // Track mouse screen position directly
    this._mouseX = window.innerWidth / 2;
    this._mouseY = window.innerHeight / 2;
    document.addEventListener('mousemove', (e) => {
      this._mouseX = e.clientX;
      this._mouseY = e.clientY;
    });

    // Pre-allocated gradient (reused each frame)
    this._scale = 0.5;
  }

  get enabled() { return this._enabled; }
  set enabled(v) {
    this._enabled = v;
    this._canvas.style.display = v ? 'block' : 'none';
  }

  set fovAngle(rad) { this._fovAngle = rad; }

  /**
   * Update the fog mask each frame.
   * @param {number} playerScreenX  player screen X (0-1)
   * @param {number} playerScreenY  player screen Y (0-1)
   */
  update(playerScreenX, playerScreenY) {
    if (!this._enabled) return;

    const w = this._canvas.width;
    const h = this._canvas.height;
    const ctx = this._ctx;
    const s = this._scale;

    // Player position on canvas
    const px = playerScreenX * w;
    const py = playerScreenY * h;

    // Mouse position on canvas (scaled)
    const mx = this._mouseX * s;
    const my = this._mouseY * s;

    // Vision direction = from player to mouse on screen
    const dx = mx - px;
    const dy = my - py;
    const screenAngle = Math.atan2(dy, dx);

    // Vision radius in pixels
    const visionRadius = h * this._viewRange;

    // Clear to full black
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);

    // Cut out vision cone
    ctx.globalCompositeOperation = 'destination-out';

    const halfFov = this._fovAngle / 2;

    // Main vision cone with soft edge
    const grad = ctx.createRadialGradient(px, py, 0, px, py, visionRadius);
    grad.addColorStop(0,   'rgba(0,0,0,1)');
    grad.addColorStop(0.65, 'rgba(0,0,0,1)');
    grad.addColorStop(0.85, 'rgba(0,0,0,0.6)');
    grad.addColorStop(1.0,  'rgba(0,0,0,0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.arc(px, py, visionRadius, screenAngle - halfFov, screenAngle + halfFov);
    ctx.closePath();
    ctx.fill();

    // Small circle around player (always see immediate surroundings)
    const nearR = visionRadius * 0.18;
    const nearGrad = ctx.createRadialGradient(px, py, 0, px, py, nearR);
    nearGrad.addColorStop(0,   'rgba(0,0,0,1)');
    nearGrad.addColorStop(0.7, 'rgba(0,0,0,0.7)');
    nearGrad.addColorStop(1.0, 'rgba(0,0,0,0)');
    ctx.fillStyle = nearGrad;
    ctx.beginPath();
    ctx.arc(px, py, nearR, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalCompositeOperation = 'source-over';
  }

  hide() { this._canvas.style.display = 'none'; }
  show() { if (this._enabled) this._canvas.style.display = 'block'; }

  _resize() {
    this._scale = 0.5;
    this._canvas.width  = window.innerWidth * this._scale;
    this._canvas.height = window.innerHeight * this._scale;
  }
}
