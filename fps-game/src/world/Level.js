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
import sceneConfig from '../config/scene.json';

// Parse '#rrggbb' or integer into a THREE-compatible color int.
function parseColor(v) {
  if (typeof v === 'number') return v;
  if (typeof v === 'string' && v.startsWith('#')) return parseInt(v.slice(1), 16);
  return 0xffffff;
}

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
     * All meshes placed from the data-driven scene config. Tracked so the
     * scene editor can remove them cleanly on rebuild.
     * @type {THREE.Object3D[]}
     */
    this._configPlaced = [];

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
    this._placeBuildingsFromConfig(sceneConfig.buildings ?? []);
    this._placeBoxesFromConfig(sceneConfig.boxes ?? []);
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

  _placeBuildingsFromConfig(buildings) {
    for (const b of buildings) {
      const before = this._scene.children.length;
      const buildingsBefore = this._buildings.length;
      this._building(b.cx, b.cz, b.w, b.d, b.h, parseColor(b.color), b.name);
      // Tag the roof (most visible anchor) for editor selection.
      const rec = this._buildings[buildingsBefore];
      if (rec && rec.roof) {
        rec.roof.userData.editable = true;
        rec.roof.userData.configRef = b;
        rec.roof.userData.configKey = 'buildings';
      }
      // Track every newly-added scene child so we can remove them on rebuild.
      for (let i = before; i < this._scene.children.length; i++) {
        this._configPlaced.push(this._scene.children[i]);
      }
    }
  }

  _placeBoxesFromConfig(boxes) {
    for (const b of boxes) {
      const mesh = this._box(b.cx, b.cz, b.w, b.h, b.d, parseColor(b.color), b.name);
      if (mesh) {
        mesh.userData.editable = true;
        mesh.userData.configRef = b;
        mesh.userData.configKey = 'boxes';
        this._configPlaced.push(mesh);
      }
    }
  }

  _buildFactoryZone() {
    const C = 0x5a5248;
    // Zone divider wall (partial, with gaps) — boxes/crates now in scene.json
    this._wall(-10, -45, 0.5, 20, 3, C, 'FactDiv1');
    this._wall(-10, -22, 0.5,  8, 3, C, 'FactDiv2');
  }

  // ── NE: Warehouse Zone ────────────────────────────────────────────────────

  _buildWarehouseZone() {
    // Dock wall, crates, guard post, fence — now in scene.json
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
    // Benches, burnt cars, sandbags — now in scene.json
  }

  // ── SW: Apartment Ruins ───────────────────────────────────────────────────

  _buildApartmentZone() {
    const C = 0x5c5040;
    // Apartment block B (more damaged — open walls)
    this._wall(-35, 56, 16, 0.5, 2.5, C, 'AptB_N');
    this._wall(-43, 62, 0.5, 12, 2.5, C, 'AptB_W');
    this._wall(-27, 60, 0.5, 8,  2.5, C, 'AptB_E');
    // Rubble / barriers / abandoned car — now in scene.json
  }

  // ── SE: Parking Lot ───────────────────────────────────────────────────────

  _buildParkingZone() {
    // Cars, dividers, guard booth, storage shed — now in scene.json
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

    // Main hall + side storage now loaded from scene.json

    // (Side storage now loaded from scene.json)

    // Connecting corridor between main hall and side room
    this._wall(-17, 85, 0.5, 6, 2.5, C, 'BasCorrW');
    this._wall( -3, 85, 0.5, 6, 2.5, C, 'BasCorrE');

    // Interior details (tables / cabinets / crates / weapon rack / safe / ammo) — now in scene.json
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
    // Data-driven props (trees/rocks/barrels/...) come from scene.json.
    // Pads + ground markings stay hardcoded below — they're style, not content.
    // ═══════════════════════════════════════════════════════════════════════

    this._placeEnvPropsFromConfig(sceneConfig);

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

  /**
   * Place every data-driven env prop from the scene config.
   * All arrays are optional — use `?? []` to tolerate missing sections.
   *
   * @param {object} cfg — parsed scene.json
   */
  _placeEnvPropsFromConfig(cfg) {
    const tag = (obj, ref, key) => {
      obj.userData.editable = true;
      obj.userData.configRef = ref;
      obj.userData.configKey = key;
      this._configPlaced.push(obj);
    };

    // Trees (deterministic scale/rotY baked into JSON)
    for (const t of cfg.trees ?? []) {
      const tree = createTree(t.type);
      tree.position.set(t.x, 0, t.z);
      tree.scale.setScalar(t.scale);
      tree.rotation.y = t.rotY;
      this._scene.add(tree);
      tag(tree, t, 'trees');
    }

    // Rock clusters
    for (const r of cfg.rockClusters ?? []) {
      const rocks = createRockCluster(r.count);
      rocks.position.set(r.x, 0, r.z);
      rocks.scale.setScalar(r.scale);
      this._scene.add(rocks);
      tag(rocks, r, 'rockClusters');
    }

    // Crate clusters
    for (const c of cfg.crateClusters ?? []) {
      const crates = createCrateCluster(c.count);
      crates.position.set(c.x, 0, c.z);
      crates.scale.setScalar(c.scale);
      this._scene.add(crates);
      tag(crates, c, 'crateClusters');
    }

    // Barrels (with deterministic color cycle baked into JSON)
    for (const b of cfg.barrels ?? []) {
      const barrel = createBarrel({ color: parseColor(b.color), fallen: b.fallen });
      barrel.position.x = b.x;
      barrel.position.z = b.z;
      this._scene.add(barrel);
      this.collidables.push(barrel);
      tag(barrel, b, 'barrels');
    }

    // Shelves
    for (const s of cfg.shelves ?? []) {
      const shelf = createShelf();
      shelf.position.set(s.x, 0, s.z);
      shelf.scale.setScalar(s.scale);
      this._scene.add(shelf);
      tag(shelf, s, 'shelves');
    }

    // Extinguishers
    for (const e of cfg.extinguishers ?? []) {
      const ext = createExtinguisher();
      ext.position.set(e.x, 0, e.z);
      ext.scale.setScalar(e.scale);
      this._scene.add(ext);
      tag(ext, e, 'extinguishers');
    }

    // Containers
    for (const c of cfg.containers ?? []) {
      const container = createContainer();
      container.position.set(c.x, 0, c.z);
      container.rotation.y = c.rotY;
      container.scale.setScalar(c.scale);
      this._scene.add(container);
      tag(container, c, 'containers');
    }

    // Forklifts
    for (const f of cfg.forklifts ?? []) {
      const fl = createForklift();
      fl.position.set(f.x, 0, f.z);
      fl.rotation.y = f.rotY;
      fl.scale.setScalar(f.scale);
      this._scene.add(fl);
      tag(fl, f, 'forklifts');
    }

    // Street lights (deterministic rotY baked into JSON)
    for (const sl of cfg.streetLights ?? []) {
      const light = createStreetLight();
      light.position.set(sl.x, 0, sl.z);
      light.rotation.y = sl.rotY;
      light.scale.setScalar(sl.scale);
      this._scene.add(light);
      tag(light, sl, 'streetLights');
    }

    // Benches
    for (const b of cfg.benches ?? []) {
      const bench = createBench();
      bench.position.set(b.x, 0, b.z);
      bench.rotation.y = b.rotY;
      bench.scale.setScalar(b.scale);
      this._scene.add(bench);
      tag(bench, b, 'benches');
    }

    // Umbrellas
    for (const u of cfg.umbrellas ?? []) {
      const umb = createUmbrella();
      umb.position.set(u.x, 0, u.z);
      umb.scale.setScalar(u.scale);
      this._scene.add(umb);
      tag(umb, u, 'umbrellas');
    }

    // Stake ropes (length configurable per entry)
    for (const s of cfg.stakeRopes ?? []) {
      const stake = createStakeRope(s.length);
      stake.position.set(s.x, 0, s.z);
      stake.rotation.y = s.rotY;
      stake.scale.setScalar(s.scale);
      this._scene.add(stake);
      tag(stake, s, 'stakeRopes');
    }

    // Sandbags (count configurable per entry)
    for (const sb of cfg.sandbags ?? []) {
      const bags = createSandbags(sb.count);
      bags.position.set(sb.x, 0, sb.z);
      bags.rotation.y = sb.rotY;
      bags.scale.setScalar(sb.scale);
      this._scene.add(bags);
      tag(bags, sb, 'sandbags');
    }

    // Wood fences (length + broken flag per entry)
    for (const f of cfg.fences ?? []) {
      const fence = createWoodFence(f.len, f.broken);
      fence.position.set(f.x, 0, f.z);
      fence.rotation.y = f.rotY;
      fence.scale.setScalar(f.scale);
      this._scene.add(fence);
      tag(fence, f, 'fences');
    }

    // Village buildings (distinct from main buildings — uses createBuilding)
    for (const vb of cfg.villageBuildings ?? []) {
      const bld = createBuilding({ w: vb.w, d: vb.d, color: parseColor(vb.color) });
      bld.position.set(vb.x, 0, vb.z);
      bld.rotation.y = vb.rotY;
      bld.scale.setScalar(vb.scale);
      this._scene.add(bld);
      tag(bld, vb, 'villageBuildings');
    }
  }

  // ── Editor support ────────────────────────────────────────────────────────

  /**
   * Remove every mesh placed by config-driven placement so the editor can
   * rebuild from a fresh config. Called by SceneEditor.
   */
  clearConfigDriven() {
    for (const m of this._configPlaced ?? []) {
      this._scene.remove(m);
      m.traverse?.(ch => {
        if (ch.isMesh) {
          ch.geometry?.dispose?.();
          if (ch.material?.dispose) ch.material.dispose();
        }
      });
      const ci = this.collidables.indexOf(m);
      if (ci >= 0) this.collidables.splice(ci, 1);
    }
    this._configPlaced = [];
    // Buildings array also needs reset so next rebuild doesn't double-track.
    this._buildings = [];
    // Door slots from buildings also need reset.
    this.doorSlots.length = 0;
  }

  /**
   * Rebuild every config-driven section of the level from a fresh cfg object.
   * Caller is responsible for clearing first.
   */
  rebuildFromConfig(cfg) {
    this._placeBuildingsFromConfig(cfg.buildings ?? []);
    this._placeBoxesFromConfig(cfg.boxes ?? []);
    this._placeEnvPropsFromConfig(cfg);
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
