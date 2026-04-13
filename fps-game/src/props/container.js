import * as THREE from 'three';
import { MAT } from './materials.js';

/**
 * 金属集装箱 — 大型高掩体
 */
export function createContainer() {
  const group = new THREE.Group();

  // Main body
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.0, 1.0), MAT.metalBlue);
  body.position.set(0, 0.5, 0);
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  // Corrugated ridges (sides)
  const ridgeMat = new THREE.MeshStandardMaterial({ color: 0x4a5a6a, metalness: 0.5, roughness: 0.5 });
  [-0.51, 0.51].forEach(z => {
    for (let i = 0; i < 12; i++) {
      const ridge = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.9, 0.008), ridgeMat);
      ridge.position.set(-0.66 + i * 0.11, 0.5, z);
      group.add(ridge);
    }
  });

  // Corner posts (reinforcement)
  const cornerMat = new THREE.MeshStandardMaterial({ color: 0x3a4a5a, metalness: 0.6, roughness: 0.4 });
  [[-0.75, -0.5], [-0.75, 0.5], [0.75, -0.5], [0.75, 0.5]].forEach(([x, z]) => {
    const corner = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.02, 0.04), cornerMat);
    corner.position.set(x, 0.51, z);
    group.add(corner);
  });

  // Bottom frame rails
  [-0.5, 0.5].forEach(z => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(1.52, 0.06, 0.06), cornerMat);
    rail.position.set(0, 0.03, z);
    group.add(rail);
  });

  // Top frame rails
  [-0.5, 0.5].forEach(z => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(1.52, 0.04, 0.04), cornerMat);
    rail.position.set(0, 1.02, z);
    group.add(rail);
  });

  // Door (front face)
  const doorMat = new THREE.MeshStandardMaterial({ color: 0x5a6a7a, metalness: 0.45, roughness: 0.55 });
  [-0.35, 0.35].forEach(x => {
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.92, 0.02), doorMat);
    door.position.set(x, 0.5, 0.51);
    group.add(door);
  });
  // Door handles
  [-0.05, 0.05].forEach(x => {
    const handleBar = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.5, 0.03),
      new THREE.MeshStandardMaterial({ color: 0x666666, metalness: 0.6, roughness: 0.3 }));
    handleBar.position.set(x, 0.55, 0.53);
    group.add(handleBar);
  });
  // Lock bar
  const lockBar = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.04, 0.025),
    new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.7, roughness: 0.3 }));
  lockBar.position.set(0, 0.7, 0.535);
  group.add(lockBar);

  // Red circle mark (side)
  const mark = new THREE.Mesh(new THREE.CircleGeometry(0.12, 16), MAT.red);
  mark.position.set(0.5, 0.6, 0.512);
  group.add(mark);

  // ID plate
  const plateMat = new THREE.MeshStandardMaterial({ color: 0xddddcc, roughness: 0.7 });
  const plate = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.08, 0.003), plateMat);
  plate.position.set(-0.5, 0.85, 0.512);
  group.add(plate);
  // ID text bars
  for (let i = 0; i < 3; i++) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.005, 0.001),
      new THREE.MeshStandardMaterial({ color: 0x333333 }));
    bar.position.set(-0.5, 0.87 - i * 0.015, 0.514);
    group.add(bar);
  }

  group.userData.type = 'container';
  return group;
}
