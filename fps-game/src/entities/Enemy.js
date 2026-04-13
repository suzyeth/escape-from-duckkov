import * as THREE from 'three';

// ── Constants ─────────────────────────────────────────────────────────────────

const RADIUS        = 0.50;
const HEIGHT        = 1.6;
const PATROL_SPEED  = 1.8;
const CHASE_SPEED   = 3.8;
const VISION_RANGE  = 18;
const VISION_FOV    = Math.PI * 0.65;  // ~117°
const HEARING_RANGE = 12;
const SHOOT_RANGE   = 16;
const SHOOT_INTERVAL = 1.3;
const SHOOT_DAMAGE   = 10;

// Elite variant stats
const ELITE_HP             = 160;
const ELITE_SHOOT_INTERVAL = 0.85;
const ELITE_SHOOT_DAMAGE   = 16;
const ELITE_VISION_RANGE   = 24;
const ELITE_SHOOT_RANGE    = 22;

/**
 * Enemy archetypes — define stats and behavior per type.
 * 'normal' and 'elite' are legacy types; new types extend the system.
 */
export const ENEMY_TYPES = {
  normal:  { hp: 80,  speed: 3.8, damage: 10, interval: 1.3,  range: 16, vision: 18, melee: false, color: 0x7a3a1e, headColor: 0xf0c060, label: '鸭卒' },
  elite:   { hp: 160, speed: 3.8, damage: 16, interval: 0.85, range: 22, vision: 24, melee: false, color: 0x3a0a0a, headColor: 0xcc9944, label: '★精英鸭卒' },
  rusher:  { hp: 60,  speed: 6.5, damage: 25, interval: 0.8,  range: 4,  vision: 20, melee: true,  color: 0x8a2a1a, headColor: 0xee8844, label: '暴走鸭' },
  tank:    { hp: 300, speed: 2.0, damage: 20, interval: 1.0,  range: 18, vision: 16, melee: false, color: 0x2a2a3a, headColor: 0x8888aa, label: '重甲鸭' },
  boss:    { hp: 600, speed: 3.0, damage: 30, interval: 0.6,  range: 25, vision: 30, melee: false, color: 0x1a0a1a, headColor: 0xff4444, label: 'BOSS 鸭王' },
};

const WALL_DIRS = [
  new THREE.Vector3( 1, 0,  0),
  new THREE.Vector3(-1, 0,  0),
  new THREE.Vector3( 0, 0,  1),
  new THREE.Vector3( 0, 0, -1),
];

export const STATE = { PATROL: 0, ALERT: 1, COMBAT: 2, SEARCH: 3, DEAD: 4 };

// Hoisted — avoids recreating array every frame inside _updatePatrolVisuals
const STATE_COLORS = [
  0x33cc55,   // PATROL  — green
  0xffaa00,   // ALERT   — orange
  0xff2222,   // COMBAT  — red
  0xffff00,   // SEARCH  — yellow
  0x444444,   // DEAD    — grey
];

/**
 * Enemy (Scav / 鸭卒)
 * Simple top-down AI: patrol waypoints → detect player → chase + shoot.
 */
export class Enemy {
  /**
   * @param {THREE.Scene}     scene
   * @param {THREE.Vector3}   spawnPos
   * @param {THREE.Vector3[]} waypoints
   * @param {boolean|string}  typeOrElite — enemy type key or boolean (legacy: true=elite)
   */
  constructor(scene, spawnPos, waypoints = [], typeOrElite = false) {
    this._scene     = scene;
    this.position   = spawnPos.clone();
    this.position.y = 0;
    this.waypoints  = waypoints;
    this._wpIdx     = 0;

    // Resolve type
    let typeKey = 'normal';
    if (typeOrElite === true) typeKey = 'elite';
    else if (typeof typeOrElite === 'string' && ENEMY_TYPES[typeOrElite]) typeKey = typeOrElite;
    this.enemyType  = typeKey;
    this.isElite    = typeKey === 'elite' || typeKey === 'boss';
    this.isMelee    = ENEMY_TYPES[typeKey].melee;
    this.isBoss     = typeKey === 'boss';

    const t = ENEMY_TYPES[typeKey];
    this.state      = STATE.PATROL;
    this.health     = t.hp;
    this.maxHealth  = t.hp;

    this._shootRange    = t.range;
    this._shootInterval = t.interval;
    this._shootDamage   = t.damage;
    this._visionRange   = t.vision;
    this._chaseSpeed    = t.speed;
    this._bodyColor     = t.color;
    this._headColor     = t.headColor;

    this._facing       = 0;          // Y-axis angle (radians)
    this._alertTimer   = 0;
    this._shootTimer   = Math.random() * this._shootInterval;
    this._prevState    = STATE.PATROL; // track state transitions for alert events
    this._hasAlerted   = false;        // elite: only alert once per raid

    // Search state: remembered last seen player position
    this._lastKnownPos  = null;
    this._lostSightTimer = 0;    // how long since losing visual on player
    this._searchTimer    = 0;    // countdown while searching at last known pos
    this._searchLookTimer = 0;   // rotate & look around sub-timer

    // Raycasters (reused)
    this._wallRay   = new THREE.Raycaster();
    this._visionRay = new THREE.Raycaster();

    // Pre-allocated scratch vectors — never allocate inside hot-path methods
    this._v1       = new THREE.Vector3();
    this._v2       = new THREE.Vector3();
    this._origin05 = new THREE.Vector3();

    this.mesh = this._buildMesh();
    scene.add(this.mesh);

    // Patrol visualisation (built after mesh so scene ref is ready)
    this._buildPatrolVisuals();
  }

  // ── Public ──────────────────────────────────────────────────────────────────

  get isAlive() { return this.state !== STATE.DEAD; }   // DEAD = 4

  /**
   * @param {number} dt
   * @param {THREE.Vector3} playerPos
   * @param {THREE.Object3D[]} collidables
   * @param {boolean} playerFiredRecently
   * @returns {{ shot:boolean, origin?:THREE.Vector3, dir?:THREE.Vector3, damage?:number }}
   */
  update(dt, playerPos, collidables, playerFiredRecently) {
    const dist       = this.position.distanceTo(playerPos);
    const canSee     = this._checkVision(playerPos, collidables);
    const canHear    = playerFiredRecently && dist < HEARING_RANGE;

    // Track last known position whenever visible
    if (canSee) {
      this._lastKnownPos  = playerPos.clone();
      this._lostSightTimer = 0;
    } else if (this.state === STATE.COMBAT) {
      this._lostSightTimer += dt;
    }

    // ── State machine ───────────────────────────────────────────────────────
    if (this.state === STATE.PATROL) {
      if (canSee || canHear) {
        this.state = STATE.COMBAT;
        if (canHear && !canSee) this._lastKnownPos = playerPos.clone();
      }

    } else if (this.state === STATE.ALERT) {
      this._alertTimer -= dt;
      if (canSee)                     this.state = STATE.COMBAT;
      else if (this._alertTimer <= 0) this.state = STATE.PATROL;

    } else if (this.state === STATE.COMBAT) {
      if (canSee) {
        this._lostSightTimer = 0;
      } else if (this._lostSightTimer > 2.5 && this._lastKnownPos) {
        // Lost sight → go investigate last known position
        this.state        = STATE.SEARCH;
        this._searchTimer = 5.0;
        this._searchLookTimer = 0;
      }

    } else if (this.state === STATE.SEARCH) {
      if (canSee) {
        this.state = STATE.COMBAT;    // spotted again → back to combat
      } else {
        this._searchTimer -= dt;
        if (this._searchTimer <= 0) {
          this.state = STATE.PATROL;  // gave up searching → patrol
        }
      }
    }

    // ── Behaviour ───────────────────────────────────────────────────────────
    // Detect elite transitioning into combat for the first time this cycle
    const justEnteredCombat = this.isElite
      && !this._hasAlerted
      && this._prevState !== STATE.COMBAT
      && this.state === STATE.COMBAT;
    if (justEnteredCombat) this._hasAlerted = true;
    this._prevState = this.state;

    let shot = { shot: false };

    if (this.state === STATE.PATROL) {
      this._doPatrol(dt, collidables);

    } else if (this.state === STATE.ALERT) {
      this._facePos(playerPos);

    } else if (this.state === STATE.COMBAT) {
      this._doCombat(dt, playerPos, collidables);
      shot = this._tryShoot(dt, playerPos, collidables);

    } else if (this.state === STATE.SEARCH) {
      this._doSearch(dt, collidables);
    }

    this._syncMesh();
    return { ...shot, eliteAlert: justEnteredCombat };
  }

  takeDamage(amount) {
    if (!this.isAlive) return;
    this.health = Math.max(0, this.health - amount);
    // Switch to combat on hit regardless of vision
    if (this.state === STATE.PATROL || this.state === STATE.ALERT) {
      this.state = STATE.COMBAT;
    }
    // Hit flash — briefly go white
    this._flashHit();
    if (this.health <= 0) this._die();
  }

  /** Flash all mesh materials white via emissive — no clones, no leaks */
  _flashHit() {
    if (this._flashing) return; // debounce rapid hits
    this._flashing = true;
    this.mesh.traverse(child => {
      if (child.isMesh && child !== this._hpBar && child.material.emissive) {
        child.material.emissive.set(0xffffff);
      }
    });
    setTimeout(() => {
      this.mesh.traverse(child => {
        if (child.isMesh && child !== this._hpBar && child.material.emissive) {
          child.material.emissive.set(0x000000);
        }
      });
      this._flashing = false;
    }, 80);
  }

  // ── Private ─────────────────────────────────────────────────────────────────

  _doPatrol(dt, collidables) {
    if (this.waypoints.length === 0) return;
    const wp   = this.waypoints[this._wpIdx];
    const dist = this.position.distanceTo(wp);
    if (dist < 0.6) {
      this._wpIdx = (this._wpIdx + 1) % this.waypoints.length;
      return;
    }
    this._facePos(wp);
    this._moveTo(wp, PATROL_SPEED, dt, collidables);
  }

  _doSearch(dt, collidables) {
    if (!this._lastKnownPos) return;
    const dist = this.position.distanceTo(this._lastKnownPos);

    if (dist > 1.2) {
      // Move toward last known position
      this._facePos(this._lastKnownPos);
      this._moveTo(this._lastKnownPos, CHASE_SPEED * 0.8, dt, collidables);
    } else {
      // Arrived — rotate and scan (look around every ~1.5 s)
      this._searchLookTimer -= dt;
      if (this._searchLookTimer <= 0) {
        this._facing        += (Math.random() - 0.5) * Math.PI * 1.2;
        this._searchLookTimer = 1.0 + Math.random() * 0.8;
      }
    }
  }

  _doCombat(dt, playerPos, collidables) {
    const dist = this.position.distanceTo(playerPos);
    this._facePos(playerPos);

    if (this.isMelee) {
      // Melee: always charge toward player
      this._moveTo(playerPos, this._chaseSpeed, dt, collidables);
    } else if (dist > this._shootRange * 0.55) {
      this._moveTo(playerPos, this._chaseSpeed, dt, collidables);
    } else if (dist < this._shootRange * 0.25) {
      this._v2.subVectors(this.position, playerPos).normalize().add(this.position);
      this._moveTo(this._v2, PATROL_SPEED, dt, collidables);
    }
  }

  _tryShoot(dt, playerPos, collidables) {
    this._shootTimer = Math.max(0, this._shootTimer - dt);
    if (this._shootTimer > 0) return { shot: false };
    const dist = this.position.distanceTo(playerPos);
    if (dist > this._shootRange) return { shot: false };

    // Melee attack — direct damage when close enough
    if (this.isMelee) {
      if (dist < 3.5) {
        this._shootTimer = this._shootInterval;
        return { shot: true, origin: this.position.clone(), dir: this._v1.clone(), damage: this._shootDamage, isMelee: true };
      }
      return { shot: false };
    }

    // Wall occlusion check before firing — reuse scratch vectors
    this._origin05.set(this.position.x, 0.5, this.position.z);
    this._v1.set(playerPos.x - this._origin05.x, 0, playerPos.z - this._origin05.z);
    const wallDist = this._v1.length();
    this._v1.normalize();
    this._visionRay.set(this._origin05, this._v1);
    this._visionRay.far = wallDist - 0.2;
    const wallHits = this._visionRay.intersectObjects(collidables, false);
    if (wallHits.some(h => h.object.name !== 'Floor')) return { shot: false };

    this._shootTimer = this._shootInterval + (Math.random() * 0.5 - 0.25);

    // Clone dir/origin only on actual shot (fire-rate gated — acceptable allocation)
    this._v2.copy(this._v1);
    const basSpread = this.isElite ? 0.04 : 0.08;
    const distFactor = Math.max(0.6, dist / this._shootRange); // closer = worse aim
    const spread = basSpread * distFactor;
    this._v2.x += (Math.random() - 0.5) * spread;
    this._v2.z += (Math.random() - 0.5) * spread;
    this._v2.normalize();

    return { shot: true, origin: this._origin05.clone(), dir: this._v2.clone(), damage: this._shootDamage };
  }

  _checkVision(playerPos, collidables) {
    this._origin05.set(this.position.x, 0.5, this.position.z);
    this._v1.set(playerPos.x - this._origin05.x, 0, playerPos.z - this._origin05.z);
    const dist = this._v1.length();
    if (dist > this._visionRange) return false;

    // Field of view check
    this._v1.normalize();
    this._v2.set(Math.sin(this._facing), 0, Math.cos(this._facing));
    if (this._v2.dot(this._v1) < Math.cos(VISION_FOV / 2)) return false;

    // Occlusion check
    this._visionRay.set(this._origin05, this._v1);
    this._visionRay.far = dist - 0.1;
    const hits = this._visionRay.intersectObjects(collidables, false);
    return hits.every(h => h.object.name === 'Floor');
  }

  _facePos(target) {
    const dx = target.x - this.position.x;
    const dz = target.z - this.position.z;
    this._facing = Math.atan2(dx, dz);
  }

  _moveTo(target, speed, dt, collidables) {
    this._v1.set(target.x - this.position.x, 0, target.z - this.position.z);
    const len = this._v1.length();
    if (len < 0.01) return;
    this._v1.normalize().multiplyScalar(speed * dt);
    this.position.add(this._v1);
    this.position.y = 0;
    this._resolveWalls(collidables);
  }

  _resolveWalls(collidables) {
    // Compute origin once — same for all 4 directions
    this._origin05.set(this.position.x, 0.5, this.position.z);
    this._wallRay.near = 0;
    this._wallRay.far  = RADIUS + 0.08;
    for (const dir of WALL_DIRS) {
      this._wallRay.set(this._origin05, dir);
      const hits = this._wallRay.intersectObjects(collidables, false);
      if (hits.length > 0) {
        const overlap = RADIUS - hits[0].distance;
        if (overlap > 0) {
          this.position.x -= dir.x * overlap;
          this.position.z -= dir.z * overlap;
        }
      }
    }
  }

  _die() {
    this.state = STATE.DEAD;
    // Lay flat (rotate 90° around Z)
    this.mesh.rotation.z = Math.PI / 2;
    this.mesh.position.y = 0.15;
    // Grey out
    this.mesh.traverse(child => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.color.set(0x444444);
      }
    });
    // Hide patrol visualisation
    this._hidePatrolVisuals();
  }

  _syncMesh() {
    if (!this.isAlive) return;
    this.mesh.position.set(this.position.x, HEIGHT / 2, this.position.z);
    this.mesh.rotation.y = this._facing;

    // Scale health bar
    const pct = this.health / this.maxHealth;
    if (this._hpBar) {
      this._hpBar.scale.x  = Math.max(0.001, pct);
      this._hpBar.position.x = (pct - 1) * 0.5;
    }

    // Update patrol visualisation
    this._updatePatrolVisuals();
  }

  // ── Patrol Visualisation ────────────────────────────────────────────────────

  /** Build all patrol-range debug visuals once at spawn. */
  _buildPatrolVisuals() {
    if (this.waypoints.length === 0) return;

    const Y = 0.04; // float just above ground

    // ── 1. Patrol route loop line ─────────────────────────────────────────────
    const routePts = [...this.waypoints, this.waypoints[0]].map(
      p => new THREE.Vector3(p.x, Y, p.z)
    );
    const routeGeo = new THREE.BufferGeometry().setFromPoints(routePts);
    const routeMat = new THREE.LineBasicMaterial({
      color: 0x33cc55, transparent: true, opacity: 0.50, depthWrite: false,
    });
    this._patrolLine = new THREE.Line(routeGeo, routeMat);
    this._patrolLine.renderOrder = 1;
    this._scene.add(this._patrolLine);

    // ── 2. Waypoint diamond markers ───────────────────────────────────────────
    this._waypointMarkers = this.waypoints.map((wp, idx) => {
      const geo = new THREE.PlaneGeometry(0.55, 0.55);
      // Rotate plane to make a diamond (45°)
      geo.rotateZ(Math.PI / 4);
      const mat = new THREE.MeshBasicMaterial({
        color:       idx === 0 ? 0x00ff88 : 0x22aa44,
        transparent: true,
        opacity:     0.65,
        depthWrite:  false,
        side:        THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(wp.x, Y, wp.z);
      mesh.renderOrder = 2;
      this._scene.add(mesh);
      return mesh;
    });

    // ── 3. "Next target" bright marker (moves to current waypoint) ───────────
    const tGeo = new THREE.PlaneGeometry(0.7, 0.7);
    tGeo.rotateZ(Math.PI / 4);
    const tMat = new THREE.MeshBasicMaterial({
      color: 0xffff00, transparent: true, opacity: 0.85, depthWrite: false, side: THREE.DoubleSide,
    });
    this._targetMarker = new THREE.Mesh(tGeo, tMat);
    this._targetMarker.rotation.x = -Math.PI / 2;
    this._targetMarker.renderOrder = 3;
    this._scene.add(this._targetMarker);

    // ── 4. State ring (circle around enemy) ───────────────────────────────────
    const segs   = 36;
    const RING_R = 1.1;   // visual radius (not a gameplay radius)
    const circlePts = Array.from({ length: segs + 1 }, (_, i) => {
      const a = (i / segs) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(a) * RING_R, Y, Math.sin(a) * RING_R);
    });
    const ringGeo = new THREE.BufferGeometry().setFromPoints(circlePts);
    const ringMat = new THREE.LineBasicMaterial({
      color: 0x33cc55, transparent: true, opacity: 0.80, depthWrite: false,
    });
    this._stateRing = new THREE.Line(ringGeo, ringMat);
    this._stateRing.renderOrder = 2;
    this._scene.add(this._stateRing);
  }

  /** Called every frame from _syncMesh to keep visuals in sync. */
  _updatePatrolVisuals() {
    if (this._stateRing) {
      this._stateRing.position.set(this.position.x, 0, this.position.z);
      this._stateRing.material.color.setHex(STATE_COLORS[this.state]);
    }

    // Route line colour also reflects state
    if (this._patrolLine) {
      this._patrolLine.material.color.setHex(
        this.state === STATE.PATROL ? 0x33cc55
          : this.state === STATE.ALERT  ? 0xffaa00
          : 0xff2222
      );
    }

    // Move next-target marker to current waypoint only while patrolling
    if (this._targetMarker) {
      if (this.state === STATE.PATROL && this.waypoints.length > 0) {
        const wp = this.waypoints[this._wpIdx];
        this._targetMarker.position.set(wp.x, 0.04, wp.z);
        this._targetMarker.visible = true;
        // Pulse scale
        const pulse = 0.8 + Math.sin(performance.now() * 0.004) * 0.2;
        this._targetMarker.scale.setScalar(pulse);
      } else {
        this._targetMarker.visible = false;
      }
    }
  }

  /** Hide all visuals when enemy dies. */
  _hidePatrolVisuals() {
    if (this._patrolLine)    this._patrolLine.visible    = false;
    if (this._stateRing)     this._stateRing.visible     = false;
    if (this._targetMarker)  this._targetMarker.visible  = false;
    this._waypointMarkers?.forEach(m => { m.visible = false; });
  }

  _buildMesh() {
    const g = new THREE.Group();
    const elite = this.isElite;
    const bodyC = this._bodyColor;
    const headC = this._headColor;
    const isBoss = this.isBoss;

    // Legs
    const legMat = new THREE.MeshLambertMaterial({ color: elite ? 0x2a1a1a : 0x4a3a2a });
    const ll = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.12, 0.45, 6), legMat);
    ll.position.set(-0.12, -0.32, 0); ll.castShadow = true; g.add(ll);
    const rl = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.12, 0.45, 6), legMat);
    rl.position.set(0.12, -0.32, 0); rl.castShadow = true; g.add(rl);

    // Body
    const bodyW = elite ? 0.55 : 0.46;
    const bodyH = elite ? 0.70 : 0.58;
    const bMat = new THREE.MeshLambertMaterial({ color: bodyC, flatShading: true });
    const body = new THREE.Mesh(new THREE.BoxGeometry(bodyW, bodyH, 0.30), bMat);
    body.position.y = 0.05; body.castShadow = true; g.add(body);

    // Vest/armor (elite only)
    if (elite) {
      const vestMat = new THREE.MeshLambertMaterial({ color: 0x2a2a2a });
      const vest = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.45, 0.08), vestMat);
      vest.position.set(0, 0.08, 0.18); g.add(vest);
    }

    // Arms with weapon
    const armMat = new THREE.MeshLambertMaterial({ color: bodyC, flatShading: true });
    const la = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.42, 6), armMat);
    la.position.set(-(bodyW/2 + 0.06), 0.0, 0.06); la.rotation.x = 0.4; la.castShadow = true; g.add(la);
    const ra = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.42, 6), armMat);
    ra.position.set(bodyW/2 + 0.06, 0.0, 0.06); ra.rotation.x = 0.4; ra.castShadow = true; g.add(ra);

    // Weapon — melee types get a blade, ranged get a gun
    if (this.isMelee) {
      const bladeMat = new THREE.MeshLambertMaterial({ color: 0xcccccc });
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.45), bladeMat);
      blade.position.set(bodyW/2 + 0.06, -0.05, 0.35); g.add(blade);
      // Red glow on blade tip (attack indicator)
      const tipMat = new THREE.MeshBasicMaterial({ color: 0xff2222, toneMapped: false });
      const tip = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.06), tipMat);
      tip.position.set(bodyW/2 + 0.06, -0.05, 0.60); g.add(tip);
    } else {
      const gunMat = new THREE.MeshLambertMaterial({ color: 0x2a2a2a });
      const gun = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.06, elite ? 0.50 : 0.40), gunMat);
      gun.position.set(bodyW/2 + 0.06, -0.05, 0.35); g.add(gun);
    }

    // Head
    const headR = elite ? 0.26 : 0.22;
    const hMat = new THREE.MeshLambertMaterial({ color: headC, flatShading: true });
    const head = new THREE.Mesh(new THREE.SphereGeometry(headR, 5, 4), hMat);
    head.position.y = elite ? 0.68 : 0.58; head.castShadow = true; g.add(head);

    // Boss crown (after head so headR is defined)
    if (isBoss) {
      const crownMat = new THREE.MeshBasicMaterial({ color: 0xffdd00, toneMapped: false });
      const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.28, 0.15, 5), crownMat);
      crown.position.y = (elite ? 0.68 : 0.58) + headR + 0.1;
      g.add(crown);
    }

    // Headgear
    if (elite) {
      // Beret — bright red for visibility
      const beretMat = new THREE.MeshLambertMaterial({ color: 0xcc0000 });
      const beret = new THREE.Mesh(new THREE.SphereGeometry(0.30, 8, 4, 0, Math.PI * 2, 0, Math.PI * 0.5), beretMat);
      beret.position.y = 0.74; g.add(beret);
      // Shoulder badge — larger
      const badgeMat = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
      const badge = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.02), badgeMat);
      badge.position.set(bodyW/2 + 0.01, 0.22, 0.16); g.add(badge);
    } else {
      // Bandana
      const bandMat = new THREE.MeshLambertMaterial({ color: 0x6a4a2a });
      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.23, 0.08, 8), bandMat);
      band.position.y = 0.54; g.add(band);
    }

    // Red armbands (scav) or white stripe (elite) — visual distinctiveness
    if (elite) {
      const stripeMat = new THREE.MeshBasicMaterial({ color: 0xeeeeee });
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.35, 0.02), stripeMat);
      stripe.position.set(0, 0.08, 0.19); g.add(stripe);
    } else {
      const bandMat2 = new THREE.MeshBasicMaterial({ color: 0xff2222 });
      const lBand = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.10, 0.06, 6), bandMat2);
      lBand.position.set(-(bodyW/2 + 0.06), 0.15, 0); g.add(lBand);
      const rBand = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.10, 0.06, 6), bandMat2);
      rBand.position.set(bodyW/2 + 0.06, 0.15, 0); g.add(rBand);
    }

    // Facing indicator (gun barrel glow) — larger for readability
    const nMat = new THREE.MeshBasicMaterial({ color: elite ? 0xffcc00 : 0xff4020 });
    const nose = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.12), nMat);
    nose.position.set(bodyW/2 + 0.06, -0.05, elite ? 0.62 : 0.52); g.add(nose);

    // HP bar
    const barY = elite ? 1.35 : 1.15;
    const barW = elite ? 1.2 : 0.9;
    const bgMat = new THREE.MeshBasicMaterial({ color: elite ? 0x1a0000 : 0x220000 });
    g.add(new THREE.Mesh(new THREE.BoxGeometry(barW, 0.08, 0.04), bgMat)).position.set(0, barY, 0);
    const fMat = new THREE.MeshBasicMaterial({ color: elite ? 0xffaa00 : 0xff3333 });
    this._hpBar = new THREE.Mesh(new THREE.BoxGeometry(barW, 0.08, 0.05), fMat);
    this._hpBar.position.set(0, barY, 0); g.add(this._hpBar);

    return g;
  }
}
