import * as THREE from 'three';
import { MAT } from './materials.js';

/**
 * 纸箱堆 — 鸭科夫仓库核心道具
 * Materials created per-cluster to avoid cross-contamination on open/tint.
 * @param {number} count 箱子数量 (3-8)
 * @returns {THREE.Group}
 */
export function createCrateCluster(count = 5) {
  const labelMat = new THREE.MeshStandardMaterial({ color: 0x665533, roughness: 0.9 });
  const stencilMat = new THREE.MeshStandardMaterial({ color: 0x444444, roughness: 0.85 });
  const damageMat = new THREE.MeshStandardMaterial({ color: 0x8a6a3a, roughness: 0.95 });
  const cardboardVariants = [
    new THREE.MeshStandardMaterial({ color: 0xb08050, roughness: 0.85 }),
    new THREE.MeshStandardMaterial({ color: 0x9a7040, roughness: 0.88 }),
    new THREE.MeshStandardMaterial({ color: 0xc09060, roughness: 0.82 }),
  ];
  const tapeVariants = [
    new THREE.MeshStandardMaterial({ color: 0x8a6a40, roughness: 0.8 }),
    new THREE.MeshStandardMaterial({ color: 0x7a5a30, roughness: 0.8 }),
    new THREE.MeshStandardMaterial({ color: 0x9a7a50, roughness: 0.8 }),
  ];
  const group = new THREE.Group();
  const sizes = [
    [0.5, 0.4, 0.5],
    [0.6, 0.5, 0.4],
    [0.4, 0.3, 0.3],
    [0.55, 0.35, 0.45],
  ];

  for (let i = 0; i < count; i++) {
    const s = sizes[i % sizes.length];
    const varIdx = Math.floor(Math.random() * 3);
    const box = new THREE.Mesh(new THREE.BoxGeometry(s[0], s[1], s[2]), cardboardVariants[varIdx]);
    const layer = Math.floor(i / Math.ceil(count / 2));
    box.position.set(
      (Math.random() - 0.5) * 0.7,
      s[1] / 2 + layer * 0.42,
      (Math.random() - 0.5) * 0.7
    );
    box.rotation.y = Math.random() * 0.5 - 0.25;
    box.castShadow = true;
    box.receiveShadow = true;
    group.add(box);

    const bx = box.position.x, by = box.position.y, bz = box.position.z;
    const ry = box.rotation.y;

    // Cross tape on top
    const tapeMat = tapeVariants[varIdx];
    const tapeH = new THREE.Mesh(new THREE.BoxGeometry(s[0] * 0.92, 0.015, 0.025), tapeMat);
    tapeH.position.set(bx, by + s[1] / 2 + 0.008, bz);
    tapeH.rotation.y = ry;
    group.add(tapeH);
    const tapeV = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.015, s[2] * 0.92), tapeMat);
    tapeV.position.copy(tapeH.position);
    tapeV.rotation.y = ry;
    group.add(tapeV);

    // Side tape (runs down sides)
    [-1, 1].forEach(side => {
      const sideTape = new THREE.Mesh(new THREE.BoxGeometry(0.025, s[1] * 0.4, 0.005), tapeMat);
      sideTape.position.set(bx, by + s[1] * 0.2, bz + side * s[2] / 2);
      sideTape.rotation.y = ry;
      group.add(sideTape);
    });

    // Edge creases (darker lines on box edges)
    const creaseMat = new THREE.MeshStandardMaterial({ color: 0x8a6838, roughness: 0.9 });
    // Top edge lines
    [[-s[0]/2, s[1]/2, 0], [s[0]/2, s[1]/2, 0]].forEach(([cx, cy, cz]) => {
      const crease = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.008, s[2] * 0.95), creaseMat);
      crease.position.set(bx + cx, by + cy, bz + cz);
      crease.rotation.y = ry;
      group.add(crease);
    });

    // Shipping label (random boxes)
    if (Math.random() > 0.5) {
      const label = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.003), labelMat);
      const labelSide = Math.random() > 0.5 ? s[2] / 2 + 0.002 : -(s[2] / 2 + 0.002);
      label.position.set(bx + (Math.random() - 0.5) * 0.1, by, bz + labelSide);
      label.rotation.y = ry;
      group.add(label);
      // Barcode on label
      for (let b = 0; b < 6; b++) {
        const bar = new THREE.Mesh(
          new THREE.BoxGeometry(0.003 + Math.random() * 0.003, 0.03, 0.001),
          stencilMat
        );
        bar.position.set(
          bx + (Math.random() - 0.5) * 0.08,
          by - 0.015,
          bz + labelSide + (labelSide > 0 ? 0.002 : -0.002)
        );
        bar.rotation.y = ry;
        group.add(bar);
      }
    }

    // Stencil number (random boxes)
    if (Math.random() > 0.6) {
      const num = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.05, 0.002), stencilMat);
      num.position.set(bx + s[0] / 2 + 0.001, by + 0.05, bz);
      num.rotation.y = ry + Math.PI / 2;
      group.add(num);
    }

    // Dented/crushed corner (random)
    if (Math.random() > 0.7) {
      const dent = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.06, 0.06),
        damageMat
      );
      dent.position.set(
        bx + (Math.random() > 0.5 ? 1 : -1) * s[0] * 0.4,
        by + s[1] * 0.3,
        bz + (Math.random() > 0.5 ? 1 : -1) * s[2] * 0.4
      );
      dent.rotation.set(0.3, 0.2, 0.1);
      dent.scale.set(0.8, 0.7, 0.9);
      group.add(dent);
    }
  }

  group.userData.type = 'crate-cluster';
  return group;
}
