/**
 * BaseScreen
 * Hub between raids — shows stash, currency, stats, and level select.
 */
import { ITEM_DEFS } from '../systems/InventorySystem.js';
import { TALENTS } from '../systems/TalentSystem.js';
import { RECIPES } from '../systems/CraftingSystem.js';
import { isFirstRun } from '../systems/DemoSeed.js';

const LEVELS = [
  { id: 0, name: '工业区',   desc: '废弃工厂与仓库，中等难度',   enemies: 20, unlockDesc: '初始解锁',       unlockFn: () => true },
  { id: 1, name: '港口区',   desc: '开阔水边区域，敌人更强',     enemies: 25, unlockDesc: '击杀 20 敌人',    unlockFn: (s) => s.totalKills >= 20 },
  { id: 2, name: '实验室',   desc: '紧凑室内地图，最高难度',     enemies: 30, unlockDesc: '成功撤离 3 次',   unlockFn: (s) => s.totalExtracts >= 3 },
];

export class BaseScreen {
  /**
   * @param {import('../systems/SaveSystem').SaveSystem} save
   */
  /**
   * @param {import('../systems/SaveSystem').SaveSystem} save
   * @param {import('../systems/TalentSystem').TalentSystem} talents
   */
  /**
   * @param {import('../systems/SaveSystem').SaveSystem} save
   * @param {import('../systems/TalentSystem').TalentSystem} talents
   * @param {import('../systems/CraftingSystem').CraftingSystem} crafting
   */
  constructor(save, talents, crafting) {
    this._save = save;
    this._talents = talents;
    this._crafting = crafting;
    this._el = document.getElementById('base-screen');
    this._onStartRaid = null;
  }

  /** @param {(levelId:number)=>void} fn */
  onStartRaid(fn) { this._onStartRaid = fn; }

  show() {
    try {
      this._checkUnlocks();
      this._render();
    } catch (e) {
      console.error('BaseScreen render error:', e);
      // Minimal fallback
      this._el.innerHTML = '<div style="color:#c8a96e;text-align:center;padding:3rem"><h1>基地</h1><button id="base-fallback-btn" style="margin-top:2rem;padding:.6rem 2rem;font-size:1rem;background:transparent;border:1px solid #c8a96e;color:#c8a96e;cursor:pointer">直接出发</button></div>';
      this._el.querySelector('#base-fallback-btn')?.addEventListener('click', () => {
        this.hide();
        if (this._onStartRaid) this._onStartRaid(0);
      });
    }
    this._el.style.display = 'flex';
  }

  hide() {
    this._el.style.display = 'none';
  }

  _checkUnlocks() {
    const stats = this._save.stats;
    for (const lv of LEVELS) {
      if (lv.unlockFn(stats)) {
        this._save.unlockLevel(lv.id);
      }
    }
  }

  _render() {
    const s = this._save;
    const stats = s.stats;

    this._el.innerHTML = '';
    const content = document.createElement('div');
    content.className = 'base-content';

    // Title
    const h1 = document.createElement('h1');
    h1.className = 'base-title';
    h1.textContent = '基地';
    content.appendChild(h1);

    // Currency
    const curr = document.createElement('div');
    curr.className = 'base-currency';
    curr.textContent = '鸭元: ';
    const currVal = document.createElement('span');
    currVal.textContent = s.currency;
    curr.appendChild(currVal);
    const xpSpan = document.createElement('span');
    xpSpan.style.cssText = 'margin-left:1.5rem;color:#c8a96e';
    xpSpan.textContent = `XP: ${stats.totalXP || 0}`;
    curr.appendChild(xpSpan);
    content.appendChild(curr);

    // Stats
    const statsDiv = document.createElement('div');
    statsDiv.className = 'base-stats';
    for (const [label, val] of [['总击杀', stats.totalKills], ['撤离', stats.totalExtracts], ['阵亡', stats.totalDeaths], ['最高收入', stats.bestLoot]]) {
      const sp = document.createElement('span');
      sp.textContent = `${label} ${val}`;
      statsDiv.appendChild(sp);
    }
    content.appendChild(statsDiv);

    // Death recovery notice
    if (s.deathRecovery) {
      const notice = document.createElement('div');
      notice.className = 'death-notice';
      notice.textContent = '💀 上次阵亡位置有背包可拾回';
      content.appendChild(notice);
    }

    // Level select
    const lvTitle = document.createElement('h2');
    lvTitle.className = 'base-subtitle';
    lvTitle.textContent = '选择关卡';
    content.appendChild(lvTitle);

    const lvGrid = document.createElement('div');
    lvGrid.className = 'level-grid';
    for (const lv of LEVELS) {
      const unlocked = s.isLevelUnlocked(lv.id);
      const card = document.createElement('div');
      card.className = 'level-card' + (unlocked ? '' : ' locked');

      const name = document.createElement('div');
      name.className = 'level-name';
      name.textContent = lv.name;
      card.appendChild(name);

      const desc = document.createElement('div');
      desc.className = 'level-desc';
      desc.textContent = lv.desc;
      card.appendChild(desc);

      const info = document.createElement('div');
      info.className = 'level-info';
      info.textContent = `敌人: ${lv.enemies}`;
      card.appendChild(info);

      const unlock = document.createElement('div');
      unlock.className = 'level-unlock';
      unlock.textContent = unlocked ? '已解锁' : lv.unlockDesc;
      card.appendChild(unlock);

      if (unlocked) {
        const btn = document.createElement('button');
        btn.className = 'level-start-btn';
        btn.textContent = '出发';
        btn.addEventListener('click', () => {
          this.hide();
          if (this._onStartRaid) this._onStartRaid(lv.id);
        });
        card.appendChild(btn);
      }
      lvGrid.appendChild(card);
    }
    content.appendChild(lvGrid);

    // Stash
    const stashTitle = document.createElement('h2');
    stashTitle.className = 'base-subtitle';
    stashTitle.textContent = '仓库';
    content.appendChild(stashTitle);

    const stashGrid = document.createElement('div');
    stashGrid.className = 'stash-grid';
    if (s.stash.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'stash-empty';
      empty.textContent = '仓库为空';
      stashGrid.appendChild(empty);
    } else {
      for (const item of s.stash) {
        const def = ITEM_DEFS[item.defId];
        const el = document.createElement('div');
        el.className = 'stash-item';
        if (item.armorHp != null && def?.armor) {
          el.textContent = `${def.name} ${Math.max(0, Math.round(item.armorHp))}/${def.armor.armorHp}`;
        } else {
          el.textContent = `${def ? def.name : item.defId} ×${item.count}`;
        }
        stashGrid.appendChild(el);
      }
    }
    content.appendChild(stashGrid);

    // Talents
    if (!isFirstRun()) {
      const talTitle = document.createElement('h2');
      talTitle.className = 'base-subtitle';
      talTitle.textContent = '天赋升级 (PerkPalace)';
      content.appendChild(talTitle);

    // Group talents by category
    const categories = new Map();
    for (const t of TALENTS) {
      if (!categories.has(t.category)) categories.set(t.category, []);
      categories.get(t.category).push(t);
    }

    const talGrid = document.createElement('div');
    talGrid.style.cssText = 'display:flex;flex-direction:column;gap:1rem';

    for (const [catName, catTalents] of categories) {
      const catDiv = document.createElement('div');

      const catLabel = document.createElement('div');
      catLabel.style.cssText = 'font-size:.65rem;color:#666;letter-spacing:.15em;margin-bottom:.4rem';
      catLabel.textContent = catName;
      catDiv.appendChild(catLabel);

      const row = document.createElement('div');
      row.style.cssText = 'display:flex;gap:.5rem;flex-wrap:wrap';

      for (const t of catTalents) {
        const unlocked = this._talents.isUnlocked(t.id);
        const canBuy   = this._talents.canUnlock(t.id);
        const locked   = t.requires && !this._talents.isUnlocked(t.requires);

        const card = document.createElement('div');
        card.style.cssText = `background:${unlocked ? '#1a2a1a' : '#111'};border:1px solid ${unlocked ? '#4caf50' : canBuy ? '#c8a96e' : '#2a2a2a'};border-radius:4px;padding:.5rem .6rem;width:140px;opacity:${locked ? '0.35' : '1'}`;

        const name = document.createElement('div');
        name.style.cssText = `font-size:.65rem;color:${unlocked ? '#4caf50' : '#c8a96e'};margin-bottom:.2rem`;
        name.textContent = (unlocked ? '✓ ' : '') + t.name;
        card.appendChild(name);

        const desc = document.createElement('div');
        desc.style.cssText = 'font-size:.5rem;color:#777;margin-bottom:.3rem';
        desc.textContent = t.desc;
        card.appendChild(desc);

        if (!unlocked && !locked) {
          const cost = document.createElement('div');
          cost.style.cssText = `font-size:.55rem;color:${canBuy ? '#88aa55' : '#555'}`;
          cost.textContent = `${t.cost} 鸭元 + ${t.xp || 0} XP`;
          card.appendChild(cost);

          if (canBuy) {
            const btn = document.createElement('button');
            btn.className = 'level-start-btn';
            btn.style.cssText = 'margin-top:.3rem;font-size:.55rem;padding:.2rem 0';
            btn.textContent = '解锁';
            btn.addEventListener('click', () => {
              if (this._talents.unlock(t.id)) {
                this._checkUnlocks();
                this._render();
              }
            });
            card.appendChild(btn);
          }
        }
        row.appendChild(card);
      }
      catDiv.appendChild(row);
      talGrid.appendChild(catDiv);
    }
    content.appendChild(talGrid);
    }

    // Crafting
    if (!isFirstRun()) {
      const craftTitle = document.createElement('h2');
      craftTitle.className = 'base-subtitle';
      craftTitle.textContent = '工作台';
      content.appendChild(craftTitle);

    const craftGrid = document.createElement('div');
    craftGrid.style.cssText = 'display:flex;flex-wrap:wrap;gap:.5rem';

    const recipes = this._crafting.getRecipes();
    for (const r of recipes) {
      const card = document.createElement('div');
      card.style.cssText = `background:#111;border:1px solid ${r.canCraft ? '#88aa55' : r.unlocked ? '#333' : '#2a2a2a'};border-radius:4px;padding:.5rem;width:155px;opacity:${r.unlocked ? '1' : '0.35'}`;

      const name = document.createElement('div');
      name.style.cssText = 'font-size:.65rem;color:#c8a96e;margin-bottom:.2rem';
      name.textContent = r.name + (!r.unlocked ? ' 🔒' : '');
      card.appendChild(name);

      const output = document.createElement('div');
      output.style.cssText = 'font-size:.5rem;color:#88aa55;margin-bottom:.2rem';
      const outDef = ITEM_DEFS[r.output.defId];
      output.textContent = `产出: ${outDef ? outDef.name : r.output.defId} ×${r.output.count}`;
      card.appendChild(output);

      const costEl = document.createElement('div');
      costEl.style.cssText = 'font-size:.5rem;color:#888';
      costEl.textContent = '消耗: ' + r.cost.map(c => {
        const d = ITEM_DEFS[c.defId];
        return `${d ? d.name : c.defId} ×${c.count}`;
      }).join(' + ');
      card.appendChild(costEl);

      if (r.unlocked && r.canCraft) {
        const btn = document.createElement('button');
        btn.className = 'level-start-btn';
        btn.style.cssText = 'margin-top:.3rem;font-size:.55rem;padding:.2rem 0';
        btn.textContent = '制造';
        btn.addEventListener('click', () => {
          if (this._crafting.craft(r.id)) {
            this._checkUnlocks();
            this._render();
          }
        });
        card.appendChild(btn);
      } else if (!r.unlocked) {
        const hint = document.createElement('div');
        hint.style.cssText = 'font-size:.45rem;color:#555;margin-top:.2rem';
        hint.textContent = '需要在突袭中找到蓝图';
        card.appendChild(hint);
      }

      craftGrid.appendChild(card);
    }
    content.appendChild(craftGrid);
    }

    this._el.appendChild(content);
  }
}
