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

    // ADS (aim down sights)
    this.isAiming = false;

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

    // ADS toggle (right mouse button held)
    this.isAiming = input.isDown('Mouse2');

    const baseSpeed = this._isCrouching ? CROUCH_SPEED
                    : this._isSprinting ? SPRINT_SPEED
                    : MOVE_SPEED;
    const healPenalty = this.isHealing ? 0.70 : 1.0;
    const aimPenalty  = this.isAiming  ? 0.50 : 1.0;
    const speed = baseSpeed * this.speedMultiplier * healPenalty * aimPenalty;

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

  /** Build detailed PMC operator model from primitives */
  _buildMesh() {
    const group = new THREE.Group();

    // Legs (two cylinders)
    const legMat = new THREE.MeshLambertMaterial({ color: 0x2a3a2a });
    const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.5, 6), legMat);
    leftLeg.position.set(-0.15, -0.35, 0);
    leftLeg.castShadow = true;
    group.add(leftLeg);
    const rightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.5, 6), legMat);
    rightLeg.position.set(0.15, -0.35, 0);
    rightLeg.castShadow = true;
    group.add(rightLeg);

    // Boots
    const bootMat = new THREE.MeshLambertMaterial({ color: 0x1a1a1a });
    const leftBoot = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.24), bootMat);
    leftBoot.position.set(-0.15, -0.62, 0.04);
    group.add(leftBoot);
    const rightBoot = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.24), bootMat);
    rightBoot.position.set(0.15, -0.62, 0.04);
    group.add(rightBoot);

    // Body (torso — tactical vest, saturated green for low-poly look)
    const bodyGeo = new THREE.BoxGeometry(0.52, 0.65, 0.35);
    const bodyMat = new THREE.MeshLambertMaterial({ color: 0x4a7a4a, flatShading: true });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.05;
    body.castShadow = true;
    group.add(body);

    // Vest plate (front)
    const plateMat = new THREE.MeshLambertMaterial({ color: 0x5a8a5a, flatShading: true });
    const plate = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.4, 0.06), plateMat);
    plate.position.set(0, 0.08, 0.2);
    group.add(plate);

    // Arms
    const armMat = new THREE.MeshLambertMaterial({ color: 0x3a5a3a });
    const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.5, 6), armMat);
    leftArm.position.set(-0.34, 0.0, 0.08);
    leftArm.rotation.x = 0.3;
    leftArm.castShadow = true;
    group.add(leftArm);
    const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.5, 6), armMat);
    rightArm.position.set(0.34, 0.0, 0.08);
    rightArm.rotation.x = 0.3;
    rightArm.castShadow = true;
    group.add(rightArm);

    // Head
    const headGeo = new THREE.SphereGeometry(0.22, 5, 4);
    const headMat = new THREE.MeshLambertMaterial({ color: 0xf5c87a, flatShading: true });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 0.58;
    head.castShadow = true;
    group.add(head);

    // Helmet — low-poly faceted look
    const helmetGeo = new THREE.SphereGeometry(0.25, 6, 4, 0, Math.PI * 2, 0, Math.PI * 0.6);
    const helmetMat = new THREE.MeshLambertMaterial({ color: 0x4a5a3a, flatShading: true });
    const helmet = new THREE.Mesh(helmetGeo, helmetMat);
    helmet.position.y = 0.62;
    helmet.castShadow = true;
    group.add(helmet);

    // Weapon — low-poly gun model
    const gunMat  = new THREE.MeshLambertMaterial({ color: 0x2a2a2a, flatShading: true });
    const gunMat2 = new THREE.MeshLambertMaterial({ color: 0x3a3a3a, flatShading: true });
    const woodMat = new THREE.MeshLambertMaterial({ color: 0x6a4a2a, flatShading: true });

    // Receiver (main body)
    const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.10, 0.35), gunMat);
    receiver.position.set(0.20, 0.02, 0.32);
    group.add(receiver);

    // Barrel
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 0.35, 6), gunMat2);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0.20, 0.04, 0.58);
    group.add(barrel);

    // Barrel tip / muzzle brake
    const muzzle = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.02, 0.06, 6), gunMat);
    muzzle.rotation.x = Math.PI / 2;
    muzzle.position.set(0.20, 0.04, 0.76);
    group.add(muzzle);

    // Stock (wood)
    const stock = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 0.20), woodMat);
    stock.position.set(0.20, -0.01, 0.10);
    group.add(stock);

    // Magazine
    const magMat = new THREE.MeshLambertMaterial({ color: 0x1a1a1a, flatShading: true });
    const mag = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.18, 0.06), magMat);
    mag.rotation.z = 0.1; // slight angle
    mag.position.set(0.20, -0.10, 0.30);
    group.add(mag);

    // Sight / scope rail
    const sightMat = new THREE.MeshLambertMaterial({ color: 0x444444, flatShading: true });
    const sight = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.04, 0.12), sightMat);
    sight.position.set(0.20, 0.09, 0.36);
    group.add(sight);

    // Front sight post
    const fSight = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.05, 0.015), sightMat);
    fSight.position.set(0.20, 0.09, 0.50);
    group.add(fSight);

    // Muzzle flash point (glow)
    const flashMat = new THREE.MeshBasicMaterial({ color: 0xccdd44 });
    const flashPt = new THREE.Mesh(new THREE.SphereGeometry(0.025, 4, 4), flashMat);
    flashPt.position.set(0.20, 0.04, 0.80);
    group.add(flashPt);

    // Backpack
    const bpMat = new THREE.MeshLambertMaterial({ color: 0x4a5a3a });
    const backpack = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.4, 0.18), bpMat);
    backpack.position.set(0, 0.05, -0.26);
    backpack.castShadow = true;
    group.add(backpack);

    return group;
  }
}
