import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

/**
 * Renderer
 * Wraps WebGLRenderer with shadows, tone mapping, bloom, and auto-resize.
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
    this._renderer.toneMappingExposure = 1.0;
    this._renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(this._renderer.domElement);

    // Post-processing
    this._composer = null;
    this._bloomPass = null;

    this._resizeCallbacks = [];
    this._onResize = this._onResize.bind(this);
    window.addEventListener('resize', this._onResize);
  }

  // ── Public ────────────────────────────────────────────────────────────────

  get domElement() {
    return this._renderer.domElement;
  }

  /**
   * Initialize post-processing pipeline.
   * Call once after scene and camera are ready.
   */
  initPostProcessing(scene, camera) {
    const w = window.innerWidth;
    const h = window.innerHeight;

    this._composer = new EffectComposer(this._renderer);

    // 1. Render pass
    const renderPass = new RenderPass(scene, camera);
    this._composer.addPass(renderPass);
    this._renderPass = renderPass;

    // 2. Bloom — subtle glow on bright objects (muzzle flash, lamps, emissive items)
    this._bloomPass = new UnrealBloomPass(
      new THREE.Vector2(w, h),
      0.4,   // strength — subtle
      0.6,   // radius
      0.7    // threshold — only bright things bloom
    );
    this._composer.addPass(this._bloomPass);

    // 3. Output pass (color space conversion)
    this._composer.addPass(new OutputPass());

    this._scene = scene;
    this._camera = camera;
  }

  render(scene, camera) {
    if (this._composer) {
      // Swap the composer's camera if caller passes a different one (e.g. editor ortho cam).
      if (camera && this._renderPass && this._renderPass.camera !== camera) {
        this._renderPass.camera = camera;
      }
      this._composer.render();
    } else {
      this._renderer.render(scene, camera);
    }
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
    if (this._composer) {
      this._composer.setSize(w, h);
    }
    this._resizeCallbacks.forEach((cb) => cb(w, h));
  }
}
