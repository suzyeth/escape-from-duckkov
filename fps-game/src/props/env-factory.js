import * as THREE from 'three';

/**
 * 工厂室内环境参数
 * 色温策略：冷蓝灰底色 + 暖色道具光
 */
export const FACTORY_ENV = {
  // 雾效
  fog: { color: 0x1a2028, near: 10, far: 22 },

  // 环境光
  ambient: { color: 0x445566, intensity: 0.35 },
  hemisphere: { sky: 0x667788, ground: 0x333322, intensity: 0.3 },

  // 天花板灯（冷白）
  ceilingLight: { color: 0xdde0e8, intensity: 4, distance: 8, decay: 1.5 },

  // 地面
  floor: {
    color: 0x4a5058,
    colorAlt: 0x424850,
    roughness: 0.7,
    metalness: 0.1,      // 湿润微反光
    gridSize: 1,          // 地砖尺寸
    gridLineColor: 0x3a3e44,
  },

  // 墙壁
  wall: {
    color: 0x5a6066,
    kickColor: 0x4a6a4a,  // 绿色墙裙
    height: 1.2,
    thickness: 0.15,
  },

  // 天花板
  ceiling: {
    color: 0x3a3e44,
    height: 3.2,
  },

  // 渲染器
  renderer: {
    toneMapping: 'ACESFilmicToneMapping',
    toneMappingExposure: 1.0,
    clearColor: 0x0a0e12,
  },
};

/**
 * 应用工厂环境到场景
 */
export function applyFactoryEnv(scene, renderer) {
  const e = FACTORY_ENV;

  scene.fog = new THREE.Fog(e.fog.color, e.fog.near, e.fog.far);
  scene.add(new THREE.AmbientLight(e.ambient.color, e.ambient.intensity));
  scene.add(new THREE.HemisphereLight(e.hemisphere.sky, e.hemisphere.ground, e.hemisphere.intensity));

  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = e.renderer.toneMappingExposure;
  renderer.setClearColor(e.renderer.clearColor);
}

/**
 * 创建工厂天花板灯
 */
export function addFactoryCeilingLight(scene, x, z) {
  const e = FACTORY_ENV;
  const fixture = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.06, 0.6),
    new THREE.MeshStandardMaterial({ color: 0xffffcc, emissive: 0xffffcc, emissiveIntensity: 1.5 })
  );
  fixture.position.set(x, e.ceiling.height - 0.03, z);
  scene.add(fixture);

  const light = new THREE.PointLight(e.ceilingLight.color, e.ceilingLight.intensity, e.ceilingLight.distance, e.ceilingLight.decay);
  light.position.set(x, e.ceiling.height - 0.12, z);
  light.castShadow = true;
  light.shadow.mapSize.set(512, 512);
  scene.add(light);
}
