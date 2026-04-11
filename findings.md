# Findings — 逃离鸭科夫 (Top-Down Three.js)

**Purpose:** 技术研究笔记、架构决策。

---

## Top-Down Camera Setup

### 跟随摄像机（斜45°透视）
```js
// 每帧更新：相机跟随玩家，保持固定偏移
const CAM_OFFSET = new THREE.Vector3(0, 18, 12);
camera.position.copy(player.position).add(CAM_OFFSET);
camera.lookAt(player.position);
```

### 鼠标 → 世界坐标（瞄准）
```js
// 地面平面（Y=0）
const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const mouse = new THREE.Vector2(
  (event.clientX / window.innerWidth)  * 2 - 1,
  -(event.clientY / window.innerHeight) * 2 + 1
);
const raycaster = new THREE.Raycaster();
raycaster.setFromCamera(mouse, camera);
const worldPos = new THREE.Vector3();
raycaster.ray.intersectPlane(groundPlane, worldPos);
// worldPos = 鼠标在地面的世界坐标
```

### 角色朝向鼠标
```js
// 只旋转Y轴（在地面上转向）
const dir = worldPos.clone().sub(player.position);
player.mesh.rotation.y = Math.atan2(dir.x, dir.z);
```

---

## Top-Down 移动系统

```js
// WASD → 相对于世界坐标（不跟随相机朝向，或跟随相机朝向）
// 方案A：绝对方向（W=上，S=下，A=左，D=右）— 更简单
// 方案B：相对相机方向 — 更有沉浸感

// 方案A 实现：
if (keys['KeyW']) velocity.z -= speed * dt;
if (keys['KeyS']) velocity.z += speed * dt;
if (keys['KeyA']) velocity.x -= speed * dt;
if (keys['KeyD']) velocity.x += speed * dt;
player.position.add(velocity);
```

---

## 碰撞检测（俯视角）

俯视角碰撞简化为**XZ平面**上的2D AABB或射线：

```js
// 4向射线检测（地面Y高度处）
const wallRays = [
  new THREE.Vector3(1, 0, 0),   // 右
  new THREE.Vector3(-1, 0, 0),  // 左
  new THREE.Vector3(0, 0, 1),   // 后
  new THREE.Vector3(0, 0, -1),  // 前
];
for (const dir of wallRays) {
  const ray = new THREE.Raycaster(
    new THREE.Vector3(player.x, 0.5, player.z),
    dir, 0, PLAYER_RADIUS + 0.1
  );
  const hits = ray.intersectObjects(walls);
  if (hits.length > 0) pushPlayerBack(dir, hits[0].distance);
}
```

---

## 推荐技术栈（更新）

| 需求 | 技术 | 备注 |
|------|------|------|
| 渲染 | Three.js r165+ | WebGL2 |
| 打包 | Vite | HMR快 |
| 寻路 | 简单航点系统 | 俯视角地图规则，不需要Yuka完整NavMesh |
| 音频 | Three.js PositionalAudio | 内置 |
| UI/背包 | HTML/CSS overlay | DOM叠加Canvas |
| 相机 | PerspectiveCamera 斜45° | 有立体感的俯视角 |

---

## 俯视角射击核心

```js
// 从玩家位置向朝向方向射击
shoot() {
  const direction = new THREE.Vector3(
    Math.sin(this.mesh.rotation.y),
    0,
    Math.cos(this.mesh.rotation.y)
  );
  const ray = new THREE.Raycaster(this.position, direction);
  const hits = ray.intersectObjects(enemies, true);
  if (hits.length > 0) {
    hits[0].object.userData.entity.takeDamage(this.weapon.damage);
    spawnBulletHole(hits[0].point);
  }
}
```

---

## Tarkov核心机制（俯视角版）
1. **格子背包** — Tab键开关，拖拽物品
2. **分区血量** — 6部位，每部位独立HP
3. **穿甲计算** — 子弹穿透力 vs 护甲等级
4. **流血DOT** — 需要绷带才能停止
5. **负重系统** — 超重→减速，过载→无法移动
6. **撤离系统** — 到达绿区 + 按住E倒计时

---

## 免费资源（俯视角适用）
- [Kenney Top-Down Shooter](https://kenney.nl/assets/topdown-shooter) — 专为俯视角设计的素材包 (CC0)
- [Kenney Tiny Town](https://kenney.nl/assets/tiny-town) — 低多边形建筑 (CC0)
- [Quaternius Ultimate Modular Dungeon](https://quaternius.com) — 房间地图模块 (CC0)
- [OpenGameArt](https://opengameart.org) — 搜索 "top-down" 找音效和贴图
