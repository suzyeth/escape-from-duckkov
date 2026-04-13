import * as THREE from 'three';

const rimMat = new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.6, roughness: 0.35 });

/**
 * 油桶 — 带桶箍、盖口、标签
 */
export function createBarrel({ color = 0x4a7a3a, fallen = false } = {}) {
  const group = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({ color, roughness: 0.7, metalness: 0.3 });

  // Main body (slightly wider in middle)
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.5, 14), bodyMat);
  body.position.y = 0.275;
  body.castShadow = true;
  group.add(body);

  // Top/bottom lids
  [0.0, 0.55].forEach(y => {
    const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.185, 0.185, 0.02, 14), rimMat);
    lid.position.y = y + 0.01;
    group.add(lid);
  });

  // Barrel hoops (3 rings)
  [0.08, 0.275, 0.47].forEach(y => {
    const hoop = new THREE.Mesh(new THREE.TorusGeometry(0.192, 0.006, 6, 20), rimMat);
    hoop.position.y = y;
    hoop.rotation.x = Math.PI / 2;
    group.add(hoop);
  });

  // Top bung (fill cap)
  const bung = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.015, 8), rimMat);
  bung.position.set(0.07, 0.565, 0);
  group.add(bung);

  // Second bung (smaller)
  const bung2 = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.012, 8), rimMat);
  bung2.position.set(-0.06, 0.565, 0.05);
  group.add(bung2);

  // Label
  const labelMat = new THREE.MeshStandardMaterial({ color: 0xddddcc, roughness: 0.8 });
  const label = new THREE.Mesh(new THREE.CylinderGeometry(0.195, 0.195, 0.12, 14, 1, true), labelMat);
  label.position.y = 0.33;
  group.add(label);

  // Hazard diamond on label
  const hazMat = new THREE.MeshStandardMaterial({ color: 0xdd6600, roughness: 0.7 });
  const haz = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.003), hazMat);
  haz.position.set(0, 0.34, 0.196);
  haz.rotation.z = Math.PI / 4;
  group.add(haz);

  // Drip stain (bottom, subtle)
  if (Math.random() > 0.5) {
    const drip = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.08, 0.003),
      new THREE.MeshStandardMaterial({ color: 0x333322, roughness: 0.95 }));
    drip.position.set(0.12, 0.12, 0.17);
    group.add(drip);
  }

  if (fallen) {
    group.rotation.x = Math.PI / 2;
    group.position.y = 0.19;
  }

  group.userData.type = 'barrel';
  return group;
}
