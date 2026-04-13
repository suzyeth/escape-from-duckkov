import * as THREE from 'three';
import { MAT } from './materials.js';

const chrome = new THREE.MeshStandardMaterial({ color: 0x999999, metalness: 0.8, roughness: 0.2 });
const darkPanel = new THREE.MeshStandardMaterial({ color: 0x2a3a4a, roughness: 0.7, metalness: 0.3 });
const labelMat = new THREE.MeshStandardMaterial({ color: 0xddddcc, roughness: 0.8 });

/**
 * 自动售货机/终端 — 蓝灰机身+绿色发光屏
 */
export function createVendingMachine() {
  const group = new THREE.Group();

  // Main body
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.3, 0.5), MAT.vendBody);
  body.position.set(0, 0.65, 0);
  body.castShadow = true;
  group.add(body);

  // Top header (brand panel)
  const header = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.12, 0.02),
    new THREE.MeshStandardMaterial({ color: 0x33aa66, emissive: 0x33aa66, emissiveIntensity: 0.8, roughness: 0.5 }));
  header.position.set(0, 1.24, 0.26);
  group.add(header);
  // Header text placeholder
  const headerText = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.04, 0.003), labelMat);
  headerText.position.set(0, 1.24, 0.272);
  group.add(headerText);

  // Screen
  const screen = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.22, 0.01), MAT.vendScreen);
  screen.position.set(0, 1.02, 0.256);
  group.add(screen);
  // Screen bezel
  const bezelMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.8 });
  const bezel = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.26, 0.008), bezelMat);
  bezel.position.set(0, 1.02, 0.252);
  group.add(bezel);

  // Display content (fake UI lines on screen)
  for (let i = 0; i < 3; i++) {
    const line = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.008, 0.002),
      new THREE.MeshStandardMaterial({ color: 0x22aa55, emissive: 0x22aa55, emissiveIntensity: 1.5 }));
    line.position.set(0, 1.07 - i * 0.03, 0.262);
    group.add(line);
  }

  // Button panel area
  const btnPanel = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.2, 0.015), darkPanel);
  btnPanel.position.set(0, 0.78, 0.258);
  group.add(btnPanel);

  // Buttons (3x3 grid)
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const btn = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.015), chrome);
      btn.position.set(-0.1 + c * 0.1, 0.82 - r * 0.06, 0.268);
      group.add(btn);
    }
  }

  // Coin slot
  const coinSlot = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.005, 0.015), chrome);
  coinSlot.position.set(0.2, 0.82, 0.268);
  group.add(coinSlot);

  // Dispenser opening (bottom)
  const dispenser = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.15, 0.03), darkPanel);
  dispenser.position.set(0, 0.35, 0.254);
  group.add(dispenser);
  // Dispenser flap
  const flap = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.12, 0.005),
    new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.5, metalness: 0.3 }));
  flap.position.set(0, 0.35, 0.27);
  group.add(flap);

  // Side panels (slightly different color)
  [-0.305, 0.305].forEach(x => {
    const sidePanel = new THREE.Mesh(new THREE.BoxGeometry(0.01, 1.25, 0.48),
      new THREE.MeshStandardMaterial({ color: 0x4a5a6a, roughness: 0.6, metalness: 0.4 }));
    sidePanel.position.set(x, 0.65, 0);
    group.add(sidePanel);
  });

  // Ventilation grille (bottom)
  for (let i = 0; i < 8; i++) {
    const slat = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.005, 0.003), MAT.metal);
    slat.position.set(0, 0.1 + i * 0.015, 0.252);
    group.add(slat);
  }

  // Power cord (back, visible from side)
  const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.4, 6),
    new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.9 }));
  cord.position.set(0.15, 0.2, -0.26);
  group.add(cord);

  // Green glow
  const light = new THREE.PointLight(0x33aa66, 1.5, 3, 2);
  light.position.set(0, 1.0, 0.6);
  group.add(light);

  group.userData.type = 'vending-machine';
  return group;
}
