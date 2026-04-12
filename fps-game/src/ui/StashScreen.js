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
    this._selectedDifficulty = 1; // 0=easy, 1=normal, 2=hard

    const header = document.createElement('div');
    header.className = 'stash-header';
    const h2 = document.createElement('h2');
    h2.textContent = '选择装备包';
    header.appendChild(h2);
    const p = document.createElement('p');
    p.textContent = '进入突袭前配置你的负重';
    header.appendChild(p);
    this._el.appendChild(header);

    // Difficulty selector
    const diffDiv = document.createElement('div');
    diffDiv.style.cssText = 'display:flex;gap:.8rem;justify-content:center;margin-bottom:1.5rem';
    const DIFFS = [
      { id: 0, name: '简单', desc: '敌人弱50%', color: '#44aa44' },
      { id: 1, name: '普通', desc: '标准难度',   color: '#c8a96e' },
      { id: 2, name: '困难', desc: '敌人强50%', color: '#cc4444' },
    ];
    for (const d of DIFFS) {
      const btn = document.createElement('button');
      btn.className = 'stash-select-btn';
      btn.style.cssText = `min-width:80px;border-color:${d.color};color:${d.color}`;
      btn.textContent = d.name;
      if (d.id === 1) btn.style.background = 'rgba(200,169,110,0.15)';
      btn.addEventListener('click', () => {
        this._selectedDifficulty = d.id;
        diffDiv.querySelectorAll('button').forEach(b => b.style.background = 'transparent');
        btn.style.background = `rgba(200,169,110,0.15)`;
      });
      diffDiv.appendChild(btn);
    }
    this._el.appendChild(diffDiv);

    const grid = document.createElement('div');
    grid.className = 'stash-grid';

    for (const loadout of LOADOUTS) {
      const card = document.createElement('div');
      card.className = 'stash-card';

      const nameEl = document.createElement('div');
      nameEl.className = 'stash-card-name';
      nameEl.textContent = loadout.name;
      card.appendChild(nameEl);

      const subEl = document.createElement('div');
      subEl.className = 'stash-card-sub';
      subEl.textContent = loadout.subtitle;
      card.appendChild(subEl);

      const descEl = document.createElement('div');
      descEl.className = 'stash-card-desc';
      descEl.textContent = loadout.description;
      card.appendChild(descEl);

      const ul = document.createElement('ul');
      ul.className = 'stash-card-items';
      for (const i of loadout.items) {
        const li = document.createElement('li');
        li.textContent = `${i.defId.replaceAll('_', ' ')} ×${i.count}`;
        ul.appendChild(li);
      }
      card.appendChild(ul);

      const btn = document.createElement('button');
      btn.className = 'stash-select-btn';
      btn.textContent = '装备出发';
      btn.addEventListener('click', () => {
        if (this._callback) this._callback({ ...loadout, difficulty: this._selectedDifficulty });
      });
      card.appendChild(btn);

      grid.appendChild(card);
    }

    this._el.appendChild(grid);
  }
}
