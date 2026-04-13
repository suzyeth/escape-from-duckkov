import * as THREE from 'three';
import { MAT } from './materials.js';

const eyeWhite = new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.5 });
const eyePupil = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.6 });
const mouthMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.8 });
const bootMat = new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 0.85 });
const beltMat = new THREE.MeshStandardMaterial({ color: 0x4a3a2a, roughness: 0.8 });
const buckleMat = new THREE.MeshStandardMaterial({ color: 0xaa9955, metalness: 0.6, roughness: 0.3 });

/**
 * Q版玩家角色 — 大头/身体/双腿 + 表情 + 装饰
 */
export function createPlayer() {
  const group = new THREE.Group();

  // === Head (40% of total height) ===
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 14), MAT.player);
  head.position.y = 0.48;
  head.castShadow = true;
  group.add(head);

  // Eyes (white + pupil)
  [-0.05, 0.05].forEach(x => {
    // Eye white
    const white = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 8), eyeWhite);
    white.position.set(x, 0.5, 0.12);
    white.scale.z = 0.6;
    group.add(white);
    // Pupil
    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.016, 8, 6), eyePupil);
    pupil.position.set(x, 0.5, 0.14);
    group.add(pupil);
    // Eye highlight
    const highlight = new THREE.Mesh(new THREE.SphereGeometry(0.006, 6, 4),
      new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.3 }));
    highlight.position.set(x + 0.01, 0.51, 0.145);
    group.add(highlight);
  });

  // Mouth (slight smile)
  const mouth = new THREE.Mesh(
    new THREE.TorusGeometry(0.03, 0.005, 4, 12, Math.PI),
    mouthMat
  );
  mouth.position.set(0, 0.43, 0.13);
  mouth.rotation.x = -0.2;
  mouth.rotation.z = Math.PI;
  group.add(mouth);

  // Eyebrows
  [-0.05, 0.05].forEach((x, i) => {
    const brow = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.006, 0.01), mouthMat);
    brow.position.set(x, 0.54, 0.13);
    brow.rotation.z = i === 0 ? 0.15 : -0.15;
    group.add(brow);
  });

  // === Body ===
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.22, 14), MAT.player);
  body.position.y = 0.27;
  body.castShadow = true;
  group.add(body);

  // Belt
  const belt = new THREE.Mesh(
    new THREE.CylinderGeometry(0.122, 0.122, 0.025, 14),
    beltMat
  );
  belt.position.y = 0.22;
  group.add(belt);
  // Belt buckle
  const buckle = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.02, 0.01), buckleMat);
  buckle.position.set(0, 0.22, 0.12);
  group.add(buckle);

  // Collar / neckline
  const collar = new THREE.Mesh(
    new THREE.TorusGeometry(0.1, 0.012, 6, 14),
    new THREE.MeshStandardMaterial({ color: 0x3aaa99, roughness: 0.7 })
  );
  collar.position.y = 0.37;
  collar.rotation.x = Math.PI / 2;
  group.add(collar);

  // Pocket (chest)
  const pocket = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.035, 0.005),
    new THREE.MeshStandardMaterial({ color: 0x339999, roughness: 0.75 }));
  pocket.position.set(0.04, 0.31, 0.1);
  group.add(pocket);
  // Pocket flap
  const pocketFlap = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.008, 0.006),
    new THREE.MeshStandardMaterial({ color: 0x339999, roughness: 0.75 }));
  pocketFlap.position.set(0.04, 0.33, 0.1);
  group.add(pocketFlap);

  // === Arms (small stubs) ===
  [-0.13, 0.13].forEach(x => {
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.025, 0.12, 8), MAT.player);
    arm.position.set(x, 0.27, 0);
    arm.rotation.z = x > 0 ? -0.3 : 0.3;
    group.add(arm);
    // Hand (sphere)
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 6),
      new THREE.MeshStandardMaterial({ color: 0xddbb88, roughness: 0.8 }));
    hand.position.set(x + (x > 0 ? 0.02 : -0.02), 0.21, 0);
    group.add(hand);
  });

  // === Legs ===
  const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.035, 0.1, 8), MAT.player);
  leftLeg.position.set(-0.055, 0.11, 0);
  group.add(leftLeg);
  const rightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.035, 0.1, 8), MAT.player);
  rightLeg.position.set(0.055, 0.11, 0);
  group.add(rightLeg);

  // Boots
  [-0.055, 0.055].forEach(x => {
    const boot = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.08), bootMat);
    boot.position.set(x, 0.04, 0.01);
    group.add(boot);
    // Boot sole
    const sole = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.01, 0.085),
      new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.95 }));
    sole.position.set(x, 0.02, 0.01);
    group.add(sole);
  });

  // === Selection circle ===
  const circle = new THREE.Mesh(
    new THREE.RingGeometry(0.2, 0.24, 32),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35 })
  );
  circle.rotation.x = -Math.PI / 2;
  circle.position.y = 0.015;
  group.add(circle);

  // Inner glow ring
  const innerRing = new THREE.Mesh(
    new THREE.RingGeometry(0.16, 0.2, 32),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1 })
  );
  innerRing.rotation.x = -Math.PI / 2;
  innerRing.position.y = 0.014;
  group.add(innerRing);

  group.userData.type = 'player';
  return group;
}

/**
 * 走路动画 — 在 animate loop 中调用
 * @param {THREE.Group} player createPlayer 返回的 group
 * @param {number} time elapsed time
 * @param {boolean} moving 是否在移动
 */
export function animatePlayerWalk(player, time, moving) {
  if (!moving) return;
  // Find legs by searching for the right y position range
  const children = player.children;
  // Left leg (index may vary, search by position)
  children.forEach(child => {
    if (child.geometry?.type === 'CylinderGeometry' &&
        Math.abs(child.position.x - (-0.055)) < 0.01 &&
        Math.abs(child.position.y - 0.11) < 0.03) {
      child.position.y = 0.11 + Math.sin(time * 12) * 0.015;
      child.rotation.x = Math.sin(time * 12) * 0.2;
    }
    if (child.geometry?.type === 'CylinderGeometry' &&
        Math.abs(child.position.x - 0.055) < 0.01 &&
        Math.abs(child.position.y - 0.11) < 0.03) {
      child.position.y = 0.11 + Math.sin(time * 12 + Math.PI) * 0.015;
      child.rotation.x = Math.sin(time * 12 + Math.PI) * 0.2;
    }
  });
  // Slight body bob
  children.forEach(child => {
    if (child.geometry?.type === 'SphereGeometry' && child.position.y > 0.4) {
      // Head bob
      child.position.y = 0.48 + Math.sin(time * 24) * 0.005;
    }
  });
}
