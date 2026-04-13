import * as THREE from 'three';
import { MAT } from './materials.js';

const trimMat = new THREE.MeshStandardMaterial({ color: 0x4a4a44, roughness: 0.85 });
const roofMat = new THREE.MeshStandardMaterial({ color: 0x6a6a5a, roughness: 0.9 });
const windowMat = new THREE.MeshStandardMaterial({ color: 0x446688, emissive: 0x223344, emissiveIntensity: 0.3, metalness: 0.3, roughness: 0.2 });
const doorMat = new THREE.MeshStandardMaterial({ color: 0x5a4a3a, roughness: 0.85 });
const chrome = new THREE.MeshStandardMaterial({ color: 0x999999, metalness: 0.8, roughness: 0.2 });

/**
 * 建筑外墙模块 — 参考鸭科夫村庄建筑
 */
export function createBuilding({ w = 3, d = 2.5, h = 2, color = 0x5a6a8a, hasWindow = true, hasDoor = true } = {}) {
  const group = new THREE.Group();
  const wallMat = new THREE.MeshStandardMaterial({ color, roughness: 0.8, metalness: 0.05 });
  const wallDark = new THREE.MeshStandardMaterial({ color: new THREE.Color(color).multiplyScalar(0.8), roughness: 0.85 });

  // 四面墙 (BoxGeometry for thickness)
  const addWall = (ww, hh, dd, x, y, z) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(ww, hh, dd), wallMat);
    m.position.set(x, y, z);
    m.castShadow = true; m.receiveShadow = true;
    group.add(m);
  };
  addWall(w, h, 0.08, 0, h/2, -d/2);     // back
  addWall(w, h, 0.08, 0, h/2,  d/2);      // front
  addWall(0.08, h, d, -w/2, h/2, 0);      // left
  addWall(0.08, h, d,  w/2, h/2, 0);      // right

  // Foundation
  const foundation = new THREE.Mesh(new THREE.BoxGeometry(w + 0.12, 0.12, d + 0.12), trimMat);
  foundation.position.y = 0.06;
  group.add(foundation);

  // Wainscot (lower wall band)
  const wainscot = new THREE.MeshStandardMaterial({ color: new THREE.Color(color).multiplyScalar(0.7), roughness: 0.9 });
  [[-d/2, w, 0.09], [d/2, w, 0.09]].forEach(([z, ww, dd]) => {
    const ws = new THREE.Mesh(new THREE.BoxGeometry(ww + 0.02, h * 0.25, dd), wainscot);
    ws.position.set(0, h * 0.125, z);
    group.add(ws);
  });

  // === Roof (peaked) ===
  // Ridge beam
  const roofW = w + 0.4;
  const roofD = d + 0.3;
  const roofPeak = 0.6;
  // Left slope
  const slopeL = new THREE.Mesh(new THREE.BoxGeometry(roofW, 0.05, roofD * 0.55), roofMat);
  slopeL.position.set(0, h + roofPeak * 0.5, -roofD * 0.13);
  slopeL.rotation.x = 0.35;
  slopeL.castShadow = true;
  group.add(slopeL);
  // Right slope
  const slopeR = new THREE.Mesh(new THREE.BoxGeometry(roofW, 0.05, roofD * 0.55), roofMat);
  slopeR.position.set(0, h + roofPeak * 0.5, roofD * 0.13);
  slopeR.rotation.x = -0.35;
  slopeR.castShadow = true;
  group.add(slopeR);
  // Roof trim (front/back eaves)
  [-d/2 - 0.15, d/2 + 0.15].forEach(z => {
    const eave = new THREE.Mesh(new THREE.BoxGeometry(roofW, 0.03, 0.06), trimMat);
    eave.position.set(0, h + 0.02, z);
    group.add(eave);
  });

  // === Window ===
  if (hasWindow) {
    // Window hole frame
    const winFrame = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.45, 0.1), trimMat);
    winFrame.position.set(w * 0.22, h * 0.58, d/2);
    group.add(winFrame);
    // Glass
    const glass = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.35, 0.01), windowMat);
    glass.position.set(w * 0.22, h * 0.58, d/2 + 0.01);
    group.add(glass);
    // Window cross bars
    const barMat = new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.7 });
    const hBar = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.015, 0.02), barMat);
    hBar.position.set(w * 0.22, h * 0.58, d/2 + 0.02);
    group.add(hBar);
    const vBar = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.35, 0.02), barMat);
    vBar.position.set(w * 0.22, h * 0.58, d/2 + 0.02);
    group.add(vBar);
    // Sill
    const sill = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.03, 0.1), trimMat);
    sill.position.set(w * 0.22, h * 0.36, d/2 + 0.04);
    group.add(sill);

    // Side window
    const sideFrame = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.35, 0.4), trimMat);
    sideFrame.position.set(w/2, h * 0.6, 0.3);
    group.add(sideFrame);
    const sideGlass = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.28, 0.32), windowMat);
    sideGlass.position.set(w/2 + 0.01, h * 0.6, 0.3);
    group.add(sideGlass);
  }

  // === Door ===
  if (hasDoor) {
    // Door frame
    const df = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.0, 0.1), trimMat);
    df.position.set(-w * 0.22, 0.5, d/2);
    group.add(df);
    // Door panel
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.9, 0.04), doorMat);
    door.position.set(-w * 0.22, 0.5, d/2 + 0.02);
    group.add(door);
    // Door panels (raised)
    [0.25, 0.65].forEach(y => {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.22, 0.008),
        new THREE.MeshStandardMaterial({ color: 0x5a4a3a, roughness: 0.8 }));
      panel.position.set(-w * 0.22, y + 0.1, d/2 + 0.045);
      group.add(panel);
    });
    // Door handle
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.015, 0.025), chrome);
    handle.position.set(-w * 0.22 + 0.18, 0.5, d/2 + 0.05);
    group.add(handle);
    // Step
    const step = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.06, 0.2), trimMat);
    step.position.set(-w * 0.22, 0.03, d/2 + 0.12);
    group.add(step);
  }

  // Drainpipe
  const pipeMat = new THREE.MeshStandardMaterial({ color: 0x666666, roughness: 0.5, metalness: 0.5 });
  const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, h + 0.3, 8), pipeMat);
  pipe.position.set(w/2 - 0.05, h/2 + 0.15, d/2 - 0.05);
  group.add(pipe);

  group.userData.type = 'building';
  return group;
}

/**
 * 遮阳伞 — 蓝白条纹，参考鸭科夫村庄场景
 */
export function createUmbrella() {
  const group = new THREE.Group();
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.5, roughness: 0.4 });

  // Pole
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 1.6, 8), poleMat);
  pole.position.y = 0.8;
  group.add(pole);

  // Base weight
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.18, 0.06, 12),
    new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.7, metalness: 0.4 }));
  base.position.y = 0.03;
  group.add(base);

  // Canopy (8 segments, higher polygon count for smooth edge)
  const white = new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.8, side: THREE.DoubleSide });
  const blue = new THREE.MeshStandardMaterial({ color: 0x4477aa, roughness: 0.8, side: THREE.DoubleSide });
  for (let i = 0; i < 8; i++) {
    const seg = new THREE.Mesh(
      new THREE.ConeGeometry(0.75, 0.25, 4, 1, false, i * Math.PI / 4, Math.PI / 4),
      i % 2 === 0 ? blue : white
    );
    seg.position.y = 1.52;
    seg.rotation.x = Math.PI;
    seg.castShadow = true;
    group.add(seg);
  }

  // Ribs (metal rods under canopy)
  for (let i = 0; i < 8; i++) {
    const angle = i * Math.PI / 4 + Math.PI / 8;
    const rib = new THREE.Mesh(
      new THREE.CylinderGeometry(0.003, 0.003, 0.72, 4),
      poleMat
    );
    rib.position.set(
      Math.cos(angle) * 0.35,
      1.47,
      Math.sin(angle) * 0.35
    );
    rib.rotation.z = Math.cos(angle) * 0.35;
    rib.rotation.x = -Math.sin(angle) * 0.35;
    group.add(rib);
  }

  // Finial (top cap)
  const finial = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 6), poleMat);
  finial.position.y = 1.62;
  group.add(finial);

  // Rib tips (8)
  for (let i = 0; i < 8; i++) {
    const angle = i * Math.PI / 4 + Math.PI / 8;
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.008, 6, 4), poleMat);
    tip.position.set(Math.cos(angle) * 0.73, 1.4, Math.sin(angle) * 0.73);
    group.add(tip);
  }

  group.userData.type = 'umbrella';
  return group;
}

/**
 * 路灯 — 弯臂路灯
 */
export function createStreetLight() {
  const group = new THREE.Group();
  const metalMat = new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 0.45, metalness: 0.65 });
  const lampMat = new THREE.MeshStandardMaterial({ color: 0xffeecc, emissive: 0xffeecc, emissiveIntensity: 1.0 });

  // Main pole (tapered)
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.04, 2.4, 8), metalMat);
  pole.position.y = 1.2;
  group.add(pole);

  // Curved arm
  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.025, 0.025), metalMat);
  arm.position.set(0.25, 2.35, 0);
  arm.rotation.z = -0.15;
  group.add(arm);

  // Lamp housing
  const housing = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.04, 0.12), metalMat);
  housing.position.set(0.5, 2.28, 0);
  group.add(housing);

  // Lamp diffuser
  const diffuser = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.015, 0.08), lampMat);
  diffuser.position.set(0.5, 2.255, 0);
  group.add(diffuser);

  // Light source
  const light = new THREE.PointLight(0xffeecc, 2.5, 7, 2);
  light.position.set(0.5, 2.2, 0);
  light.castShadow = true;
  light.shadow.mapSize.set(256, 256);
  group.add(light);

  // Base plate
  const basePlate = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.02, 0.2), metalMat);
  basePlate.position.y = 0.01;
  group.add(basePlate);

  // Base bolts
  [[-0.07, -0.07], [0.07, -0.07], [-0.07, 0.07], [0.07, 0.07]].forEach(([x, z]) => {
    const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.015, 6), chrome);
    bolt.position.set(x, 0.025, z);
    group.add(bolt);
  });

  // Access panel (on pole)
  const panel = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.12, 0.005), metalMat);
  panel.position.set(0, 0.5, 0.035);
  group.add(panel);
  // Panel screw
  const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.008, 6), chrome);
  screw.rotation.x = Math.PI / 2;
  screw.position.set(0, 0.55, 0.04);
  group.add(screw);

  group.userData.type = 'street-light';
  return group;
}

/**
 * 长椅 — 公园长椅
 */
export function createBench() {
  const group = new THREE.Group();
  const woodMat = new THREE.MeshStandardMaterial({ color: 0x7a5a2a, roughness: 0.85 });
  const woodDk = new THREE.MeshStandardMaterial({ color: 0x6a4a1a, roughness: 0.85 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 0.45, metalness: 0.65 });

  // Seat planks (5 slats with gaps)
  for (let i = 0; i < 5; i++) {
    const plank = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.025, 0.06), i % 2 === 0 ? woodMat : woodDk);
    plank.position.set(0, 0.36, -0.14 + i * 0.065);
    plank.castShadow = true;
    group.add(plank);
  }

  // Back planks (3 slats)
  for (let i = 0; i < 3; i++) {
    const plank = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.07, 0.018), i % 2 === 0 ? woodMat : woodDk);
    plank.position.set(0, 0.48 + i * 0.1, -0.19);
    plank.rotation.x = -0.15;
    group.add(plank);
  }

  // Cast iron sides (2)
  [-0.38, 0.38].forEach(x => {
    // Seat support
    const support = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.35), metalMat);
    support.position.set(x, 0.34, -0.02);
    group.add(support);
    // Front leg
    const frontLeg = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.34, 0.04), metalMat);
    frontLeg.position.set(x, 0.17, 0.14);
    group.add(frontLeg);
    // Rear leg
    const rearLeg = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.36, 0.04), metalMat);
    rearLeg.position.set(x, 0.18, -0.18);
    group.add(rearLeg);
    // Back support
    const backSup = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.45, 0.04), metalMat);
    backSup.position.set(x, 0.55, -0.2);
    backSup.rotation.x = -0.15;
    group.add(backSup);
    // Foot pad
    [0.14, -0.18].forEach(z => {
      const pad = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.01, 0.06), metalMat);
      pad.position.set(x, 0.005, z);
      group.add(pad);
    });
    // Armrest
    const armrest = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.025, 0.2), metalMat);
    armrest.position.set(x, 0.48, 0);
    group.add(armrest);
  });

  // Mounting bolts (decorative)
  [-0.38, 0.38].forEach(x => {
    [0.36, 0.5, 0.62].forEach(y => {
      const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.05, 6), chrome);
      bolt.rotation.z = Math.PI / 2;
      bolt.position.set(x, y, -0.19);
      group.add(bolt);
    });
  });

  group.userData.type = 'bench';
  return group;
}
