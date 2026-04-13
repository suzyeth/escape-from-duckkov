import * as THREE from 'three';

/**
 * 程序化岩石 — 参考鸭科夫室外岩壁
 * 改进：更高细分、更不规则、顶点色深浅变化
 * @param {number} size 岩石半径
 * @returns {THREE.Mesh}
 */
export function createRock(size = 0.5) {
  // 更高细分 (detail=2) 让形状更自然
  const geo = new THREE.DodecahedronGeometry(size, 2);
  const pos = geo.attributes.position;

  // 顶点位移：底部更平，顶部更尖
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    // Y轴挤压：底部平坦，顶部尖
    const yFactor = y > 0 ? 0.9 : 0.6;

    // 随机位移
    const noise = 0.2 + Math.random() * 0.2;
    pos.setXYZ(i,
      x + (Math.random() - 0.5) * size * noise,
      y * yFactor + (Math.random() - 0.5) * size * noise * 0.5,
      z + (Math.random() - 0.5) * size * noise
    );
  }

  // 顶点色：顶部亮，底部暗，随机斑驳
  const colors = [];
  const baseColor = new THREE.Color(0x7a7a6a);
  const darkColor = new THREE.Color(0x5a5a4a);
  const lightColor = new THREE.Color(0x8a8a7a);

  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    const heightT = (y / size + 1) * 0.5; // 0=bottom, 1=top
    const noise = Math.random() * 0.3;
    const c = darkColor.clone().lerp(lightColor, heightT * 0.7 + noise * 0.3);
    colors.push(c.r, c.g, c.b);
  }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.computeVertexNormals();

  const mat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.92,
    metalness: 0.0,
    flatShading: false,
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData.type = 'rock';
  return mesh;
}

/**
 * 岩石群 — 室外核心掩体
 * 改进：层叠堆砌，大石头在底层，小石头在顶部
 * @param {number} count 岩石数量 (3-8)
 * @param {'wall'|'pile'|'scatter'} layout 布局方式
 * @returns {THREE.Group}
 */
export function createRockCluster(count = 5, layout = 'pile') {
  const group = new THREE.Group();

  if (layout === 'wall') {
    // 岩壁：底层大石头紧密排列，上层小石头
    const bottomCount = Math.ceil(count * 0.6);
    const topCount = count - bottomCount;

    for (let i = 0; i < bottomCount; i++) {
      const size = 0.5 + Math.random() * 0.3;
      const rock = createRock(size);
      rock.position.set(i * size * 1.3 - bottomCount * 0.35, size * 0.35, 0);
      rock.rotation.y = Math.random() * 0.5;
      group.add(rock);
    }
    for (let i = 0; i < topCount; i++) {
      const size = 0.3 + Math.random() * 0.2;
      const rock = createRock(size);
      rock.position.set(
        i * size * 1.5 - topCount * 0.2,
        0.5 + size * 0.3,
        (Math.random() - 0.5) * 0.3
      );
      group.add(rock);
    }

  } else if (layout === 'pile') {
    // 堆叠：金字塔状
    for (let i = 0; i < count; i++) {
      const layer = i < count * 0.5 ? 0 : 1;
      const size = layer === 0 ? 0.4 + Math.random() * 0.4 : 0.2 + Math.random() * 0.3;
      const rock = createRock(size);
      const spread = layer === 0 ? 1.2 : 0.6;
      rock.position.set(
        (Math.random() - 0.5) * spread,
        layer * 0.35 + size * 0.3,
        (Math.random() - 0.5) * spread
      );
      rock.rotation.set(
        Math.random() * 0.4,
        Math.random() * Math.PI,
        Math.random() * 0.3
      );
      group.add(rock);
    }

  } else {
    // 散落：随机分布
    for (let i = 0; i < count; i++) {
      const size = 0.15 + Math.random() * 0.35;
      const rock = createRock(size);
      rock.position.set(
        (Math.random() - 0.5) * 3,
        size * 0.3,
        (Math.random() - 0.5) * 3
      );
      rock.rotation.set(Math.random(), Math.random(), Math.random());
      group.add(rock);
    }
  }

  group.userData.type = 'rock-cluster';
  return group;
}
