/**
 * StashScreen
 * Pre-raid loadout selection overlay.
 *
 * Three preset packages:
 *   突击手  – AK-74 + rifle ammo×90  + bandage×2
 *   医疗兵  – Glock17 + pistol ammo×51 + medkit×1 + bandage×3
 *   散弹手  – MP-133  + shotgun ammo×24 + painkillers×1 + bandage×2
 */

const LOADOUTS = [
  {
    id:          'assault',
    name:        '突击手',
    subtitle:    'AK-74 | 轻型防弹衣',
    description: '高伤害，射程远，配备轻甲（40%减伤）。积极进攻型。',
    weaponSlot:  0,
    items: [
      { defId: 'rifle_ammo', count: 90 },
      { defId: 'bandage',    count: 2  },
      { defId: 'vest_light', count: 1  },
    ],
  },
  {
    id:          'medic',
    name:        '医疗兵',
    subtitle:    '格洛克17 | 无护甲',
    description: '携带急救包，机动灵活，持久战优势突出。谨慎搜刮型。',
    weaponSlot:  1,
    items: [
      { defId: 'pistol_ammo', count: 51 },
      { defId: 'medkit',      count: 1  },
      { defId: 'bandage',     count: 3  },
    ],
  },
  {
    id:          'shotgunner',
    name:        '散弹手',
    subtitle:    'MP-133 | 重型防弹衣',
    description: '近距离恐怖火力 + 重甲（60%减伤）。室内清场专用。',
    weaponSlot:  2,
    items: [
      { defId: 'shotgun_ammo', count: 24 },
      { defId: 'painkillers',  count: 1  },
      { defId: 'bandage',      count: 2  },
      { defId: 'vest_heavy',   count: 1  },
    ],
  },
  {
    id:          'sniper',
    name:        '狙击手',
    subtitle:    'VSS Vintorez | 无护甲',
    description: '超远射程（95m），单发高伤害（88）。远距离清场，精准压制。',
    weaponSlot:  3,
    items: [
      { defId: 'vss_ammo',    count: 30 },
      { defId: 'bandage',     count: 2  },
      { defId: 'painkillers', count: 1  },
    ],
  },
  {
    id:          'smg',
    name:        '突击SMG',
    subtitle:    'MP5 | 轻型防弹衣',
    description: '超高射速（800RPM），室内近战之王。快速压制，弹药充足。',
    weaponSlot:  4,
    items: [
      { defId: 'mp5_ammo',   count: 90 },
      { defId: 'bandage',    count: 2  },
      { defId: 'vest_light', count: 1  },
    ],
  },
];

export class StashScreen {
  /**
   * @param {HTMLElement} container  – the overlay div (#stash-screen)
   */
  constructor(container) {
    this._el       = container;
    this._callback = null;
    this._build();
  }

  // ── Public ─────────────────────────────────────────────────────────────────

  show() { this._el.style.display = 'flex'; }
  hide() { this._el.style.display = 'none'; }

  /**
   * Register callback invoked when a loadout card is selected.
   * @param {function({ weaponSlot: number, items: {defId,count}[] }):void} fn
   */
  onSelect(fn) { this._callback = fn; }

  // ── Private ────────────────────────────────────────────────────────────────

  _build() {
    this._el.innerHTML = '';

    const header = document.createElement('div');
    header.className = 'stash-header';
    header.innerHTML = '<h2>选择装备包</h2><p>进入突袭前配置你的负重</p>';
    this._el.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'stash-grid';

    for (const loadout of LOADOUTS) {
      const card = document.createElement('div');
      card.className = 'stash-card';
      card.innerHTML = `
        <div class="stash-card-name">${loadout.name}</div>
        <div class="stash-card-sub">${loadout.subtitle}</div>
        <div class="stash-card-desc">${loadout.description}</div>
        <ul class="stash-card-items">
          ${loadout.items.map(i => `<li>${i.defId.replace('_', ' ')} ×${i.count}</li>`).join('')}
        </ul>
        <button class="stash-select-btn">装备出发</button>
      `;
      card.querySelector('.stash-select-btn').addEventListener('click', () => {
        if (this._callback) this._callback(loadout);
      });
      grid.appendChild(card);
    }

    this._el.appendChild(grid);
  }
}
