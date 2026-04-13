import * as THREE from 'three';
import { MAT } from './materials.js';

/**
 * 木围栏段 — 室外
 * @param {number} length 长度 (单位数)
 * @param {boolean} broken 是否有破损段
 * @returns {THREE.Group}
 */
export function createWoodFence(length = 3, broken = false) {
  const group = new THREE.Group();
  const spacing = 0.12;
  const boardCount = Math.floor(length / spacing);

  // Horizontal rails
  [0.15, 0.45].forEach(y => {
    const rail = new THREE.Mesh(
      new THREE.BoxGeometry(length, 0.06, 0.04),
      MAT.wood
    );
    rail.position.set(0, y, 0);
    group.add(rail);
  });

  // Vertical boards
  for (let i = 0; i < boardCount; i++) {
    if (broken && i >= boardCount * 0.4 && i <= boardCount * 0.55) continue; // gap
    const board = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.5 + Math.random() * 0.1, 0.02),
      MAT.wood
    );
    board.position.set(-length / 2 + i * spacing + 0.04, 0.3, 0);
    group.add(board);
  }

  // Support posts
  [-length / 2, 0, length / 2].forEach(x => {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.65, 8), MAT.wood);
    post.position.set(x, 0.325, 0);
    group.add(post);
  });

  group.userData.type = 'wood-fence';
  return group;
}

/**
 * 矮木桩绳索 — 路径引导
 * @param {number} count 木桩数量
 * @returns {THREE.Group}
 */
export function createStakeRope(count = 6) {
  const group = new THREE.Group();
  const spacing = 0.5;

  for (let i = 0; i < count; i++) {
    const stake = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.025, 0.18, 6),
      MAT.wood
    );
    stake.position.set(i * spacing, 0.09, 0);
    group.add(stake);

    // Rope segment
    if (i < count - 1) {
      const rope = new THREE.Mesh(
        new THREE.BoxGeometry(spacing, 0.015, 0.015),
        new THREE.MeshStandardMaterial({ color: 0x5a4a3a, roughness: 0.9 })
      );
      rope.position.set(i * spacing + spacing / 2, 0.14, 0);
      group.add(rope);
    }
  }

  group.userData.type = 'stake-rope';
  return group;
}
