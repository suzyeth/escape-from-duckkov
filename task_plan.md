# Task Plan — 逃离鸭科夫 (Top-Down Extraction Game)

**Project:** Tarkov-style top-down extraction shooter in Three.js
**Status:** 🟡 In Progress
**Last Updated:** 2026-04-08

---

## Decision Log

| # | Decision | Rationale | Date |
|---|----------|-----------|------|
| 1 | 纯射线检测碰撞（无物理引擎） | 轻量、无WASM依赖，单人足够 | 2026-04-08 |
| 2 | 单人游戏，不预留多人架构 | 降低复杂度，快速迭代 | 2026-04-08 |
| 3 | 免费CC0模型（Kenney.nl / Quaternius） | 快速开发，无版权顾虑 | 2026-04-08 |
| 4 | 桌面浏览器，Vite + Three.js | 无需打包兼容移动端 | 2026-04-08 |
| 5 | **俯视角（Top-Down）** — 非FPS | 游戏设计为俯视角，FPS架构废弃 | 2026-04-08 |
| 6 | 相机：跟随角色的斜45°透视摄像机 | 有空间感，能看到角色和周围环境 | 2026-04-08 |
| 7 | 操控：WASD移动，鼠标瞄准 | 俯视角射击游戏标准操作 | 2026-04-08 |

---

## Architecture Overview (Top-Down)

```
相机(斜上方) → 跟随玩家
玩家角色     → WASD移动 + 鼠标旋转朝向
射击         → 从角色位置向鼠标方向射线检测
AI敌人       → 在地面平面巡逻/追击
地图         → 俯视角房间 + 走廊 + 掩体
```

**鼠标瞄准原理：**
```js
// 鼠标屏幕坐标 → 世界坐标（投射到地面平面）
raycaster.setFromCamera(mouse, camera);
const hits = raycaster.intersectObject(groundPlane);
player.lookAt(hits[0].point);
```

---

## Phases

### Phase 0 — Project Setup ✅
- [x] Vite + Three.js 项目初始化
- [x] 文件结构 (core / entities / world / ui)
- [x] WebGLRenderer, 阴影, 色调映射
- [x] GameLoop, InputManager, Renderer 模块

### Phase 1 — Top-Down Core ✅ (重写中)
- [x] 斜顶摄像机跟随角色
- [x] WASD 移动（XZ平面）
- [x] 鼠标投射到地面 → 角色朝向
- [x] 射线碰撞：4向碰墙检测
- [ ] 冲刺 / 蹲伏状态

### Phase 2 — Weapon System ⬜
- [ ] Weapon 类（伤害、射速、弹匣、射程）
- [ ] 左键射击 → 从角色位置向朝向方向射线
- [ ] 枪口闪光粒子效果
- [ ] 弹孔贴花
- [ ] 换弹（R键）
- [ ] 多武器槽（1/2/3切换）

### Phase 3 — Inventory & Loot System ⬜
- [ ] 格子背包（Tetris式，Tab键开关）
- [ ] 物品数据结构（type, size, weight, value）
- [ ] 世界物品拾取（接近 + E键）
- [ ] 拖拽背包 UI（HTML/CSS层）
- [ ] 容器：木箱、尸体
- [ ] 负重系统（超重减速）

### Phase 4 — Damage & Health System ⬜
- [ ] 分区血量（头/躯干/手/脚）
- [ ] 伤害类型（子弹/流血/骨折）
- [ ] 防弹衣 + 穿甲计算
- [ ] 流血DOT效果
- [ ] 急救物品（绷带/医疗包）
- [ ] 死亡 + 成功撤离状态

### Phase 5 — AI Enemies (Scavs 鸭卒) ⬜
- [ ] 简单寻路（航点巡逻）
- [ ] AI状态机: 空闲 → 巡逻 → 警觉 → 战斗 → 搜索
- [ ] 视线检测（射线）
- [ ] 听觉检测（脚步声半径）
- [ ] AI射击（向玩家方向射线）
- [ ] 死亡掉落战利品

### Phase 6 — Map / Level ⬜
- [ ] 俯视角房间 + 走廊地图
- [ ] 门（可互动，F键）
- [ ] 撤离区（绿色触发区）
- [ ] 玩家/AI重生点
- [ ] 环境音效

### Phase 7 — HUD & UI ⬜
- [ ] 准星（随鼠标移动）
- [ ] 血量显示（分区）
- [ ] 弹药计数
- [ ] 倒计时（Raid时间）
- [ ] 小地图（右上角）
- [ ] 主菜单 + 死亡/撤离结算界面

### Phase 8 — Polish ⬜
- [ ] 对象池（子弹、粒子）
- [ ] 环境音频（Three.js PositionalAudio）
- [ ] 性能分析

---

## Open Questions
1. 相机角度：正顶俯视(90°) vs 斜45°透视？（建议斜45°更有立体感）
2. 鸭子主题：角色是鸭子造型？敌人是鸭卒（Scav）？
3. 地图风格：像素风还是低多边形3D？
