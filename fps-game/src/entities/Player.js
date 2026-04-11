import * as THREE from 'three';

// ── Constants ──────────────────────────────────────────────────────────────

const PLAYER_RADIUS  = 0.55;
const PLAYER_HEIGHT  = 1.6;   // visual height of character mesh
const MOVE_SPEED     = 5.0;
const SPRINT_SPEED   = 8.5;
const CROUCH_SPEED   = 2.5;

// 4-directional wall raycasts
const WALL_DIRS = [
  new THREE.Vector3( 1, 0,  0),
  new THREE.Vector3(-1, 0,  0),
  new THREE.Vector3( 0, 0,  1),
  new THREE.Vector3( 0, 0, -1),
];

/**
 * Player — Top-Down
 *
 * Movement: WASD in world-space XZ.
 * Aiming:   mesh.rotation.y tracks mouse world position (supplied each frame).
 * Collision: 4 horizontal raycasts push away from walls.
 */
export class Player {
  /**
   * @param {THREE.Scene} scene
   */
  constructor(scene) {
    this._scene = scene;

    // World position (feet on ground, Y = 0)
    this.position = new THREE.Vector3(2, 0, 2);

    this._velocity  = new THREE.Vector3();
    this._isCrouching = false;
    this._isSprinting = false;

    // Health (legacy simple HP — main.js delegates to HealthSystem)
    this.maxHealth = 100;
    this.health    = 100;

    // Stamina (0–100). Drains while sprinting, regens otherwise.
    this.stamina    = 100;
    this.maxStamina = 100;

    // External multiplier applied by HealthSystem (leg damage slows movement)
    this.speedMultiplier = 1.0;

    // Set true while using a medical item — halves movement speed
    this.isHealing = false;

    // Facing angle (radians, around Y axis)
    this._facingAngle = 0;

    // Build visual mesh
    this.mesh = this._buildMesh();
    scene.add(this.mesh);

    // Raycasters (reused)
    this._wallRay = new THREE.Raycaster();
    this._wallRay.near = 0;
    this._wallRay.far  = PLAYER_RADIUS + 0.1;

    // Temp vectors
    this._moveDir    = new THREE.Vector3();
    this._wallOrigin = new THREE.Vector3();
  }

  // ── Public ─────────────────────────────────────────────────────────────────

  get isAlive()      { return this.health > 0; }
  get isCrouching()  { return this._isCrouching; }
  get facingAngle()  { return this._facingAngle; }

  /**
   * @param {number} dt
   * @param {import('../core/InputManager').InputManager} input
   * @param {THREE.Vector3|null} aimWorldPos  - mouse projected onto ground (null = no change)
   * @param {THREE.Object3D[]} collidables
   */
  update(dt, input, aimWorldPos, collidables) {
    if (!this.isAlive) return;

    this._handleMovement(dt, input);
    this._resolveWalls(collidables);
    this._handleAim(aimWorldPos);
    this._syncMesh();
  }

  takeDamage(amount) {
    this.health = Math.max(0, this.health - amount);
  }

  heal(amount) {
    this.health = Math.min(this.maxHealth, this.health + amount);
  }

  /**
   * Fire a hitscan ray from player in facing direction.
   * @param {THREE.Object3D[]} targets
   * @returns {{ hit: boolean, point: THREE.Vector3|null, object: THREE.Object3D|null }}
   */
  shoot(targets) {
    const dir = new THREE.Vector3(
      Math.sin(this._facingAngle),
      0,
      Math.cos(this._facingAngle)
    );
    const origin = this.position.clone();
    origin.y = 0.5; // mid-body height for ray

    const ray = new THREE.Raycaster(origin, dir, 0, 60);
    const hits = ray.intersectObjects(targets, true);

    if (hits.length > 0) {
      return { hit: true, point: hits[0].point, object: hits[0].object };
    }
    return { hit: false, point: null, object: null };
  }

  // ── Private ────────────────────────────────────────────────────────────────

  _handleMovement(dt, input) {
    this._isCrouching = input.isDown('ControlLeft') || input.isDown('ControlRight');

    // Sprint only while stamina > 0; once drained, must regen to 15 before sprinting again
    const wantsToSprint = input.isDown('ShiftLeft') && !this._isCrouching;
    if (wantsToSprint && this.stamina > 0) {
      this._isSprinting = true;
    } else if (this.stamina <= 0) {
      this._isSprinting = false;
    } else if (!wantsToSprint) {
      this._isSprinting = false;
    }

    // Stamina drain / regen
    const isMoving = input.isDown('KeyW') || input.isDown('KeyS')
                  || input.isDown('KeyA') || input.isDown('KeyD');
    if (this._isSprinting) {
      this.stamina = Math.max(0, this.stamina - 28 * dt);   // ~3.6 s full drain
    } else if (this._isCrouching || !isMoving) {
      this.stamina = Math.min(this.maxStamina, this.stamina + 22 * dt); // faster regen
    } else {
      this.stamina = Math.min(this.maxStamina, this.stamina + 14 * dt); // slow regen while walking
    }

    const baseSpeed = this._isCrouching ? CROUCH_SPEED
                    : this._isSprinting ? SPRINT_SPEED
                    : MOVE_SPEED;
    const healPenalty = this.isHealing ? 0.70 : 1.0;
    const speed = baseSpeed * this.speedMultiplier * healPenalty;

    this._moveDir.set(0, 0, 0);
    if (input.isDown('KeyW')) this._moveDir.z -= 1;
    if (input.isDown('KeyS')) this._moveDir.z += 1;
    if (input.isDown('KeyA')) this._moveDir.x -= 1;
    if (input.isDown('KeyD')) this._moveDir.x += 1;

    if (this._moveDir.lengthSq() > 0) {
      this._moveDir.normalize().multiplyScalar(speed * dt);
      this.position.add(this._moveDir);
    }

    // Keep on ground
    this.position.y = 0;
  }

  _resolveWalls(collidables) {
    this._wallOrigin.set(this.position.x, 0.5, this.position.z);
    for (const dir of WALL_DIRS) {
      this._wallRay.set(this._wallOrigin, dir);

      const hits = this._wallRay.intersectObjects(collidables, false);
      if (hits.length > 0) {
        const overlap = PLAYER_RADIUS - hits[0].distance;
        if (overlap > 0) {
          this.position.x -= dir.x * overlap;
          this.position.z -= dir.z * overlap;
        }
      }
    }
  }

  _handleAim(aimWorldPos) {
    if (!aimWorldPos) return;

    const dx = aimWorldPos.x - this.position.x;
    const dz = aimWorldPos.z - this.position.z;
    if (Math.abs(dx) > 0.01 || Math.abs(dz) > 0.01) {
      // atan2 gives angle from +Z axis; negate Z because Three.js -Z is forward
      this._facingAngle = Math.atan2(dx, dz);
    }
  }

  _syncMesh() {
    this.mesh.position.copy(this.position);
    this.mesh.position.y = PLAYER_HEIGHT / 2; // centre mesh vertically
    this.mesh.rotation.y = this._facingAngle;
  }

  /** Build a simple capsule-like character from primitives */
  _buildMesh() {
    const group = new THREE.Group();

    // Body
    const bodyGeo = new THREE.CylinderGeometry(0.44, 0.44, 1.1, 8);
    const bodyMat = new THREE.MeshLambertMaterial({ color: 0x3a5f3a }); // dark green
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0;
    body.castShadow = true;
    group.add(body);

    // Head
    const headGeo = new THREE.SphereGeometry(0.32, 8, 6);
    const headMat = new THREE.MeshLambertMaterial({ color: 0xf5c87a }); // skin tone
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 0.75;
    head.castShadow = true;
    group.add(head);

    // Direction indicator (small box in front — shows facing direction)
    const noseGeo = new THREE.BoxGeometry(0.14, 0.14, 0.36);
    const noseMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const nose = new THREE.Mesh(noseGeo, noseMat);
    nose.position.set(0, 0.28, 0.52);
    group.add(nose);

    return group;
  }
}
