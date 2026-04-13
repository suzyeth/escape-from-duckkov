import * as THREE from 'three';

export const MAT = {
  // Environment (cold blue-gray)
  floor:      new THREE.MeshStandardMaterial({ color: 0x4a5058, roughness: 0.7, metalness: 0.1 }),
  floorAlt:   new THREE.MeshStandardMaterial({ color: 0x424850, roughness: 0.7, metalness: 0.1 }),
  wall:       new THREE.MeshStandardMaterial({ color: 0x5a6066, roughness: 0.85, metalness: 0.05 }),
  wallKick:   new THREE.MeshStandardMaterial({ color: 0x4a6a4a, roughness: 0.85 }),
  ceil:       new THREE.MeshStandardMaterial({ color: 0x3a3e44, roughness: 0.9 }),

  // Props
  cardboard:  new THREE.MeshStandardMaterial({ color: 0xb08050, roughness: 0.85 }),
  cardTape:   new THREE.MeshStandardMaterial({ color: 0x8a6a40, roughness: 0.8 }),
  metal:      new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 0.5, metalness: 0.7 }),
  metalBlue:  new THREE.MeshStandardMaterial({ color: 0x5a6a7a, roughness: 0.6, metalness: 0.5 }),
  locker:     new THREE.MeshStandardMaterial({ color: 0x4a5a6a, roughness: 0.6, metalness: 0.4 }),
  lockerDoor: new THREE.MeshStandardMaterial({ color: 0xcc9944, emissive: 0xcc9944, emissiveIntensity: 0.6, roughness: 0.7 }),
  vendBody:   new THREE.MeshStandardMaterial({ color: 0x5a6a7a, roughness: 0.5, metalness: 0.4 }),
  vendScreen: new THREE.MeshStandardMaterial({ color: 0x33aa66, emissive: 0x33aa66, emissiveIntensity: 1.2 }),
  pipe:       new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.4, metalness: 0.8 }),
  red:        new THREE.MeshStandardMaterial({ color: 0xcc3333, roughness: 0.7 }),
  yellow:     new THREE.MeshStandardMaterial({ color: 0xdab840, roughness: 0.7 }),
  lamp:       new THREE.MeshStandardMaterial({ color: 0xffffcc, emissive: 0xffffcc, emissiveIntensity: 1.5 }),
  forkliftY:  new THREE.MeshStandardMaterial({ color: 0xccaa33, roughness: 0.6, metalness: 0.3 }),
  tire:       new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.9 }),
  rock:       new THREE.MeshStandardMaterial({ color: 0x7a7a72, roughness: 0.9 }),
  greenAmmo:  new THREE.MeshStandardMaterial({ color: 0x4a7a3a, roughness: 0.7, metalness: 0.3 }),
  wood:       new THREE.MeshStandardMaterial({ color: 0x8a6a3a, roughness: 0.85 }),
  player:     new THREE.MeshStandardMaterial({ color: 0x44cccc, emissive: 0x227777, emissiveIntensity: 0.4 }),
};
