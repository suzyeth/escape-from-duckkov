import * as THREE from 'three';

/**
 * Level — 150×150 Extraction Map
 *
 * Zones (top-down, Y-up):
 *   NW  Factory Area      (-55…-15, -70…-20)
 *   NE  Warehouse         ( 15… 65, -70…-20)
 *   C   Central Square    (-20… 20, -20… 20)
 *   SW  Apartment Ruins   (-65…-15,  20… 70)
 *   SE  Parking Lot       ( 10… 65,  20… 65)
 *   S   Basement Entrance (-20… 10,  55… 75)
 *
 * Extraction Points:
 *   NORTH  (0, -73)   — always open, 10 s hold
 *   EAST   (73, 0)    — always open, 10 s hold
 *   BASEMENT (-30, 65) — requires key_basement
 *
 * Spawn Points (player):  4 corners, random each raid
 */
export class Level {
  constructor(scene) {
    this._scene = scene;

    /** @type {THREE.Mesh[]} */
    this.collidables = [];

    /**
     * Registered buildings for the roof-reveal system.
     * @type {{ roof: THREE.Mesh, minX: number, maxX: number, minZ: number, maxZ: number }[]}
     */
    this._buildings = [];

    /** @type {{ center: THREE.Vector3, radius: number, label: string, requiresKey?: string }[]} */
    this.extractionPoints = [];

    /**
     * Door slot positions for DoorSystem to populate.
     * Each entry matches the gap in the building's front wall.
     * @type {{ cx:number, cz:number, gapW:number, h:number, color:number, name:string }[]}
     */
    this.doorSlots = [];

    /** @type {THREE.Vector3[]} */
    this.playerSpawnPoints = [
      new THREE.Vector3(-62, 0, -64), // NW — west of factory, clear open ground
      new THREE.Vector3( 63, 0, -64), // NE — east of warehouse, clear open ground
      new THREE.Vector3(-65, 0,  62), // SW — south of apartments, clear open ground
      new THREE.Vector3( 65, 0,  62), // SE — east of parking shed, clear open ground
      new THREE.Vector3(  0, 0, -68), // N-center — gap between factory & warehouse
      new THREE.Vector3(  0, 0,  70), // S-center — south of basement approach
    ];

    this._buildLighting();
    this._buildGround();
    this._buildBoundaryWalls();
    this._buildFactoryZone();
    this._buildWarehouseZone();
    this._buildCentralSquare();
    this._buildApartmentZone();
    this._buildParkingZone();
    this._buildBasementZone();
    this._buildExtractionPoints();

    this._buildEnvironmentProps();
    this._buildDustParticles();

    scene.background = new THREE.Color(0x7a9aaa);   // overcast sky blue-grey
    scene.fog        = new THREE.FogExp2(0x7a9aaa, 0.004); // lighter, less dense fog
  }

  // ── Lighting ──────────────────────────────────────────────────────────────

  _buildLighting() {
    // Bright ambient — no dark corners
    this._scene.add(new THREE.AmbientLight(0xccdde8, 1.6));

    const sun = new THREE.DirectionalLight(0xfff4e0, 2.4);
    sun.position.set(40, 80, 40);
    sun.castShadow = true;
    sun.shadow.mapSize.set(4096, 4096);
    sun.shadow.camera.left   = -100;
    sun.shadow.camera.right  =  100;
    sun.shadow.camera.top    =  100;
    sun.shadow.camera.bottom = -100;
    sun.shadow.camera.near   = 1;
    sun.shadow.camera.far    = 250;
    sun.shadow.bias = -0.0005;
    this._scene.add(sun);

    // Secondary fill from opposite side
    const fill = new THREE.DirectionalLight(0x88aacc, 0.9);
    fill.position.set(-50, 40, -30);
    this._scene.add(fill);

    // Warm bounce from ground
    const bounce = new THREE.DirectionalLight(0xddcc99, 0.4);
    bounce.position.set(0, -1, 0);
    this._scene.add(bounce);
  }

  // ── Ground ────────────────────────────────────────────────────────────────

  _buildGround() {
    const geo  = new THREE.PlaneGeometry(160, 160);
    const mat  = new THREE.MeshLambertMaterial({ color: 0x5a5850 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    mesh.name = 'Floor';
    this._scene.add(mesh);
    this.collidables.push(mesh);

    // Zone floor tints
    const zones = [
      { x: -35, z: -45, w: 40, d: 50, c: 0x35312a }, // Factory — dark steel
      { x:  40, z: -45, w: 50, d: 50, c: 0x1a2228 }, // Warehouse — dark blue-grey
      { x:   0, z:   0, w: 40, d: 40, c: 0x4a4a3a }, // Central — lighter tan
      { x: -40, z:  45, w: 50, d: 50, c: 0x332e28 }, // Apartments — dark brown
      { x:  37, z:  42, w: 55, d: 45, c: 0x5a5a4a }, // Parking — light grey concrete
      { x:  -5, z:  65, w: 30, d: 20, c: 0x1e1e22 }, // Basement entrance — very dark
    ];
    zones.forEach(({ x, z, w, d, c }) => {
      const g = new THREE.PlaneGeometry(w, d);
      const m = new THREE.MeshLambertMaterial({ color: c });
      const p = new THREE.Mesh(g, m);
      p.rotation.x = -Math.PI / 2;
      p.position.set(x, 0.005, z);
      p.receiveShadow = true;
      this._scene.add(p);
    });
  }

  // ── Boundary walls ────────────────────────────────────────────────────────

  _buildBoundaryWalls() {
    const H = 3, C = 0x6a6258;
    // North, South, West, East — with gaps for extraction exits
    this._wall(  0, -76, 80, 0.6, H, C, 'BoundN_W');  // left half N
    this._wall( 50, -76, 40, 0.6, H, C, 'BoundN_E');  // right half N (gap near 0)
    this._wall(  0,  76, 160, 0.6, H, C, 'BoundS');
    this._wall(-76,   0, 0.6, 160, H, C, 'BoundW');
    this._wall( 76,  20, 0.6, 110, H, C, 'BoundE_S'); // gap near y=0
    this._wall( 76, -40, 0.6,  70, H, C, 'BoundE_N');
  }

  // ── NW: Factory Zone ──────────────────────────────────────────────────────

  _buildFactoryZone() {
    const C = 0x5a5248;
    // Main factory building (hollow: 4 walls + roof)
    this._building(-40, -50, 32, 20, 3.0, C, 'Factory');
    // Smaller outbuilding
    this._building(-20, -60, 14, 10, 2.5, 0x706858, 'FactoryOut');
    // Chimney stub
    this._box(-50, -44, 2, 2, 8, 0x3a3530, 'Chimney');
    // Crates near factory
    [[-28,-42],[-30,-42],[-28,-40]].forEach(([x,z],i)=>this._box(x,z,1,1,1,0x8b6f47,`FactCrate${i}`));
    // Metal barriers
    [[-18,-48],[-14,-48],[-10,-48]].forEach(([x,z],i)=>this._box(x,z,2.5,0.9,0.5,0x707060,`FactBar${i}`));
    // Zone divider wall (partial, with gaps)
    this._wall(-10, -45, 0.5, 20, 3, C, 'FactDiv1');
    this._wall(-10, -22, 0.5,  8, 3, C, 'FactDiv2');
  }

  // ── NE: Warehouse Zone ────────────────────────────────────────────────────

  _buildWarehouseZone() {
    const C = 0x4e5258;
    this._building(40, -50, 40, 28, 3.2, C, 'Warehouse');
    // Dock area
    this._box(58, -38, 14, 0.4, 3, C, 'DockWall');
    // Stacked crates
    [[24,-42],[26,-42],[24,-40],[26,-40],[25,-38]].forEach(([x,z],i)=>this._box(x,z,1.8,1.8,1.8,0x7a6040,`WhCrate${i}`));
    // Guard post
    this._box(18, -58, 3, 3, 2.5, 0x5a5248, 'GuardPost');
    // Fence line
    for (let i = 0; i < 5; i++) this._box(20 + i*6, -70, 0.3, 2.5, 1.2, 0x3a3a3a, `Fence${i}`);
  }

  // ── C: Central Square ─────────────────────────────────────────────────────

  _buildCentralSquare() {
    // Concrete fountain / monument (non-collidable visual)
    const geo = new THREE.CylinderGeometry(3, 3.5, 1.2, 8);
    const mat = new THREE.MeshLambertMaterial({ color: 0x888070 });
    const fnt = new THREE.Mesh(geo, mat);
    fnt.position.set(0, 0.6, 0);
    fnt.castShadow = true;
    this._scene.add(fnt);
    this.collidables.push(fnt);

    // Benches / barriers around square
    const bPos = [[8,8],[8,-8],[-8,8],[-8,-8],[0,12],[0,-12],[12,0],[-12,0]];
    bPos.forEach(([x,z],i)=>this._box(x,z,2.5,0.8,0.5,0x808070,`SqBar${i}`));

    // Burnt-out vehicle (asymmetric cover)
    this._box(5, -5, 4, 1.2, 2, 0x2a2a2a, 'BurntCar1');
    this._box(-6, 6, 4, 1.2, 2, 0x2a2a2a, 'BurntCar2');

    // Sandbag wall
    [[-16,-16],[-16,-12],[-16,-8]].forEach(([x,z],i)=>this._box(x,z,0.6,0.8,2,0x9a8a6a,`Sand${i}`));
  }

  // ── SW: Apartment Ruins ───────────────────────────────────────────────────

  _buildApartmentZone() {
    const C = 0x5c5040;
    // Apartment block A
    this._building(-48, 40, 28, 18, 3.0, C, 'AptA');
    // Apartment block B (more damaged — open walls)
    this._wall(-35, 56, 16, 0.5, 2.5, C, 'AptB_N');
    this._wall(-43, 62, 0.5, 12, 2.5, C, 'AptB_W');
    this._wall(-27, 60, 0.5, 8,  2.5, C, 'AptB_E');
    // Rubble piles
    [[-55,28],[-52,30],[-48,27],[-40,35],[-32,30]].forEach(([x,z],i)=>
      this._box(x,z,1.5+Math.random(),0.7,1.5+Math.random(),0x6a5a48,`Rubble${i}`)
    );
    // Street barriers
    [[-20,28],[-14,28],[-8,28]].forEach(([x,z],i)=>this._box(x,z,2.5,0.9,0.5,0x707060,`AptBar${i}`));
    // Abandoned car
    this._box(-30, 44, 4, 1.5, 2, 0x3a3030, 'AptCar');
  }

  // ── SE: Parking Lot ───────────────────────────────────────────────────────

  _buildParkingZone() {
    // Car wrecks as cover
    const carPos = [[20,30],[28,30],[36,30],[44,30],[52,30],[20,40],[36,45],[52,42],[44,55],[20,55]];
    carPos.forEach(([x,z],i)=>this._box(x,z,4+(i%2),1.4,2,0x2e2e2e,`Car${i}`));
    // Concrete dividers
    [[24,36],[32,36],[40,36],[48,36]].forEach(([x,z],i)=>this._box(x,z,0.3,0.7,6,0x807060,`ParkDiv${i}`));
    // Guard booth at entrance
    this._building(12, 25, 5, 5, 2.2, 0x6c6258, 'ParkBooth');
    // Storage shed
    this._building(56, 50, 12, 10, 2.2, 0x5e6050, 'ParkShed');
  }

  // ── S: Basement Entrance ──────────────────────────────────────────────────

  _buildBasementZone() {
    const C = 0x3a3a40;

    // Stairway walls leading down
    this._wall(-5, 60, 0.5, 12, 2.5, C, 'BasN_W');
    this._wall( 5, 60, 0.5, 12, 2.5, C, 'BasN_E');
    this._wall( 0, 66, 12, 0.5, 2.5, C, 'BasS');

    // Locked door marker (darker)
    const dGeo = new THREE.BoxGeometry(3, 2.5, 0.2);
    const dMat = new THREE.MeshLambertMaterial({ color: 0x1a1a2a });
    const door = new THREE.Mesh(dGeo, dMat);
    door.position.set(0, 1.25, 54.5);
    this._scene.add(door);

    // Key lock icon (small orange box)
    const lGeo = new THREE.BoxGeometry(0.3, 0.3, 0.1);
    const lMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
    const lock = new THREE.Mesh(lGeo, lMat);
    lock.position.set(0.8, 1.2, 54.4);
    this._scene.add(lock);

    // ── Basement Interior (underground bunker) ────────────────────────────
    // L-shaped bunker south of the stairway entrance
    // Main hall: -15 to 15, z: 68 to 88
    // Side room: -15 to -5, z: 82 to 96

    // Main hall
    this._building(-0, 78, 30, 20, 2.5, 0x2a2a32, 'BasMain');

    // Side room (storage)
    this._building(-10, 92, 14, 10, 2.5, 0x28282e, 'BasStorage');

    // Connecting corridor between main hall and side room
    this._wall(-17, 85, 0.5, 6, 2.5, C, 'BasCorrW');
    this._wall( -3, 85, 0.5, 6, 2.5, C, 'BasCorrE');

    // Interior details — main hall
    // Operating tables / workbenches
    this._box(-8, 74, 4, 0.8, 1.5, 0x4a4a50, 'BasTable1');
    this._box( 8, 74, 4, 0.8, 1.5, 0x4a4a50, 'BasTable2');
    // Filing cabinets along wall
    this._box(-12, 70, 1.5, 1.8, 1.2, 0x3a4a3a, 'BasCabinet1');
    this._box(-12, 73, 1.5, 1.8, 1.2, 0x3a4a3a, 'BasCabinet2');
    // Crate stack
    this._box(12, 82, 2, 2, 2, 0x6a5a3a, 'BasCrate1');
    this._box(10, 84, 1.5, 1.5, 1.5, 0x7a6a4a, 'BasCrate2');

    // Interior details — side room (high-value loot area)
    // Weapon rack
    this._box(-14, 90, 1, 2.2, 3, 0x3a3a3a, 'BasWeaponRack');
    // Safe (small, valuable)
    this._box(-6, 94, 1.2, 1.2, 1.2, 0x2a2a2a, 'BasSafe');
    // Ammo boxes
    this._box(-12, 96, 1.5, 0.8, 1, 0x5a6a3a, 'BasAmmo1');
    this._box(-10, 96, 1.5, 0.8, 1, 0x5a6a3a, 'BasAmmo2');
  }

  // ── Extraction points ────────────────────────────────────────────────────

  _buildExtractionPoints() {
    // NORTH exit
    this._makeExtraction( 0, -73, 'NORTH出口', null);
    // EAST exit
    this._makeExtraction(73,   0, 'EAST出口',  null);
    // BASEMENT (key required)
    this._makeExtraction(-5,  66, '地下室',    'key_basement');
  }

  _makeExtraction(x, z, label, requiresKey) {
    const geo = new THREE.PlaneGeometry(6, 6);
    const mat = new THREE.MeshBasicMaterial({
      color:       requiresKey ? 0xffaa00 : 0x00ff80,
      transparent: true,
      opacity:     0.28,
      depthWrite:  false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(x, 0.01, z);
    mesh.name = `Extraction_${label}`;
    this._scene.add(mesh);

    const sprite = this._makeTextSprite(label, requiresKey ? '#ffaa00' : '#00ff80');
    sprite.position.set(x, 3, z);
    this._scene.add(sprite);

    this.extractionPoints.push({
      center:      new THREE.Vector3(x, 0, z),
      radius:      3.5,
      label,
      requiresKey,
    });
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  /**
   * Hollow building: 4 walls + interior floor + roof-reveal roof.
   *
   * The roof starts fully opaque (player outside → can't see in).
   * When the player enters the building footprint, `updateRoofs()` fades
   * the roof out so the interior becomes visible.
   *
   * Front wall has a doorway gap.
   */
  _building(cx, cz, w, d, h, color, name) {
    const hw = w / 2, hd = d / 2;
    // Walls
    this._wall(cx,      cz - hd, w,   0.5, h, color, `${name}_WallBack`);
    this._wall(cx - hw, cz,      0.5, d,   h, color, `${name}_WallLeft`);
    this._wall(cx + hw, cz,      0.5, d,   h, color, `${name}_WallRight`);
    const gapW  = Math.min(3, w * 0.25);
    const sideW = (w - gapW) / 2;
    this._wall(cx - sideW / 2 - gapW / 2, cz + hd, sideW, 0.5, h, color, `${name}_WallFrontL`);
    this._wall(cx + sideW / 2 + gapW / 2, cz + hd, sideW, 0.5, h, color, `${name}_WallFrontR`);

    // Record door slot (gap in front wall, centered on cx at z = cz + hd)
    this.doorSlots.push({ cx, cz: cz + hd, gapW, h, color, name: `${name}_Door` });

    // Windows on side walls (dark recesses)
    const winMat = new THREE.MeshLambertMaterial({ color: 0x0a0a12 });
    const winCount = Math.max(1, Math.floor(d / 6));
    for (let wi = 0; wi < winCount; wi++) {
      const wz = cz - hd + (wi + 1) * (d / (winCount + 1));
      // Left wall windows (flush with outer face)
      const wl = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.8, 0.7), winMat);
      wl.position.set(cx - hw - 0.26, h * 0.5, wz);
      this._scene.add(wl);
      // Right wall windows
      const wr = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.8, 0.7), winMat);
      wr.position.set(cx + hw + 0.26, h * 0.5, wz);
      this._scene.add(wr);
    }

    // Wall trim / baseboard (darker stripe at bottom)
    const trimMat = new THREE.MeshLambertMaterial({ color: new THREE.Color(color).multiplyScalar(0.8) });
    const trimBack = new THREE.Mesh(new THREE.BoxGeometry(w + 0.1, 0.15, 0.55), trimMat);
    trimBack.position.set(cx, 0.075, cz - hd);
    this._scene.add(trimBack);

    // Roof edge trim (lighter color)
    const edgeMat = new THREE.MeshLambertMaterial({ color: new THREE.Color(color).multiplyScalar(1.15) });
    const edgeBack = new THREE.Mesh(new THREE.BoxGeometry(w + 0.4, 0.12, 0.12), edgeMat);
    edgeBack.position.set(cx, h + 0.06, cz - hd);
    this._scene.add(edgeBack);
    const edgeLeft = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, d + 0.4), edgeMat);
    edgeLeft.position.set(cx - hw, h + 0.06, cz);
    this._scene.add(edgeLeft);
    const edgeRight = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, d + 0.4), edgeMat);
    edgeRight.position.set(cx + hw, h + 0.06, cz);
    this._scene.add(edgeRight);

    // Interior floor — always present; only revealed when roof fades out
    const iGeo   = new THREE.PlaneGeometry(w - 1.0, d - 1.0);
    const iMat   = new THREE.MeshLambertMaterial({ color: 0x1a1714 });
    const iFloor = new THREE.Mesh(iGeo, iMat);
    iFloor.rotation.x = -Math.PI / 2;
    iFloor.position.set(cx, 0.01, cz);
    iFloor.receiveShadow = true;
    iFloor.name = `${name}_IntFloor`;
    this._scene.add(iFloor);

    // Roof — transparent-capable so we can lerp opacity per frame.
    // Slightly oversized (+0.2) to fully cover wall tops and avoid gaps.
    // NOT added to collidables: all raycasts are horizontal so a horizontal
    // roof plane would never be hit anyway.
    const rGeo = new THREE.BoxGeometry(w + 0.2, 0.35, d + 0.2);
    const rMat = new THREE.MeshLambertMaterial({
      color,
      transparent: true,
      opacity:     1.0,
    });
    const roof = new THREE.Mesh(rGeo, rMat);
    roof.position.set(cx, h + 0.18, cz);
    roof.castShadow    = true;
    roof.receiveShadow = true;
    roof.name = `${name}_Roof`;
    this._scene.add(roof);

    // Register for per-frame reveal updates
    this._buildings.push({
      roof,
      minX: cx - hw,
      maxX: cx + hw,
      minZ: cz - hd,
      maxZ: cz + hd,
    });
  }

  /**
   * Returns building footprint rects for the minimap renderer.
   * @returns {{ minX:number, maxX:number, minZ:number, maxZ:number }[]}
   */
  get buildingOutlines() {
    return this._buildings.map(b => ({
      minX: b.minX, maxX: b.maxX, minZ: b.minZ, maxZ: b.maxZ,
    }));
  }

  /**
   * Call every frame. Smoothly hides the roof of the building the player is
   * currently inside, and restores roofs of all other buildings.
   *
   * @param {THREE.Vector3} playerPos
   */
  updateRoofs(playerPos) {
    const px = playerPos.x, pz = playerPos.z;
    for (const b of this._buildings) {
      const inside = px > b.minX && px < b.maxX && pz > b.minZ && pz < b.maxZ;
      const target = inside ? 0.0 : 1.0;
      const cur    = b.roof.material.opacity;
      // Lerp: fade in/out over ~10 frames
      b.roof.material.opacity = cur + (target - cur) * 0.14;
      b.roof.visible = b.roof.material.opacity > 0.02;
    }
  }

  _wall(cx, cz, w, d, h, color, name) {
    if (!name || h <= 0) return;
    const geo  = new THREE.BoxGeometry(w, h, d);
    const mat  = new THREE.MeshLambertMaterial({ color, flatShading: true });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(cx, h / 2, cz);
    mesh.castShadow    = true;
    mesh.receiveShadow = true;
    mesh.name = name;
    this._scene.add(mesh);
    this.collidables.push(mesh);
    return mesh;
  }

  _box(cx, cz, w, h, d, color, name) {
    const geo  = new THREE.BoxGeometry(w, h, d);
    const mat  = new THREE.MeshLambertMaterial({ color, flatShading: true });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(cx, h / 2, cz);
    mesh.castShadow    = true;
    mesh.receiveShadow = true;
    mesh.name = name;
    this._scene.add(mesh);
    this.collidables.push(mesh);
    return mesh;
  }

  // ── Environment props ─────────────────────────────────────────────────────

  _buildEnvironmentProps() {
    // Street lamps
    const lampPosts = [
      [-15, -15], [15, -15], [-15, 15], [15, 15],
      [0, -35], [0, 35], [-35, 0], [35, 0],
    ];
    for (const [x, z] of lampPosts) {
      // Pole
      const poleMat = new THREE.MeshLambertMaterial({ color: 0x555555 });
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.10, 4.5, 6), poleMat);
      pole.position.set(x, 2.25, z);
      pole.castShadow = true;
      this._scene.add(pole);
      // Light fixture
      const fixMat = new THREE.MeshBasicMaterial({ color: 0xffeeaa, toneMapped: false });
      const fix = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.15, 0.4), fixMat);
      fix.position.set(x, 4.5, z);
      this._scene.add(fix);
      // Glow halo sphere
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0xffdd99, transparent: true, opacity: 0.25, depthWrite: false, toneMapped: false,
      });
      const glow = new THREE.Mesh(new THREE.SphereGeometry(0.6, 8, 6), glowMat);
      glow.position.set(x, 4.5, z);
      this._scene.add(glow);
      // Point light (warm, brighter)
      const light = new THREE.PointLight(0xffcc88, 1.8, 14);
      light.position.set(x, 4.2, z);
      this._scene.add(light);
    }

    // Oil barrels (scattered around zones)
    const barrelPositions = [
      [-30, -28], [-32, -28], [22, -36], [24, -36],
      [-50, 34], [48, 28], [50, 28], [-8, 56],
      [30, 52], [-20, -50], [55, -42],
    ];
    const barrelColors = [0x3a5a3a, 0x5a3a2a, 0x4a4a4a, 0x2a4a5a];
    for (let bi = 0; bi < barrelPositions.length; bi++) {
      const [x, z] = barrelPositions[bi];
      const color = barrelColors[Math.floor(Math.random() * barrelColors.length)];
      const mat = new THREE.MeshLambertMaterial({ color });
      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.9, 8), mat);

      // 30% chance: barrel is tipped over
      if (bi % 3 === 2) {
        barrel.rotation.z = Math.PI / 2.5;
        barrel.position.set(x, 0.25, z);
      } else {
        barrel.position.set(x, 0.45, z);
      }

      // Lid detail (top ring)
      const lidMat = new THREE.MeshLambertMaterial({ color: new THREE.Color(color).multiplyScalar(1.2) });
      const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.04, 8), lidMat);
      lid.position.y = 0.45;
      barrel.add(lid);

      barrel.castShadow = true;
      this._scene.add(barrel);
      this.collidables.push(barrel);
    }

    // Sandbag walls (tactical cover)
    const sandbagPositions = [
      { x: -5, z: -28, w: 3, d: 0.8 },
      { x: 5,  z: -28, w: 3, d: 0.8 },
      { x: 25, z: 18,  w: 0.8, d: 3 },
      { x: -25, z: 18, w: 0.8, d: 3 },
    ];
    const sbMat = new THREE.MeshLambertMaterial({ color: 0x8a7a5a });
    for (const sb of sandbagPositions) {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(sb.w, 0.7, sb.d), sbMat);
      mesh.position.set(sb.x, 0.35, sb.z);
      mesh.castShadow = true;
      this._scene.add(mesh);
      this.collidables.push(mesh);
    }

    // Wire fences
    const fenceMat = new THREE.MeshLambertMaterial({ color: 0x666666, wireframe: true });
    const fencePositions = [
      { x: -30, z: 20, w: 12, h: 2 },
      { x: 30,  z: -20, w: 8, h: 2 },
    ];
    for (const f of fencePositions) {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(f.w, f.h, 0.1), fenceMat);
      mesh.position.set(f.x, f.h / 2, f.z);
      this._scene.add(mesh);
      // Fence posts
      const postMat = new THREE.MeshLambertMaterial({ color: 0x555555 });
      for (let px = f.x - f.w / 2; px <= f.x + f.w / 2; px += 3) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, f.h + 0.3, 4), postMat);
        post.position.set(px, (f.h + 0.3) / 2, f.z);
        this._scene.add(post);
      }
    }

    // Ground markings — road lines, parking lines, zone boundaries
    const markMat = new THREE.MeshBasicMaterial({ color: 0x6a6a5a, transparent: true, opacity: 0.3 });

    // Road from north to south (center of map)
    for (let z = -70; z < 70; z += 8) {
      const dash = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 3), markMat);
      dash.rotation.x = -Math.PI / 2;
      dash.position.set(0, 0.008, z);
      this._scene.add(dash);
    }

    // Parking lot lines
    const parkMark = new THREE.MeshBasicMaterial({ color: 0x7a7a6a, transparent: true, opacity: 0.25 });
    for (let x = 18; x <= 54; x += 6) {
      const line = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 8), parkMark);
      line.rotation.x = -Math.PI / 2;
      line.position.set(x, 0.008, 35);
      this._scene.add(line);
    }

    // Concrete pads under buildings
    const padMat = new THREE.MeshLambertMaterial({ color: 0x4a4a42 });
    const pads = [
      { x: -40, z: -50, w: 36, d: 24 }, // Factory
      { x:  40, z: -50, w: 44, d: 32 }, // Warehouse
      { x: -48, z:  40, w: 32, d: 22 }, // Apartment
    ];
    for (const p of pads) {
      const pad = new THREE.Mesh(new THREE.PlaneGeometry(p.w, p.d), padMat);
      pad.rotation.x = -Math.PI / 2;
      pad.position.set(p.x, 0.003, p.z);
      pad.receiveShadow = true;
      this._scene.add(pad);
    }

    // Tire marks in parking lot
    const tireMat = new THREE.MeshBasicMaterial({ color: 0x2a2a2a, transparent: true, opacity: 0.15 });
    for (let i = 0; i < 4; i++) {
      const tx = 25 + Math.random() * 20;
      const tz = 28 + Math.random() * 18;
      const tire = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 6 + Math.random() * 4), tireMat);
      tire.rotation.x = -Math.PI / 2;
      tire.rotation.z = (Math.random() - 0.5) * 0.3;
      tire.position.set(tx, 0.006, tz);
      this._scene.add(tire);
    }
  }

  // ── Floating dust particles ──────────────────────────────────────────────

  _buildDustParticles() {
    const COUNT = 200;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 140;
      positions[i * 3 + 1] = Math.random() * 6 + 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 140;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0xccbbaa,
      size: 0.08,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
    });
    this._dustParticles = new THREE.Points(geo, mat);
    this._scene.add(this._dustParticles);
  }

  _makeTextSprite(text, color = '#fff') {
    const canvas  = document.createElement('canvas');
    canvas.width  = 256;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.font = 'bold 24px Courier New';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 128, 32);
    const tex    = new THREE.CanvasTexture(canvas);
    const mat    = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(5, 1.25, 1);
    return sprite;
  }
}
