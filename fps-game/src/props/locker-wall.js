import * as THREE from 'three';
import { MAT } from './materials.js';

const handleMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.6, roughness: 0.3 });
const innerMat = new THREE.MeshStandardMaterial({ color: 0x3a4a5a, roughness: 0.8 });
const shoesMat = new THREE.MeshStandardMaterial({ color: 0x4a3a2a, roughness: 0.9 });

/**
 * 储物墙 3×3 — 暖橙发光格，冷暖对比核心道具
 */
export function createLockerWall() {
  const group = new THREE.Group();

  // Back frame
  const frame = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.4, 0.12), MAT.locker);
  frame.position.set(0, 0.7, 0);
  frame.castShadow = true;
  group.add(frame);

  // Frame edge trim (darker)
  const edgeMat = new THREE.MeshStandardMaterial({ color: 0x3a4a5a, metalness: 0.4, roughness: 0.6 });
  // Top/bottom edges
  [0.0, 1.4].forEach(y => {
    const edge = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.03, 0.14), edgeMat);
    edge.position.set(0, y + 0.015, 0);
    group.add(edge);
  });
  // Side edges
  [-0.8, 0.8].forEach(x => {
    const edge = new THREE.Mesh(new THREE.BoxGeometry(0.03, 1.4, 0.14), edgeMat);
    edge.position.set(x, 0.7, 0);
    group.add(edge);
  });

  // Vertical dividers
  [-0.27, 0.27].forEach(x => {
    const div = new THREE.Mesh(new THREE.BoxGeometry(0.02, 1.35, 0.13), edgeMat);
    div.position.set(x, 0.7, 0.005);
    group.add(div);
  });
  // Horizontal dividers
  [0.47, 0.93].forEach(y => {
    const div = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.02, 0.13), edgeMat);
    div.position.set(0, y, 0.005);
    group.add(div);
  });

  // 3×3 doors with detail
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const isOpen = r === 1 && c === 1; // center one open
      const doorX = -0.53 + c * 0.53;
      const doorY = 0.24 + r * 0.46;

      if (isOpen) {
        // Open compartment — show interior
        const interior = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.4, 0.08), innerMat);
        interior.position.set(doorX, doorY, 0.02);
        group.add(interior);
        // Items inside (boots silhouette)
        const boots = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.12, 0.06), shoesMat);
        boots.position.set(doorX - 0.1, doorY - 0.1, 0.05);
        group.add(boots);
        // Door swung open
        const openDoor = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.4, 0.48), MAT.lockerDoor);
        openDoor.position.set(doorX + 0.25, doorY, 0.28);
        group.add(openDoor);
      } else {
        // Closed door
        const door = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.4, 0.02), MAT.lockerDoor);
        door.position.set(doorX, doorY, 0.07);
        group.add(door);
        // Door handle
        const handle = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.015, 0.02), handleMat);
        handle.position.set(doorX + 0.15, doorY, 0.09);
        group.add(handle);
        // Keyhole
        const keyhole = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.01, 8), handleMat);
        keyhole.rotation.x = Math.PI / 2;
        keyhole.position.set(doorX + 0.15, doorY - 0.03, 0.085);
        group.add(keyhole);
        // Number plate
        const numPlate = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.025, 0.003),
          new THREE.MeshStandardMaterial({ color: 0xddddcc, roughness: 0.8 }));
        numPlate.position.set(doorX, doorY + 0.15, 0.085);
        group.add(numPlate);
      }
    }
  }

  // Warm point light (from open compartment + general glow)
  const light = new THREE.PointLight(0xcc9944, 3, 5, 2);
  light.position.set(0, 0.7, 0.6);
  group.add(light);

  // Secondary glow from closed doors
  const glow = new THREE.PointLight(0xcc9944, 1, 3, 2);
  glow.position.set(0, 0.3, 0.4);
  group.add(glow);

  group.userData.type = 'locker-wall';
  return group;
}
