/**
 * FogOfWar
 * Renders a 2D canvas overlay that masks areas outside the player's vision cone.
 * Player sees a ~120° arc in their facing direction; everything else is dark fog.
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
    this._fovAngle = Math.PI * 0.67;  // ~120° vision arc
    this._viewRange = 0.42;           // fraction of screen height for vision radius
    this._enabled = true;
  }

  get enabled() { return this._enabled; }
  set enabled(v) {
    this._enabled = v;
    this._canvas.style.display = v ? 'block' : 'none';
  }

  /** Set FOV angle in radians */
  set fovAngle(rad) { this._fovAngle = rad; }

  /**
   * Update the fog mask each frame.
   * @param {number} screenX  player screen X (0-1)
   * @param {number} screenY  player screen Y (0-1)
   * @param {number} facingAngle  player facing angle (radians, 0 = +Z)
   * @param {number} cameraAngle  camera Y rotation offset
   */
  update(screenX, screenY, facingAngle, cameraAngle = 0) {
    if (!this._enabled) return;

    const w = this._canvas.width;
    const h = this._canvas.height;
    const ctx = this._ctx;

    // Player position on screen
    const px = screenX * w;
    const py = screenY * h;

    // Vision radius in pixels
    const visionRadius = h * this._viewRange;

    // Clear to full black
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, w, h);

    // Cut out vision cone using compositing
    ctx.globalCompositeOperation = 'destination-out';

    // Convert facing angle to screen space
    // In top-down view: +Z is down on screen, +X is right
    // facingAngle: 0 = +Z (down), PI/2 = +X (right)
    const screenAngle = -facingAngle + Math.PI;

    // Draw vision cone as a filled arc
    const halfFov = this._fovAngle / 2;
    const startAngle = screenAngle - halfFov;
    const endAngle = screenAngle + halfFov;

    // Soft edge gradient
    const gradient = ctx.createRadialGradient(px, py, 0, px, py, visionRadius);
    gradient.addColorStop(0, 'rgba(0,0,0,1)');
    gradient.addColorStop(0.7, 'rgba(0,0,0,0.95)');
    gradient.addColorStop(0.9, 'rgba(0,0,0,0.5)');
    gradient.addColorStop(1.0, 'rgba(0,0,0,0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.arc(px, py, visionRadius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();

    // Small circle around player (can always see immediate surroundings)
    const nearRadius = visionRadius * 0.15;
    const nearGrad = ctx.createRadialGradient(px, py, 0, px, py, nearRadius);
    nearGrad.addColorStop(0, 'rgba(0,0,0,1)');
    nearGrad.addColorStop(0.8, 'rgba(0,0,0,0.6)');
    nearGrad.addColorStop(1.0, 'rgba(0,0,0,0)');
    ctx.fillStyle = nearGrad;
    ctx.beginPath();
    ctx.arc(px, py, nearRadius, 0, Math.PI * 2);
    ctx.fill();

    // Reset compositing
    ctx.globalCompositeOperation = 'source-over';
  }

  /** Hide fog (for menus, etc.) */
  hide() { this._canvas.style.display = 'none'; }

  /** Show fog */
  show() { if (this._enabled) this._canvas.style.display = 'block'; }

  _resize() {
    // Use half resolution for performance
    const scale = 0.5;
    this._canvas.width = window.innerWidth * scale;
    this._canvas.height = window.innerHeight * scale;
  }
}
