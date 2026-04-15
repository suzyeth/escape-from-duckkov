import * as THREE from 'three';
import { createTree, createSandbags, OUTDOOR_ENV } from '../props/env-outdoor.js';
import { createRockCluster } from '../props/rock-cluster.js';
import { createWoodFence, createStakeRope } from '../props/fence.js';
import { createCrateCluster } from '../props/crate-cluster.js';
import { createContainer } from '../props/container.js';
import { createForklift } from '../props/forklift.js';
import { createBarrel } from '../props/barrel.js';
import { createBuilding, createUmbrella, createStreetLight, createBench } from '../props/building.js';
import { createShelf } from '../props/shelf.js';
import { createExtinguisher } from '../props/extinguisher.js';

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

    // Sky & fog from env config
    scene.background = new THREE.Color(OUTDOOR_ENV.skyColor);
    scene.fog        = new THREE.Fog(OUTDOOR_ENV.fog.color, OUTDOOR_ENV.fog.near * 4, OUTDOOR_ENV.fog.far * 4);
  }

  // ── Lighting ──────────────────────────────────────────────────────────────

  _buildLighting() {
    const E = OUTDOOR_ENV;

    // Ambient + Hemisphere
    this._scene.add(new THREE.AmbientLight(E.ambient.color, E.ambient.intensity));
    this._scene.add(new THREE.HemisphereLight(E.hemisphere.sky, E.hemisphere.ground, E.hemisphere.intensity));

    // Sun — low angle for long shadows
    const sun = new THREE.DirectionalLight(E.sun.color, E.sun.intensity);
    sun.position.set(E.sun.position[0] * 10, E.sun.position[1] * 10, E.sun.position[2] * 10);
    sun.castShadow = true;
    sun.shadow.mapSize.set(E.sun.shadowMapSize, E.sun.shadowMapSize);
    sun.shadow.camera.left   = -100;
    sun.shadow.camera.right  =  100;
    sun.shadow.camera.top    =  100;
    sun.shadow.camera.bottom = -100;
    sun.shadow.camera.near   = 1;
    sun.shadow.camera.far    = 250;
    sun.shadow.bias = E.sun.shadowBias;
    this._scene.add(sun);
    this._sun = sun;

    // Fill — cold, from opposite side
    const fill = new THREE.DirectionalLight(E.fill.color, E.fill.intensity);
    fill.position.set(E.fill.position[0] * 10, E.fill.position[1] * 10, E.fill.position[2] * 10);
    this._scene.add(fill);
    this._fill = fill;
  }

  // ── Ground ────────────────────────────────────────────────────────────────

  _buildGround() {
    const E = OUTDOOR_ENV;

    // Main grass ground — vertex-colored for natural variation
    const geo = new THREE.PlaneGeometry(160, 160, 48, 48);
    const baseG = new THREE.Color(E.ground.grass.color);
    const litG  = new THREE.Color(E.ground.grassLit.color);
    const colors = [];
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const t = (Math.sin(pos.getX(i) * 0.05) * Math.cos(pos.getZ(i) * 0.04) + 1) * 0.5;
      const noise = Math.random() * 0.15;
      const c = baseG.clone().lerp(litG, t + noise);
      colors.push(c.r, c.g, c.b);
    }
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: E.ground.grass.roughness,
      metalness: 0,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    mesh.name = 'Floor';
    this._scene.add(mesh);
    this.collidables.push(mesh);
    this._groundMat = mat;

    // Dirt/mud paths — vertex-colored with rough edges
    const dirtC  = new THREE.Color(E.ground.dirt.color);
    const dirtDk = new THREE.Color(E.ground.dirtDark.color);
    const dirtPaths = [
      { x:   0, z:   0, w: 5, d: 140, rot: 0 },
      { x:   0, z:   0, w: 140, d: 5, rot: 0 },
      { x: -40, z: -30, w: 8, d: 20, rot: 0 },
      { x:  40, z: -30, w: 8, d: 20, rot: 0 },
      { x: -40, z:  30, w: 8, d: 20, rot: 0 },
      { x:  37, z:  30, w: 8, d: 20, rot: 0 },
    ];
    dirtPaths.forEach(({ x, z, w, d, rot }) => {
      const g = new THREE.PlaneGeometry(w, d, 8, 16);
      const gPos = g.attributes.position;
      const dColors = [];
      for (let i = 0; i < gPos.count; i++) {
        const edgeDist = Math.abs(gPos.getX(i)) / (w / 2);
        gPos.setX(i, gPos.getX(i) + (Math.random() - 0.5) * 0.5 * edgeDist);
        const t = Math.random() * 0.4;
        const c = dirtC.clone().lerp(dirtDk, t);
        dColors.push(c.r, c.g, c.b);
      }
      g.setAttribute('color', new THREE.Float32BufferAttribute(dColors, 3));
      const m = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95, metalness: 0 });
      const p = new THREE.Mesh(g, m);
      p.rotation.x = -Math.PI / 2;
      p.position.set(x, 0.006, z);
      p.receiveShadow = true;
      this._scene.add(p);
    });

    // Zone floor tints — concrete under buildings
    const zones = [
      { x: -35, z: -45, w: 40, d: 50, c: 0x4a5058 },
      { x:  40, z: -45, w: 50, d: 50, c: 0x3a4048 },
      { x:   0, z:   0, w: 40, d: 40, c: 0x6a6a5a },
      { x: -40, z:  45, w: 50, d: 50, c: 0x5a5048 },
      { x:  37, z:  42, w: 55, d: 45, c: 0x6a6a5a },
      { x:  -5, z:  65, w: 30, d: 20, c: 0x2a2a30 },
    ];
    zones.forEach(({ x, z, w, d, c }) => {
      const g = new THREE.PlaneGeometry(w, d);
      const m = new THREE.MeshStandardMaterial({ color: c, roughness: 0.8, metalness: 0.1 });
      const p = new THREE.Mesh(g, m);
      p.rotation.x = -Math.PI / 2;
      p.position.set(x, 0.008, z);
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
    const mat = new THREE.MeshStandardMaterial({ color: 0x888070 });
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
    const dMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2a });
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
    const winMat = new THREE.MeshStandardMaterial({ color: 0x0a0a12 });
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
    const trimMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(color).multiplyScalar(0.8), roughness: 0.8, metalness: 0.1 });
    const trimBack = new THREE.Mesh(new THREE.BoxGeometry(w + 0.1, 0.15, 0.55), trimMat);
    trimBack.position.set(cx, 0.075, cz - hd);
    this._scene.add(trimBack);

    // Roof edge trim (lighter color)
    const edgeMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(color).multiplyScalar(1.15), roughness: 0.7, metalness: 0.15 });
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
    const iMat   = new THREE.MeshStandardMaterial({ color: 0x3a4048, roughness: 0.7, metalness: 0.1 });
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
    const rMat = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.7,
      metalness: 0.15,
      transparent: true,
      opacity:     1.0,
    });
    const roof = new THREE.Mesh(rGeo, rMat);
    roof.position.set(cx, h + 0.18, cz);
    roof.castShadow    = true;
    roof.receiveShadow = true;
    roof.name = `${name}_Roof`;
    this._scene.add(roof);

    // Indoor warm light — max 4 to avoid shader overload
    let indoorLight = null;
    if ((this._buildings?.length ?? 0) < 4) {
      indoorLight = new THREE.PointLight(0xfff5e0, 3, 12, 1.5);
      indoorLight.position.set(cx, h * 0.7, cz);
      indoorLight.visible = false; // hidden until player enters (roof reveals)
      this._scene.add(indoorLight);
    }

    // Register for per-frame reveal updates
    this._buildings.push({
      roof,
      indoorLight,
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
      // Indoor light: visible only when player is inside
      if (b.indoorLight) b.indoorLight.visible = inside;
    }
  }

  _wall(cx, cz, w, d, h, color, name) {
    if (!name || h <= 0) return;
    const geo  = new THREE.BoxGeometry(w, h, d);
    const mat  = new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0.05 });
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
    const mat  = new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0.05 });
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
    // ═══════════════════════════════════════════════════════════════════════
    // 摆放规则：
    //   自然物(树/岩石/灌木)     → 草地/地图边缘，禁止混凝土区
    //   工业物(货架/纸箱/油桶)   → 建筑内部或紧贴外墙
    //   市政物(路灯/长椅/遮阳伞) → 道路旁/广场
    //   军事物(沙袋/集装箱/围栏) → 区域边界/战术要点
    //   同类道具成组摆放，不单独散落
    // ═══════════════════════════════════════════════════════════════════════

    // ── 1. 自然物：地图边缘 + 区域间草地过渡带 ─────────────────────────

    // 树丛 — 只在草地区域（地图边缘、区域间过渡带）
    const treeSpots = [
      // NW 工厂外围 — 工厂西/北侧树林带
      [-65, -55, 'round'], [-62, -50, 'cone'], [-68, -48, 'bush'],
      [-60, -62, 'cone'],  [-66, -42, 'round'], [-70, -35, 'bush'],
      // NE 仓库外围 — 仓库东侧
      [68, -55, 'round'], [70, -45, 'cone'], [66, -65, 'bush'],
      // SW 公寓外围 — 西侧和南侧
      [-68, 55, 'round'], [-65, 50, 'cone'], [-62, 62, 'round'],
      [-70, 45, 'bush'],  [-58, 68, 'cone'],
      // SE 停车场外围 — 东侧
      [68, 55, 'cone'], [70, 48, 'round'], [65, 62, 'bush'],
      // 西边界树带
      [-72, 0, 'round'], [-70, 10, 'cone'], [-72, -15, 'bush'], [-68, 20, 'round'],
      // 东边界树带
      [72, 5, 'round'], [70, -10, 'cone'], [72, 18, 'bush'],
      // 区域间过渡 — 工厂/公寓之间的草地（X:-60~-20, Z:0~20）
      [-55, 8, 'round'], [-50, 14, 'cone'], [-58, 3, 'bush'],
      // 仓库/停车场之间的草地（X:60~70, Z:-10~10）
      [65, 0, 'round'], [68, 8, 'bush'],
    ];
    for (const [x, z, type] of treeSpots) {
      const tree = createTree(type);
      tree.position.set(x, 0, z);
      tree.scale.setScalar(2.5 + Math.random() * 1.5);
      tree.rotation.y = Math.random() * Math.PI * 2;
      this._scene.add(tree);
    }

    // 岩石群 — 草地区域，做地形分割和天然掩体
    const rockSpots = [
      // 工厂和公寓之间（西侧过渡带）
      [-55, -15, 5], [-48, 5, 4],
      // 仓库北侧空地
      [10, -65, 3],
      // 停车场东南角外
      [65, 38, 4],
      // 地下室南侧（自然地形）
      [-15, 68, 5], [8, 70, 3],
      // 中央广场外围过渡（广场边缘有几块零星岩石）
      [-22, -18, 2], [22, 18, 2],
    ];
    for (const [x, z, count] of rockSpots) {
      const rocks = createRockCluster(count);
      rocks.position.set(x, 0, z);
      rocks.scale.setScalar(2);
      this._scene.add(rocks);
    }

    // ── 2. 工业物：建筑内部/紧贴外墙 ──────────────────────────────────

    // 纸箱堆 — 工厂和仓库内部
    const crateSpots = [
      // 工厂内部（-56~-24, -60~-40）
      [-38, -45, 5], [-48, -52, 3], [-30, -55, 4],
      // 仓库内部（20~60, -64~-36）
      [30, -48, 6], [45, -55, 4], [52, -42, 3],
      // 公寓内部（-62~-34, 31~49）
      [-48, 38, 3], [-42, 44, 2],
    ];
    for (const [x, z, count] of crateSpots) {
      const crates = createCrateCluster(count);
      crates.position.set(x, 0, z);
      crates.scale.setScalar(1.5);
      this._scene.add(crates);
    }

    // 油桶 — 工厂外墙旁、仓库码头、停车场边
    const barrelData = [
      // 工厂外墙旁 2组
      [-22, -42, false], [-22, -44, false], [-24, -43, true],
      // 仓库码头 2组
      [56, -38, false], [58, -38, false], [57, -40, true],
      // 停车场入口旁
      [14, 28, false], [16, 28, false],
      // 公寓废墟旁
      [-52, 34, false], [-52, 36, true],
      // 地下室入口
      [-8, 58, false],
    ];
    const barrelColors = [0x4a7a3a, 0x5a3a2a, 0x4a4a4a, 0xcc6633];
    for (const [x, z, fallen] of barrelData) {
      const color = barrelColors[Math.floor(Math.random() * barrelColors.length)];
      const barrel = createBarrel({ color, fallen });
      barrel.position.x = x;
      barrel.position.z = z;
      this._scene.add(barrel);
      this.collidables.push(barrel);
    }

    // 货架 — 工厂和仓库内部
    const shelfSpots = [
      // 工厂内 — 靠墙
      [-50, -45], [-50, -50],
      // 仓库内 — 靠墙
      [25, -52], [25, -46],
    ];
    for (const [x, z] of shelfSpots) {
      const shelf = createShelf();
      shelf.position.set(x, 0, z);
      shelf.scale.setScalar(1.5);
      this._scene.add(shelf);
    }

    // 灭火器 — 建筑内部靠墙
    const extSpots = [
      [-26, -42],  // 工厂入口内
      [22, -38],   // 仓库入口内
      [-36, 40],   // 公寓内
    ];
    for (const [x, z] of extSpots) {
      const ext = createExtinguisher();
      ext.position.set(x, 0, z);
      ext.scale.setScalar(1.5);
      this._scene.add(ext);
    }

    // 集装箱 — 仓库码头区域
    const containerSpots = [
      [58, -55, 0],                // 仓库东侧码头
      [58, -48, Math.PI / 2],     // 码头并排
      [22, -62, 0.2],             // 仓库北侧外
    ];
    for (const [x, z, rot] of containerSpots) {
      const c = createContainer();
      c.position.set(x, 0, z);
      c.rotation.y = rot;
      c.scale.setScalar(2);
      this._scene.add(c);
    }

    // 叉车 — 仓库内部
    const fl = createForklift();
    fl.position.set(35, 0, -50);
    fl.rotation.y = Math.PI / 6;
    fl.scale.setScalar(2);
    this._scene.add(fl);

    // ── 3. 市政物：道路旁/广场 ─────────────────────────────────────────

    // 路灯 — 沿主干道和广场周围
    const streetLightSpots = [
      // 中央广场四角
      [-15, -15], [15, -15], [-15, 15], [15, 15],
      // 南北主路
      [0, -35], [0, 35],
      // 东西横路
      [-35, 0], [35, 0],
    ];
    for (const [x, z] of streetLightSpots) {
      const sl = createStreetLight();
      sl.position.set(x, 0, z);
      sl.rotation.y = Math.random() * Math.PI * 2;
      sl.scale.setScalar(2);
      this._scene.add(sl);
    }

    // 长椅 — 广场喷泉周围
    const benchSpots = [
      { x: -6, z: -8, rot: Math.PI / 4 },       // 面向喷泉
      { x:  6, z:  8, rot: Math.PI + Math.PI / 4 },
      { x: -8, z:  6, rot: -Math.PI / 4 },
    ];
    for (const b of benchSpots) {
      const bench = createBench();
      bench.position.set(b.x, 0, b.z);
      bench.rotation.y = b.rot;
      bench.scale.setScalar(2);
      this._scene.add(bench);
    }

    // 遮阳伞 — 广场长椅旁
    const umbrellaSpots = [[-7, -9], [7, 9]];
    for (const [x, z] of umbrellaSpots) {
      const umb = createUmbrella();
      umb.position.set(x, 0, z);
      umb.scale.setScalar(2);
      this._scene.add(umb);
    }

    // 木桩绳索 — 沿泥地路径引导
    const stakeSpots = [
      { x: -3, z: -30, rot: 0 },          // 北路旁
      { x:  3, z:  30, rot: 0 },           // 南路旁
      { x: -32, z: -3, rot: Math.PI / 2 }, // 西路旁
    ];
    for (const s of stakeSpots) {
      const stake = createStakeRope(6);
      stake.position.set(s.x, 0, s.z);
      stake.rotation.y = s.rot;
      stake.scale.setScalar(2);
      this._scene.add(stake);
    }

    // ── 4. 军事物：区域边界/战术要点 ───────────────────────────────────

    // 沙袋 — 区域入口、关键通道
    const sandbagSpots = [
      { x: -10, z: -22, rot: 0 },           // 工厂区南入口
      { x:  10, z: -22, rot: 0 },           // 仓库区南入口
      { x: -20, z:  22, rot: Math.PI / 2 }, // 公寓区北入口
      { x:  20, z:  22, rot: Math.PI / 2 }, // 停车场北入口
    ];
    for (const sb of sandbagSpots) {
      const bags = createSandbags(5);
      bags.position.set(sb.x, 0, sb.z);
      bags.rotation.y = sb.rot;
      bags.scale.setScalar(2.5);
      this._scene.add(bags);
    }

    // 木围栏 — 区域边界/草地与建筑过渡
    const fenceSpots = [
      // 工厂区南侧边界
      { x: -35, z: -20, len: 5, rot: 0, broken: false },
      // 仓库区西侧边界
      { x: 15,  z: -40, len: 4, rot: Math.PI / 2, broken: true },
      // 公寓区北侧（废墟破损围栏）
      { x: -40, z: 22, len: 4, rot: 0, broken: true },
      // 停车场西侧
      { x: 12, z: 35, len: 3, rot: Math.PI / 2, broken: false },
      // 地图西边界附近
      { x: -65, z: -5, len: 5, rot: Math.PI / 8, broken: false },
    ];
    for (const f of fenceSpots) {
      const fence = createWoodFence(f.len, f.broken);
      fence.position.set(f.x, 0, f.z);
      fence.rotation.y = f.rot;
      fence.scale.setScalar(2);
      this._scene.add(fence);
    }

    // ── 5. 建筑小品 — 与区域功能匹配 ──────────────────────────────────

    // 村庄建筑 — 公寓废墟区域旁（SW的废弃民居）
    const buildingSpots = [
      { x: -58, z: 30, rot: 0, color: 0x5a6a8a, w: 3, d: 2.5 },           // 公寓区西侧民居
      { x: -38, z: 62, rot: Math.PI / 2, color: 0x7a6a5a, w: 2.5, d: 2 }, // 公寓区南侧
      // 仓库区旁小办公楼
      { x: 50, z: -66, rot: 0, color: 0x6a6a7a, w: 2.5, d: 2 },
    ];
    for (const b of buildingSpots) {
      const bld = createBuilding({ w: b.w, d: b.d, color: b.color });
      bld.position.set(b.x, 0, b.z);
      bld.rotation.y = b.rot;
      bld.scale.setScalar(2);
      this._scene.add(bld);
    }

    // ── 6. 地面标记 ───────────────────────────────────────────────────

    // 道路中线虚线
    const markMat = new THREE.MeshBasicMaterial({ color: 0x6a6a5a, transparent: true, opacity: 0.3 });
    for (let z = -70; z < 70; z += 8) {
      const dash = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 3), markMat);
      dash.rotation.x = -Math.PI / 2;
      dash.position.set(0, 0.008, z);
      this._scene.add(dash);
    }

    // 停车场线
    const parkMark = new THREE.MeshBasicMaterial({ color: 0x7a7a6a, transparent: true, opacity: 0.25 });
    for (let x = 18; x <= 54; x += 6) {
      const line = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 8), parkMark);
      line.rotation.x = -Math.PI / 2;
      line.position.set(x, 0.008, 35);
      this._scene.add(line);
    }

    // 建筑底座混凝土
    const padMat = new THREE.MeshStandardMaterial({ color: 0x4a5058, roughness: 0.7, metalness: 0.1 });
    const pads = [
      { x: -40, z: -50, w: 36, d: 24 },  // 工厂
      { x:  40, z: -50, w: 44, d: 32 },  // 仓库
      { x: -48, z:  40, w: 32, d: 22 },  // 公寓
    ];
    for (const p of pads) {
      const pad = new THREE.Mesh(new THREE.PlaneGeometry(p.w, p.d), padMat);
      pad.rotation.x = -Math.PI / 2;
      pad.position.set(p.x, 0.003, p.z);
      pad.receiveShadow = true;
      this._scene.add(pad);
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
