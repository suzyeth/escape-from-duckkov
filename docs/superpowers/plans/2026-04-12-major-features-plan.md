# 三大功能实施计划

## 功能一：多关卡 + 持久进度（基地+仓库）

### 架构设计

```
[主菜单] → [基地界面] → [选装备出发] → [战斗关卡] → [撤离/阵亡] → [基地界面]
                ↑                                              ↓
                └──────────── 持久存储（localStorage）←─────────┘
```

### 任务拆分

#### Task 1: 持久存储层（30min）
- 新建 `src/systems/SaveSystem.js`
- 用 localStorage 存储：仓库物品、鸭元余额、已解锁关卡、统计数据
- API: `save()`, `load()`, `reset()`

#### Task 2: 基地界面（1h）
- 新建 `src/ui/BaseScreen.js`
- HTML 面板包含：
  - 仓库格子（8×10，和背包一样的 grid 系统）
  - 鸭元余额显示
  - "出发"按钮 → 进入关卡选择
  - 统计面板（总击杀、总撤离次数、最高单局收入）
- 仓库和背包之间可以拖拽转移物品

#### Task 3: 关卡选择界面（30min）
- 新建 `src/ui/LevelSelect.js`
- 3 个关卡卡片：
  - 关卡1：工业区（当前地图，初始解锁）
  - 关卡2：港口区（新地图，击杀 20 敌人解锁）
  - 关卡3：实验室（新地图，撤离 3 次解锁）
- 每个卡片显示：名称、难度、敌人数、是否解锁

#### Task 4: 撤离→基地流程（30min）
- 撤离成功：背包物品转入仓库，获得鸭元
- 阵亡：背包物品丢失，记录死亡位置（下局可拾回）
- 两种结果都回到基地界面

#### Task 5: 死亡拾回（30min）
- 阵亡时记录：关卡ID + 位置 + 背包内容 → localStorage
- 下一局进入同关卡时，在死亡位置生成"背包残骸"
- 靠近按 E 拾回（只有一次机会）

#### Task 6: 第二张地图——港口区（1h）
- 新建地图数据或在 Level.js 加参数化生成
- 港口区特色：更开阔、更多掩体车辆、水边撤离点
- 敌人配置更难（更多精英）

#### Task 7: 第三张地图——实验室（1h）
- 室内为主的紧凑地图
- 暗色调、更多门和走廊
- 最高难度敌人配置

**总工时估计：5-6h**

---

## 功能二：外部3D模型（Kenney CC0）

### 资源选择

Kenney.nl 免费 CC0 资源包：
- [Kenney Minifig](https://kenney.nl/assets/mini-characters) — 低多边形人物
- [Kenney Blaster Kit](https://kenney.nl/assets/blaster-kit) — 科幻武器模型
- [Kenney Furniture Kit](https://kenney.nl/assets/furniture-kit) — 家具/道具
- [Kenney Tower Defense Kit](https://kenney.nl/assets/tower-defense-kit) — 建筑/塔

### 任务拆分

#### Task 1: GLTFLoader 集成（20min）
- 安装 three/examples/jsm/loaders/GLTFLoader
- 新建 `src/core/AssetLoader.js` — 预加载所有模型
- Loading 进度条 UI

#### Task 2: 下载 Kenney 资源（15min）
- 下载 Mini Characters + Blaster Kit
- 解压到 `fps-game/public/models/`
- 验证 GLB 文件可加载

#### Task 3: 替换玩家模型（30min）
- 用 Kenney minifig 替换当前几何体拼装
- 保持碰撞体积不变
- 武器模型挂载到手部

#### Task 4: 替换敌人模型（30min）
- 普通鸭卒用不同颜色/配件的 minifig
- 精英用更大/特殊颜色的模型
- 保持 HP 条和状态环

#### Task 5: 替换环境道具（30min）
- 油桶、箱子、桌椅用 Kenney 模型
- 保持碰撞体积匹配

#### Task 6: 物品模型（20min）
- 弹药、医疗包、钥匙等用小型模型替代彩色方块
- 保持发光效果

**总工时估计：2.5-3h**

---

## 功能三：多人 MVP（2人同屏）

### 架构设计

```
[客户端 A]  ←──WebSocket──→  [Node.js 服务器]  ←──WebSocket──→  [客户端 B]
   ↓                              ↓                                ↓
本地预测移动              权威状态（所有玩家位置+血量）          本地预测移动
本地射击特效              射击命中判定                       本地射击特效
服务端校正                广播状态更新                       服务端校正
```

### 任务拆分

#### Task 1: WebSocket 服务器骨架（1h）
- 新建 `server/` 目录
- `server/index.js` — Node.js + ws 库
- 房间系统：创建房间 / 加入房间 / 最多2人
- 心跳检测 + 断线清理

#### Task 2: 网络消息协议（30min）
- 定义消息格式（JSON）：
  ```
  { type: 'move', x, z, angle }
  { type: 'shoot', x, z, angle, weaponId }
  { type: 'hit', targetId, damage }
  { type: 'state', players: [...], enemies: [...] }
  { type: 'join', playerId }
  { type: 'leave', playerId }
  ```

#### Task 3: 客户端网络层（1h）
- 新建 `src/systems/NetworkSystem.js`
- WebSocket 连接管理
- 发送本地玩家状态（位置+角度+射击）每 50ms
- 接收并应用其他玩家状态

#### Task 4: 远程玩家渲染（1h）
- 新建 `src/entities/RemotePlayer.js`
- 和 Player 相同的模型，不同颜色（蓝色）
- 位置插值平滑（lerp，不要瞬移）
- 显示名字标签

#### Task 5: 射击同步（1.5h）
- 本地射击：立刻显示弹道+特效（客户端预测）
- 发送射击事件到服务器
- 服务器验证命中（防作弊）
- 广播命中结果给所有客户端
- 受击玩家显示伤害

#### Task 6: 大厅 UI（1h）
- 新建 `src/ui/LobbyScreen.js`
- 创建房间 → 获得房间码
- 输入房间码加入
- 等待界面（显示已加入玩家）
- 房主点"开始"

#### Task 7: AI 同步（1h）
- 服务器运行 AI 逻辑（或由房主客户端运行）
- 简化方案：房主客户端运行 AI，广播敌人状态
- 其他玩家只渲染敌人位置

#### Task 8: 部署（1h）
- 服务器部署到 Fly.io 或 Railway（免费层）
- 客户端连接生产 WebSocket 地址
- 本地开发时连 localhost

#### Task 9: 测试调优（2h）
- 两个浏览器标签页测试
- 延迟模拟测试
- 断线重连基础处理
- 边界情况：同时射击、同时拾取

**总工时估计：10-12h**

---

## 推荐执行顺序

1. **功能一（多关卡+基地）** — 先做，给游戏一个完整循环
2. **功能二（3D模型）** — 第二做，视觉质量飞跃
3. **功能三（多人）** — 最后做，依赖前两个功能稳定

三个功能总计 **18-21h**。

可以并行的部分：
- 功能二（模型替换）和功能一（基地系统）互不依赖
- 功能三必须等功能一基本完成
