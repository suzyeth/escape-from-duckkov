# 逃离鸭科夫 × Cursor Vibe Jam 2026 —— 14 天实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 14 天内把现有"Q 版塔科夫"改造为"Indie Hacker 名人堂朝圣"，赶在 2026-05-01 13:37 UTC 前提交 Cursor Vibe Jam 2026。

**Architecture:** 在现有撤离地图的主撤离点前加入名人堂 boss 门——3 波遭遇（赞助商 / 评委 / @levelsio）共 5 个 boss，复用现有 Enemy/AISystem，用扩展而非重写。所有新 boss 通过 `BossController` 挂载到现有 Enemy 实例上，不触动战斗主循环。

**Tech Stack:** 现有 Three.js + Vite + lil-gui，无测试框架（jam 项目，接受 playtest-driven 验证）。新增：ElevenLabs TTS API（仅构建期使用，运行时只加载预生成 .ogg）。

**Spec:** `docs/superpowers/specs/2026-04-17-duckkov-jam-hook-design.md`

**验证方式：** 本项目无 unit test 基础设施，每个 task 的验证是 **`npm run dev` + 执行具体动作 + 观察具体现象**。接受标准写在每个 task 的 "Verify" 步骤。

---

## 文件结构地图

### 新建文件
| 路径 | 责任 |
|---|---|
| `fps-game/src/bosses/BossController.js` | Boss 共用逻辑：阶段机、name tag、portrait flash、语音调度、掉落 |
| `fps-game/src/bosses/BossRegistry.js` | Boss 元数据（handle / color / lines / drops / phases）查表 |
| `fps-game/src/bosses/phases/LevelsioPhases.js` | @levelsio 专用 3 阶段脚本 |
| `fps-game/src/bosses/voiceBank.js` | 语音文件 manifest + 预加载 |
| `fps-game/public/audio/bosses/<handle>/spawn_1.ogg` ... | 20 条 TTS 预渲染音频 |
| `fps-game/public/portraits/<handle>.svg` | 5 张 duck portrait |
| `fps-game/src/ui/BossNameTag.js` | 头顶 handle 浮空标签 |
| `fps-game/src/ui/PortraitFlash.js` | 击败瞬间屏幕边 portrait 闪现 |
| `fps-game/src/ui/TributeNotice.js` | 主菜单底部 disclaimer + 下线入口 |
| `fps-game/src/world/HallOfFame.js` | 撤离门前名人堂区域布置 + 触发门 |
| `fps-game/src/systems/DemoSeed.js` | 首轮固定 seed（spawn / 装备 / 第一波敌人） |
| `scripts/gen-tts.mjs` | 一次性脚本：读 voiceBank manifest → 调 TTS API → 写入 public/audio |
| `docs/superpowers/plans/jam-progress.md` | 每日进度日志（每日晚间 10 分钟更新） |

### 修改文件
| 路径 | 改动 |
|---|---|
| `fps-game/index.html` | 加 vibej.am widget + tribute 声明锚点 |
| `fps-game/src/main.js:936` | 45 → 8 分钟 raid 时长；加 HallOfFame 触发 |
| `fps-game/src/main.js` 整体 | 首次游玩隐藏天赋/制造/难度；集成 DemoSeed |
| `fps-game/src/entities/Enemy.js:27` | 扩展 ENEMY_TYPES，加 5 条 boss 项 |
| `fps-game/src/systems/AISystem.js` | 支持 BossController 挂接 |
| `fps-game/src/systems/LootSystem.js` | 新增 Indie Hacker's Revolver + 4 把 boss 掉落 |
| `fps-game/src/systems/WeaponSystem.js` | 注册 Revolver 武器定义 |
| `fps-game/src/world/Level.js` | 撤离点前留 HallOfFame 区域 |
| `fps-game/src/ui/LobbyScreen.js` | 加 TributeNotice + 首轮隐藏高级选项 |
| `fps-game/src/ui/HUD.js` | 加 boss 血条（复用现有 boss 血条逻辑） |
| `fps-game/src/systems/TutorialSystem.js` | 60 秒 in-world 引导气泡重写 |
| `fps-game/vite.config.js` | 资源分包策略（lazy load 美术） |
| `fps-game/package.json` | `scripts.gen-tts` |

### 不动文件（明确排除）
- `InventorySystem.js / CraftingSystem.js / TalentSystem.js / StashScreen.js` —— 仅在 LobbyScreen 隐藏入口，代码不动
- `NetworkSystem.js / RemotePlayer.js` —— jam 单人提交，不碰联机

---

## 每日进度追踪

**每晚 10 分钟更新 `docs/superpowers/plans/jam-progress.md`，记录：**
- 今日完成的 task id
- 遇到的问题 & 解法
- 明日第一件事
- 是否需要触发砍法顺序（Gate check）

---

# Phase 0 · D0（今天 2026-04-17）—— Infra Bootstrap

目标：jam 硬约束（widget）先满足，TTS 管线跑通 1 条示例。

## Task 0.1: 装 vibej.am widget

**Files:**
- Modify: `fps-game/index.html`（`<head>` 最后一行）

- [ ] **Step 1: 在 `<head>` 结束前一行加 widget**

打开 `fps-game/index.html`，找到 `</head>`，在前面加：

```html
  <!-- Cursor Vibe Jam 2026 required widget -->
  <script async src="https://vibej.am/2026/widget.js"></script>
</head>
```

- [ ] **Step 2: 启动 dev 服务器**

```bash
cd /Users/xx/Desktop/game/game/fps-game && npm run dev
```

Expected: 打开 `http://localhost:3000/escape-from-duckkov/` 能看到游戏首屏 + 浏览器右下角或角落出现 vibej.am 小角标（具体位置由 widget 脚本决定）。

- [ ] **Step 3: 验证 widget 不挡主按钮**

点击"开始游戏"，角标不能挡住 UI 也不能拦截点击。如挡住，用 CSS `pointer-events: none` 给外层包一层 fallback。

- [ ] **Step 4: 提交**

```bash
git add fps-game/index.html
git commit -m "feat(jam): add vibej.am 2026 required widget"
```

---

## Task 0.2: TTS 管线脚本

**Files:**
- Create: `scripts/gen-tts.mjs`
- Create: `fps-game/src/bosses/voiceBank.js`
- Create: `fps-game/public/audio/bosses/levelsio/spawn_1.ogg`（单条示例）
- Modify: `fps-game/package.json`（加 scripts）

- [ ] **Step 1: 建 voice manifest**

Create `fps-game/src/bosses/voiceBank.js`:

```javascript
// Pre-generated TTS manifest. Audio files live in /public/audio/bosses/<handle>/
// Keep file names stable — build script writes here, runtime loads by name.
export const VOICE_MANIFEST = {
  'levelsio': {
    voice: 'onyx',  // OpenAI tts-1 voice id; update to your chosen voice
    lines: {
      spawn_1: 'Welcome to the jam, duck.',
      spawn_2: 'Build in public. Die in public.',
      death_1: 'Ship it... quack...',
      death_2: 'This is your jam now.',
    },
  },
  // Other bosses added in later tasks (0.3 and Phase 3-5)
};

export function audioUrlFor(handle, key) {
  return `/escape-from-duckkov/audio/bosses/${handle}/${key}.ogg`;
}
```

- [ ] **Step 2: 写 build 脚本**

Create `scripts/gen-tts.mjs`:

```javascript
#!/usr/bin/env node
// One-shot: read VOICE_MANIFEST, hit OpenAI tts-1, write .ogg into public/audio/bosses/
// Usage: OPENAI_API_KEY=sk-... node scripts/gen-tts.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import { VOICE_MANIFEST } from '../fps-game/src/bosses/voiceBank.js';

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) { console.error('Missing OPENAI_API_KEY'); process.exit(1); }

const OUT_ROOT = path.resolve('fps-game/public/audio/bosses');

for (const [handle, cfg] of Object.entries(VOICE_MANIFEST)) {
  const outDir = path.join(OUT_ROOT, handle);
  await fs.mkdir(outDir, { recursive: true });
  for (const [key, text] of Object.entries(cfg.lines)) {
    const outPath = path.join(outDir, `${key}.ogg`);
    try { await fs.access(outPath); console.log(`skip (exists): ${handle}/${key}`); continue; } catch {}
    console.log(`gen: ${handle}/${key} — "${text}"`);
    const res = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'tts-1', voice: cfg.voice, input: text, response_format: 'opus' }),
    });
    if (!res.ok) { console.error(`FAIL ${handle}/${key}: ${res.status} ${await res.text()}`); process.exit(1); }
    const buf = Buffer.from(await res.arrayBuffer());
    await fs.writeFile(outPath, buf);
  }
}
console.log('done');
```

- [ ] **Step 3: 注册 npm script**

Modify `fps-game/package.json` scripts block:

```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "gen-tts": "node ../scripts/gen-tts.mjs"
  },
```

- [ ] **Step 4: 跑通 1 条**

```bash
cd /Users/xx/Desktop/game/game/fps-game && OPENAI_API_KEY=sk-xxx npm run gen-tts
```

Expected: `fps-game/public/audio/bosses/levelsio/spawn_1.ogg` 等 4 个文件生成。

在终端播放验证：`afplay fps-game/public/audio/bosses/levelsio/spawn_1.ogg`

Expected: 听到 "Welcome to the jam, duck."

- [ ] **Step 5: 提交（不提交音频二进制）**

加 `.gitignore` 条目避免音频入库（或用 LFS，本 jam 就直接 ignore + release 时 push 到 gh-pages 分支）：

```bash
echo "fps-game/public/audio/bosses/" >> .gitignore
git add scripts/gen-tts.mjs fps-game/src/bosses/voiceBank.js fps-game/package.json .gitignore
git commit -m "feat(jam): TTS pipeline + voiceBank manifest"
```

---

## Task 0.3: 扩充 voiceBank 所有台词

**Files:**
- Modify: `fps-game/src/bosses/voiceBank.js`

- [ ] **Step 1: 补全 5 个 boss 全部 20 条台词**

替换 `VOICE_MANIFEST`：

```javascript
export const VOICE_MANIFEST = {
  cursor_ai: {
    voice: 'echo',
    lines: {
      spawn_1: 'I am the tab completion.',
      spawn_2: 'Predict this, duck.',
      death_1: 'Command Z failed.',
      death_2: 'Uncaught exception.',
    },
  },
  boltdotnew: {
    voice: 'fable',
    lines: {
      spawn_1: 'Deploy to prod, die to duck.',
      spawn_2: 'One shot, one build.',
      death_1: 'Rollback in progress.',
      death_2: 'Build failed.',
    },
  },
  s13k_: {
    voice: 'nova',
    lines: {
      spawn_1: "I'm judging your code right now.",
      spawn_2: 'Let me see your commits.',
      death_1: 'Passing score, barely.',
      death_2: 'Ship it.',
    },
  },
  timsoret: {
    voice: 'alloy',
    lines: {
      spawn_1: 'Cinematic kill incoming.',
      spawn_2: 'Camera is rolling.',
      death_1: 'Cut. That was a wrap.',
      death_2: 'Final shot.',
    },
  },
  nicolamanzini: {
    voice: 'shimmer',
    lines: {
      spawn_1: 'Well engineered.',
      spawn_2: 'Structure matters.',
      death_1: 'Nice architecture.',
      death_2: 'Refactored.',
    },
  },
  levelsio: {
    voice: 'onyx',
    lines: {
      spawn_1: 'Welcome to the jam, duck.',
      spawn_2: 'Build in public. Die in public.',
      death_1: 'Ship it... quack...',
      death_2: 'This is your jam now.',
    },
  },
};

export function audioUrlFor(handle, key) {
  return `/escape-from-duckkov/audio/bosses/${handle}/${key}.ogg`;
}
```

- [ ] **Step 2: 跑满全部 TTS**

```bash
cd fps-game && OPENAI_API_KEY=sk-xxx npm run gen-tts
```

Expected: `public/audio/bosses/{cursor_ai,boltdotnew,s13k_,timsoret,nicolamanzini,levelsio}/` 各 4 个 .ogg。

- [ ] **Step 3: 总体积检查**

```bash
du -sh fps-game/public/audio/bosses/
```

Expected: < 1 MB（24 条音频 × 平均 30-40 KB）。超标则降 bitrate。

- [ ] **Step 4: 提交**

```bash
git add fps-game/src/bosses/voiceBank.js
git commit -m "feat(jam): all 24 boss voice lines in manifest"
```

---

# Phase 1 · D1-2（Apr 18-19）—— 基础改造

目标：把 45 分钟塔科夫压成 8 分钟 jam 游戏，首轮新手有上手感。

## Task 1.1: Raid 时长 45 → 8 分钟

**Files:**
- Modify: `fps-game/src/main.js:936`（`hud.resetRaid(45 * 60)`）

- [ ] **Step 1: 改时长**

搜索 `hud.resetRaid(45` in `main.js`，改成：

```javascript
  hud.resetRaid(8 * 60);  // Jam: 8-min raid (was 45 min)
```

同步检查并改同文件中所有与 45 分钟相关的 hard-code（grep `45 \* 60`, `45\*60`, `RAID_`）。

- [ ] **Step 2: Verify**

`npm run dev` → 开新局 → HUD 顶部时钟应从 `08:00` 开始倒数。

- [ ] **Step 3: Commit**

```bash
git add fps-game/src/main.js
git commit -m "feat(jam): compress raid from 45min to 8min for jam pacing"
```

---

## Task 1.2: 首轮 demo seed

**Files:**
- Create: `fps-game/src/systems/DemoSeed.js`
- Modify: `fps-game/src/main.js`（首轮判断 + 调用 DemoSeed）

- [ ] **Step 1: 写 DemoSeed**

Create `fps-game/src/systems/DemoSeed.js`:

```javascript
// First-run deterministic state. Judges see identical opening 60 seconds.
// Drives: spawn position, starting weapon, first 3 enemy spawns.

const SEEN_KEY = 'duckkov_hasPlayedBefore';

export function isFirstRun() {
  return !localStorage.getItem(SEEN_KEY);
}

export function markPlayed() {
  localStorage.setItem(SEEN_KEY, '1');
}

// Fixed values for first-run (indexes into existing arrays)
export const DEMO_SEED = {
  spawnPointIndex: 0,      // Level.playerSpawnPoints[0]
  startingWeaponId: 'ak74',
  startingAmmo: 60,
  startingArmor: 'vest_light',
  firstWaveEnemies: [
    { type: 'normal', offset: { x: 8,  z: 5  } },
    { type: 'normal', offset: { x: 12, z: -3 } },
    { type: 'elite',  offset: { x: 4,  z: 10 } },
  ],
};
```

- [ ] **Step 2: 在 main.js 里应用**

搜索 `spawnPoints[` 的位置（约 line 888），改成：

```javascript
import { isFirstRun, markPlayed, DEMO_SEED } from './systems/DemoSeed.js';
// ...
const spawnPoints = level.playerSpawnPoints;
const spIdx = isFirstRun() ? DEMO_SEED.spawnPointIndex : Math.floor(Math.random() * spawnPoints.length);
player.position.copy(spawnPoints[spIdx]);
if (isFirstRun()) {
  // Override starting weapon / ammo / armor
  player.equipWeapon(DEMO_SEED.startingWeaponId);
  player.setAmmo(DEMO_SEED.startingAmmo);
  player.equipArmor(DEMO_SEED.startingArmor);
}
```

> **Note:** 如现有 `equipWeapon/setAmmo/equipArmor` 接口不存在，按现有代码里玩家已用的赋值方式直接写。不新造 API。

- [ ] **Step 3: 结算后标记**

在撤离成功或死亡处理处加：

```javascript
markPlayed();
```

- [ ] **Step 4: Verify**

`localStorage.clear()` → 开局 → 玩家 spawn 在固定点、手持 AK74、60 发、轻甲。再开局（不清 storage）→ 随机 spawn。

- [ ] **Step 5: Commit**

```bash
git add fps-game/src/systems/DemoSeed.js fps-game/src/main.js
git commit -m "feat(jam): first-run demo seed for consistent judge opening"
```

---

## Task 1.3: 60 秒 in-world 引导气泡

**Files:**
- Modify: `fps-game/src/systems/TutorialSystem.js`（改写现有 123 行实现）

- [ ] **Step 1: 改写 TutorialSystem**

把现有 TutorialSystem 改成 4 阶段气泡（只在 `isFirstRun()` 为 true 时触发）：

```javascript
import { isFirstRun } from './DemoSeed.js';

const STEPS = [
  { id: 'move',    text: 'WASD 移动',        trigger: 'time',    delay: 1.0 },
  { id: 'shoot',   text: '左键射击',          trigger: 'move',    delay: 3.0 },
  { id: 'pickup',  text: 'E 拾取',            trigger: 'nearLoot', delay: 0 },
  { id: 'extract', text: '到撤离点按 E 撤离', trigger: 'time',    delay: 45 },
];

export class TutorialSystem {
  constructor(hud) {
    this.hud = hud;
    this.active = isFirstRun();
    this.stepIdx = 0;
    this.t = 0;
    this.moved = false;
  }

  notifyMove() { this.moved = true; }
  notifyNearLoot() {
    const s = STEPS[this.stepIdx];
    if (this.active && s?.trigger === 'nearLoot') this._show(s);
  }

  update(dt) {
    if (!this.active) return;
    this.t += dt;
    const s = STEPS[this.stepIdx];
    if (!s) return;
    if (s.trigger === 'time' && this.t >= s.delay) this._show(s);
    else if (s.trigger === 'move' && this.moved && this.t >= s.delay) this._show(s);
  }

  _show(step) {
    this.hud.showBubble(step.text, 4.0);  // HUD 新增 API：屏幕上方气泡 4 秒
    this.stepIdx++;
    this.t = 0;
  }
}
```

- [ ] **Step 2: 在 HUD 加 showBubble API**

Modify `fps-game/src/ui/HUD.js`：加一个 4 秒自动淡出的文字气泡实现（屏幕上方中央、白字黑描边）。如 HUD 已有类似 API 复用之。

```javascript
// 在 HUD 类内：
showBubble(text, seconds = 3) {
  let el = this._bubble;
  if (!el) {
    el = document.createElement('div');
    el.id = 'hud-bubble';
    el.style.cssText = 'position:fixed;top:12%;left:50%;transform:translateX(-50%);padding:12px 24px;background:rgba(0,0,0,.75);color:#fff;font-family:"Courier New",monospace;font-size:18px;border:2px solid #fff;border-radius:8px;z-index:500;pointer-events:none;opacity:0;transition:opacity .3s';
    document.body.appendChild(el);
    this._bubble = el;
  }
  el.textContent = text;
  el.style.opacity = '1';
  clearTimeout(this._bubbleT);
  this._bubbleT = setTimeout(() => { el.style.opacity = '0'; }, seconds * 1000);
}
```

- [ ] **Step 3: 在 main.js 拴钩子**

玩家移动时调 `tutorialSystem.notifyMove()`；靠近可拾取物时调 `tutorialSystem.notifyNearLoot()`。

- [ ] **Step 4: Verify**

`localStorage.clear()` → 开局 → 1s 后看到 "WASD 移动" → 动一下 → 3s 后看到 "左键射击" → 走到 loot 旁看到 "E 拾取" → 45s 看到 "到撤离点按 E 撤离"。

- [ ] **Step 5: Commit**

```bash
git add fps-game/src/systems/TutorialSystem.js fps-game/src/ui/HUD.js fps-game/src/main.js
git commit -m "feat(jam): 60s in-world onboarding bubbles (first run only)"
```

---

## Task 1.4: 首轮隐藏天赋/制造/难度

**Files:**
- Modify: `fps-game/src/ui/LobbyScreen.js`

- [ ] **Step 1: 查找大厅菜单入口**

```bash
grep -n "talent\|craft\|difficulty\|天赋\|制造\|难度" fps-game/src/ui/LobbyScreen.js
```

- [ ] **Step 2: 首轮时隐藏这些按钮**

在 LobbyScreen 的 render / show 处加：

```javascript
import { isFirstRun } from '../systems/DemoSeed.js';
// ...
if (isFirstRun()) {
  this.talentBtn?.style.setProperty('display', 'none');
  this.craftBtn?.style.setProperty('display', 'none');
  this.difficultyBtn?.style.setProperty('display', 'none');
}
```

- [ ] **Step 3: 强制 Normal 难度**

首轮难度固定：

```javascript
if (isFirstRun()) this.difficulty = 'normal';
```

- [ ] **Step 4: Verify**

`localStorage.clear()` → 大厅只看到 "开始游戏" + 设置。打完一局后返回大厅能看到天赋 / 制造 / 难度。

- [ ] **Step 5: Commit**

```bash
git add fps-game/src/ui/LobbyScreen.js
git commit -m "feat(jam): hide talent/craft/difficulty on first run for judge clarity"
```

---

## Task 1.5: 加载瘦身（首屏 < 3 秒）

**Files:**
- Modify: `fps-game/vite.config.js`
- Modify: `fps-game/src/core/AssetLoader.js`（如存在 lazy 接口）

- [ ] **Step 1: 配置 Vite 分包**

```javascript
export default {
  base: '/escape-from-duckkov/',
  server: { port: 3000, open: true },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          bosses: [
            './src/bosses/BossController.js',
            './src/bosses/BossRegistry.js',
          ],
        },
      },
    },
  },
}
```

- [ ] **Step 2: 检查首屏 bundle 体积**

```bash
cd fps-game && npm run build && du -sh ../dist/assets/index-*.js
```

Expected: 主 chunk ≤ 500 KB（gzip 前 ~1.5 MB，gzip 后 ~500 KB 可接受）。

- [ ] **Step 3: Lazy-load 非必要美术**

如 `AssetLoader.js` 有 preload 所有资源的逻辑，改为只预加载玩家出生点可见的。Boss 美术在进入名人堂前 preload。

- [ ] **Step 4: Verify**

本地 `npm run preview`，Chrome DevTools Network 看首屏完成时间 < 3 秒（慢 3G throttle 下 < 8 秒）。

- [ ] **Step 5: Commit**

```bash
git add fps-game/vite.config.js fps-game/src/core/AssetLoader.js
git commit -m "perf(jam): chunk splitting + lazy art for <3s first paint"
```

---

## Task 1.6: Tribute 声明 + 下线入口

**Files:**
- Create: `fps-game/src/ui/TributeNotice.js`
- Modify: `fps-game/src/ui/LobbyScreen.js`

- [ ] **Step 1: 组件**

Create `fps-game/src/ui/TributeNotice.js`:

```javascript
export function renderTributeNotice(parent) {
  const el = document.createElement('div');
  el.id = 'tribute-notice';
  el.style.cssText = 'position:absolute;bottom:12px;left:50%;transform:translateX(-50%);font-size:11px;color:#aaa;text-align:center;line-height:1.4;font-family:monospace;max-width:520px';
  el.innerHTML = `
    A respectful tribute to the builders who made this jam possible.
    Not affiliated with any named individuals or companies.<br>
    Want your handle removed? DM
    <a href="https://twitter.com/YOUR_HANDLE" target="_blank" style="color:#8cf">@YOUR_HANDLE</a>
    or email
    <a href="mailto:YOUR_EMAIL" style="color:#8cf">YOUR_EMAIL</a>.
  `;
  parent.appendChild(el);
}
```

- [ ] **Step 2: 挂到 LobbyScreen 底部**

在 LobbyScreen 的 root DOM render 完成时调用 `renderTributeNotice(this.rootEl)`。

- [ ] **Step 3: 替换占位**

把 `YOUR_HANDLE` / `YOUR_EMAIL` 改成真实的（建议用一个小号专门收 jam 反馈）。

- [ ] **Step 4: Verify**

大厅底部能看到一行小灰字 + 两个可点链接。

- [ ] **Step 5: Commit**

```bash
git add fps-game/src/ui/TributeNotice.js fps-game/src/ui/LobbyScreen.js
git commit -m "feat(jam): tribute disclaimer + opt-out contact on lobby"
```

---

**Gate 1 check（D2 晚 Apr 19）:** infra 全绿，widget 正常，新玩家 8 分钟循环可走完，首轮有引导，tribute 声明可见。若其中任一未达标，优先保 widget + 8 分钟 + 首轮 seed，其他可 D3 补。

---

# Phase 2 · D3（Apr 20）—— Boss 框架

## Task 2.1: BossRegistry 元数据

**Files:**
- Create: `fps-game/src/bosses/BossRegistry.js`

- [ ] **Step 1: 写 registry**

Create `fps-game/src/bosses/BossRegistry.js`:

```javascript
// Single source of truth for boss metadata.
// Handle keys MUST match voiceBank.js VOICE_MANIFEST keys.
export const BOSS_REGISTRY = {
  cursor_ai: {
    handle: '@cursor_ai',
    displayName: 'Cursor',
    color: 0x222222,
    headColor: 0xeeeeee,
    hp: 220,
    damage: 18,
    interval: 0.5,     // fast suppression
    range: 20,
    speed: 4.0,
    portrait: 'cursor_ai.svg',
    drop: { type: 'weapon', id: 'cmdk_carbine' },   // AK skin
    wave: 1,
    label: '@cursor_ai · Code Duck',
  },
  boltdotnew: {
    handle: '@boltdotnew',
    displayName: 'Bolt',
    color: 0x7733bb,
    headColor: 0xcc99ff,
    hp: 180,
    damage: 22,
    interval: 0.9,
    range: 8,
    speed: 5.5,           // high speed, short-range blinker
    portrait: 'boltdotnew.svg',
    drop: { type: 'weapon', id: 'bolt_pistol' },    // Glock skin
    wave: 1,
    label: '@boltdotnew · Lightning Duck',
    special: 'blink',     // tag for BossController to enable blink move
  },
  s13k_: {
    handle: '@s13k_',
    displayName: 'Levels',
    color: 0xbb2222,
    headColor: 0xff6666,
    hp: 450,
    damage: 22,
    interval: 1.0,
    range: 18,
    speed: 2.4,
    portrait: 's13k_.svg',
    drop: { type: 'stat', id: 'judge_medal_backpack' },   // +1 bag slot
    wave: 2,
    label: '@s13k_ · Head Judge',
    special: 'armored_head_only',   // body damage 90% reduced
  },
  timsoret: {
    handle: '@timsoret',
    displayName: 'Tim',
    color: 0x22aabb,
    headColor: 0x99ddee,
    hp: 260,
    damage: 25,
    interval: 1.8,
    range: 22,
    speed: 3.0,
    portrait: 'timsoret.svg',
    drop: { type: 'stat', id: 'judge_medal_hp' },          // +10 HP
    wave: 2,
    label: '@timsoret · Cinematic Judge',
    special: 'bullet_hell_slow',    // frame-stop slow bullet pattern
  },
  nicolamanzini: {
    handle: '@nicolamanzini',
    displayName: 'Nicola',
    color: 0xddcc33,
    headColor: 0xfff088,
    hp: 280,
    damage: 20,
    interval: 1.1,
    range: 20,
    speed: 3.2,
    portrait: 'nicolamanzini.svg',
    drop: { type: 'stat', id: 'judge_medal_speed' },       // +10% move speed
    wave: 2,
    label: '@nicolamanzini · Tech Judge',
    special: 'trap_mines',          // drops mines on move
  },
  levelsio: {
    handle: '@levelsio',
    displayName: 'Levels',
    color: 0xff7722,
    headColor: 0xffaa55,
    hp: 900,
    damage: 28,
    interval: 0.7,
    range: 24,
    speed: 3.6,
    portrait: 'levelsio.svg',
    drop: { type: 'weapon', id: 'indie_hackers_revolver' },
    wave: 3,
    label: '@levelsio · Vibe King',
    special: 'three_phase',         // phase machine: normal / summon / rage
  },
};

export function getBoss(handle) { return BOSS_REGISTRY[handle]; }

export function bossesByWave(wave) {
  return Object.entries(BOSS_REGISTRY)
    .filter(([, b]) => b.wave === wave)
    .map(([k, b]) => ({ key: k, ...b }));
}
```

- [ ] **Step 2: Commit**

```bash
git add fps-game/src/bosses/BossRegistry.js
git commit -m "feat(bosses): add boss metadata registry"
```

---

## Task 2.2: BossController 核心

**Files:**
- Create: `fps-game/src/bosses/BossController.js`
- Create: `fps-game/src/ui/BossNameTag.js`
- Create: `fps-game/src/ui/PortraitFlash.js`

- [ ] **Step 1: NameTag 组件**

Create `fps-game/src/ui/BossNameTag.js`:

```javascript
import * as THREE from 'three';

// Floating DOM tag that tracks a world position. Cheap: no sprite atlas, just CSS.
export class BossNameTag {
  constructor(camera, text) {
    this.camera = camera;
    this.el = document.createElement('div');
    this.el.textContent = text;
    this.el.style.cssText = 'position:fixed;pointer-events:none;color:#fff;font:700 14px "Courier New",monospace;text-shadow:0 0 4px #fff,0 0 8px rgba(255,255,255,.6);letter-spacing:1px;transform:translate(-50%,-100%);z-index:180;white-space:nowrap';
    document.body.appendChild(this.el);
    this._v = new THREE.Vector3();
  }

  update(worldPos) {
    this._v.copy(worldPos); this._v.y += 2.2;   // float above head
    this._v.project(this.camera);
    if (this._v.z > 1) { this.el.style.display = 'none'; return; }
    this.el.style.display = '';
    const x = (this._v.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-this._v.y * 0.5 + 0.5) * window.innerHeight;
    this.el.style.left = `${x}px`;
    this.el.style.top = `${y}px`;
  }

  dispose() { this.el.remove(); }
}
```

- [ ] **Step 2: PortraitFlash 组件**

Create `fps-game/src/ui/PortraitFlash.js`:

```javascript
// 0.4s edge-of-screen portrait flash on boss kill.
export function flashPortrait(portraitFile) {
  const el = document.createElement('img');
  el.src = `/escape-from-duckkov/portraits/${portraitFile}`;
  el.style.cssText = 'position:fixed;right:40px;top:50%;transform:translateY(-50%) scale(0.6);width:180px;opacity:0;z-index:400;pointer-events:none;filter:drop-shadow(0 0 20px #fff);transition:opacity .15s,transform .15s';
  document.body.appendChild(el);
  requestAnimationFrame(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(-50%) scale(1)';
    setTimeout(() => {
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 200);
    }, 400);
  });
}
```

- [ ] **Step 3: BossController**

Create `fps-game/src/bosses/BossController.js`:

```javascript
import { BossNameTag } from '../ui/BossNameTag.js';
import { flashPortrait } from '../ui/PortraitFlash.js';
import { VOICE_MANIFEST, audioUrlFor } from './voiceBank.js';

// Attaches to an existing Enemy instance. Does not replace combat — only adds
// tag, voice, portrait flash, phase hooks, and drop override.
export class BossController {
  constructor({ enemy, meta, camera, onDrop, hud }) {
    this.enemy = enemy;
    this.meta = meta;
    this.camera = camera;
    this.onDrop = onDrop;
    this.hud = hud;
    this.tag = new BossNameTag(camera, meta.handle);
    this._deathHandled = false;
    this._spokeSpawn = false;
    this._audio = {};
    this._preloadVoice();
    this._markAsBoss();
  }

  _preloadVoice() {
    const bank = VOICE_MANIFEST[this.meta.key];
    if (!bank) return;
    for (const key of Object.keys(bank.lines)) {
      const a = new Audio(audioUrlFor(this.meta.key, key));
      a.volume = 0.9;
      this._audio[key] = a;
    }
  }

  _markAsBoss() {
    // HUD boss health bar + set label override (if Enemy has a label field)
    this.enemy.isBoss = true;
    this.enemy.label = this.meta.label;
    this.hud?.setBossHealth?.(this.meta.label, this.enemy.hp, this.meta.hp);
  }

  speak(key) {
    const a = this._audio[key];
    if (a) { a.currentTime = 0; a.play().catch(() => {}); }
    else this.hud?.showBubble?.(this.meta.handle + ' ' + key, 2.5);  // fallback
  }

  update(dt) {
    this.tag.update(this.enemy.position);
    this.hud?.setBossHealth?.(this.meta.label, this.enemy.hp, this.meta.hp);
    if (!this._spokeSpawn && this.enemy.isPlayerVisible) {
      this._spokeSpawn = true;
      const key = Math.random() < 0.5 ? 'spawn_1' : 'spawn_2';
      this.speak(key);
    }
    if (this.enemy.hp <= 0 && !this._deathHandled) this._handleDeath();
  }

  _handleDeath() {
    this._deathHandled = true;
    const key = Math.random() < 0.5 ? 'death_1' : 'death_2';
    this.speak(key);
    flashPortrait(this.meta.portrait);
    if (this.onDrop) this.onDrop(this.enemy.position.clone(), this.meta.drop);
    this.hud?.clearBossHealth?.();
  }

  dispose() {
    this.tag.dispose();
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add fps-game/src/bosses/BossController.js fps-game/src/ui/BossNameTag.js fps-game/src/ui/PortraitFlash.js
git commit -m "feat(bosses): BossController + name tag + portrait flash"
```

---

## Task 2.3: Placeholder portraits + 一个测试 boss

**Files:**
- Create: `fps-game/public/portraits/levelsio.svg` (+ 其他 5 个 stub)
- Modify: `fps-game/src/main.js`（临时 spawn 一个 @levelsio 测试）

- [ ] **Step 1: 6 个 SVG portrait stub**

每个文件是个简单的彩色鸭头 SVG（后面 D29 美化）。例 `fps-game/public/portraits/levelsio.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="55" r="38" fill="#ff7722"/>
  <ellipse cx="68" cy="55" rx="18" ry="10" fill="#ffaa55"/>
  <circle cx="42" cy="45" r="5" fill="#fff"/>
  <circle cx="42" cy="45" r="2.5" fill="#000"/>
  <text x="50" y="95" font-family="monospace" font-size="10" fill="#fff" text-anchor="middle">@levelsio</text>
</svg>
```

其他 5 个用各自 `color` 替换。

- [ ] **Step 2: 临时测试 spawn**

在 `main.js` 里找敌人生成的地方（约 line 550 附近的 `new Enemy`），临时加：

```javascript
// TEMP for Task 2.3 verify — remove in Task 3.1
import { BossController } from './bosses/BossController.js';
import { getBoss } from './bosses/BossRegistry.js';
// in game init, after player/camera/hud ready:
{
  const meta = { key: 'levelsio', ...getBoss('levelsio') };
  const testBoss = new Enemy(scene, new THREE.Vector3(20, 0, 20), [], 'boss');
  testBoss.hp = meta.hp;
  testBoss.maxHp = meta.hp;
  const ctrl = new BossController({ enemy: testBoss, meta, camera, hud, onDrop: null });
  _bossControllers = _bossControllers || [];
  _bossControllers.push(ctrl);
  // update loop:
  // for (const c of _bossControllers) c.update(dt);
}
```

- [ ] **Step 3: Verify**

`npm run dev` → 开局 → 走到 (20, 20) → 看到头顶 `@levelsio` 标签 → 打他 → HP 到 0 → 听到 "Ship it quack" → 屏幕右侧出现 portrait → tag 消失。

- [ ] **Step 4: Commit（保留 TEMP 标记）**

```bash
git add fps-game/public/portraits/ fps-game/src/main.js
git commit -m "feat(bosses): placeholder portraits + test spawn (TEMP, Task 3.1 removes)"
```

---

**Gate 2 check（D3 晚 Apr 20）:** 测试 boss 可打、name tag / 语音 / portrait flash / 血条 4 样全通。未通过不要进 Phase 3，先补 bug。

---

# Phase 3 · D4-5（Apr 21-22）—— 赞助商关

## Task 3.1: 名人堂区域 + 触发门

**Files:**
- Create: `fps-game/src/world/HallOfFame.js`
- Modify: `fps-game/src/world/Level.js`
- Modify: `fps-game/src/main.js`（去掉 TEMP 测试 spawn）

- [ ] **Step 1: HallOfFame 区域定义**

Create `fps-game/src/world/HallOfFame.js`:

```javascript
import * as THREE from 'three';

// Dedicated arena placed adjacent to the main extraction point.
// Trigger: player crosses entrance volume -> emit 'hallEnter' event with wave=1.
export class HallOfFame {
  constructor(scene, level, extractionPos) {
    this.scene = scene;
    this.triggered = new Set();  // wave numbers already triggered
    this.waveBoundaries = [
      // Wave 1: entrance volume
      { wave: 1, center: extractionPos.clone().add(new THREE.Vector3(0, 0, 20)), radius: 4 },
      // Wave 2: mid-hall
      { wave: 2, center: extractionPos.clone().add(new THREE.Vector3(0, 0, 30)), radius: 4 },
      // Wave 3: @levelsio throne room
      { wave: 3, center: extractionPos.clone().add(new THREE.Vector3(0, 0, 40)), radius: 4 },
    ];
    this._buildVisuals();
  }

  _buildVisuals() {
    // Simple floor tiles under each wave zone (orange glow for levelsio)
    for (const b of this.waveBoundaries) {
      const color = b.wave === 3 ? 0xff7722 : b.wave === 2 ? 0xaa3333 : 0x222222;
      const geo = new THREE.CircleGeometry(b.radius + 1, 32);
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.35 });
      const floor = new THREE.Mesh(geo, mat);
      floor.rotation.x = -Math.PI / 2;
      floor.position.copy(b.center); floor.position.y = 0.02;
      this.scene.add(floor);
    }
  }

  checkTrigger(playerPos, onTriggered) {
    for (const b of this.waveBoundaries) {
      if (this.triggered.has(b.wave)) continue;
      if (playerPos.distanceTo(b.center) < b.radius) {
        this.triggered.add(b.wave);
        onTriggered(b.wave, b.center);
      }
    }
  }
}
```

- [ ] **Step 2: Level.js 暴露 extraction 坐标**

确保 `Level.js` 有 `level.extractionPoints[0]`（或 `level.primaryExtraction`）可被访问。如已存在，跳过。

- [ ] **Step 3: main.js 集成 + 去 TEMP**

在 `main.js` 去掉 Task 2.3 的 TEMP 测试 boss spawn；改为：

```javascript
import { HallOfFame } from './world/HallOfFame.js';
const hallOfFame = new HallOfFame(scene, level, level.extractionPoints[0]);

// In game update loop:
hallOfFame.checkTrigger(player.position, (wave, center) => {
  spawnBossWave(wave, center);   // implemented in Task 3.2/4.1/5.1
});
```

- [ ] **Step 4: Verify**

`npm run dev` → 走向撤离点 → 看到地上 3 个发光圆圈（灰/红/橙） → 走进最近的圆圈 → console.log 应输出 wave=1 触发。

- [ ] **Step 5: Commit**

```bash
git add fps-game/src/world/HallOfFame.js fps-game/src/world/Level.js fps-game/src/main.js
git commit -m "feat(world): HallOfFame arena + 3 wave trigger zones"
```

---

## Task 3.2: spawnBossWave(1) —— Cursor + Bolt

**Files:**
- Modify: `fps-game/src/main.js`（实现 spawnBossWave + 统一 update loop）

- [ ] **Step 1: 写 spawnBossWave**

在 `main.js` 加：

```javascript
import { BossController } from './bosses/BossController.js';
import { BOSS_REGISTRY, bossesByWave } from './bosses/BossRegistry.js';

let _bossControllers = [];

function spawnBossWave(wave, centerPos) {
  const metas = bossesByWave(wave);
  for (const meta of metas) {
    // Offset per boss so 2+ don't stack
    const angle = Math.random() * Math.PI * 2;
    const r = 3 + Math.random() * 2;
    const pos = centerPos.clone().add(new THREE.Vector3(Math.cos(angle) * r, 0, Math.sin(angle) * r));

    // Register new enemy type dynamically (reuse 'boss' stats template)
    const enemy = new Enemy(scene, pos, [], 'boss');
    enemy.hp = meta.hp;
    enemy.maxHp = meta.hp;
    enemy.damage = meta.damage;
    enemy.shootInterval = meta.interval;
    enemy.shootRange = meta.range;
    enemy.speed = meta.speed;
    // Override visuals (if Enemy exposes color setters; else attach a new mesh)
    enemy.setColors?.(meta.color, meta.headColor);

    aiSystem.enemies.push(enemy);

    const ctrl = new BossController({
      enemy, meta, camera, hud,
      onDrop: (pos, drop) => lootSystem.dropItem(pos, drop),
    });
    _bossControllers.push(ctrl);
  }
  hud.showBubble(`WAVE ${wave}`, 2.0);
}
```

- [ ] **Step 2: BossController update 接入主循环**

```javascript
// In animation loop (after aiSystem.update):
for (let i = _bossControllers.length - 1; i >= 0; i--) {
  const c = _bossControllers[i];
  c.update(dt);
  if (c.enemy.hp <= 0 && c._deathHandled) {
    c.dispose();
    _bossControllers.splice(i, 1);
  }
}
```

- [ ] **Step 3: Verify**

开局 → 走向撤离点 → 踩 wave1 圆圈 → Cursor (黑) + Bolt (紫) 出现在圈周围 → 听到出场台词 → 打死两个 → 各掉一把枪 → wave1 圆圈变暗（triggered）。

- [ ] **Step 4: Commit**

```bash
git add fps-game/src/main.js
git commit -m "feat(bosses): spawn Wave 1 — Cursor + Bolt sponsors"
```

---

## Task 3.3: Cursor + Bolt 特殊机制

**Files:**
- Modify: `fps-game/src/bosses/BossController.js`（加 `special` 行为 hook）

- [ ] **Step 1: 接入 special field**

在 `BossController` 的 `update(dt)` 里：

```javascript
update(dt) {
  // ... existing ...
  if (this.meta.special === 'blink') this._updateBlink(dt);
}

_updateBlink(dt) {
  this._blinkCd = (this._blinkCd ?? 3) - dt;
  if (this._blinkCd > 0) return;
  this._blinkCd = 4 + Math.random() * 2;
  // Teleport 6 units toward the player, 1.5s invulnerable
  const toPlayer = this._playerPos.clone().sub(this.enemy.position).normalize().multiplyScalar(6);
  this.enemy.position.add(toPlayer);
  this.enemy.invulnerableUntil = performance.now() + 1500;
  // Visual: flash the mesh
  this.enemy.mesh?.traverse?.(m => { if (m.material) m.material.emissive?.setHex(0xff00ff); });
  setTimeout(() => {
    this.enemy.mesh?.traverse?.(m => { if (m.material) m.material.emissive?.setHex(0x000000); });
  }, 150);
}
```

> 需要 `BossController` 知道玩家位置。给它传 `player` 引用：`new BossController({ enemy, meta, camera, hud, onDrop, player })`，`this._playerPos = player.position`（引用跟踪）。

- [ ] **Step 2: Enemy 支持 invulnerableUntil**

在 `Enemy.js` 的伤害处理处（`takeDamage` 或等价函数）加：

```javascript
if (this.invulnerableUntil && performance.now() < this.invulnerableUntil) return 0;
```

- [ ] **Step 3: Cursor 特殊（高射速压制）**

Cursor 的 `interval: 0.5` 已经在 registry 里，在 wave 1 spawn 时已经复制到 `enemy.shootInterval`。如现有 AI 没用这个字段，在 AISystem 对应处改读 `enemy.shootInterval ?? ENEMY_TYPES[type].interval`。

- [ ] **Step 4: Verify**

wave 1 → Cursor 子弹连珠发射（明显快于普通 boss） → Bolt 每 4-6 秒闪身到玩家面前，闪身瞬间有紫色 emissive flash → 闪身后 1.5 秒打不掉血。

- [ ] **Step 5: Commit**

```bash
git add fps-game/src/bosses/BossController.js fps-game/src/entities/Enemy.js fps-game/src/systems/AISystem.js
git commit -m "feat(bosses): Cursor suppression fire + Bolt blink teleport"
```

---

## Task 3.4: Cmd+K Carbine + Bolt Pistol 武器

**Files:**
- Modify: `fps-game/src/systems/WeaponSystem.js`
- Modify: `fps-game/src/systems/LootSystem.js`

- [ ] **Step 1: 注册武器 def**

在 `WeaponSystem.js` 的武器定义表加：

```javascript
cmdk_carbine: {
  baseId: 'ak74',  // reuse mesh + ballistics
  displayName: 'Cmd+K Carbine',
  tracerColor: 0xffffff,
  rarity: 'boss',
  damageMult: 1.1,
},
bolt_pistol: {
  baseId: 'glock17',
  displayName: 'Bolt Pistol',
  tracerColor: 0xcc66ff,
  rarity: 'boss',
  fireRateMult: 1.3,
},
```

> 如现有 WeaponSystem 用单层字典，加的字段在 draw / shoot 管线里读取 `damageMult` / `fireRateMult`；不存在则就地加。

- [ ] **Step 2: LootSystem 能掉出这些 id**

`LootSystem.dropItem(pos, drop)` 方法已在 Task 3.2 被调用。实现：

```javascript
dropItem(pos, drop) {
  if (drop.type === 'weapon') {
    this._spawnGroundWeapon(pos, drop.id);    // reuse现有地面武器生成
  } else if (drop.type === 'stat') {
    this._spawnStatMedal(pos, drop.id);        // new: 贴图化为"奖章"物品
  }
}

_spawnStatMedal(pos, id) {
  // Simple cube + glow; when picked up, applies permanent stat
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.4),
    new THREE.MeshBasicMaterial({ color: 0xffcc33 })
  );
  mesh.position.copy(pos);
  this.scene.add(mesh);
  this._pickupsOnGround.push({ mesh, pickupFn: () => applyMedal(id) });
}
```

在 player 拾取 loop 里检查 `_pickupsOnGround`。`applyMedal` 映射到 `judge_medal_backpack / _hp / _speed` 的玩家加成。

- [ ] **Step 3: Verify**

杀 Cursor → 地面出现白色亮圈 AK → 拾起后 HUD 武器位写 "Cmd+K Carbine"。杀 Bolt → 紫色 Glock → 射速明显更快。

- [ ] **Step 4: Commit**

```bash
git add fps-game/src/systems/WeaponSystem.js fps-game/src/systems/LootSystem.js
git commit -m "feat(bosses): Cmd+K Carbine + Bolt Pistol wave 1 drops"
```

---

**Gate 3 check（D5 晚 Apr 22）:** wave 1 完整可玩。若掉进度，继续 Phase 4 前务必 merge 保底版本到 `main`。

---

# Phase 4 · D6-8（Apr 23-25）—— 评委三连关

## Task 4.1: spawnBossWave(2) —— 3 评委

**Files:**
- Modify: `fps-game/src/main.js`（已有 spawnBossWave，只是触发 wave 2 时 3 个 boss）

- [ ] **Step 1: 拓扑考虑**

wave 2 中心 + 3 个 boss，按三角形 120° 均分 spawn（约 5 单位外）。
代码已在 Task 3.2 的 `spawnBossWave` 里用 `angle = random()`，改为 3 个固定角度：

```javascript
function spawnBossWave(wave, centerPos) {
  const metas = bossesByWave(wave);
  const n = metas.length;
  metas.forEach((meta, i) => {
    const angle = (i / n) * Math.PI * 2;
    const r = 5;
    const pos = centerPos.clone().add(new THREE.Vector3(Math.cos(angle) * r, 0, Math.sin(angle) * r));
    // ... (rest same as Task 3.2)
  });
}
```

- [ ] **Step 2: Verify**

wave 2 圈 → s13k (红) / timsoret (青) / nicola (黄) 三人三角站位 spawn → 三个血条排 HUD 上（HUD 若只支持单 boss bar，短期用"最低血量 boss"显示，或叠 3 条小的）。

- [ ] **Step 3: Commit**

```bash
git add fps-game/src/main.js
git commit -m "feat(bosses): wave 2 spawn — 3 judges triangle layout"
```

---

## Task 4.2: HUD 多 boss 血条

**Files:**
- Modify: `fps-game/src/ui/HUD.js`

- [ ] **Step 1: 改 setBossHealth 支持多实例**

```javascript
// HUD class
setBossHealth(label, hp, max) {
  this._bossBars = this._bossBars || new Map();
  let bar = this._bossBars.get(label);
  if (!bar) {
    bar = this._createBossBar(label);
    this._bossBars.set(label, bar);
  }
  bar.fill.style.width = `${Math.max(0, hp / max) * 100}%`;
  if (hp <= 0) { bar.root.remove(); this._bossBars.delete(label); }
}

_createBossBar(label) {
  const root = document.createElement('div');
  root.style.cssText = 'margin-top:6px;width:280px';
  root.innerHTML = `
    <div style="color:#fff;font:11px monospace;text-shadow:0 0 3px #000">${label}</div>
    <div style="height:6px;background:rgba(255,255,255,.15);border:1px solid #fff">
      <div class="fill" style="height:100%;background:#ff3333;width:100%;transition:width .1s"></div>
    </div>`;
  // Append into a fixed container top-center
  let c = document.getElementById('boss-bars');
  if (!c) {
    c = document.createElement('div');
    c.id = 'boss-bars';
    c.style.cssText = 'position:fixed;top:60px;left:50%;transform:translateX(-50%);z-index:190';
    document.body.appendChild(c);
  }
  c.appendChild(root);
  return { root, fill: root.querySelector('.fill') };
}

clearBossHealth(label) {
  if (label) {
    const bar = this._bossBars?.get(label);
    if (bar) { bar.root.remove(); this._bossBars.delete(label); }
  } else {
    for (const b of this._bossBars?.values() || []) b.root.remove();
    this._bossBars?.clear();
  }
}
```

- [ ] **Step 2: 调用方改 label 过**

`BossController._handleDeath` 改为 `this.hud?.clearBossHealth?.(this.meta.label)`。

- [ ] **Step 3: Verify**

wave 2 → HUD 顶部中央看到 3 条叠列血条：s13k_ / timsoret / nicolamanzini。打任一减血。打死一个自动消失。

- [ ] **Step 4: Commit**

```bash
git add fps-game/src/ui/HUD.js fps-game/src/bosses/BossController.js
git commit -m "feat(hud): multi-boss health bars stacked top-center"
```

---

## Task 4.3: s13k — 重甲头击弱点

**Files:**
- Modify: `fps-game/src/bosses/BossController.js`（扩展 special 分支）
- Modify: `fps-game/src/entities/Enemy.js`（支持部位伤害修饰）

- [ ] **Step 1: 读现有部位伤害逻辑**

```bash
grep -n "head\|Head\|hitbox" fps-game/src/entities/Enemy.js fps-game/src/systems/BulletSystem.js
```

项目已有部位伤害。找到 body 伤害乘数所在处。

- [ ] **Step 2: 给 s13k 打 body 伤害降到 10%**

在 Enemy 受击处：

```javascript
if (this.special === 'armored_head_only' && hitPart !== 'head') {
  dmg *= 0.1;
}
```

其中 `this.special` 在 spawnBossWave 时从 meta 复制到 enemy：

```javascript
enemy.special = meta.special;
```

- [ ] **Step 3: Verify**

wave 2 → 打 s13k 身体几乎无伤 → 打头正常掉血。HUD 血条反映差异。

- [ ] **Step 4: Commit**

```bash
git add fps-game/src/entities/Enemy.js fps-game/src/main.js
git commit -m "feat(boss): s13k head-only weakness"
```

---

## Task 4.4: timsoret — 慢速弹幕 bullet hell

**Files:**
- Modify: `fps-game/src/bosses/BossController.js`
- Modify: `fps-game/src/systems/BulletSystem.js`

- [ ] **Step 1: 新增 BossController 弹幕**

在 `update(dt)` 里：

```javascript
if (this.meta.special === 'bullet_hell_slow') this._updateBulletHell(dt);

_updateBulletHell(dt) {
  this._bhCd = (this._bhCd ?? 2.5) - dt;
  if (this._bhCd > 0) return;
  this._bhCd = 3.5;
  // Fan of 7 slow bullets, 60° spread, speed 0.5x normal
  const toPlayer = this._playerPos.clone().sub(this.enemy.position).normalize();
  const baseAngle = Math.atan2(toPlayer.z, toPlayer.x);
  for (let i = -3; i <= 3; i++) {
    const a = baseAngle + (i / 7) * (Math.PI / 3);
    const dir = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
    this._bullets.spawnProjectile(
      this.enemy.position.clone().add(new THREE.Vector3(0, 1.2, 0)),
      dir,
      { speed: 18, damage: 25, color: 0x88eeff, trail: true },  // slow = visible
      'enemy',
      0x88eeff,
    );
  }
}
```

> 需要把 bullet system 引用传给 BossController：构造器加 `bullets`。

- [ ] **Step 2: Verify**

wave 2 → timsoret 每 3.5 秒放出 7 发青色慢速扇形子弹，玩家要绕开。

- [ ] **Step 3: Commit**

```bash
git add fps-game/src/bosses/BossController.js fps-game/src/main.js
git commit -m "feat(boss): timsoret slow bullet hell fan"
```

---

## Task 4.5: nicolamanzini — 陷阱雷

**Files:**
- Modify: `fps-game/src/bosses/BossController.js`

- [ ] **Step 1: mine drop 逻辑**

```javascript
if (this.meta.special === 'trap_mines') this._updateTrapMines(dt);

_updateTrapMines(dt) {
  this._mineCd = (this._mineCd ?? 1.5) - dt;
  if (this._mineCd > 0) return;
  this._mineCd = 4.0;
  // Drop a static mine at current position. 10s lifetime; explodes on player proximity 1.5m.
  this._dropMine(this.enemy.position.clone());
}

_dropMine(pos) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.35, 0.35, 0.15),
    new THREE.MeshBasicMaterial({ color: 0xffdd33 })
  );
  mesh.position.copy(pos); mesh.position.y = 0.1;
  this.enemy._scene.add(mesh);
  const mine = {
    pos, mesh, life: 10,
    detonate: () => {
      // Damage player if near
      const d = pos.distanceTo(this._playerPos);
      if (d < 2.5) this.enemy._playerRef?.takeDamage?.(30, 'mine');
      mesh.traverse(o => o.material?.dispose?.());
      this.enemy._scene.remove(mesh);
    },
  };
  this._mines = this._mines || [];
  this._mines.push(mine);
}

// Call from update loop each frame:
_tickMines(dt) {
  if (!this._mines) return;
  for (let i = this._mines.length - 1; i >= 0; i--) {
    const m = this._mines[i];
    m.life -= dt;
    if (m.life <= 0 || m.pos.distanceTo(this._playerPos) < 1.5) {
      m.detonate();
      this._mines.splice(i, 1);
    }
  }
}
```

调用 `_tickMines(dt)` 进 `update(dt)`。

- [ ] **Step 2: Verify**

wave 2 → nicola 身后留下黄色小圆盘陷阱 → 玩家踩近爆炸掉 30 HP。

- [ ] **Step 3: Commit**

```bash
git add fps-game/src/bosses/BossController.js
git commit -m "feat(boss): nicolamanzini trap mines"
```

---

## Task 4.6: 评委勋章拾取效果

**Files:**
- Modify: `fps-game/src/systems/LootSystem.js`（applyMedal）
- Modify: 玩家状态管理处（背包 / HP / 速度）

- [ ] **Step 1: applyMedal 实现**

```javascript
function applyMedal(id, player) {
  if (id === 'judge_medal_backpack') player.inventory.slotsMax += 1;
  else if (id === 'judge_medal_hp') { player.maxHp += 10; player.hp += 10; }
  else if (id === 'judge_medal_speed') player.moveSpeedMult = (player.moveSpeedMult ?? 1) * 1.10;
  // HUD toast
  hud.showBubble(`+${id.replace('judge_medal_', '').toUpperCase()}`, 2.0);
}
```

> 按现有 player / inventory API 对应调整字段名。

- [ ] **Step 2: Verify**

杀 3 评委各掉一个勋章 → 各拾起后：背包格多 1 / HP 从 100 变 110 / 移动速度目测更快。

- [ ] **Step 3: Commit**

```bash
git add fps-game/src/systems/LootSystem.js fps-game/src/entities/Player.js
git commit -m "feat(bosses): judge medals grant permanent run buffs"
```

---

**Gate 4 check（D8 晚 Apr 25）:** wave 1 + wave 2 连续可玩，各 boss 掉落生效。若掉进度 → 合并 3 评委成一只"评委团" boss（取 s13k 机制，其他砍），单 boss 掉 1 个"评委勋章"含 3 效果组合。

---

# Phase 5 · D9-11（Apr 26-28）—— @levelsio 三阶段

## Task 5.1: @levelsio spawn + 阶段 1

**Files:**
- Create: `fps-game/src/bosses/phases/LevelsioPhases.js`
- Modify: `fps-game/src/bosses/BossController.js`

- [ ] **Step 1: 阶段机**

Create `fps-game/src/bosses/phases/LevelsioPhases.js`:

```javascript
// @levelsio phase controller.
// P1 (HP 100% - 66%): standard combat
// P2 (HP 66% - 33%): summon 3 scav mercs
// P3 (HP < 33%): "Ship it mode" — 2x fire rate, red emissive

export class LevelsioPhases {
  constructor(enemy, ai, scene) {
    this.enemy = enemy;
    this.ai = ai;
    this.scene = scene;
    this.phase = 1;
    this._spawnedP2 = false;
    this._enteredP3 = false;
    this._initialInterval = enemy.shootInterval;
  }

  update(dt) {
    const pct = this.enemy.hp / this.enemy.maxHp;
    if (this.phase === 1 && pct < 2/3) this._enterPhase2();
    else if (this.phase === 2 && pct < 1/3) this._enterPhase3();
  }

  _enterPhase2() {
    this.phase = 2;
    this._spawnMercs();
  }

  _enterPhase3() {
    this.phase = 3;
    this.enemy.shootInterval = this._initialInterval * 0.5;
    this.enemy.mesh?.traverse?.(m => { if (m.material?.emissive) m.material.emissive.setHex(0xff4422); });
  }

  _spawnMercs() {
    // Spawn 3 'normal' enemies around levelsio
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2;
      const pos = this.enemy.position.clone().add(new THREE.Vector3(Math.cos(a) * 4, 0, Math.sin(a) * 4));
      const merc = new Enemy(this.scene, pos, [], 'normal');
      this.ai.enemies.push(merc);
    }
  }
}
```

> 需要此文件顶部 `import * as THREE from 'three'; import { Enemy } from '../../entities/Enemy.js';`

- [ ] **Step 2: BossController 接入**

在 BossController 构造器：

```javascript
if (meta.special === 'three_phase') {
  // lazy import to avoid circular
  import('./phases/LevelsioPhases.js').then(({ LevelsioPhases }) => {
    this._phases = new LevelsioPhases(this.enemy, this._aiSystem, this._scene);
  });
}
```

在 `update(dt)`:

```javascript
if (this._phases) this._phases.update(dt);
```

> 构造器新增 `aiSystem` 和 `scene` 两个参数。

- [ ] **Step 3: Verify**

wave 3 → @levelsio 橙色 spawn → 血掉到 2/3 → 出 3 只普通鸭卒 → 血掉到 1/3 → @levelsio 变红发光，射速翻倍。

- [ ] **Step 4: Commit**

```bash
git add fps-game/src/bosses/phases/LevelsioPhases.js fps-game/src/bosses/BossController.js fps-game/src/main.js
git commit -m "feat(boss): @levelsio three-phase controller"
```

---

## Task 5.2: Indie Hacker's Revolver

**Files:**
- Modify: `fps-game/src/systems/WeaponSystem.js`
- Modify: `fps-game/src/systems/LootSystem.js`

- [ ] **Step 1: 武器 def**

在 WeaponSystem 武器表加：

```javascript
indie_hackers_revolver: {
  baseId: 'glock17',       // reuse mesh，后面 D29 美术可换
  displayName: "Indie Hacker's Revolver",
  tracerColor: 0xff9944,
  rarity: 'legendary',
  damage: 55,
  fireRate: 0.5,           // 2 shots/sec
  ammo: 7,
  projectileSpeed: 1.5,    // 比默认快
  sound: 'revolver.mp3',   // optional
},
```

> 按现有 WeaponSystem 字段真实名字映射。

- [ ] **Step 2: Verify**

杀 @levelsio → 掉橙色发光手枪 → 拾起 → 一枪伤害 55（两枪打死一个普通鸭）。

- [ ] **Step 3: Commit**

```bash
git add fps-game/src/systems/WeaponSystem.js
git commit -m "feat(weapon): Indie Hacker's Revolver — wave 3 drop"
```

---

## Task 5.3: 撤离结算屏皮肤（打赢拿 revolver 后）

**Files:**
- Modify: `fps-game/src/ui/LobbyScreen.js` 或 撤离结算 UI

- [ ] **Step 1: 查找结算屏**

```bash
grep -n "撤离\|extract\|Summary\|end\|结算" fps-game/src/ui/*.js
```

- [ ] **Step 2: 首次拿到 revolver 显示特殊结算**

结算屏逻辑里判断：

```javascript
if (inventory.hasItem('indie_hackers_revolver') && !localStorage.getItem('duckkov_revolverSeen')) {
  localStorage.setItem('duckkov_revolverSeen', '1');
  // Show overlay：`YOU ARE NOW AN INDIE HACKER` + @levelsio portrait + tweet CTA
  showIndieHackerCertificate();
}
```

简单实现：

```javascript
function showIndieHackerCertificate() {
  const el = document.createElement('div');
  el.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.95);color:#ff9944;font-family:"Courier New",monospace;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:900;text-align:center';
  el.innerHTML = `
    <div style="font-size:48px;margin-bottom:20px">YOU ARE NOW AN INDIE HACKER</div>
    <img src="/escape-from-duckkov/portraits/levelsio.svg" style="width:180px;filter:drop-shadow(0 0 30px #ff9944)">
    <div style="margin-top:30px;font-size:18px;opacity:.7">You extracted with the Indie Hacker's Revolver.</div>
    <div style="margin-top:40px">
      <a href="https://twitter.com/intent/tweet?text=I%20just%20beat%20%40levelsio%20in%20%23vibejam%20%F0%9F%A6%86" target="_blank"
         style="padding:12px 28px;border:2px solid #ff9944;color:#ff9944;text-decoration:none;font-weight:700">Tweet it</a>
      <button id="revolver-continue" style="padding:12px 28px;margin-left:12px;background:transparent;border:2px solid #fff;color:#fff;font:inherit;cursor:pointer">Continue</button>
    </div>`;
  document.body.appendChild(el);
  el.querySelector('#revolver-continue').onclick = () => el.remove();
}
```

- [ ] **Step 3: Verify**

整局打到撤离（首次拿 revolver）→ 撤离结算前出现全黑覆层 + "YOU ARE NOW AN INDIE HACKER" + @levelsio portrait + "Tweet it" 按钮 + Continue。

- [ ] **Step 4: Commit**

```bash
git add fps-game/src/ui/LobbyScreen.js
git commit -m "feat(jam): Indie Hacker certificate overlay on first revolver extract"
```

---

**Gate 5 check（D11 晚 Apr 28）:** 3 wave 全可玩，@levelsio 三阶段可见，revolver 可撤离。未达标 → 保 wave 1 + @levelsio 简单版（单阶段），其他砍。

---

# Phase 6 · D12（Apr 29）—— Playtest + Balance

## Task 6.1: Playtest round 1（首轮体验）

- [ ] **Step 1: 清 localStorage**

DevTools 里 `localStorage.clear()`，模拟新玩家。

- [ ] **Step 2: 全程走完并计时**

- [ ] widget 角标看得到
- [ ] 加载 < 3 秒
- [ ] 60 秒看到 4 个教学气泡
- [ ] 走到 wave 1 圈时剩余时间 > 3 分钟
- [ ] wave 1 能在 60 秒内打完（若 > 90 秒，降 Cursor/Bolt HP）
- [ ] wave 2 能在 90 秒内打完
- [ ] wave 3 能在 90 秒内打完
- [ ] 总时间控制在 6-8 分钟
- [ ] 拿到 revolver 看到结算屏

- [ ] **Step 3: 记录问题列表**

在 `docs/superpowers/plans/jam-progress.md` 写下每个 bug / 平衡问题。

- [ ] **Step 4: Commit playtest log**

```bash
git add docs/superpowers/plans/jam-progress.md
git commit -m "docs(jam): D12 playtest round 1 findings"
```

---

## Task 6.2: Bug 修 + 平衡数值

- [ ] **Step 1: 按 Task 6.1 问题列表逐条修**

每修一条：commit 粒度 "fix(jam): <what>"。

- [ ] **Step 2: Playtest round 2**

重清 localStorage，再跑一次，确认都过。

- [ ] **Step 3: 数值终定**

如果 @levelsio 太弱 / 太强，调整 `BOSS_REGISTRY.levelsio.hp` 和 `damage`。目标是玩家**首次能打赢但要用上 1 次急救**。

- [ ] **Step 4: Commit 最终平衡**

```bash
git add fps-game/src/bosses/BossRegistry.js
git commit -m "balance(jam): final HP/damage tuning"
```

---

# Phase 7 · D13（Apr 30）—— 提交素材

## Task 7.1: GIF 封面

- [ ] **Step 1: 录制 10 秒视频**

用 macOS QuickTime 或 ScreenFlow 录：从进入 wave 3 圈 → @levelsio spawn → 看到头顶 `@levelsio` + 听到 spawn 台词。

- [ ] **Step 2: 转 GIF**

```bash
brew install ffmpeg gifski
ffmpeg -i input.mov -vf "fps=15,scale=640:-1" -pix_fmt rgb24 frames_%03d.png
gifski -o cover.gif --fps 15 --width 640 frames_*.png
```

体积控制在 < 4 MB。

- [ ] **Step 3: 保存到 `docs/jam-assets/cover.gif`**

```bash
mkdir -p docs/jam-assets && mv cover.gif docs/jam-assets/
git add docs/jam-assets/cover.gif
git commit -m "assets(jam): cover GIF — @levelsio spawn moment"
```

---

## Task 7.2: 3 张截图

- [ ] **Step 1: 拍 3 张**

1. 战斗中：Cursor + Bolt 双人围攻玩家
2. boss 对视：玩家 vs @levelsio，头顶 handle 清晰
3. 撤离结算：Indie Hacker 证书 overlay

- [ ] **Step 2: 命名并提交**

```bash
mv shot1.png docs/jam-assets/01-combat.png
mv shot2.png docs/jam-assets/02-levelsio.png
mv shot3.png docs/jam-assets/03-certificate.png
git add docs/jam-assets/*.png
git commit -m "assets(jam): 3 static screenshots"
```

---

## Task 7.3: 30 秒演示视频

- [ ] **Step 1: 录制**

脚本（时间线）：
- 0-5s: 大厅首帧 + tribute 声明 + widget 角标
- 5-10s: 开局 + 教学气泡
- 10-20s: wave 1 快速打完 Cursor + Bolt（加速 2x 剪辑）
- 20-25s: wave 2 评委三连（跳切 3 个 kill 镜头）
- 25-30s: @levelsio phase 3 rage + 击杀 + 证书 overlay

- [ ] **Step 2: 剪辑 + 配字幕**

用 iMovie / CapCut / DaVinci Resolve，导出 1080p MP4。

- [ ] **Step 3: 上传 YouTube（unlisted）**

拿到 URL，写进 itch 页。

- [ ] **Step 4: Commit 最终视频文件引用**

```bash
echo "YouTube: <URL>" > docs/jam-assets/video-link.txt
git add docs/jam-assets/video-link.txt
git commit -m "assets(jam): 30s demo video uploaded"
```

---

## Task 7.4: itch / jam 提交页文案

- [ ] **Step 1: 写文案**

Create `docs/jam-assets/submission-copy.md`:

```markdown
# Escape from Duckkov · Indie Hacker Pilgrimage

**What it is:** A top-down Tarkov-style extraction shooter where the final bosses are the builders who made this jam possible.

**The hook:** You think it's Tarkov. It's actually a pilgrimage through the indie hacker pantheon — defeat @cursor_ai, @boltdotnew, the judges, and finally @levelsio to earn the Indie Hacker's Revolver.

**Play time:** 6-8 minutes per run.

**Controls:** WASD move / left-click shoot / R reload / E pickup-or-extract / H heal / Tab inventory.

**Built with:** Cursor + Three.js. 90%+ AI-written during the jam period.

**Tribute notice:** This is a respectful tribute to the builders — @levelsio / @cursor_ai / @boltdotnew / @s13k_ / @timsoret / @nicolamanzini. Not affiliated. DM @YOUR_HANDLE for removal.

中文版：
**逃离鸭科夫 · 独立开发者朝圣**
俯视角撤离射击，最终 boss 是推动这个 jam 的那些开发者们。你以为是塔科夫，结果是一场朝圣——打穿 Cursor、Bolt、三位评委，最终击败 @levelsio 拿到独立开发者左轮。
6-8 分钟一局，WASD 移动 / 左键开火 / R 换弹 / E 拾取或撤离。
Cursor + Three.js 开发，jam 期间 90%+ AI 代码。
```

- [ ] **Step 2: 贴到 itch / vibej.am 提交页**

手动操作，填表单。

- [ ] **Step 3: Commit**

```bash
git add docs/jam-assets/submission-copy.md
git commit -m "assets(jam): itch/jam submission copy (EN+CN)"
```

---

# Phase 8 · D14（May 1）—— 提交

## Task 8.1: 最终 deploy

- [ ] **Step 1: 完整 build**

```bash
cd fps-game && npm run build
```

Expected: `../dist/` 输出无报错，主 JS chunk < 500 KB gzipped。

- [ ] **Step 2: 推到 gh-pages**

```bash
cd /Users/xx/Desktop/game/game
git subtree push --prefix dist origin gh-pages
# 或按项目原有 deploy 脚本
```

- [ ] **Step 3: 线上验证**

打开 `https://suzyeth.github.io/escape-from-duckkov/`，从 widget → 大厅 → 首轮 → 撤离完整走一遍。

- [ ] **Step 4: Commit deploy marker**

```bash
git tag jam-submission-v1
git push origin jam-submission-v1
```

---

## Task 8.2: 提交到 Cursor Vibe Jam

- [ ] **Step 1: 目标中午前（UTC 之前）完成提交**

Deadline 是 2026-05-01 13:37 UTC。提交时间目标：**2026-05-01 08:00 UTC**（早 5.5 小时）。

- [ ] **Step 2: 填表**

- Game URL: `https://suzyeth.github.io/escape-from-duckkov/`
- Cover GIF: 上传 `docs/jam-assets/cover.gif`
- Screenshots: 上传 3 张
- Video URL: YouTube unlisted 链接
- Description: 贴 `submission-copy.md` 内容
- Tags: `#vibejam` `#threejs` `#shooter` `#tribute`

- [ ] **Step 3: 提交后再开一局验证 widget 仍在**

如 widget 消失 / 游戏打不开 → 立刻修，还有 5 小时缓冲。

- [ ] **Step 4: 发推公告**

在 X 发推 @ levelsio + cursor_ai + boltdotnew：

```
Just shipped my @cursor_ai #vibejam entry: Escape from Duckkov.
The final boss is @levelsio himself. 🦆
Play: <URL>
Video: <YouTube>
```

---

# 自查（spec 覆盖检查）

| Spec 章节 | 覆盖 task |
|---|---|
| §2 Jam 硬约束 widget | Task 0.1 |
| §2 AI 代码占比 | 本身项目用 Cursor 写，无 task |
| §2 秒加载 | Task 1.5 |
| §3.1 Pitch | Task 7.4 |
| §3.2 Tribute 基调 | Task 1.6 + Task 8.2（推文用词）|
| §4 名人堂撤离门 | Task 3.1（区域）+ Task 3.2/4.1/5.1（3 波） |
| §5 5 个 boss + 阵容 | Task 2.1（registry）+ Task 3.2/3.3/4.1-4.5/5.1 |
| §5.1 视觉（name tag / portrait flash） | Task 2.2 + 2.3 |
| §5.2 语音管线 | Task 0.2 + 0.3 + BossController（Task 2.2） |
| §6.1 砍 45 分钟 | Task 1.1 |
| §6.1 首轮隐藏 talent/craft/难度 | Task 1.4 |
| §6.2 widget | Task 0.1 |
| §6.2 60 秒引导 | Task 1.3 |
| §6.2 加载 | Task 1.5 |
| §6.2 demo seed | Task 1.2 |
| §6.2 BossController 基类 | Task 2.2 |
| §6.3 提交素材 | Task 7.1/7.2/7.3/7.4 |
| §7 日程 | Phase 0-8 一一对应 |
| §7.1 保命 Gate | Phase 1/3/4/5 末尾 Gate check |
| §7.2 砍法 | Gate check 块内写明 |
| §8 成功标准 | Task 6.1 playtest checklist |
| §9 Out of scope | 未写成 task（符合 out of scope 定义）|
| §10 伦理声明 | Task 1.6 + Task 7.4 |
| §11 未决项 | TTS 选型 Task 0.2；评委台词 Task 0.3；revolver 数值 Task 5.2 + 6.2；boss 房布置 Task 3.1 |

---

# 砍法速查（如触发 Gate 警报）

| 触发条件 | 当即动作 |
|---|---|
| D19 结束 infra 没完 | 砍 Task 1.5 加载优化（先保功能）、Task 1.6 tribute 挪到 D30 |
| D22 结束 wave 1 没完 | 合并 Cursor + Bolt 为 1 只"Sponsor Duck"（取 Cursor 的高射速 + Bolt 紫色） |
| D25 结束 wave 2 没完 | 合并 3 评委为 1 只"Judge Panel"（取 s13k 机制）|
| D28 结束 @levelsio 三阶段没完 | 砍 phase 2 召唤 → 保留 phase 1 + phase 3 |
| D30 结束视频没录完 | 只交 GIF + 截图，视频 D14 上午补 |

---

**Plan ends. 共 38 个 task，保命 5 次 Gate check，可在进度压力下执行 5 次砍法。**
