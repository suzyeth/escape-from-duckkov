import * as THREE from 'three';
import { MAT } from './materials.js';

/**
 * 弹药箱 — 军绿色
 * @returns {THREE.Group}
 */
export function createAmmoCrate() {
  const group = new THREE.Group();

  const box = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.2, 0.25), MAT.greenAmmo);
  box.position.set(0, 0.1, 0);
  box.castShadow = true;
  group.add(box);

  // Latch
  const latch = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.04, 0.02), MAT.metal);
  latch.position.set(0, 0.21, 0.13);
  group.add(latch);

  group.userData.type = 'ammo-crate';
  return group;
}
