import * as THREE from 'three';
import { MAT } from './materials.js';

/**
 * 灭火器
 * @returns {THREE.Group}
 */
export function createExtinguisher() {
  const group = new THREE.Group();

  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.3, 12), MAT.red);
  body.position.set(0, 0.15, 0);
  group.add(body);

  const handle = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.04), MAT.metal);
  handle.position.set(0, 0.32, 0);
  group.add(handle);

  const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.08, 6), MAT.metal);
  nozzle.rotation.z = Math.PI / 4;
  nozzle.position.set(0.04, 0.34, 0);
  group.add(nozzle);

  group.userData.type = 'extinguisher';
  return group;
}
