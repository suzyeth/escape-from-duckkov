# Progress Log — Tarkov-like Three.js FPS

---

## Session 1 — 2026-04-08

**Status:** Planning phase started
**Completed:**
- Created task_plan.md with 8 development phases
- Created findings.md with tech stack research and architecture notes
- Identified key mechanics: FPS controls, weapon system, inventory grid, zonal health, AI (Yuka.js), extraction

**Decisions Made:**
- None yet — awaiting user input on open questions

**Blockers / Open Questions:**
1. Physics engine preference (Rapier.js vs pure raycasting)
2. Multiplayer in scope?
3. Asset source strategy
4. Target platform (desktop browser?)

**Next Session Should:**
- Confirm open questions with user
- Initialize Vite + Three.js project (Phase 0)

---

## Session 2 — 2026-04-08

**Status:** Phase 0 ✅ + Phase 1 ✅ complete
**Confirmed Decisions:**
- 纯射线检测（无物理引擎）
- 单人游戏
- 免费CC0模型
- 桌面浏览器

**Completed:**
- `fps-game/package.json` + `vite.config.js`
- `index.html` — 开始界面 + HUD（准星/血条/弹药/计时器）
- `src/core/InputManager.js` — 键盘状态 + 鼠标delta + PointerLock
- `src/core/Renderer.js` — WebGLRenderer，阴影，色调映射，自动resize
- `src/core/GameLoop.js` — rAF循环，dt cap
- `src/entities/Player.js` — FPS移动，跳跃，蹲伏，射线碰撞，摄像机bob
- `src/world/Level.js` — 地面 + 3栋建筑 + 掩体 + 撤离区
- `src/ui/HUD.js` — 血量/弹药/倒计时/击杀feed
- `src/main.js` — 入口，串联所有模块

**How to Run:**
```bash
cd fps-game
npm install
npm run dev
# 打开 http://localhost:3000
# 点击 "Enter Raid" → 鼠标锁定 → WASD移动
```

**Controls:**
- WASD — 移动
- 鼠标 — 视角
- Shift — 冲刺
- Ctrl — 蹲伏
- Space — 跳跃
- ESC — 暂停（释放鼠标锁定）

**Next Session Should:**
- Phase 2: 武器系统（持枪模型、射击、弹药、换弹、后坐力）

---

## Session 3 — 2026-04-08 (重大转向)

**状态:** Phase 1 重写完成（FPS → 俯视角）

**关键决策:** 游戏为俯视角，FPS架构全部废弃重写

**本次完成:**
- task_plan.md + findings.md 更新为俯视角架构
- Player.js 完全重写：WASD世界坐标移动 + 鼠标世界坐标瞄准 + 朝向旋转 + 4向碰撞
- Level.js 完全重写：3个房间 + 走廊 + 掩体 + 撤离区（俯视角室内地图）
- main.js 重写：斜45°跟随相机、地面平面鼠标投射、射击逻辑、撤离检测
- index.html 更新：自定义准星跟随鼠标，去掉PointerLock，中文UI

**操作方式:**
- WASD — 移动
- 鼠标 — 瞄准（角色面向鼠标方向）
- 左键 — 射击
- 靠近绿区 + 按住E — 撤离（3秒）

**Next Session Should:**
- Phase 2: 武器系统（多武器切换、换弹、弹药）
- Phase 5: AI敌人（鸭卒巡逻 + 追击）

---

## Session 4 — 2026-04-09

**状态:** 建筑内部可视化 + 音效系统 + 耐力系统 + 结算界面 + 生成点修复

**本次完成:**
- `Level.js` — 移除建筑屋顶，摄像机现在可以看到建筑内部；为每栋建筑加了内部地板（深色）；将生成点从4个扩展到6个，分布到地图各区的开阔地带
- `SoundSystem.js` — 新文件，基于 Web Audio API 的纯程序化音效：枪声（每种武器不同频率特征）、换弹声、脚步声、命中提示音、受伤冲击音、撤离蜂鸣音、空弹拨击声
- `Player.js` — 耐力系统：冲刺消耗耐力（~3.6s耗尽），行走慢速回复，蹲伏快速回复；耐力为0时无法冲刺
- `HUD.js` + `index.html` — 耐力条（不满时显示，满时隐藏）
- `main.js` — 接入全部音效触发点；追踪击杀数/战利品价值/存活时间；结算界面显示完整突袭统计；首次选择装备时自动初始化音频上下文

**生成点（6个）:**
- NW (-62, -64) — 工厂以西开阔地
- NE (63, -64)  — 仓库以东开阔地
- SW (-65, 62)  — 公寓楼以南开阔地
- SE (65, 62)   — 停车场以东开阔地
- N-center (0, -68) — 工厂与仓库之间北部
- S-center (0, 70)  — 地下室以南开阔地

**Next Session Should:**
- 流血DOT系统（受伤后持续掉血，需止血带止血）
- 地图固定战利品箱（木箱/抽屉，需靠近+F开启）
- 小地图（右上角，显示玩家位置和撤离点）
- 自定义地图编辑器架构规划

---

## Session 5 — 2026-04-09

**状态:** 武器槽HUD + 可互动门 + 骨折系统 + 精英敌人 + 重量系统

**本次完成:**
- `DoorSystem.js` — 新文件：可互动门系统，F键开/关，动画旋转90°，开门时移除碰撞体
- `Level.js` — 自动记录所有建筑门洞位置（`doorSlots`数组），8栋建筑全部有门
- `index.html` + `HUD.js` — 武器槽指示器（右下角1/2/3高亮当前槽）
- `HealthSystem.js` — 骨折系统：腿HP归零→腿骨折无法冲刺，臂HP归零→臂骨折
- `Enemy.js` + `AISystem.js` — 精英鸭卒：4个精英敌人（深红色/金色HP条），HP=160，伤害=16，视野=24m，必掉高级物资
- `InventorySystem.js` — 重量系统：每件物品有kg重量，>25kg禁止冲刺，>35kg减速20%
- `InventoryUI.js` — 背包界面显示当前负重（橙色警告/红色超载）
- `main.js` — 集成门系统F键交互、骨折防冲刺逻辑、重量速度惩罚、精英击杀反馈

**新操作:**
- F键 — 开/关附近的门

**Next Session Should:**
- 门的声音效果（推门声）
- 更多武器类型（狙击枪/SMG）
- 自定义地图编辑器
- AI精英特殊语音/警报系统
- 物品拖拽换位（背包Grid拖拽）

---

## Session 6 — 2026-04-09

**状态:** 音效扩充 + 两把新武器 + 精英警报 + 滚动提示栏 + 游戏规则界面

**本次完成:**
- `SoundSystem.js` — 新增3个音效：推门木质嘎吱声、精英警报双音扫频、远处环境枪声（每20-45s随机触发）
- `WeaponSystem.js` — 新增 VSS Vintorez（槽4，88伤害/95m）和 MP5（槽5，22伤害/800RPM），5武器槽系统
- `StashScreen.js` — 新增狙击手/SMG两个出发配置，共5套装备包
- `InventorySystem.js` — 新增 vss_ammo/mp5_ammo 物品定义
- `index.html` — 5槽武器指示器；滚动提示栏（13条轮流，每5秒切换）；游戏规则说明界面（按主界面"游戏说明"按钮进入）
- `DoorSystem.js` — update()返回{nearDoor, justToggled}，触发推门音效
- `Enemy.js` — 检测精英敌人进入战斗状态变化事件
- `AISystem.js` — 聚合并上报精英警报事件
- `main.js` — 精英发现玩家触发警报音+击杀栏提示；精英击杀使用高级掉落表；环境枪声定时器

**武器槽对应:**
- 1=AK-74, 2=格洛克17, 3=MP-133, 4=VSS Vintorez, 5=MP5

**Next Session Should:**
- 背包物品拖拽换位
- 自定义地图编辑器
- 更多地图区域（地下室内部）
- 击杀奖励系统（击杀积分/经验）
