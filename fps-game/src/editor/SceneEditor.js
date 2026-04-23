import * as THREE from 'three';
import sceneConfig from '../config/scene.json';
import { createTree } from '../props/env-outdoor.js';
import { createRockCluster } from '../props/rock-cluster.js';
import { createBarrel } from '../props/barrel.js';

/**
 * SceneEditor — in-browser scene editor for 逃离鸭科夫.
 *
 * F2 toggles edit mode. In edit mode:
 *   - Gameplay is paused via pauseController.
 *   - Render camera swaps to a top-down orthographic view.
 *   - Left panel: palette (Tree / Rock / Barrel / Box / Enemy), Save / Load.
 *   - Left-click on ground with a palette armed: place a prop.
 *   - Left-click on a prop: select it (BoxHelper outline).
 *   - Drag: move selected (snapped to 0.5 units).
 *   - R: rotate selected by 45°.
 *   - Del: remove selected.
 *   - Esc: clear armed/selected.
 *
 * Single-pass MVP — no undo, no multi-select.
 */

const GRID_SNAP = 0.5;
const ROT_STEP  = Math.PI / 4; // 45°
const ORTHO_HALF = 100;        // world units visible from center

function parseColor(v) {
  if (typeof v === 'number') return v;
  if (typeof v === 'string' && v.startsWith('#')) return parseInt(v.slice(1), 16);
  return 0xffffff;
}

function snap(v) {
  return Math.round(v / GRID_SNAP) * GRID_SNAP;
}

export class SceneEditor {
  constructor({ scene, gameCamera, renderer, input, level, aiSystem, pauseController }) {
    this._scene      = scene;
    this._gameCamera = gameCamera;
    this._renderer   = renderer;
    this._input      = input;
    this._level      = level;
    this._aiSystem   = aiSystem;
    this._pause      = pauseController;

    this._active = false;

    // Deep-clone the scene config so edits don't mutate the import.
    this.liveConfig = JSON.parse(JSON.stringify(sceneConfig));

    // ── Ortho camera (top-down) ────────────────────────────────────────────
    this._orthoCam = new THREE.OrthographicCamera(-ORTHO_HALF, ORTHO_HALF, ORTHO_HALF, -ORTHO_HALF, 1, 500);
    this._orthoCam.position.set(0, 200, 0);
    this._orthoCam.lookAt(0, 0, 0);
    this._orthoCam.up.set(0, 0, -1);
    this._applyAspect();

    // ── Raycasting state ───────────────────────────────────────────────────
    this._ray       = new THREE.Raycaster();
    this._mouseNDC  = new THREE.Vector2();
    this._groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    this._worldPt   = new THREE.Vector3();

    // ── Selection ──────────────────────────────────────────────────────────
    this._selected       = null;
    this._selectionHelper = null;

    // ── Ghost / placement ──────────────────────────────────────────────────
    this._armed = null;   // 'tree' | 'rock' | 'barrel' | 'box' | 'enemy' | null
    this._ghost = null;

    // ── Drag ───────────────────────────────────────────────────────────────
    this._dragging = false;
    this._dragStartMouse = new THREE.Vector3();
    this._dragStartMeshPos = new THREE.Vector3();

    // ── UI ─────────────────────────────────────────────────────────────────
    this._panel = null;
    this._paletteButtons = {};
    this._buildUI();

    // ── DOM listeners (installed on toggle) ────────────────────────────────
    this._onMouseMove = (e) => this._handleMouseMove(e);
    this._onMouseDown = (e) => this._handleMouseDown(e);
    this._onMouseUp   = (e) => this._handleMouseUp(e);
    this._onKeyDown   = (e) => this._handleKeyDown(e);
    this._onResize    = () => this._applyAspect();
  }

  // ── Public API ───────────────────────────────────────────────────────────

  get isActive() { return this._active; }
  get orthoCam() { return this._orthoCam; }

  toggle() {
    if (this._active) this._exit();
    else this._enter();
  }

  update(_dt) {
    if (!this._active) return;
    // Ghost position follows cursor every frame.
    if (this._armed && this._ghost && this._hasMousePos) {
      this._ghost.position.x = snap(this._worldPt.x);
      this._ghost.position.z = snap(this._worldPt.z);
    }
    // Drag: update selected position.
    if (this._dragging && this._selected && this._hasMousePos) {
      const sx = snap(this._dragStartMeshPos.x + (this._worldPt.x - this._dragStartMouse.x));
      const sz = snap(this._dragStartMeshPos.z + (this._worldPt.z - this._dragStartMouse.z));
      this._selected.position.x = sx;
      this._selected.position.z = sz;
      this._writeConfigPos(this._selected, sx, sz);
      if (this._selectionHelper) this._selectionHelper.update();
    }
  }

  // ── Enter / Exit ─────────────────────────────────────────────────────────

  _enter() {
    this._active = true;
    this._pause?.pause?.();
    this._panel.style.display = 'flex';
    this._rebuildScene();
    const dom = this._renderer.domElement;
    dom.addEventListener('mousemove', this._onMouseMove);
    dom.addEventListener('mousedown', this._onMouseDown);
    dom.addEventListener('mouseup',   this._onMouseUp);
    window.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('resize',  this._onResize);
    // Show cursor in editor mode.
    document.body.style.cursor = 'default';
    if (document.pointerLockElement) document.exitPointerLock?.();
  }

  _exit() {
    this._disarm();
    this._clearSelection();
    this._dragging = false;

    this._active = false;
    this._panel.style.display = 'none';
    const dom = this._renderer.domElement;
    dom.removeEventListener('mousemove', this._onMouseMove);
    dom.removeEventListener('mousedown', this._onMouseDown);
    dom.removeEventListener('mouseup',   this._onMouseUp);
    window.removeEventListener('keydown', this._onKeyDown);
    window.removeEventListener('resize',  this._onResize);

    // Rebuild so the game sees the final state after edits.
    this._rebuildScene();
    this._pause?.resume?.();
  }

  // ── Scene rebuild ────────────────────────────────────────────────────────

  _rebuildScene() {
    this._clearSelection();
    this._level.clearConfigDriven();
    this._aiSystem.clearEnemies();
    this._level.rebuildFromConfig(this.liveConfig);
    this._aiSystem.rebuildFromConfig(this.liveConfig);
  }

  // ── UI ───────────────────────────────────────────────────────────────────

  _buildUI() {
    const panel = document.createElement('div');
    panel.id = 'scene-editor-panel';
    panel.style.cssText = [
      'position:fixed',
      'left:0', 'top:0', 'bottom:0',
      'width:220px',
      'background:rgba(20,20,28,.95)',
      'color:#fff',
      'padding:12px',
      'box-sizing:border-box',
      'font:12px "Courier New",monospace',
      'z-index:700',
      'display:none',
      'flex-direction:column',
      'gap:6px',
      'overflow-y:auto',
      'pointer-events:auto',
    ].join(';');

    const title = document.createElement('div');
    title.textContent = '🛠 SCENE EDITOR';
    title.style.cssText = 'font-weight:bold;font-size:13px;letter-spacing:1px;margin-bottom:4px;color:#ffcc66;';
    panel.appendChild(title);

    const hint = document.createElement('div');
    hint.textContent = 'Click palette → click map to place';
    hint.style.cssText = 'font-size:10px;color:#aaa;margin-bottom:6px;';
    panel.appendChild(hint);

    const sep1 = document.createElement('div');
    sep1.style.cssText = 'border-top:1px solid #444;margin:4px 0;';
    panel.appendChild(sep1);

    const palLabel = document.createElement('div');
    palLabel.textContent = 'PALETTE';
    palLabel.style.cssText = 'font-size:10px;color:#888;letter-spacing:1px;';
    panel.appendChild(palLabel);

    const PALETTE = [
      { id: 'tree',   label: '🌲 Tree' },
      { id: 'rock',   label: '🪨 Rock' },
      { id: 'barrel', label: '🛢  Barrel' },
      { id: 'box',    label: '📦 Box' },
      { id: 'enemy',  label: '🦆 Enemy' },
    ];
    for (const p of PALETTE) {
      const btn = this._makeButton(p.label);
      btn.onclick = () => this._togglePalette(p.id);
      this._paletteButtons[p.id] = btn;
      panel.appendChild(btn);
    }

    const sep2 = document.createElement('div');
    sep2.style.cssText = 'border-top:1px solid #444;margin:8px 0 4px 0;';
    panel.appendChild(sep2);

    const saveBtn = this._makeButton('💾 Save scene.json');
    saveBtn.onclick = () => this._save();
    panel.appendChild(saveBtn);

    const loadBtn = this._makeButton('📂 Load scene.json');
    loadBtn.onclick = () => this._load();
    panel.appendChild(loadBtn);

    const footer = document.createElement('div');
    footer.style.cssText = 'margin-top:auto;font-size:10px;color:#888;padding-top:8px;border-top:1px solid #333;line-height:1.6;';
    footer.innerHTML = [
      '<b>F2</b>   exit editor',
      '<b>R</b>    rotate 45°',
      '<b>Del</b>  delete',
      '<b>Esc</b>  cancel',
    ].join('<br>');
    panel.appendChild(footer);

    this._panel = panel;
    document.body.appendChild(panel);
  }

  _makeButton(label) {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.style.cssText = [
      'padding:6px 8px',
      'background:#2a2a38',
      'color:#fff',
      'border:1px solid #444',
      'border-radius:3px',
      'cursor:pointer',
      'font:11px "Courier New",monospace',
      'text-align:left',
    ].join(';');
    btn.onmouseover = () => { btn.style.background = '#3a3a48'; };
    btn.onmouseout  = () => {
      const armed = btn.dataset.armed === '1';
      btn.style.background = armed ? '#5a4a1a' : '#2a2a38';
    };
    return btn;
  }

  _togglePalette(id) {
    if (this._armed === id) {
      this._disarm();
    } else {
      this._arm(id);
    }
  }

  _arm(id) {
    this._disarm();
    this._armed = id;
    const btn = this._paletteButtons[id];
    if (btn) { btn.dataset.armed = '1'; btn.style.background = '#5a4a1a'; }
    this._ghost = this._makeGhost(id);
    if (this._ghost) this._scene.add(this._ghost);
  }

  _disarm() {
    if (this._armed) {
      const btn = this._paletteButtons[this._armed];
      if (btn) { btn.dataset.armed = '0'; btn.style.background = '#2a2a38'; }
    }
    this._armed = null;
    if (this._ghost) {
      this._scene.remove(this._ghost);
      this._disposeObject(this._ghost);
      this._ghost = null;
    }
  }

  _makeGhost(id) {
    // Simple translucent marker per type — cheap, no full prop creation.
    let geo, color;
    if (id === 'tree')        { geo = new THREE.CylinderGeometry(0.4, 0.4, 3, 8); color = 0x66aa55; }
    else if (id === 'rock')   { geo = new THREE.SphereGeometry(1.2, 8, 6);        color = 0x888888; }
    else if (id === 'barrel') { geo = new THREE.CylinderGeometry(0.5, 0.5, 1.2, 10); color = 0x4a7a3a; }
    else if (id === 'box')    { geo = new THREE.BoxGeometry(2, 1, 2);              color = 0x707060; }
    else if (id === 'enemy')  { geo = new THREE.ConeGeometry(0.6, 1.6, 6);         color = 0xff4444; }
    else return null;
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5, depthTest: false });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = 0.6;
    mesh.renderOrder = 999;
    return mesh;
  }

  // ── Input handlers ───────────────────────────────────────────────────────

  _handleMouseMove(e) {
    this._updateWorldPoint(e);
  }

  _handleMouseDown(e) {
    if (e.button !== 0 && e.button !== 2) return;
    this._updateWorldPoint(e);

    // Right-click: cancel arm / selection.
    if (e.button === 2) {
      e.preventDefault();
      if (this._armed) this._disarm();
      else this._clearSelection();
      return;
    }

    // Left-click: place if armed, else select / start drag.
    if (this._armed) {
      e.preventDefault();
      this._placeAtCursor();
      return;
    }

    const hit = this._pickEditable(e);
    if (hit) {
      this._select(hit);
      // Begin drag.
      this._dragging = true;
      this._dragStartMouse.copy(this._worldPt);
      this._dragStartMeshPos.copy(hit.position);
    } else {
      this._clearSelection();
    }
  }

  _handleMouseUp(e) {
    if (e.button === 0) this._dragging = false;
  }

  _handleKeyDown(e) {
    if (!this._active) return;
    // Don't intercept F2 — main.js handles toggle.
    if (e.code === 'F2') return;
    if (e.code === 'Escape') {
      if (this._armed) { this._disarm(); e.preventDefault(); return; }
      if (this._selected) { this._clearSelection(); e.preventDefault(); return; }
      return;
    }
    if (e.code === 'KeyR' && this._selected) {
      this._rotateSelected();
      e.preventDefault();
      return;
    }
    if ((e.code === 'Delete' || e.code === 'Backspace') && this._selected) {
      this._deleteSelected();
      e.preventDefault();
      return;
    }
  }

  _updateWorldPoint(e) {
    const rect = this._renderer.domElement.getBoundingClientRect();
    this._mouseNDC.set(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -(((e.clientY - rect.top) / rect.height) * 2 - 1),
    );
    this._ray.setFromCamera(this._mouseNDC, this._orthoCam);
    if (this._ray.ray.intersectPlane(this._groundPlane, this._worldPt)) {
      this._hasMousePos = true;
    }
  }

  // ── Picking ──────────────────────────────────────────────────────────────

  _pickEditable() {
    this._ray.setFromCamera(this._mouseNDC, this._orthoCam);
    // Collect all editable ancestors roots.
    const candidates = [];
    for (const child of this._scene.children) {
      if (child.userData?.editable) candidates.push(child);
    }
    const hits = this._ray.intersectObjects(candidates, true);
    if (!hits.length) return null;
    // Walk up to the editable ancestor.
    let obj = hits[0].object;
    while (obj && !obj.userData?.editable) obj = obj.parent;
    return obj || null;
  }

  // ── Selection ────────────────────────────────────────────────────────────

  _select(obj) {
    this._clearSelection();
    this._selected = obj;
    this._selectionHelper = new THREE.BoxHelper(obj, 0xffff00);
    this._selectionHelper.material.depthTest = false;
    this._selectionHelper.renderOrder = 1000;
    this._scene.add(this._selectionHelper);
  }

  _clearSelection() {
    if (this._selectionHelper) {
      this._scene.remove(this._selectionHelper);
      this._selectionHelper.geometry?.dispose?.();
      this._selectionHelper.material?.dispose?.();
      this._selectionHelper = null;
    }
    this._selected = null;
  }

  // ── Config mutations ─────────────────────────────────────────────────────

  _writeConfigPos(obj, x, z) {
    const ref = obj.userData.configRef;
    if (!ref) return;
    if (Array.isArray(ref.pos)) {
      ref.pos[0] = x;
      ref.pos[1] = z;
    } else if ('cx' in ref) {
      ref.cx = x;
      ref.cz = z;
    } else {
      ref.x = x;
      ref.z = z;
    }
  }

  _rotateSelected() {
    const obj = this._selected;
    if (!obj) return;
    const ref = obj.userData.configRef;
    if (!ref) return;
    if (!('rotY' in ref)) return; // no-op for configs without rotY (e.g. buildings)
    let r = (ref.rotY ?? 0) + ROT_STEP;
    if (r > Math.PI * 2) r -= Math.PI * 2;
    ref.rotY = r;
    obj.rotation.y = r;
    if (this._selectionHelper) this._selectionHelper.update();
  }

  _deleteSelected() {
    const obj = this._selected;
    if (!obj) return;
    const ref = obj.userData.configRef;
    const key = obj.userData.configKey;
    if (ref && key && Array.isArray(this.liveConfig[key])) {
      const i = this.liveConfig[key].indexOf(ref);
      if (i >= 0) this.liveConfig[key].splice(i, 1);
    }
    this._clearSelection();
    // Rebuild to ensure clean state (handles buildings with many sub-meshes).
    this._rebuildScene();
  }

  // ── Placement ────────────────────────────────────────────────────────────

  _placeAtCursor() {
    if (!this._armed || !this._hasMousePos) return;
    const x = snap(this._worldPt.x);
    const z = snap(this._worldPt.z);

    let entry = null;
    let key   = null;
    if (this._armed === 'tree') {
      entry = { x, z, type: 'round', scale: 3, rotY: 0 };
      key = 'trees';
    } else if (this._armed === 'rock') {
      entry = { x, z, count: 4, scale: 2 };
      key = 'rockClusters';
    } else if (this._armed === 'barrel') {
      entry = { x, z, fallen: false, color: '#4a7a3a' };
      key = 'barrels';
    } else if (this._armed === 'box') {
      entry = { cx: x, cz: z, w: 2, h: 1, d: 2, color: '#707060', name: 'BoxNew' };
      key = 'boxes';
    } else if (this._armed === 'enemy') {
      entry = { type: 'normal', pos: [x, z], waypoints: [[x, z]] };
      key = 'enemies';
    }
    if (!entry || !key) return;

    if (!Array.isArray(this.liveConfig[key])) this.liveConfig[key] = [];
    this.liveConfig[key].push(entry);

    // Rebuild so the new prop is fully rendered and tagged.
    this._rebuildScene();
  }

  // ── Save / Load ──────────────────────────────────────────────────────────

  _save() {
    const blob = new Blob([JSON.stringify(this.liveConfig, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scene.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  _load() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.onchange = async (ev) => {
      const file = ev.target.files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        const parsed = JSON.parse(text);
        this.liveConfig = parsed;
        this._rebuildScene();
      } catch (err) {
        console.error('Failed to load scene.json:', err);
        window.alert('Failed to load scene.json — see console.');
      }
    };
    input.click();
  }

  // ── Utility ──────────────────────────────────────────────────────────────

  _applyAspect() {
    const aspect = window.innerWidth / window.innerHeight;
    const halfH = ORTHO_HALF;
    const halfW = ORTHO_HALF * aspect;
    this._orthoCam.left   = -halfW;
    this._orthoCam.right  =  halfW;
    this._orthoCam.top    =  halfH;
    this._orthoCam.bottom = -halfH;
    this._orthoCam.updateProjectionMatrix();
  }

  _disposeObject(obj) {
    obj.traverse?.(ch => {
      if (ch.isMesh) {
        ch.geometry?.dispose?.();
        if (ch.material?.dispose) ch.material.dispose();
      }
    });
  }
}
