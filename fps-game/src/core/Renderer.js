import * as THREE from 'three';

/**
 * Renderer
 * Wraps WebGLRenderer with shadows, tone mapping, and auto-resize.
 */
export class Renderer {
  constructor(container) {
    this._renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });

    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    this._renderer.shadowMap.enabled = true;
    this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this._renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this._renderer.toneMappingExposure = 0.9;
    this._renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(this._renderer.domElement);

    this._resizeCallbacks = [];
    this._onResize = this._onResize.bind(this);
    window.addEventListener('resize', this._onResize);
  }

  // ── Public ────────────────────────────────────────────────────────────────

  get domElement() {
    return this._renderer.domElement;
  }

  render(scene, camera) {
    this._renderer.render(scene, camera);
  }

  /** Register a callback invoked on window resize with (width, height) */
  onResize(cb) {
    this._resizeCallbacks.push(cb);
  }

  destroy() {
    window.removeEventListener('resize', this._onResize);
    this._renderer.dispose();
  }

  // ── Private ───────────────────────────────────────────────────────────────

  _onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this._renderer.setSize(w, h);
    this._resizeCallbacks.forEach((cb) => cb(w, h));
  }
}
