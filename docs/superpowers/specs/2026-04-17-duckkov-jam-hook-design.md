# 逃离鸭科夫 × Cursor Vibe Jam 2026 —— 14 天冲刺设计

**创建日期**：2026-04-17
**提交截止**：2026-05-01 13:37 UTC
**剩余时间**：14 天
**作者**：xx

---

## 1. 背景与目标

`逃离鸭科夫`（Three.js 俯视角撤离射击）已有完整的战斗、背包、撤离、天赋、制造系统。
参加 [Cursor Vibe Jam 2026](https://vibej.am/2026/)，目标：**在 100+ 参赛作品中让评委（含 @levelsio）记住。**

核心矛盾：
- 现有 pitch "Q 版塔科夫" 独特性不足，评委见多了
- 45 分钟突袭 × 复杂 meta 系统 × 评委 5-10 分钟试玩窗口 = 评委看不到游戏设计意图

解法：加一个**让判官玩完就想发推**的 hook，同时把游戏压到评委能在 8 分钟内走完全流程。

---

## 2. Jam 硬约束（必须满足，否则 DQ）

| 约束 | 要求 | 当前状态 |
|---|---|---|
| 创作期 | 2026-04-01 之后新做 | ✅ 本次所有代码都在期内 |
| AI 代码占比 | ≥ 90% | ✅ 使用 Cursor 写 |
| 必装 widget | `<script async src="https://vibej.am/2026/widget.js"></script>` | ❌ 未装，D1 必须补 |
| 纯网页 | 无登录 / 无下载 / 秒加载 | ⚠️ 已在线，但首屏加载需优化 |
| 单人单作品 | | ✅ |

---

## 3. Hook 概念

### 3.1 一句话 pitch
> **你以为这是塔科夫，结果是场 indie hacker 朝圣。**
> *You think it's Tarkov. It's actually a pilgrimage through the indie hacker pantheon.*

### 3.2 基调（硬规则）
- **tribute（致敬）而非 roast（嘲讽）**。@levelsio 把"vibe"定义为不正经但有爱——我们做的是头像化、神坛化、英雄化，不是丑化
- 所有 boss 都是"最强鸭"，不是"笑话鸭"
- 死前台词来自本人公开名言的鸭版改写
- 主菜单底部声明：*"A respectful tribute to the builders who made this jam possible. Not affiliated."*
- 提供 Twitter/Email 下线入口，本人要求即 deploy 移除

### 3.3 为什么此 hook 适合本次 jam
- 评委玩到自己 → 算法推荐 + 主动发推 = 免费曝光
- @levelsio 有 build-in-public + meme culture 背景，大概率喜欢
- AI 管线（预生成 TTS）本身就契合 Cursor jam 主题

---

## 4. 架构：名人堂撤离门（Approach A）

### 4.1 玩家体验流程（目标 6-8 分钟）

```
[开始] → 首轮固定 seed → 60 秒 in-world 引导
     ↓
[突袭搜刮 3-4 分钟] → 常规鸭卒 / 精英鸭 / 波次
     ↓
[撤离点前：名人堂门] → 触发 boss 序列
     ↓
[遭遇 1] 赞助商关：Cursor + Bolt 2v1
     ↓
[遭遇 2] 评委三连：s13k / timsoret / nicolamanzini
     ↓
[遭遇 3] 最终 boss：@levelsio 鸭王（三阶段）
     ↓
[撤离] → 带走 Indie Hacker's Revolver → 结算屏
```

### 4.2 为什么是 A 而不是独立 Boss Rush（B）
- 复用现有地图、撤离、敌人 AI
- 保留"塔科夫"外壳 → 转场"朝圣"时的反差更强（记忆点）
- 工作量是 B 的 2/3

---

## 5. Boss 阵容

| # | 遭遇 | Boss | 颜色 | 机制 | 出场台词 | 死亡台词 | 掉落 |
|---|---|---|---|---|---|---|---|
| 1a | 赞助商关 | **@cursor_ai**（代码鸭）| 黑 | 高速压制射击，tab-complete 追尾子弹 | *"I am the tab completion."* | *"Cmd+Z failed…"* | **Cmd+K Carbine**（AK 皮肤）|
| 1b | 同场 | **@boltdotnew**（闪电鸭）| 紫 | 短距传送偷袭，1.5s 无敌 | *"Deploy to prod, die to duck."* | *"Rollback…"* | **Bolt Pistol**（Glock 皮肤）|
| 2a | 评委三连 | **@s13k_** | 红 | 重甲坦克，头 = 唯一弱点 | *"I'm judging your code right now."* | *"Passing score... barely."* | 评委勋章（+1 背包格）|
| 2b | 同场 / 分房 | **@timsoret** | 青 | 帧停镜头向慢速弹幕 | *"Cinematic kill incoming."* | *"Cut... that's a wrap."* | 评委勋章（+10 HP）|
| 2c | 同场 / 分房 | **@nicolamanzini** | 黄 | 陷阱 / 技术流 | *"Well engineered."* | *"Nice architecture."* | 评委勋章（+10% 移速）|
| 3 | 最终 boss | **@levelsio 鸭王** | 橙 | **三阶段**：①标准射击 ②召唤鸭卒佣兵（3 只）③残血狂暴 "Ship it mode"（双倍射速）| *"Welcome to the jam, duck."* / *"Build in public — die in public."* | *"Ship it... quack..."* / *"This is YOUR jam now."* | **Indie Hacker's Revolver**（新武器，高伤高弹速手枪）+ 撤离结算屏皮肤 |

### 5.1 视觉表达
- 头顶浮空 `@handle`（白字 + 轻微发光 + 拖尾，远距离可见）
- 身体用代表色涂装（见表）
- 死亡瞬间：屏幕边缘弹出一张 **SVG 手绘风 duck portrait**（非真实头像），0.4 秒 flash
- 致命一击触发 `hit stop`（0.08s 屏幕冻结）

### 5.2 语音管线
- 工具：**ElevenLabs** 或 **OpenAI tts-1**（AI jam 里用 AI 语音是加分项）
- 每 boss：2 条出场 + 2 条死亡 = 4 条
- 5 boss × 4 = **20 条音频**，预渲染为 .ogg，每条 2-4 秒，总体积 < 1MB
- 落地位置：`/public/audio/bosses/{handle}/{spawn_1,spawn_2,death_1,death_2}.ogg`
- 失败兜底：音频加载失败 → 屏幕中央弹出文字气泡（同一台词）

---

## 6. 对现有系统的改动

### 6.1 砍 / 藏（首次游玩不暴露）
| 现有系统 | 处理 | 理由 |
|---|---|---|
| 45 分钟突袭时长 | 压到 8 分钟 | 评委不会玩 45 分钟 |
| 3 难度选择 | 只保留 Normal | 减少判断成本 |
| 12 天赋树 | 首轮隐藏，打穿 1 次后解锁 | 深度留给回访 |
| 8 配方制造 | 首轮隐藏 | 同上 |
| 敌人波次 | 保留但更稀，让路 boss 节奏 | 避免喧宾夺主 |

### 6.2 加
1. **vibej.am widget** 插入 `index.html` 头部（D1 第一件事）
2. **60 秒 in-world 引导**：纯气泡提示（WASD / 左键 / 撤离），不做独立 tutorial 场景
3. **首屏加载 < 3 秒**：主 bundle ≤ 500KB，美术资源 lazy load
4. **首轮固定 demo seed**：新玩家首轮 spawn、装备、第一波敌人位置固定，保证评委前 60 秒看到设计意图
5. **Boss 基类**：扩展现有 enemy，加 name tag / portrait flash / 阶段机 / 台词调度

### 6.3 提交素材（并行产出）
- 1 张 GIF 封面（推荐画面：@levelsio 出场瞬间）
- 3 张静态截图（战斗 / boss 对视 / 撤离结算带 Revolver）
- 30 秒 YouTube/X 演示视频
- itch.io / jam 提交页文案（中英双语）

---

## 7. 14 天日程（Apr 17 → May 1 13:37 UTC）

假设日均 4 小时（同时在投简历，保守估计）。

| 日期 | 主任务 | 完成定义 |
|---|---|---|
| **Apr 17** 今天 | spec 锁定 + TTS 管线试跑 + widget 装上 | `index.html` 有 widget，TTS 跑通 1 条示例 |
| **Apr 18-19** | 基础改造：45→8 分钟 / 60 秒 in-world 引导 / 首轮 demo seed / 加载瘦身 | 新玩家能在 8 分钟内完成一次完整循环 |
| **Apr 20** | Boss 框架：基类、name tag、portrait flash、掉落流 | 地图可塞测试 boss 跑通 |
| **Apr 21-22** | 赞助商关：Cursor + Bolt 2v1 机制 + 语音 | 能打、有台词、有掉落 |
| **Apr 23-25** | 评委三连关：s13k / timsoret / nicolamanzini | 能打，三种机制差异化 |
| **Apr 26-28** | @levelsio 三阶段 boss（最重） | 三阶段节奏、语音、Indie Hacker's Revolver |
| **Apr 29** | 整体 playtest + bug fix + 数值平衡 | 自己能一把打穿且觉得爽 |
| **Apr 30** | 提交素材：GIF / 截图 / 30 秒视频 / itch 文案 | 发布页完整 |
| **May 1** | 最终 deploy + 提前提交（目标中午前） | 已提交 |

### 7.1 保命 Gate
- **Apr 22 末**：infra + 赞助商关必须可玩。不行则合并评委关。
- **Apr 28 末**：所有 boss 必须可玩。不行则合并赞助 + 砍评委关。
- **Apr 30**：必须有可运行链接提交，后续只修小 bug。

### 7.2 掉进度时的砍法顺序（从上往下砍）
1. 评委三连 → 合并成一只"评委团"复合 boss
2. Cursor + Bolt 合并成 1 只"赞助鸭"
3. 语音全部 → 文字气泡
4. 30 秒视频 → 只出 GIF

---

## 8. 成功标准（Definition of Success）

### 8.1 必须项（Gate pass 才能提交）
- [ ] widget 装载正常
- [ ] 首屏 < 3 秒加载完成
- [ ] 新玩家首轮可在 8 分钟内打穿 @levelsio
- [ ] 最终 boss 击杀后能拿到 Indie Hacker's Revolver 并撤离成功
- [ ] itch 提交页 + 演示素材齐全

### 8.2 理想项（冲奖）
- [ ] @levelsio 在评审期内看到 / 转发游戏
- [ ] 单社交帖 ≥ 10k 浏览
- [ ] 评委试玩留存至 @levelsio boss 房（完播率）> 60%

### 8.3 兜底项（不影响提交但重要）
- [ ] tribute 声明显示在主菜单
- [ ] 下线入口（Twitter DM / Email）可达

---

## 9. 明确排除（Out of Scope）

- 新地图 / 新区域（全程用现有撤离地图）
- 新武器设计（除 Indie Hacker's Revolver）—— 其他全是现有武器皮肤
- 多人 / 联机
- 服务器 / leaderboard / 账号系统
- 新语言本地化（中英现有够用）
- Mobile 适配（桌面浏览器 only，但保证 rwd 不崩）
- 存档云同步（localStorage 已够）
- 平衡调优以外的天赋 / 制造新内容

---

## 10. 伦理与致敬安全

- 所有被点名人物**只用公开活跃身份**（推特 handle），不使用真实头像、真实录音、本人声音模仿
- 视觉统一卡通化鸭形，不做真人拟人
- 台词只改写**本人公开名言**，不虚构任何让其难堪的话
- 主菜单底部 disclaimer：*"A respectful tribute. Not affiliated with any named individuals or companies."*
- 提供下线入口（首页链接到 Twitter DM + Email），承诺 24 小时内 deploy 移除
- 若 @levelsio 明确表达不适，立刻把 @levelsio 改回通用"Vibe King"匿名 boss

---

## 11. 未决 / 需确认

- [ ] TTS 最终选型（ElevenLabs vs OpenAI tts-1）—— D1 测试后定
- [ ] @timsoret / @nicolamanzini 是否沿用 —— 待 D1 查本人风格后定台词
- [ ] Indie Hacker's Revolver 最终数值（伤害 / 弹速 / 弹容）—— 放到 D28 平衡日定
- [ ] 撤离场景的 boss 房是加在现有地图末尾还是单独加载 —— D20 基类搭好后根据复用成本定

---

## 附录 · 参考

- [Cursor Vibe Jam 2026 官网](https://vibej.am/2026/)
- [@levelsio Jam 公告](https://x.com/levelsio/status/2039777677435908421)
- 现有项目：`/Users/xx/Desktop/game/game/fps-game/`
- 现有美术资源：`/Users/xx/Desktop/tarkov-jam/`
- 现有 live 链接：https://suzyeth.github.io/escape-from-duckkov/
