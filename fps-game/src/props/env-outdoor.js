import * as THREE from 'three';

/**
 * 工厂外/室外环境参数
 * 参考：鸭科夫室外场景截图
 * 色温策略：暖色低角度阳光 + 深色长投影 + 远景蓝灰雾
 */
export const OUTDOOR_ENV = {
  // 雾效（远景偏蓝灰，制造纵深）
  fog: { color: 0x889988, near: 15, far: 35 },

  // 环境光（偏暖但不强，让阳光做主）
  ambient: { color: 0x665544, intensity: 0.3 },
  hemisphere: { sky: 0x8899aa, ground: 0x554433, intensity: 0.4 },

  // 太阳光（核心：低角度暖光 → 长投影）
  sun: {
    color: 0xffddaa,
    intensity: 1.8,
    position: [6, 8, 4],   // 低角度，长阴影
    shadowMapSize: 2048,
    shadowCameraSize: 20,
    shadowBias: -0.001,
  },

  // 补光（填充阴影面，冷色）
  fill: {
    color: 0x6688aa,
    intensity: 0.3,
    position: [-5, 6, -3],
  },

  // 地面材质
  ground: {
    grass:     { color: 0x5a7a3a, roughness: 0.92, metalness: 0.0 },
    grassLit:  { color: 0x7a9a4a, roughness: 0.92, metalness: 0.0 },  // 受光面
    dirt:      { color: 0x8a6a40, roughness: 0.95, metalness: 0.0 },
    dirtDark:  { color: 0x6a5030, roughness: 0.95, metalness: 0.0 },
  },

  skyColor: 0x7799bb,

  renderer: {
    toneMapping: 'ACESFilmicToneMapping',
    toneMappingExposure: 1.1,
    clearColor: 0x7799bb,
  },
};

/**
 * 应用室外环境到场景
 */
export function applyOutdoorEnv(scene, renderer) {
  const e = OUTDOOR_ENV;

  scene.fog = new THREE.Fog(e.fog.color, e.fog.near, e.fog.far);
  scene.background = new THREE.Color(e.skyColor);

  const amb = new THREE.AmbientLight(e.ambient.color, e.ambient.intensity);
  scene.add(amb);

  const hemi = new THREE.HemisphereLight(e.hemisphere.sky, e.hemisphere.ground, e.hemisphere.intensity);
  scene.add(hemi);

  // Sun — low angle, warm, strong shadows
  const sun = new THREE.DirectionalLight(e.sun.color, e.sun.intensity);
  sun.position.set(...e.sun.position);
  sun.castShadow = true;
  sun.shadow.mapSize.set(e.sun.shadowMapSize, e.sun.shadowMapSize);
  sun.shadow.camera.left = -e.sun.shadowCameraSize;
  sun.shadow.camera.right = e.sun.shadowCameraSize;
  sun.shadow.camera.top = e.sun.shadowCameraSize;
  sun.shadow.camera.bottom = -e.sun.shadowCameraSize;
  sun.shadow.camera.near = 0.5;
  sun.shadow.camera.far = 40;
  sun.shadow.bias = e.sun.shadowBias;
  scene.add(sun);

  // Fill light — cold, from opposite side
  const fill = new THREE.DirectionalLight(e.fill.color, e.fill.intensity);
  fill.position.set(...e.fill.position);
  scene.add(fill);

  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = e.renderer.toneMappingExposure;
  renderer.setClearColor(e.renderer.clearColor);
}

/**
 * 创建地面（草地+泥地自然混合）
 */
export function createOutdoorGround(w = 20, d = 20) {
  const e = OUTDOOR_ENV;
  const group = new THREE.Group();

  // 主草地（顶点色实现深浅过渡）
  const grassGeo = new THREE.PlaneGeometry(w, d, 32, 32);
  const colors = [];
  const baseG = new THREE.Color(e.ground.grass.color);
  const litG = new THREE.Color(e.ground.grassLit.color);
  const pos = grassGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const t = (Math.sin(pos.getX(i) * 0.8) * Math.cos(pos.getZ(i) * 0.6) + 1) * 0.5;
    const noise = Math.random() * 0.15;
    const c = baseG.clone().lerp(litG, t + noise);
    colors.push(c.r, c.g, c.b);
  }
  grassGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  const grassMat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.92,
    metalness: 0.0,
  });
  const grass = new THREE.Mesh(grassGeo, grassMat);
  grass.rotation.x = -Math.PI / 2;
  grass.receiveShadow = true;
  group.add(grass);

  // 泥地路径（用顶点色+几何体模拟自然边缘）
  const pathGeo = new THREE.PlaneGeometry(1.8, d * 1.1, 16, 32);
  const pathPos = pathGeo.attributes.position;
  const pathColors = [];
  const dirtC = new THREE.Color(e.ground.dirt.color);
  const dirtDk = new THREE.Color(e.ground.dirtDark.color);
  for (let i = 0; i < pathPos.count; i++) {
    // 边缘锯齿化
    const edgeDist = Math.abs(pathPos.getX(i)) / 0.9;
    pathPos.setX(i, pathPos.getX(i) + (Math.random() - 0.5) * 0.3 * edgeDist);
    // 顶点色
    const t = Math.random() * 0.4;
    const c = dirtC.clone().lerp(dirtDk, t);
    pathColors.push(c.r, c.g, c.b);
  }
  pathGeo.setAttribute('color', new THREE.Float32BufferAttribute(pathColors, 3));

  const pathMat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.95,
  });
  const path = new THREE.Mesh(pathGeo, pathMat);
  path.rotation.x = -Math.PI / 2;
  path.rotation.z = 0.25;
  path.position.y = 0.003;
  path.receiveShadow = true;
  group.add(path);

  group.userData.type = 'outdoor-ground';
  return group;
}

/**
 * 低多边形树 — 参考鸭科夫
 * 改进：更多层次，更大体积，颜色变化
 */
export function createTree(type = 'cone') {
  const group = new THREE.Group();
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5a3a1a, roughness: 0.9 });

  // 每棵树颜色略有随机
  const hueShift = (Math.random() - 0.5) * 0.06;
  const baseLeaf = new THREE.Color(0x4a7a2a);
  const darkLeaf = new THREE.Color(0x3a6a1a);
  baseLeaf.offsetHSL(hueShift, 0, 0);
  darkLeaf.offsetHSL(hueShift, 0, 0);
  const leafMat = new THREE.MeshStandardMaterial({ color: baseLeaf, roughness: 0.82 });
  const leafMatDark = new THREE.MeshStandardMaterial({ color: darkLeaf, roughness: 0.82 });

  if (type === 'cone') {
    // Trunk
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.12, 0.6, 8), trunkMat);
    trunk.position.y = 0.3;
    trunk.castShadow = true;
    group.add(trunk);

    // 3-layer cone (参考图是多层锥形)
    const layers = [
      { r: 0.65, h: 0.9, y: 1.15, mat: leafMat },
      { r: 0.75, h: 0.7, y: 0.8, mat: leafMatDark },
      { r: 0.55, h: 0.6, y: 1.5, mat: leafMat },
    ];
    layers.forEach(l => {
      const cone = new THREE.Mesh(new THREE.ConeGeometry(l.r, l.h, 7), l.mat);
      cone.position.y = l.y;
      cone.rotation.y = Math.random() * Math.PI;
      cone.castShadow = true;
      group.add(cone);
    });

  } else if (type === 'round') {
    // Trunk
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.1, 0.6, 8), trunkMat);
    trunk.position.y = 0.3;
    trunk.castShadow = true;
    group.add(trunk);

    // Round crown — 多球体组合，不用变形单球
    // 主体球
    const mainCrown = new THREE.Mesh(new THREE.SphereGeometry(0.45, 12, 10), leafMat);
    mainCrown.position.y = 0.95;
    mainCrown.scale.y = 0.8;
    mainCrown.castShadow = true;
    group.add(mainCrown);

    // 周围小球突起（4-6个，模拟参考图的团簇感）
    const blobCount = 4 + Math.floor(Math.random() * 3);
    for (let i = 0; i < blobCount; i++) {
      const angle = (i / blobCount) * Math.PI * 2 + Math.random() * 0.4;
      const r = 0.3 + Math.random() * 0.1;
      const blobSize = 0.2 + Math.random() * 0.12;
      const blob = new THREE.Mesh(
        new THREE.SphereGeometry(blobSize, 8, 6),
        Math.random() > 0.5 ? leafMat : leafMatDark
      );
      blob.position.set(
        Math.cos(angle) * r,
        0.85 + Math.random() * 0.25,
        Math.sin(angle) * r
      );
      blob.scale.y = 0.7 + Math.random() * 0.2;
      blob.castShadow = true;
      group.add(blob);
    }

    // 顶部小球（让轮廓不是完美圆形）
    const topBlob = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 6), leafMat);
    topBlob.position.set(Math.random() * 0.1, 1.25, Math.random() * 0.1);
    topBlob.castShadow = true;
    group.add(topBlob);

  } else {
    // Bush — 多球体矮灌木
    const blobCount = 3 + Math.floor(Math.random() * 2);
    for (let i = 0; i < blobCount; i++) {
      const angle = (i / blobCount) * Math.PI * 2;
      const blobSize = 0.2 + Math.random() * 0.1;
      const blob = new THREE.Mesh(
        new THREE.SphereGeometry(blobSize, 8, 6),
        Math.random() > 0.4 ? leafMat : leafMatDark
      );
      blob.position.set(
        Math.cos(angle) * 0.12,
        blobSize * 0.7,
        Math.sin(angle) * 0.12
      );
      blob.scale.y = 0.65;
      blob.castShadow = true;
      group.add(blob);
    }
    // 中心主球
    const center = new THREE.Mesh(new THREE.SphereGeometry(0.25, 10, 8), leafMat);
    center.position.y = 0.2;
    center.scale.y = 0.6;
    center.castShadow = true;
    group.add(center);
  }

  group.userData.type = 'tree';
  return group;
}

/**
 * 沙袋掩体 — 弧形排列
 */
export function createSandbags(count = 5) {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: 0x8a7a5a, roughness: 0.9 });
  const matDark = new THREE.MeshStandardMaterial({ color: 0x7a6a4a, roughness: 0.9 });

  const bottomCount = Math.min(count, 4);
  const topCount = Math.max(0, count - bottomCount);

  // Bottom layer — arc arrangement
  for (let i = 0; i < bottomCount; i++) {
    const bag = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.1, 0.28, 4, 8),
      i % 2 === 0 ? mat : matDark
    );
    bag.rotation.z = Math.PI / 2;
    const angle = (i / (bottomCount - 1) - 0.5) * 0.6;
    bag.position.set(
      Math.sin(angle) * 0.5,
      0.1,
      Math.cos(angle) * 0.15 - 0.1
    );
    bag.rotation.y = angle;
    bag.castShadow = true;
    group.add(bag);
  }

  // Top layer
  for (let i = 0; i < topCount; i++) {
    const bag = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.09, 0.24, 4, 8),
      mat
    );
    bag.rotation.z = Math.PI / 2;
    bag.position.set(i * 0.28 - 0.14, 0.28, 0);
    bag.castShadow = true;
    group.add(bag);
  }

  group.userData.type = 'sandbags';
  return group;
}
