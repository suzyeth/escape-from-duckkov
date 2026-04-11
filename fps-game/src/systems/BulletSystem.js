import * as THREE from 'three';

/**
 * BulletSystem
 * Manages visible bullet tracers (LINE), muzzle flashes, and hit spark particles.
 * All objects are disposed when their lifetime expires.
 */
export class BulletSystem {
  constructor(scene) {
    this._scene    = scene;
    this._tracers  = [];   // { line, mat, life, maxLife }
    this._particles = [];  // { mesh, vel, life }
  }

  // ── Public ─────────────────────────────────────────────────────────────────

  /**
   * Spawn a visible tracer line from `from` to `to` at ground-level height.
   * @param {THREE.Vector3} from   muzzle world position
   * @param {THREE.Vector3} to     hit / max-range world position
   * @param {number}        color  hex color (default: yellow-white)
   */
  spawnTracer(from, to, color = 0xffee88) {
    const height = 0.5; // waist height in top-down view
    const pts = [
      new THREE.Vector3(from.x, height, from.z),
      new THREE.Vector3(to.x,   height, to.z),
    ];
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 1.0,
    });
    const line = new THREE.Line(geo, mat);
    this._scene.add(line);
    this._tracers.push({ line, mat, life: 0.10, maxLife: 0.10 });
  }

  /**
   * Spawn a brief white flash at muzzle position.
   * @param {THREE.Vector3} pos world position
   */
  spawnMuzzleFlash(pos) {
    const geo  = new THREE.SphereGeometry(0.18, 5, 5);
    const mat  = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(pos.x, 0.5, pos.z);
    this._scene.add(mesh);
    // Simple timeout removal (no need to track in update loop)
    setTimeout(() => {
      this._scene.remove(mesh);
      geo.dispose();
      mat.dispose();
    }, 45);
  }

  /**
   * Spawn spark particles at a bullet impact point.
   * @param {THREE.Vector3} pos world position
   */
  spawnHitEffect(pos) {
    const COUNT = 5;
    for (let i = 0; i < COUNT; i++) {
      const geo  = new THREE.SphereGeometry(0.045, 3, 3);
      const mat  = new THREE.MeshBasicMaterial({ color: 0xff9900, transparent: true });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(pos.x, Math.max(0.05, pos.y), pos.z);
      const angle = (i / COUNT) * Math.PI * 2 + Math.random() * 0.5;
      const speed = 2.5 + Math.random() * 1.5;
      const vel   = new THREE.Vector3(
        Math.cos(angle) * speed,
        1.8 + Math.random() * 1.2,
        Math.sin(angle) * speed
      );
      this._scene.add(mesh);
      this._particles.push({ mesh, mat, vel, life: 0.22 });
    }
  }

  // ── Per-frame update ───────────────────────────────────────────────────────

  /** @param {number} dt seconds */
  update(dt) {
    this._updateTracers(dt);
    this._updateParticles(dt);
  }

  // ── Private ────────────────────────────────────────────────────────────────

  _updateTracers(dt) {
    for (let i = this._tracers.length - 1; i >= 0; i--) {
      const t = this._tracers[i];
      t.life -= dt;
      t.mat.opacity = Math.max(0, t.life / t.maxLife);
      if (t.life <= 0) {
        this._scene.remove(t.line);
        t.line.geometry.dispose();
        t.mat.dispose();
        this._tracers.splice(i, 1);
      }
    }
  }

  _updateParticles(dt) {
    const GRAVITY = 14;
    for (let i = this._particles.length - 1; i >= 0; i--) {
      const p = this._particles[i];
      p.life -= dt;
      p.vel.y -= GRAVITY * dt;
      p.mesh.position.addScaledVector(p.vel, dt);
      p.mat.opacity = Math.max(0, p.life / 0.22);
      if (p.life <= 0) {
        this._scene.remove(p.mesh);
        p.mesh.geometry.dispose();
        p.mat.dispose();
        this._particles.splice(i, 1);
      }
    }
  }
}
