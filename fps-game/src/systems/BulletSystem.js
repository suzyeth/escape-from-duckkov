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
    this._particles = [];  // { mesh, vel, life, maxLife }
    this._flashes  = [];   // { mesh, life }
  }

  // ── Public ─────────────────────────────────────────────────────────────────

  /**
   * Spawn a visible tracer line from `from` to `to`.
   * Thicker, brighter, longer-lasting than before.
   */
  spawnTracer(from, to, color = 0xffee88) {
    const height = 0.5;
    const pts = [
      new THREE.Vector3(from.x, height, from.z),
      new THREE.Vector3(to.x,   height, to.z),
    ];
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 1.0,
      linewidth: 2,
    });
    const line = new THREE.Line(geo, mat);
    this._scene.add(line);
    this._tracers.push({ line, mat, life: 0.16, maxLife: 0.16 });
  }

  /**
   * Spawn a multi-layered muzzle flash at muzzle position.
   * Brighter, larger, with an inner glow.
   */
  spawnMuzzleFlash(pos) {
    // Outer flash — bright, large
    const outerGeo = new THREE.SphereGeometry(0.35, 6, 6);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0xffdd44,
      transparent: true,
      opacity: 0.9,
    });
    const outer = new THREE.Mesh(outerGeo, outerMat);
    outer.position.set(pos.x, 0.5, pos.z);
    this._scene.add(outer);
    this._flashes.push({ mesh: outer, mat: outerMat, life: 0.07 });

    // Inner core — white hot
    const innerGeo = new THREE.SphereGeometry(0.15, 4, 4);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 1.0,
    });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    inner.position.set(pos.x, 0.5, pos.z);
    this._scene.add(inner);
    this._flashes.push({ mesh: inner, mat: innerMat, life: 0.05 });
  }

  /**
   * Spawn spark particles at a bullet impact point.
   * More particles, varied sizes, with sparks flying further.
   */
  spawnHitEffect(pos) {
    const COUNT = 8;
    for (let i = 0; i < COUNT; i++) {
      const size = 0.03 + Math.random() * 0.04;
      const geo  = new THREE.SphereGeometry(size, 3, 3);
      // Mix orange and yellow sparks
      const color = Math.random() > 0.4 ? 0xff9900 : 0xffdd44;
      const mat  = new THREE.MeshBasicMaterial({ color, transparent: true });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(pos.x, Math.max(0.05, pos.y), pos.z);
      const angle = (i / COUNT) * Math.PI * 2 + Math.random() * 0.8;
      const speed = 3.0 + Math.random() * 2.5;
      const vel   = new THREE.Vector3(
        Math.cos(angle) * speed,
        2.2 + Math.random() * 1.8,
        Math.sin(angle) * speed
      );
      this._scene.add(mesh);
      this._particles.push({ mesh, mat, vel, life: 0.30, maxLife: 0.30 });
    }
  }

  /**
   * Spawn a larger explosion when an enemy dies.
   */
  spawnKillEffect(pos) {
    // Flash ring
    const ringGeo = new THREE.RingGeometry(0.3, 1.2, 12);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xff6600,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(pos.x, 0.1, pos.z);
    this._scene.add(ring);
    this._flashes.push({ mesh: ring, mat: ringMat, life: 0.25 });

    // Burst of particles
    const COUNT = 14;
    for (let i = 0; i < COUNT; i++) {
      const size = 0.04 + Math.random() * 0.06;
      const geo  = new THREE.SphereGeometry(size, 3, 3);
      const colors = [0xff3300, 0xff6600, 0xffaa00, 0xffdd44];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const mat  = new THREE.MeshBasicMaterial({ color, transparent: true });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(pos.x, 0.3, pos.z);
      const angle = (i / COUNT) * Math.PI * 2 + Math.random() * 0.5;
      const speed = 4.0 + Math.random() * 3.0;
      const vel   = new THREE.Vector3(
        Math.cos(angle) * speed,
        3.0 + Math.random() * 2.5,
        Math.sin(angle) * speed
      );
      this._scene.add(mesh);
      this._particles.push({ mesh, mat, vel, life: 0.40, maxLife: 0.40 });
    }
  }

  /**
   * Spawn a screen-space hit marker flash (white X) — called from main.
   */
  spawnHitMarkerWorld(playerPos, aimAngle) {
    // Small bright sphere at player's aim point
    const dist = 1.5;
    const geo = new THREE.SphereGeometry(0.12, 4, 4);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 1.0,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(
      playerPos.x + Math.sin(aimAngle) * dist,
      0.8,
      playerPos.z + Math.cos(aimAngle) * dist
    );
    this._scene.add(mesh);
    this._flashes.push({ mesh, mat, life: 0.12 });
  }

  // ── Per-frame update ───────────────────────────────────────────────────────

  update(dt) {
    this._updateTracers(dt);
    this._updateParticles(dt);
    this._updateFlashes(dt);
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
      p.mat.opacity = Math.max(0, p.life / p.maxLife);
      // Scale down as they die
      const scale = Math.max(0.1, p.life / p.maxLife);
      p.mesh.scale.setScalar(scale);
      if (p.life <= 0) {
        this._scene.remove(p.mesh);
        p.mesh.geometry.dispose();
        p.mat.dispose();
        this._particles.splice(i, 1);
      }
    }
  }

  _updateFlashes(dt) {
    for (let i = this._flashes.length - 1; i >= 0; i--) {
      const f = this._flashes[i];
      f.life -= dt;
      if (f.mat) f.mat.opacity = Math.max(0, f.life * 8);
      // Scale up ring flashes
      if (f.mesh.geometry.type === 'RingGeometry') {
        f.mesh.scale.setScalar(1 + (1 - f.life / 0.25) * 1.5);
      }
      if (f.life <= 0) {
        this._scene.remove(f.mesh);
        f.mesh.geometry.dispose();
        if (f.mat) f.mat.dispose();
        this._flashes.splice(i, 1);
      }
    }
  }
}
