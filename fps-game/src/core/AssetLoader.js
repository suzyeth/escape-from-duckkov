import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * AssetLoader
 * Preloads GLTF/GLB models and caches them for reuse.
 * Falls back gracefully if models are not found.
 */
export class AssetLoader {
  constructor() {
    this._loader = new GLTFLoader();
    this._cache = new Map();
    this._loading = false;
    this._ready = false;
  }

  get ready() { return this._ready; }

  /**
   * Load a model file. Returns the GLTF scene (Group).
   * @param {string} key   cache key
   * @param {string} url   path to .glb file
   * @returns {Promise<THREE.Group|null>}
   */
  async load(key, url) {
    if (this._cache.has(key)) return this._cache.get(key);

    try {
      const gltf = await new Promise((resolve, reject) => {
        this._loader.load(url, resolve, undefined, reject);
      });
      this._cache.set(key, gltf.scene);
      return gltf.scene;
    } catch {
      // Model not found — return null, caller uses fallback geometry
      return null;
    }
  }

  /**
   * Load all game models. Non-blocking — game works without models.
   * @param {(progress:number)=>void} onProgress  0-1 progress callback
   */
  async loadAll(onProgress) {
    this._loading = true;
    const manifest = [
      // Add model paths here when available:
      // { key: 'player',     url: '/models/characters/player.glb' },
      // { key: 'enemy_scav', url: '/models/characters/scav.glb' },
      // { key: 'barrel',     url: '/models/props/barrel.glb' },
      // { key: 'crate',      url: '/models/props/crate.glb' },
    ];

    if (manifest.length === 0) {
      this._ready = true;
      this._loading = false;
      if (onProgress) onProgress(1);
      return;
    }

    for (let i = 0; i < manifest.length; i++) {
      await this.load(manifest[i].key, manifest[i].url);
      if (onProgress) onProgress((i + 1) / manifest.length);
    }

    this._ready = true;
    this._loading = false;
  }

  /**
   * Get a cached model clone (safe to add to scene multiple times).
   * Returns null if model was not loaded.
   */
  get(key) {
    const model = this._cache.get(key);
    return model ? model.clone() : null;
  }
}
