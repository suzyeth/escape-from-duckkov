import * as THREE from 'three';

// === 材质工厂 ===
const m = (color, opts = {}) => new THREE.MeshStandardMaterial({
  color, roughness: opts.roughness ?? 0.7, metalness: opts.metalness ?? 0.1,
  emissive: opts.emissive ?? 0x000000, emissiveIntensity: opts.ei ?? 0,
});

// 常用材质缓存
const gunMetal = m(0x2a2a2a, { metalness: 0.7, roughness: 0.35 });
const gunMetalDk = m(0x1a1a1a, { metalness: 0.7, roughness: 0.3 });
const woodGun = m(0x6a4a2a, { roughness: 0.85 });
const woodDk = m(0x5a3a1a, { roughness: 0.85 });
const chrome = m(0x999999, { metalness: 0.8, roughness: 0.2 });
const brass = m(0xccaa44, { metalness: 0.7, roughness: 0.3 });
const whiteMat = m(0xeeeeee);
const paperMat = m(0xddddcc);

// ============================
// 武器
// ============================

/** AK-47 */
export function createAK47() {
  const g = new THREE.Group();
  // Upper receiver
  g.add(box(0.055, 0.06, 0.28, 0, 0.05, 0, gunMetal));
  // Dust cover (top)
  g.add(box(0.045, 0.015, 0.22, 0, 0.083, -0.02, gunMetalDk));
  // Barrel
  g.add(cyl(0.012, 0.22, 0, 0.05, -0.25, gunMetalDk));
  // Front sight
  g.add(box(0.008, 0.025, 0.008, 0, 0.075, -0.34, gunMetal));
  // Rear sight
  g.add(box(0.03, 0.015, 0.006, 0, 0.09, -0.08, gunMetal));
  // Gas tube (above barrel)
  g.add(cyl(0.008, 0.15, 0, 0.072, -0.2, woodGun));
  // Magazine (curved)
  const mag = box(0.035, 0.12, 0.025, 0, -0.02, 0.02, gunMetal);
  mag.rotation.x = 0.2;
  g.add(mag);
  // Mag ridge lines
  g.add(box(0.036, 0.003, 0.025, 0, -0.06, 0.03, gunMetalDk));
  // Stock (wood)
  g.add(box(0.04, 0.055, 0.18, 0, 0.04, 0.23, woodGun));
  // Stock butt plate
  g.add(box(0.042, 0.06, 0.008, 0, 0.04, 0.325, gunMetal));
  // Pistol grip
  const grip = box(0.03, 0.065, 0.025, 0, -0.01, 0.1, woodDk);
  grip.rotation.x = -0.25;
  g.add(grip);
  // Trigger guard
  g.add(box(0.003, 0.003, 0.06, 0, -0.01, 0.06, gunMetal));
  g.add(box(0.003, 0.025, 0.003, 0, 0.0, 0.03, gunMetal));
  // Muzzle brake
  g.add(cyl(0.015, 0.03, 0, 0.05, -0.37, gunMetalDk));
  g.userData.type = 'weapon-ak47';
  return g;
}

/** 手枪 */
export function createPistol() {
  const g = new THREE.Group();
  // Slide
  g.add(box(0.03, 0.03, 0.1, 0, 0.04, 0, gunMetal));
  // Slide serrations (rear)
  for (let i = 0; i < 4; i++) {
    g.add(box(0.031, 0.002, 0.003, 0, 0.04, 0.03 + i * 0.008, gunMetalDk));
  }
  // Frame / grip
  const grip = box(0.028, 0.06, 0.04, 0, -0.005, 0.02, gunMetalDk);
  grip.rotation.x = -0.15;
  g.add(grip);
  // Grip texture lines
  for (let i = 0; i < 3; i++) {
    g.add(box(0.029, 0.002, 0.003, 0, -0.02 + i * 0.012, 0.03, m(0x222222)));
  }
  // Barrel
  g.add(cyl(0.008, 0.04, 0, 0.04, -0.07, gunMetalDk));
  // Front sight
  g.add(box(0.006, 0.012, 0.004, 0, 0.058, -0.04, m(0xdddddd)));
  // Rear sight notch
  g.add(box(0.02, 0.01, 0.004, 0, 0.057, 0.04, gunMetal));
  // Trigger
  g.add(box(0.003, 0.015, 0.003, 0, 0.013, 0.0, chrome));
  // Trigger guard
  g.add(box(0.003, 0.003, 0.04, 0, 0.005, -0.005, gunMetal));
  // Magazine base
  g.add(box(0.025, 0.008, 0.03, 0, -0.035, 0.015, gunMetal));
  g.userData.type = 'weapon-pistol';
  return g;
}

/** 霰弹枪 */
export function createShotgun() {
  const g = new THREE.Group();
  // Receiver
  g.add(box(0.04, 0.05, 0.15, 0, 0.025, 0, gunMetal));
  // Barrel
  g.add(cyl(0.016, 0.35, 0, 0.03, -0.25, gunMetalDk));
  // Magazine tube (under barrel)
  g.add(cyl(0.012, 0.25, 0, 0.005, -0.2, gunMetal));
  // Pump grip
  g.add(box(0.04, 0.04, 0.08, 0, 0.005, -0.13, woodGun));
  // Stock
  g.add(box(0.038, 0.05, 0.2, 0, 0.02, 0.18, woodGun));
  // Stock butt
  g.add(box(0.04, 0.055, 0.01, 0, 0.02, 0.285, m(0x3a3a3a)));
  // Pistol grip
  const grip = box(0.03, 0.055, 0.025, 0, -0.02, 0.06, woodDk);
  grip.rotation.x = -0.2;
  g.add(grip);
  // Trigger guard
  g.add(box(0.003, 0.003, 0.05, 0, -0.01, 0.03, gunMetal));
  // Front bead sight
  const bead = new THREE.Mesh(new THREE.SphereGeometry(0.005, 6, 4), m(0xdddddd));
  bead.position.set(0, 0.048, -0.4);
  g.add(bead);
  // Muzzle
  g.add(cyl(0.018, 0.015, 0, 0.03, -0.43, gunMetalDk));
  g.userData.type = 'weapon-shotgun';
  return g;
}

/** 铲子（近战） */
export function createShovel() {
  const g = new THREE.Group();
  // Handle
  g.add(cyl(0.012, 0.45, 0, 0.225, 0, m(0x6a5a3a)));
  // Handle grip wrap
  g.add(cyl(0.014, 0.08, 0, 0.03, 0, m(0x333333)));
  // Blade
  const blade = box(0.1, 0.11, 0.015, 0, 0.51, 0, m(0x5a5a5a, { metalness: 0.5 }));
  g.add(blade);
  // Blade edge (sharper color)
  g.add(box(0.1, 0.008, 0.016, 0, 0.455, 0, chrome));
  // Socket
  g.add(cyl(0.015, 0.03, 0, 0.465, 0, m(0x4a4a4a, { metalness: 0.4 })));
  g.userData.type = 'weapon-shovel';
  return g;
}

// ============================
// 弹药
// ============================

/** 步枪弹药盒 */
export function createRifleAmmo() {
  const g = new THREE.Group();
  // Box
  g.add(box(0.08, 0.04, 0.06, 0, 0.02, 0, m(0xbbaa33)));
  // Label
  g.add(box(0.06, 0.025, 0.001, 0, 0.025, 0.031, m(0x886622)));
  // Visible bullets in box
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 4; c++) {
      const bullet = cyl(0.004, 0.025, -0.02 + c * 0.013, 0.043, -0.015 + r * 0.015, brass);
      g.add(bullet);
      // Bullet tip
      const tip = new THREE.Mesh(new THREE.SphereGeometry(0.004, 6, 4), m(0xaa7733, { metalness: 0.6 }));
      tip.position.set(-0.02 + c * 0.013, 0.057, -0.015 + r * 0.015);
      tip.scale.y = 1.5;
      g.add(tip);
    }
  }
  g.userData.type = 'ammo-rifle';
  return g;
}

/** 霰弹弹药 */
export function createShotgunAmmo() {
  const g = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    // Shell body
    const shell = cyl(0.011, 0.04, (i - 2) * 0.028, 0.02, 0, m(0xcc4433));
    g.add(shell);
    // Brass base
    g.add(cyl(0.012, 0.01, (i - 2) * 0.028, 0.005, 0, brass));
    // Crimp top
    g.add(cyl(0.009, 0.005, (i - 2) * 0.028, 0.042, 0, m(0xaa3322)));
  }
  g.userData.type = 'ammo-shotgun';
  return g;
}

/** 手枪弹药 */
export function createPistolAmmo() {
  const g = new THREE.Group();
  g.add(box(0.05, 0.03, 0.04, 0, 0.015, 0, m(0xccaa44)));
  // Label
  g.add(box(0.035, 0.015, 0.001, 0, 0.02, 0.021, m(0x886633)));
  // Bullets visible
  for (let i = 0; i < 3; i++) {
    g.add(cyl(0.004, 0.015, -0.012 + i * 0.012, 0.038, 0, brass));
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.004, 6, 4), m(0xaa7733, { metalness: 0.6 }));
    tip.position.set(-0.012 + i * 0.012, 0.047, 0);
    g.add(tip);
  }
  g.userData.type = 'ammo-pistol';
  return g;
}

// ============================
// 医疗
// ============================

/** 急救箱 */
export function createMedkit() {
  const g = new THREE.Group();
  const redMat = m(0xdd3333);
  // Main body
  g.add(box(0.14, 0.08, 0.1, 0, 0.04, 0, redMat));
  // Lid (slightly lighter)
  g.add(box(0.14, 0.02, 0.1, 0, 0.09, 0, m(0xee4444)));
  // White cross (top)
  g.add(box(0.06, 0.002, 0.018, 0, 0.101, 0, whiteMat));
  g.add(box(0.018, 0.002, 0.06, 0, 0.101, 0, whiteMat));
  // White cross (front)
  g.add(box(0.04, 0.012, 0.002, 0, 0.05, 0.051, whiteMat));
  g.add(box(0.012, 0.04, 0.002, 0, 0.05, 0.051, whiteMat));
  // Latch
  g.add(box(0.035, 0.015, 0.012, 0, 0.075, 0.055, chrome));
  // Handle
  g.add(box(0.06, 0.008, 0.015, 0, 0.105, 0, m(0x333333)));
  // Corner protectors
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx,sz]) => {
    g.add(box(0.012, 0.08, 0.012, sx*0.065, 0.04, sz*0.045, m(0xaa2222)));
  });
  g.userData.type = 'medical-medkit';
  return g;
}

/** 绷带 */
export function createBandage() {
  const g = new THREE.Group();
  // Roll
  const outer = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.04, 16), m(0xddddcc));
  outer.rotation.x = Math.PI / 2;
  outer.position.y = 0.028;
  g.add(outer);
  // Inner hole
  const inner = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.042, 12), m(0xccccbb));
  inner.rotation.x = Math.PI / 2;
  inner.position.y = 0.028;
  g.add(inner);
  // Loose tail
  const tail = box(0.025, 0.002, 0.04, 0.025, 0.015, 0, m(0xddddcc));
  tail.rotation.z = -0.3;
  g.add(tail);
  // Red cross on wrapper
  g.add(box(0.015, 0.002, 0.008, 0, 0.057, 0, m(0xcc3333)));
  g.add(box(0.005, 0.002, 0.02, 0, 0.057, 0, m(0xcc3333)));
  g.userData.type = 'medical-bandage';
  return g;
}

/** 注射器 */
export function createSyringe() {
  const g = new THREE.Group();
  // Barrel (transparent-ish)
  g.add(cyl(0.008, 0.07, 0, 0.035, 0, m(0xccddcc, { metalness: 0.15, roughness: 0.3 })));
  // Graduation marks
  for (let i = 0; i < 5; i++) {
    g.add(box(0.009, 0.001, 0.001, 0, 0.015 + i * 0.012, 0.005, m(0x333333)));
  }
  // Needle
  g.add(cyl(0.002, 0.025, 0, 0.083, 0, chrome));
  // Needle hub
  g.add(cyl(0.005, 0.008, 0, 0.073, 0, m(0x44aa88)));
  // Plunger
  g.add(cyl(0.007, 0.04, 0, -0.015, 0, m(0xbbbbbb, { metalness: 0.3 })));
  // Plunger handle
  g.add(cyl(0.012, 0.008, 0, -0.03, 0, m(0x44aa88)));
  // Liquid inside (colored)
  g.add(cyl(0.006, 0.03, 0, 0.04, 0, m(0x88ddaa, { roughness: 0.2, metalness: 0.05 })));
  g.userData.type = 'medical-syringe';
  return g;
}

/** 止痛药 */
export function createPainkiller() {
  const g = new THREE.Group();
  // Blister pack
  g.add(box(0.055, 0.006, 0.035, 0, 0.003, 0, m(0xdddddd)));
  // Pill bumps (2x4)
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 4; c++) {
      const pill = new THREE.Mesh(new THREE.SphereGeometry(0.005, 8, 6), m(0xcccccc, { metalness: 0.3 }));
      pill.scale.y = 0.6;
      pill.position.set(-0.018 + c * 0.012, 0.008, -0.008 + r * 0.016);
      g.add(pill);
    }
  }
  // Label stripe
  g.add(box(0.055, 0.001, 0.01, 0, -0.001, 0.015, m(0x3388aa)));
  // Brand text placeholder
  g.add(box(0.025, 0.001, 0.005, -0.01, -0.001, -0.018, m(0x2266aa)));
  g.userData.type = 'medical-painkiller';
  return g;
}

/** 止血带 */
export function createTourniquet() {
  const g = new THREE.Group();
  // Strap (C-shape)
  const strap = new THREE.Mesh(
    new THREE.TorusGeometry(0.035, 0.006, 6, 20, Math.PI * 1.6),
    m(0x222222)
  );
  strap.position.y = 0.035;
  strap.rotation.x = Math.PI / 2;
  g.add(strap);
  // Windlass rod
  g.add(box(0.04, 0.008, 0.008, 0, 0.035, -0.03, m(0x333333)));
  // Buckle
  g.add(box(0.02, 0.022, 0.008, 0.035, 0.035, 0.01, m(0x444444, { metalness: 0.4 })));
  // Red tag
  g.add(box(0.015, 0.02, 0.002, -0.035, 0.035, 0.01, m(0xcc3333)));
  // Velcro strip
  g.add(box(0.025, 0.004, 0.015, 0.01, 0.042, 0.02, m(0x1a1a1a)));
  g.userData.type = 'medical-tourniquet';
  return g;
}

// ============================
// 防具
// ============================

/** 护甲 (1-3级) */
export function createArmor(level = 1) {
  const colors = [0x6a7a5a, 0x4a5a7a, 0x3a3a4a];
  const col = colors[level - 1];
  const g = new THREE.Group();
  // Front plate
  g.add(box(0.18, 0.2, 0.025, 0, 0.1, 0.015, m(col, { metalness: level * 0.1 })));
  // Back plate
  g.add(box(0.17, 0.19, 0.02, 0, 0.1, -0.015, m(col)));
  // Side panels
  [-0.09, 0.09].forEach(x => {
    g.add(box(0.015, 0.15, 0.04, x, 0.1, 0, m(col)));
  });
  // Shoulder pads
  [-0.08, 0.08].forEach(x => {
    g.add(box(0.06, 0.02, 0.06, x, 0.2, 0, m(col)));
    // Velcro strip
    g.add(box(0.04, 0.003, 0.03, x, 0.211, 0, m(0x333333)));
  });
  // MOLLE webbing (front)
  for (let r = 0; r < 3; r++) {
    g.add(box(0.14, 0.003, 0.004, 0, 0.06 + r * 0.035, 0.029, m(col)));
  }
  // Level indicator patch
  const patchColor = [0x44aa44, 0x4488cc, 0xcc4444][level - 1];
  g.add(box(0.03, 0.02, 0.002, 0.06, 0.16, 0.028, m(patchColor)));
  // Level dots
  for (let i = 0; i < level; i++) {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.004, 6, 4), whiteMat);
    dot.position.set(0.052 + i * 0.01, 0.16, 0.03);
    g.add(dot);
  }
  g.userData.type = `armor-lv${level}`;
  return g;
}

/** 头盔 */
export function createHelmet() {
  const g = new THREE.Group();
  // Shell
  const shellGeo = new THREE.SphereGeometry(0.1, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.6);
  const shell = new THREE.Mesh(shellGeo, m(0x5a6a5a, { metalness: 0.2, roughness: 0.6 }));
  shell.position.y = 0.08;
  shell.castShadow = true;
  g.add(shell);
  // Rim
  const rim = new THREE.Mesh(
    new THREE.TorusGeometry(0.098, 0.006, 6, 24),
    m(0x4a5a4a, { metalness: 0.3 })
  );
  rim.position.y = 0.04;
  rim.rotation.x = Math.PI / 2;
  g.add(rim);
  // NVG mount
  g.add(box(0.025, 0.015, 0.015, 0, 0.14, 0.06, m(0x333333, { metalness: 0.4 })));
  // Side rail
  [-0.09, 0.09].forEach(x => {
    g.add(box(0.008, 0.008, 0.05, x, 0.08, 0.02, m(0x3a3a3a, { metalness: 0.5 })));
  });
  // Velcro patch area (top)
  g.add(box(0.04, 0.002, 0.04, 0, 0.148, -0.01, m(0x4a5a4a)));
  // Chinstrap
  g.add(box(0.008, 0.04, 0.008, -0.07, 0.03, 0.04, m(0x333333)));
  g.add(box(0.008, 0.04, 0.008, 0.07, 0.03, 0.04, m(0x333333)));
  // Buckle
  g.add(box(0.015, 0.01, 0.006, 0.07, 0.01, 0.04, chrome));
  g.userData.type = 'armor-helmet';
  return g;
}

// ============================
// 背包
// ============================

/** 背包 (s/m/l) */
export function createBackpack(size = 'm') {
  const dims = { s: [0.14, 0.16, 0.07], m: [0.17, 0.2, 0.09], l: [0.2, 0.26, 0.11] };
  const colors = { s: 0x8a7a5a, m: 0x5a6a4a, l: 0x4a4a3a };
  const [w, h, d] = dims[size];
  const col = colors[size];
  const g = new THREE.Group();
  // Main body
  g.add(box(w, h, d, 0, h/2, 0, m(col)));
  // Front pocket
  g.add(box(w * 0.7, h * 0.4, 0.015, 0, h * 0.35, d/2 + 0.007, m(col)));
  // Pocket zipper
  g.add(box(w * 0.5, 0.003, 0.002, 0, h * 0.55, d/2 + 0.016, m(0x333333)));
  // Zipper pull
  g.add(box(0.008, 0.012, 0.004, w * 0.25, h * 0.55, d/2 + 0.018, chrome));
  // Top flap
  g.add(box(w * 0.95, 0.015, d * 0.7, 0, h * 0.96, d * 0.08, m(col)));
  // Flap buckle
  g.add(box(0.02, 0.015, 0.01, 0, h * 0.88, d/2 + 0.01, chrome));
  // Straps (back)
  [-w * 0.3, w * 0.3].forEach(x => {
    g.add(box(0.025, h * 0.65, 0.008, x, h * 0.6, -d/2 - 0.004, m(col)));
    // Strap adjuster
    g.add(box(0.02, 0.012, 0.006, x, h * 0.3, -d/2 - 0.006, chrome));
  });
  // MOLLE webbing
  if (size !== 's') {
    for (let r = 0; r < 2; r++) {
      g.add(box(w * 0.6, 0.003, 0.003, 0, h * 0.25 + r * 0.04, d/2 + 0.016, m(col)));
    }
  }
  // Side compression straps
  [-w/2 - 0.003, w/2 + 0.003].forEach(x => {
    g.add(box(0.006, h * 0.5, 0.003, x, h * 0.5, 0, m(0x333333)));
  });
  // Top grab handle
  g.add(box(0.04, 0.01, 0.015, 0, h + 0.005, 0, m(col)));
  g.userData.type = `backpack-${size}`;
  return g;
}

// ============================
// 食物/补给
// ============================

/** 罐头 */
export function createCannedFood() {
  const g = new THREE.Group();
  // Can body
  const can = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.055, 14), m(0xcc8833));
  can.position.y = 0.028;
  g.add(can);
  // Label wrap
  const label = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.03, 14), m(0xdd4433));
  label.position.y = 0.028;
  g.add(label);
  // Label text band
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.0365, 0.0365, 0.008, 14), m(0xeecc44));
  band.position.y = 0.03;
  g.add(band);
  // Top lid rim
  const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.033, 0.033, 0.004, 14), chrome);
  lid.position.y = 0.057;
  g.add(lid);
  // Pull tab
  g.add(box(0.012, 0.003, 0.008, 0.01, 0.06, 0, chrome));
  // Bottom rim
  const bottom = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.034, 0.003, 14), chrome);
  bottom.position.y = 0.002;
  g.add(bottom);
  g.userData.type = 'food-canned';
  return g;
}

/** 水瓶 */
export function createWaterBottle() {
  const g = new THREE.Group();
  // Body
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.028, 0.08, 12),
    m(0x4488cc, { metalness: 0.05, roughness: 0.4 })).translateY(0.04));
  // Shoulder
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.025, 0.015, 10),
    m(0x4488cc, { roughness: 0.4 })).translateY(0.085));
  // Neck
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.015, 0.015, 8),
    m(0x4488cc)).translateY(0.098));
  // Cap
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.01, 10),
    m(0xeeeeee)).translateY(0.111));
  // Label
  const lbl = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.029, 0.04, 12),
    m(0x2266aa, { roughness: 0.5 }));
  lbl.position.y = 0.035;
  g.add(lbl);
  // Water level line
  const water = new THREE.Mesh(new THREE.CylinderGeometry(0.023, 0.026, 0.06, 10),
    m(0x66aadd, { roughness: 0.2, metalness: 0.0 }));
  water.position.y = 0.035;
  g.add(water);
  g.userData.type = 'food-water';
  return g;
}

/** 能量棒 */
export function createEnergyBar() {
  const g = new THREE.Group();
  // Wrapper
  g.add(box(0.09, 0.018, 0.03, 0, 0.009, 0, m(0xddaa44)));
  // Wrapper fold lines
  g.add(box(0.09, 0.001, 0.003, 0, 0.019, 0.01, m(0xcc8833)));
  g.add(box(0.09, 0.001, 0.003, 0, 0.019, -0.01, m(0xcc8833)));
  // Torn opening showing bar
  g.add(box(0.025, 0.016, 0.028, -0.035, 0.009, 0, m(0x8a6633)));
  // Brand stripe
  g.add(box(0.04, 0.002, 0.031, 0.015, 0.019, 0, m(0xcc3333)));
  g.userData.type = 'food-energybar';
  return g;
}

/** 蜂蜜罐 */
export function createHoney() {
  const g = new THREE.Group();
  // Jar
  const jar = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.038, 0.06, 12),
    m(0xddaa33, { roughness: 0.3, metalness: 0.05 }));
  jar.position.y = 0.03;
  g.add(jar);
  // Glass rim
  const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.008, 12),
    m(0xddbb44, { roughness: 0.2 }));
  rim.position.y = 0.064;
  g.add(rim);
  // Lid
  const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.037, 0.037, 0.012, 12),
    m(0xaa7722));
  lid.position.y = 0.072;
  g.add(lid);
  // Lid grip ridges
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const ridge = box(0.003, 0.01, 0.003,
      Math.cos(angle) * 0.035, 0.072, Math.sin(angle) * 0.035, m(0x996611));
    g.add(ridge);
  }
  // Label
  const label = new THREE.Mesh(new THREE.CylinderGeometry(0.041, 0.039, 0.025, 12),
    m(0xeedd88));
  label.position.y = 0.03;
  g.add(label);
  g.userData.type = 'food-honey';
  return g;
}

// ============================
// 高价值战利品
// ============================

/** 芯片 */
export function createChip() {
  const g = new THREE.Group();
  // PCB
  g.add(box(0.045, 0.006, 0.035, 0, 0.003, 0, m(0x1a4433, { metalness: 0.2 })));
  // IC package
  g.add(box(0.015, 0.005, 0.015, 0, 0.008, 0, m(0x111111)));
  // IC dot marker
  const dot = new THREE.Mesh(new THREE.SphereGeometry(0.002, 6, 4), whiteMat);
  dot.position.set(-0.005, 0.011, -0.005);
  g.add(dot);
  // Gold traces
  for (let i = 0; i < 5; i++) {
    g.add(box(0.035, 0.0005, 0.0015, 0, 0.006, -0.013 + i * 0.007, brass));
  }
  for (let i = 0; i < 3; i++) {
    g.add(box(0.002, 0.0005, 0.03, -0.015 + i * 0.015, 0.006, 0, brass));
  }
  // Pins (sides)
  [-1, 1].forEach(sz => {
    for (let i = 0; i < 4; i++) {
      g.add(box(0.003, 0.002, 0.005, -0.005 + i * 0.004, 0.007, sz * 0.019, chrome));
    }
  });
  // Capacitor
  g.add(cyl(0.003, 0.005, 0.015, 0.008, 0.01, m(0x886633)));
  // Resistor
  g.add(box(0.008, 0.004, 0.003, -0.015, 0.008, 0.01, m(0x444444)));
  g.userData.type = 'loot-chip';
  return g;
}

/** 金条 */
export function createGoldBar() {
  const g = new THREE.Group();
  // Main bar (trapezoid-ish)
  const barMat = m(0xddaa33, { metalness: 0.85, roughness: 0.2, emissive: 0x553300, ei: 0.15 });
  g.add(box(0.08, 0.022, 0.035, 0, 0.011, 0, barMat));
  // Top bevel
  g.add(box(0.07, 0.005, 0.025, 0, 0.025, 0, barMat));
  // Stamp mark
  g.add(box(0.025, 0.001, 0.012, 0, 0.028, 0, m(0xbb9922, { metalness: 0.9 })));
  // Serial number dots
  for (let i = 0; i < 4; i++) {
    const d = new THREE.Mesh(new THREE.SphereGeometry(0.0015, 4, 3), m(0xbb9922, { metalness: 0.9 }));
    d.position.set(-0.008 + i * 0.005, 0.028, -0.008);
    g.add(d);
  }
  g.userData.type = 'loot-goldbar';
  return g;
}

/** 钥匙卡 */
export function createKeycard() {
  const g = new THREE.Group();
  // Card body
  g.add(box(0.055, 0.003, 0.035, 0, 0.0015, 0, m(0xcc66dd)));
  // Magnetic stripe
  g.add(box(0.055, 0.0005, 0.007, 0, 0.0035, 0.01, m(0x111111)));
  // Gold chip
  g.add(box(0.01, 0.001, 0.012, -0.015, 0.003, -0.005, brass));
  // Chip contact lines
  for (let i = 0; i < 3; i++) {
    g.add(box(0.008, 0.0002, 0.001, -0.015, 0.0035, -0.009 + i * 0.004, m(0xaa8833)));
  }
  // Logo placeholder
  g.add(box(0.012, 0.001, 0.012, 0.015, 0.003, -0.008, m(0xaa44bb)));
  // Text line
  g.add(box(0.03, 0.0005, 0.003, 0.005, 0.003, 0.013, m(0x9944aa)));
  // Hologram sticker
  const holo = box(0.008, 0.001, 0.008, 0.02, 0.003, 0.005,
    m(0x88ccdd, { metalness: 0.6, roughness: 0.1 }));
  g.add(holo);
  g.userData.type = 'loot-keycard';
  return g;
}

/** 情报文件 */
export function createIntelDoc() {
  const g = new THREE.Group();
  // Folder
  g.add(box(0.1, 0.008, 0.13, 0, 0.004, 0, m(0x8a7a4a)));
  // Folder spine
  g.add(box(0.003, 0.012, 0.13, -0.05, 0.006, 0, m(0x7a6a3a)));
  // Papers
  g.add(box(0.085, 0.003, 0.12, 0.005, 0.01, -0.003, paperMat));
  g.add(box(0.08, 0.003, 0.115, 0.008, 0.013, 0.005, paperMat));
  // "Classified" stamp
  g.add(box(0.04, 0.001, 0.008, 0.01, 0.016, -0.03, m(0xcc3333)));
  // Photo clipped to paper
  g.add(box(0.025, 0.001, 0.03, 0.03, 0.016, 0.02, m(0x889988)));
  // Paper clip
  g.add(box(0.003, 0.001, 0.02, 0.04, 0.017, -0.01, chrome));
  // Handwritten note
  for (let i = 0; i < 3; i++) {
    g.add(box(0.035, 0.0005, 0.001, -0.01, 0.016, -0.015 + i * 0.008, m(0x334455)));
  }
  g.userData.type = 'loot-intel';
  return g;
}

/** 武器零件 */
export function createWeaponParts() {
  const g = new THREE.Group();
  // Spring
  const spring = new THREE.Mesh(
    new THREE.TorusGeometry(0.015, 0.003, 8, 20),
    chrome
  );
  spring.position.set(-0.025, 0.015, 0);
  spring.rotation.x = Math.PI / 2;
  g.add(spring);
  // Bolt carrier
  g.add(box(0.015, 0.012, 0.04, 0.015, 0.008, 0, gunMetal));
  // Firing pin
  g.add(cyl(0.002, 0.03, 0.015, 0.006, -0.005, chrome));
  // Screws
  [-0.01, 0.01].forEach(x => {
    const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.006, 8), chrome);
    screw.position.set(x, 0.005, 0.025);
    g.add(screw);
    // Screw slot
    g.add(box(0.006, 0.001, 0.001, x, 0.009, 0.025, m(0x666666)));
  });
  // Small gear
  const gear = new THREE.Mesh(new THREE.TorusGeometry(0.008, 0.003, 6, 12), gunMetal);
  gear.position.set(-0.01, 0.006, 0.02);
  gear.rotation.x = Math.PI / 2;
  g.add(gear);
  g.userData.type = 'loot-parts';
  return g;
}

/** 灯泡 */
export function createLightbulb() {
  const g = new THREE.Group();
  // Bulb (pear shape)
  const bulbGeo = new THREE.SphereGeometry(0.022, 12, 10);
  const bulb = new THREE.Mesh(bulbGeo, m(0xeeeedd, { metalness: 0.05, roughness: 0.15 }));
  bulb.scale.y = 1.3;
  bulb.position.y = 0.045;
  g.add(bulb);
  // Neck
  g.add(cyl(0.012, 0.012, 0, 0.025, 0, m(0xddddcc, { roughness: 0.2 })));
  // Base (threaded)
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.01, 0.02, 10), brass);
  base.position.y = 0.012;
  g.add(base);
  // Thread ridges
  for (let i = 0; i < 3; i++) {
    const ridge = new THREE.Mesh(new THREE.TorusGeometry(0.013, 0.001, 4, 12),
      m(0xaa8844, { metalness: 0.6 }));
    ridge.position.y = 0.008 + i * 0.006;
    ridge.rotation.x = Math.PI / 2;
    g.add(ridge);
  }
  // Bottom contact
  const contact = new THREE.Mesh(new THREE.SphereGeometry(0.004, 6, 4), m(0x888888, { metalness: 0.6 }));
  contact.position.y = 0.002;
  g.add(contact);
  // Filament (inside)
  g.add(box(0.002, 0.012, 0.002, 0, 0.042, 0, m(0xccaa44, { metalness: 0.5 })));
  g.userData.type = 'loot-lightbulb';
  return g;
}

/** 笔记本 */
export function createNotebook() {
  const g = new THREE.Group();
  // Cover
  g.add(box(0.06, 0.012, 0.082, 0, 0.006, 0, m(0x6a4a2a)));
  // Pages (slightly inset)
  g.add(box(0.055, 0.008, 0.078, 0.002, 0.006, 0, paperMat));
  // Spine
  g.add(box(0.005, 0.014, 0.082, -0.03, 0.007, 0, m(0x5a3a1a)));
  // Elastic band
  g.add(box(0.062, 0.003, 0.003, 0, 0.013, 0.02, m(0x333333)));
  // Bookmark ribbon
  g.add(box(0.003, 0.001, 0.04, 0.01, 0.013, -0.02, m(0xcc3333)));
  // Pen
  g.add(cyl(0.003, 0.07, 0.025, 0.013, 0, m(0x222266)));
  // Pen clip
  g.add(box(0.002, 0.001, 0.02, 0.025, 0.016, 0.01, chrome));
  g.userData.type = 'loot-notebook';
  return g;
}

/** 电子元件 */
export function createElectronics() {
  const g = new THREE.Group();
  // PCB
  g.add(box(0.055, 0.008, 0.035, 0, 0.004, 0, m(0x1a5544, { metalness: 0.15 })));
  // Traces
  for (let i = 0; i < 4; i++) {
    g.add(box(0.045, 0.0005, 0.0015, 0, 0.0085, -0.013 + i * 0.009, brass));
  }
  // IC chip
  g.add(box(0.012, 0.005, 0.012, -0.01, 0.011, 0, m(0x111111)));
  // IC pins
  [-1, 1].forEach(sz => {
    for (let i = 0; i < 3; i++) {
      g.add(box(0.002, 0.001, 0.004, -0.014 + i * 0.004, 0.009, sz * 0.01, chrome));
    }
  });
  // Capacitors
  [0.015, 0.025].forEach(x => {
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.008, 8),
      m(0x224488));
    cap.position.set(x, 0.012, -0.008);
    g.add(cap);
  });
  // Resistors
  g.add(box(0.008, 0.004, 0.003, 0.012, 0.01, 0.01, m(0x886644)));
  // LED
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.003, 6, 4),
    m(0x44ff44, { emissive: 0x22aa22, ei: 0.5 }));
  led.position.set(0.02, 0.011, 0.012);
  g.add(led);
  // Connector header
  g.add(box(0.015, 0.008, 0.005, -0.02, 0.012, 0.013, m(0x222222)));
  // Connector pins
  for (let i = 0; i < 3; i++) {
    g.add(box(0.001, 0.005, 0.001, -0.023 + i * 0.003, 0.005, 0.013, chrome));
  }
  g.userData.type = 'loot-electronics';
  return g;
}

// ============================
// Helpers
// ============================
function box(w, h, d, x, y, z, mat) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  return mesh;
}

function cyl(r, h, x, y, z, mat) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 10), mat);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  return mesh;
}
