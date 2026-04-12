/**
 * BaseScreen
 * Hub between raids — shows stash, currency, stats, and level select.
 */
import { ITEM_DEFS } from '../systems/InventorySystem.js';
import { TALENTS } from '../systems/TalentSystem.js';

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
  constructor(save, talents) {
    this._save = save;
    this._talents = talents;
    this._el = document.getElementById('base-screen');
    this._onStartRaid = null;
  }

  /** @param {(levelId:number)=>void} fn */
  onStartRaid(fn) { this._onStartRaid = fn; }

  show() {
    // Check unlocks (side-effect free from render)
    this._checkUnlocks();
    this._render();
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
        el.textContent = `${def ? def.name : item.defId} ×${item.count}`;
        stashGrid.appendChild(el);
      }
    }
    content.appendChild(stashGrid);

    // Talents
    const talTitle = document.createElement('h2');
    talTitle.className = 'base-subtitle';
    talTitle.textContent = '天赋升级 (PerkPalace)';
    content.appendChild(talTitle);

    const talGrid = document.createElement('div');
    talGrid.style.cssText = 'display:flex;flex-wrap:wrap;gap:.6rem';
    for (const t of TALENTS) {
      const unlocked = this._talents.isUnlocked(t.id);
      const canBuy   = this._talents.canUnlock(t.id);

      const card = document.createElement('div');
      card.style.cssText = `background:#111;border:1px solid ${unlocked ? '#4caf50' : canBuy ? '#c8a96e' : '#333'};border-radius:4px;padding:.6rem;width:150px;opacity:${unlocked ? '0.6' : '1'}`;

      const name = document.createElement('div');
      name.style.cssText = 'font-size:.7rem;color:#c8a96e;margin-bottom:.3rem';
      name.textContent = t.name + (unlocked ? ' ✓' : '');
      card.appendChild(name);

      const desc = document.createElement('div');
      desc.style.cssText = 'font-size:.55rem;color:#888;margin-bottom:.3rem';
      desc.textContent = t.desc;
      card.appendChild(desc);

      if (!unlocked) {
        const cost = document.createElement('div');
        cost.style.cssText = 'font-size:.55rem;color:#666';
        cost.textContent = `${t.cost} 鸭元 / ${t.xpCost} XP`;
        card.appendChild(cost);

        if (canBuy) {
          const btn = document.createElement('button');
          btn.className = 'level-start-btn';
          btn.style.cssText = 'margin-top:.4rem;font-size:.6rem;padding:.25rem 0';
          btn.textContent = '解锁';
          btn.addEventListener('click', () => {
            if (this._talents.unlock(t.id)) this._render();
          });
          card.appendChild(btn);
        }
      }
      talGrid.appendChild(card);
    }
    content.appendChild(talGrid);

    this._el.appendChild(content);
  }
}
