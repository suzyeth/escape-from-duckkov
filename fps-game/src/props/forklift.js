import * as THREE from 'three';
import { MAT } from './materials.js';

const chrome = new THREE.MeshStandardMaterial({ color: 0x999999, metalness: 0.8, roughness: 0.2 });
const seatMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.9 });
const warnMat = new THREE.MeshStandardMaterial({ color: 0xdd6600, emissive: 0xdd6600, emissiveIntensity: 0.3, roughness: 0.7 });
const headlightMat = new THREE.MeshStandardMaterial({ color: 0xffffcc, emissive: 0xffffcc, emissiveIntensity: 0.6, roughness: 0.3 });

/**
 * 叉车 — 仓库标志性大型道具/掩体
 */
export function createForklift() {
  const group = new THREE.Group();

  // === Body ===
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.55, 1.0), MAT.forkliftY);
  body.position.set(0, 0.45, 0);
  body.castShadow = true;
  group.add(body);

  // Engine hood (front lower)
  const hood = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.3, 0.4), MAT.forkliftY);
  hood.position.set(0, 0.33, 0.55);
  hood.castShadow = true;
  group.add(hood);

  // Hood vents
  for (let i = 0; i < 4; i++) {
    const vent = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.008, 0.003), MAT.metal);
    vent.position.set(0, 0.42 + i * 0.025, 0.76);
    group.add(vent);
  }

  // Counterweight (rear)
  const cw = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.4, 0.2), MAT.forkliftY);
  cw.position.set(0, 0.38, -0.55);
  group.add(cw);

  // === Roof / Overhead Guard ===
  const roof = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.04, 1.1), MAT.metal);
  roof.position.set(0, 1.15, -0.05);
  group.add(roof);

  // Roof posts (4 corners)
  [[-0.38, -0.5], [0.38, -0.5], [-0.38, 0.45], [0.38, 0.45]].forEach(([x, z]) => {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.55, 0.035), MAT.metal);
    post.position.set(x, 0.88, z);
    group.add(post);
  });

  // === Mast ===
  // Outer mast rails
  [-0.22, 0.22].forEach(x => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.1, 0.05), MAT.metal);
    rail.position.set(x, 0.65, 0.6);
    group.add(rail);
  });
  // Cross beam
  const crossBeam = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.04, 0.04), MAT.metal);
  crossBeam.position.set(0, 1.15, 0.6);
  group.add(crossBeam);
  // Inner carriage
  const carriage = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.12, 0.04), MAT.metal);
  carriage.position.set(0, 0.4, 0.62);
  group.add(carriage);

  // === Fork Arms ===
  [-0.15, 0.15].forEach(x => {
    // Vertical part
    const forkV = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.3, 0.03), MAT.metal);
    forkV.position.set(x, 0.25, 0.65);
    group.add(forkV);
    // Horizontal part (tines)
    const forkH = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.03, 0.7), MAT.metal);
    forkH.position.set(x, 0.08, 0.98);
    group.add(forkH);
    // Fork tip (tapered)
    const tip = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.015, 0.06), MAT.metal);
    tip.position.set(x, 0.073, 1.35);
    group.add(tip);
  });

  // === Wheels ===
  [-0.38, 0.38].forEach(x => {
    // Front wheels (larger)
    const fw = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.1, 14), MAT.tire);
    fw.rotation.z = Math.PI / 2;
    fw.position.set(x, 0.16, 0.4);
    fw.castShadow = true;
    group.add(fw);
    // Hub cap
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.02, 10), chrome);
    hub.rotation.z = Math.PI / 2;
    hub.position.set(x > 0 ? x + 0.05 : x - 0.05, 0.16, 0.4);
    group.add(hub);

    // Rear wheels (smaller)
    const rw = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.08, 12), MAT.tire);
    rw.rotation.z = Math.PI / 2;
    rw.position.set(x, 0.13, -0.4);
    rw.castShadow = true;
    group.add(rw);
    const rhub = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.015, 8), chrome);
    rhub.rotation.z = Math.PI / 2;
    rhub.position.set(x > 0 ? x + 0.04 : x - 0.04, 0.13, -0.4);
    group.add(rhub);
  });

  // === Seat ===
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.06, 0.32), seatMat);
  seat.position.set(0, 0.72, -0.15);
  group.add(seat);
  const backrest = new THREE.Mesh(new THREE.BoxGeometry(0.33, 0.3, 0.04), seatMat);
  backrest.position.set(0, 0.9, -0.32);
  backrest.rotation.x = -0.1;
  group.add(backrest);

  // === Steering wheel ===
  const steeringCol = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.25, 8), MAT.metal);
  steeringCol.position.set(0, 0.85, 0.15);
  steeringCol.rotation.x = -0.6;
  group.add(steeringCol);
  const steeringWheel = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.01, 6, 16), MAT.metal);
  steeringWheel.position.set(0, 0.97, 0.05);
  steeringWheel.rotation.x = -0.6 + Math.PI / 2;
  group.add(steeringWheel);

  // === Warning elements ===
  // Warning light (top)
  const warnLight = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.05, 10), warnMat);
  warnLight.position.set(0, 1.2, -0.4);
  group.add(warnLight);

  // Headlights
  [-0.25, 0.25].forEach(x => {
    const hl = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.035, 0.03, 10), headlightMat);
    hl.rotation.x = Math.PI / 2;
    hl.position.set(x, 0.45, 0.76);
    group.add(hl);
  });

  // Warning stripes (sides)
  [-0.38, 0.38].forEach(x => {
    for (let i = 0; i < 3; i++) {
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.003, 0.08, 0.08),
        new THREE.MeshStandardMaterial({ color: i % 2 === 0 ? 0x111111 : 0xddaa00, roughness: 0.8 }));
      stripe.position.set(x, 0.5 + i * 0.06, 0.35);
      group.add(stripe);
    }
  });

  // === Hydraulic hoses ===
  [-0.18, 0.18].forEach(x => {
    const hose = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.6, 6), MAT.metal);
    hose.position.set(x, 0.7, 0.58);
    group.add(hose);
  });

  group.userData.type = 'forklift';
  return group;
}
