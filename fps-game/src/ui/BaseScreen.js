/**
 * BaseScreen
 * Hub between raids — shows stash, currency, stats, and level select.
 */
import { ITEM_DEFS } from '../systems/InventorySystem.js';

export class BaseScreen {
  /**
   * @param {import('../systems/SaveSystem').SaveSystem} save
   */
  constructor(save) {
    this._save = save;
    this._el = document.getElementById('base-screen');
    this._onStartRaid = null;
  }

  /** @param {(levelId:number, loadoutItems:{defId:string,count:number}[])=>void} fn */
  onStartRaid(fn) { this._onStartRaid = fn; }

  show() {
    this._render();
    this._el.style.display = 'flex';
  }

  hide() {
    this._el.style.display = 'none';
  }

  _render() {
    const s = this._save;
    const stats = s.stats;

    // Level cards
    const LEVELS = [
      { id: 0, name: '工业区',   desc: '废弃工厂与仓库，中等难度',   enemies: 20, unlock: '初始解锁' },
      { id: 1, name: '港口区',   desc: '开阔水边区域，敌人更强',     enemies: 25, unlock: `击杀 20 敌人 (${Math.min(stats.totalKills, 20)}/20)` },
      { id: 2, name: '实验室',   desc: '紧凑室内地图，最高难度',     enemies: 30, unlock: `成功撤离 3 次 (${Math.min(stats.totalExtracts, 3)}/3)` },
    ];

    // Check unlock conditions
    if (stats.totalKills >= 20) s.unlockLevel(1);
    if (stats.totalExtracts >= 3) s.unlockLevel(2);

    const levelCards = LEVELS.map(lv => {
      const unlocked = s.isLevelUnlocked(lv.id);
      return `
        <div class="level-card ${unlocked ? '' : 'locked'}" data-level="${lv.id}">
          <div class="level-name">${lv.name}</div>
          <div class="level-desc">${lv.desc}</div>
          <div class="level-info">敌人: ${lv.enemies}</div>
          <div class="level-unlock">${unlocked ? '已解锁' : lv.unlock}</div>
          ${unlocked ? '<button class="level-start-btn">出发</button>' : ''}
        </div>
      `;
    }).join('');

    // Stash display
    const stashItems = s.stash.map(item => {
      const def = ITEM_DEFS[item.defId];
      const name = def ? def.name : item.defId;
      return `<div class="stash-item">${name} ×${item.count}</div>`;
    }).join('') || '<div class="stash-empty">仓库为空</div>';

    this._el.innerHTML = `
      <div class="base-content">
        <h1 class="base-title">基地</h1>
        <div class="base-currency">鸭元: <span>${s.currency}</span></div>

        <div class="base-stats">
          <span>总击杀 ${stats.totalKills}</span>
          <span>撤离 ${stats.totalExtracts}</span>
          <span>阵亡 ${stats.totalDeaths}</span>
          <span>最高收入 ${stats.bestLoot}</span>
        </div>

        ${s.deathRecovery ? '<div class="death-notice">💀 上次阵亡位置有背包可拾回</div>' : ''}

        <h2 class="base-subtitle">选择关卡</h2>
        <div class="level-grid">${levelCards}</div>

        <h2 class="base-subtitle">仓库</h2>
        <div class="stash-grid">${stashItems}</div>
      </div>
    `;

    // Bind start buttons
    this._el.querySelectorAll('.level-start-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('.level-card');
        const levelId = Number(card.dataset.level);
        this.hide();
        if (this._onStartRaid) this._onStartRaid(levelId, []);
      });
    });
  }
}
