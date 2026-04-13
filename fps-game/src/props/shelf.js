import * as THREE from 'three';
import { MAT } from './materials.js';

const boxMats = [
  new THREE.MeshStandardMaterial({ color: 0xcc6633, roughness: 0.7 }),
  new THREE.MeshStandardMaterial({ color: 0x44aa66, roughness: 0.7 }),
  new THREE.MeshStandardMaterial({ color: 0xaa8855, roughness: 0.7 }),
  new THREE.MeshStandardMaterial({ color: 0x335577, roughness: 0.7 }),
  new THREE.MeshStandardMaterial({ color: 0x886644, roughness: 0.7 }),
];

/**
 * 金属货架 — 带架上随机杂物
 */
export function createShelf() {
  const group = new THREE.Group();

  // Posts (angle iron profile)
  [[-0.38, -0.15], [0.38, -0.15], [-0.38, 0.15], [0.38, 0.15]].forEach(([x, z]) => {
    // Main post
    const p = new THREE.Mesh(new THREE.BoxGeometry(0.03, 1.4, 0.03), MAT.metal);
    p.position.set(x, 0.7, z);
    group.add(p);
    // Post holes (perforations)
    for (let y = 0.2; y < 1.3; y += 0.15) {
      const hole = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.02, 0.032),
        new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.5 }));
      hole.position.set(x, y, z);
      group.add(hole);
    }
  });

  // Cross bracing (back, X pattern)
  const braceMat = new THREE.MeshStandardMaterial({ color: 0x444444, roughness: 0.6, metalness: 0.5 });
  const brace1 = new THREE.Mesh(new THREE.BoxGeometry(0.01, 1.35, 0.008), braceMat);
  brace1.position.set(0, 0.7, -0.15);
  brace1.rotation.z = 0.5;
  group.add(brace1);
  const brace2 = new THREE.Mesh(new THREE.BoxGeometry(0.01, 1.35, 0.008), braceMat);
  brace2.position.set(0, 0.7, -0.15);
  brace2.rotation.z = -0.5;
  group.add(brace2);

  // Shelf boards (3 levels)
  const shelfYs = [0.35, 0.7, 1.05];
  shelfYs.forEach(y => {
    const s = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.02, 0.32), MAT.metalBlue);
    s.position.set(0, y, 0);
    s.castShadow = true;
    group.add(s);
    // Front lip
    const lip = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.025, 0.008), MAT.metal);
    lip.position.set(0, y + 0.012, 0.16);
    group.add(lip);
  });

  // Random items on shelves
  shelfYs.forEach((y, shelfIdx) => {
    const itemCount = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < itemCount; i++) {
      const type = Math.floor(Math.random() * 5);
      const mat = boxMats[Math.floor(Math.random() * boxMats.length)];
      const xPos = -0.28 + i * (0.56 / itemCount) + Math.random() * 0.04;
      const zPos = Math.random() * 0.12 - 0.06;

      if (type === 0) {
        // Can
        const can = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.06, 10), mat);
        can.position.set(xPos, y + 0.04, zPos);
        group.add(can);
      } else if (type === 1) {
        // Bottle
        const bottle = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.022, 0.08, 8), mat);
        bottle.position.set(xPos, y + 0.05, zPos);
        group.add(bottle);
        // Cap
        const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.01, 6),
          new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.5 }));
        cap.position.set(xPos, y + 0.095, zPos);
        group.add(cap);
      } else if (type === 2) {
        // Small box
        const box = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.06), mat);
        box.position.set(xPos, y + 0.04, zPos);
        box.rotation.y = Math.random() * 0.3;
        group.add(box);
      } else if (type === 3) {
        // Stack of 2-3 flat items (books/folders)
        const count = 2 + Math.floor(Math.random() * 2);
        for (let j = 0; j < count; j++) {
          const flat = new THREE.Mesh(
            new THREE.BoxGeometry(0.07 + Math.random() * 0.03, 0.012, 0.05),
            boxMats[Math.floor(Math.random() * boxMats.length)]
          );
          flat.position.set(xPos, y + 0.016 + j * 0.013, zPos);
          flat.rotation.y = (Math.random() - 0.5) * 0.2;
          group.add(flat);
        }
      } else {
        // Fallen can (on its side)
        const fallen = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.06, 10), mat);
        fallen.position.set(xPos, y + 0.026, zPos);
        fallen.rotation.z = Math.PI / 2;
        group.add(fallen);
      }
    }

    // Dust/small debris on empty spots (sparse)
    if (Math.random() > 0.5) {
      const debris = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, 0.005, 0.015),
        new THREE.MeshStandardMaterial({ color: 0x666655, roughness: 0.95 })
      );
      debris.position.set(0.2 + Math.random() * 0.1, y + 0.013, Math.random() * 0.1);
      group.add(debris);
    }
  });

  group.userData.type = 'shelf';
  return group;
}
