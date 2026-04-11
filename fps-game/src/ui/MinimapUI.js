/**
 * MinimapUI
 * Canvas-based top-right minimap. Updated every frame.
 *
 * Shows:
 *   • Building outlines (grey)
 *   • Extraction points (green / orange)
 *   • Loot containers — closed (yellow) / opened (dark)
 *   • Enemies — colour-coded by AI state (PATROL grey | ALERT orange | COMBAT red)
 *   • Player position + facing arrow (white)
 */

import { STATE } from '../entities/Enemy.js';

// World bounds: -76 … +76 on both X and Z
const MAP_HALF = 76;

export class MinimapUI {
  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    this._canvas = canvas;
    this._ctx    = canvas.getContext('2d');
    this._size   = canvas.width;                      // canvas is square
    this._scale  = this._size / (MAP_HALF * 2);       // world-unit → pixel
  }

  // ── Public ─────────────────────────────────────────────────────────────────

  /**
   * Redraw the minimap.
   *
   * @param {THREE.Vector3}   playerPos
   * @param {number}          playerFacing   — Y-axis angle (radians)
   * @param {import('../entities/Enemy').Enemy[]}         enemies
   * @param {{ center: THREE.Vector3, label: string, requiresKey: string|null }[]} extractionPoints
   * @param {{ minX:number, maxX:number, minZ:number, maxZ:number }[]} buildings
   * @param {{ pos: THREE.Vector3, opened: boolean }[]}  containers
   */
  update(playerPos, playerFacing, enemies, extractionPoints, buildings, containers) {
    const ctx = this._ctx;
    const S   = this._size;

    // ── Background ────────────────────────────────────────────────────────────
    ctx.fillStyle = 'rgba(8, 8, 8, 0.88)';
    ctx.fillRect(0, 0, S, S);

    // ── Building outlines ─────────────────────────────────────────────────────
    ctx.strokeStyle = 'rgba(180, 160, 130, 0.35)';
    ctx.fillStyle   = 'rgba(30, 25, 20, 0.50)';
    ctx.lineWidth   = 0.5;
    for (const b of buildings) {
      const x = this._wx(b.minX);
      const z = this._wz(b.minZ);
      const w = (b.maxX - b.minX) * this._scale;
      const h = (b.maxZ - b.minZ) * this._scale;
      ctx.fillRect(x, z, w, h);
      ctx.strokeRect(x, z, w, h);
    }

    // ── Extraction points ─────────────────────────────────────────────────────
    for (const ep of extractionPoints) {
      const cx = this._wx(ep.center.x);
      const cz = this._wz(ep.center.z);
      ctx.fillStyle   = ep.requiresKey ? '#ffaa00' : '#00ff80';
      ctx.strokeStyle = ep.requiresKey ? '#ffaa00' : '#00ff80';
      ctx.lineWidth   = 1;
      // Small diamond marker
      ctx.beginPath();
      ctx.moveTo(cx,     cz - 4);
      ctx.lineTo(cx + 3, cz    );
      ctx.lineTo(cx,     cz + 4);
      ctx.lineTo(cx - 3, cz    );
      ctx.closePath();
      ctx.fill();
    }

    // ── Loot containers ───────────────────────────────────────────────────────
    for (const c of containers) {
      const cx = this._wx(c.pos.x);
      const cz = this._wz(c.pos.z);
      ctx.fillStyle = c.opened ? '#333' : '#d4a017';
      ctx.fillRect(cx - 1.5, cz - 1.5, 3, 3);
    }

    // ── Enemies ───────────────────────────────────────────────────────────────
    for (const e of enemies) {
      if (!e.isAlive) continue;
      const cx   = this._wx(e.position.x);
      const cz   = this._wz(e.position.z);
      const r    = e.state === STATE.COMBAT ? 2.5 : e.state === STATE.SEARCH ? 2.0 : 1.5;
      ctx.fillStyle =
        e.state === STATE.COMBAT ? '#ff3333' :
        e.state === STATE.SEARCH ? '#ffee44' :
        e.state === STATE.ALERT  ? '#ffaa33' :
        'rgba(160,60,60,0.6)';
      ctx.beginPath();
      ctx.arc(cx, cz, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // ── Player ────────────────────────────────────────────────────────────────
    const px = this._wx(playerPos.x);
    const pz = this._wz(playerPos.z);

    // Facing arrow
    const arrowLen = 7;
    const ax = Math.sin(playerFacing) * arrowLen;
    const az = Math.cos(playerFacing) * arrowLen;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth   = 1.5;
    ctx.beginPath();
    ctx.moveTo(px, pz);
    ctx.lineTo(px + ax, pz + az);
    ctx.stroke();

    // Player dot
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(px, pz, 3, 0, Math.PI * 2);
    ctx.fill();

    // ── Border ────────────────────────────────────────────────────────────────
    ctx.strokeStyle = 'rgba(200,169,110,0.4)';
    ctx.lineWidth   = 1;
    ctx.strokeRect(0.5, 0.5, S - 1, S - 1);
  }

  // ── Private ─────────────────────────────────────────────────────────────────

  /** World X → canvas X */
  _wx(x) { return (x + MAP_HALF) * this._scale; }
  /** World Z → canvas Y (Z+ = screen down = south) */
  _wz(z) { return (z + MAP_HALF) * this._scale; }
}
