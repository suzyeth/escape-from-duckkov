/**
 * BodyLootUI
 * Dual-panel body-inventory transfer UI (Tarkov-style).
 *   Left panel  = dead enemy's body items
 *   Right panel = player's current inventory (grouped by defId)
 *
 * Left-click a body item -> transfer one to player (respects inventory fullness).
 * Left-click a player item -> transfer one back to the body.
 * "全部拾取" button moves as many body items as will fit.
 * ESC closes; the caller also closes when the player walks > 3m away.
 */
export class BodyLootUI {
  /**
   * @param {import('../systems/InventorySystem').InventorySystem} playerInv
   * @param {Record<string, { name: string }>} itemDefs — ITEM_DEFS from InventorySystem
   * @param {{ showBubble?: (text: string, seconds?: number) => void }} [hud]
   */
  constructor(playerInv, itemDefs, hud) {
    this.playerInv = playerInv;
    this.itemDefs  = itemDefs;
    this.hud       = hud;
    this._body     = null;
    this._visible  = false;
    this._busy     = false;
    this._onBodyChanged = null;
    this._onTakeOne = null;
    this._onGiveOne = null;
    this._onTakeAll = null;
    this._build();
  }

  // ── Public ─────────────────────────────────────────────────────────────────

  get isOpen() { return this._visible; }

  onBodyChanged(fn) {
    this._onBodyChanged = fn;
  }

  onTakeOne(fn) {
    this._onTakeOne = fn;
  }

  onGiveOne(fn) {
    this._onGiveOne = fn;
  }

  onTakeAll(fn) {
    this._onTakeAll = fn;
  }

  open(body) {
    this._body = body;
    this._visible = true;
    this._panel.style.display = 'flex';
    // Keep crosshair hidden state so game view feels live; cursor stays as game's norm.
    this.refresh();
  }

  close() {
    this._visible = false;
    this._busy = false;
    this._panel.style.display = 'none';
    this._panel.style.opacity = '1';
    this._body = null;
  }

  /** Called when player takes damage — slam the UI shut so they can react. */
  notifyPlayerHit() {
    if (this._visible) {
      this.close();
      this.hud?.showBubble?.('受击 · 搜索中断', 1.0);
    }
  }

  /** Re-render both panels from the current body + player inventory. */
  refresh() {
    if (!this._body) return;

    // ── Left: body items ────────────────────────────────────────────────────
    this._leftEl.innerHTML = '';
    if (this._body.items.length === 0) {
      const empty = document.createElement('div');
      empty.style.cssText = 'opacity:.5;padding:12px';
      empty.textContent = '空';
      this._leftEl.appendChild(empty);
    } else {
      for (const it of this._body.items) {
        const name = this.itemDefs[it.defId]?.name ?? it.defId;
        const row = document.createElement('div');
        row.style.cssText =
          'padding:8px 10px;background:rgba(255,255,255,.06);margin-bottom:6px;' +
          'cursor:pointer;display:flex;justify-content:space-between;' +
          'border-left:3px solid #ff6633;transition:background .1s';
        row.innerHTML = `<span>${name}</span><span style="opacity:.8">×${it.count}</span>`;
        row.onmouseenter = () => { row.style.background = 'rgba(255,102,51,.25)'; };
        row.onmouseleave = () => { row.style.background = 'rgba(255,255,255,.06)'; };
        row.onclick = () => this._takeOne(it.defId);
        this._leftEl.appendChild(row);
      }
    }

    // ── Right: player items (grouped by defId) ──────────────────────────────
    this._rightEl.innerHTML = '';
    /** @type {Map<string, number>} */
    const grouped = new Map();
    for (const [, item] of this.playerInv.items) {
      const defId = item.def.id;
      grouped.set(defId, (grouped.get(defId) || 0) + item.count);
    }
    if (grouped.size === 0) {
      const empty = document.createElement('div');
      empty.style.cssText = 'opacity:.5;padding:12px';
      empty.textContent = '空';
      this._rightEl.appendChild(empty);
    } else {
      for (const [defId, count] of grouped) {
        const name = this.itemDefs[defId]?.name ?? defId;
        const row = document.createElement('div');
        row.style.cssText =
          'padding:8px 10px;background:rgba(255,255,255,.06);margin-bottom:6px;' +
          'cursor:pointer;display:flex;justify-content:space-between;' +
          'border-left:3px solid #4488cc;transition:background .1s';
        row.innerHTML = `<span>${name}</span><span style="opacity:.8">×${count}</span>`;
        row.onmouseenter = () => { row.style.background = 'rgba(68,136,204,.25)'; };
        row.onmouseleave = () => { row.style.background = 'rgba(255,255,255,.06)'; };
        row.onclick = () => this._giveOne(defId);
        this._rightEl.appendChild(row);
      }
    }
  }

  // ── Private ────────────────────────────────────────────────────────────────

  _build() {
    const panel = document.createElement('div');
    panel.id = 'body-loot-ui';
    // Docked at bottom of screen; no full-screen backdrop so player can see threats.
    panel.style.cssText =
      'position:fixed;left:0;right:0;bottom:0;z-index:600;display:none;' +
      'justify-content:center;gap:14px;padding:0 24px 16px 24px;pointer-events:none;' +
      'font-family:"Courier New",monospace;color:#fff';
    const itemBox = 'max-height:220px;overflow-y:auto;padding-right:4px';
    panel.innerHTML = `
      <div style="background:rgba(40,30,30,.88);border:2px solid #ff6633;padding:12px 14px;width:340px;box-shadow:0 0 18px rgba(255,102,51,.3);pointer-events:auto;backdrop-filter:blur(4px)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <div style="font-size:14px;letter-spacing:2px;color:#ffb08a">尸体物品</div>
          <button id="body-loot-takeall" style="background:#ff6633;color:#fff;border:0;padding:4px 10px;font:inherit;font-size:12px;cursor:pointer;letter-spacing:1px">全部拾取</button>
        </div>
        <div id="body-loot-left-items" style="${itemBox}"></div>
      </div>
      <div style="background:rgba(20,30,40,.88);border:2px solid #4488cc;padding:12px 14px;width:340px;box-shadow:0 0 18px rgba(68,136,204,.3);pointer-events:auto;backdrop-filter:blur(4px)">
        <div style="font-size:14px;letter-spacing:2px;color:#9ac8ff;margin-bottom:8px">我的背包</div>
        <div id="body-loot-right-items" style="${itemBox}"></div>
      </div>
      <div style="position:absolute;top:-20px;left:50%;transform:translateX(-50%);color:#aaa;font-size:11px;letter-spacing:1px;white-space:nowrap">
        点击转移 · ESC 关 · 走远自动关
      </div>
    `;
    document.body.appendChild(panel);
    this._panel   = panel;
    this._leftEl  = panel.querySelector('#body-loot-left-items');
    this._rightEl = panel.querySelector('#body-loot-right-items');
    panel.querySelector('#body-loot-takeall').onclick = () => this._takeAll();
  }

  _setBusy(next) {
    this._busy = next;
    this._panel.style.opacity = next ? '0.7' : '1';
  }

  /**
   * Move one unit of {defId} from body → player inventory.
   * InventorySystem.addItem returns true on success, false if inventory is full.
   */
  async _takeOne(defId) {
    if (!this._body) return;
    if (this._busy) return;
    const entry = this._body.items.find(x => x.defId === defId);
    if (!entry || entry.count <= 0) return;

    if (this._onTakeOne) {
      this._setBusy(true);
      try {
        await this._onTakeOne(this._body, defId);
      } finally {
        this._setBusy(false);
      }
      this.refresh();
      return;
    }

    const ok = this.playerInv.addItem(defId, 1);
    if (!ok) {
      this.hud?.showBubble?.('背包已满', 1.5);
      return;
    }

    entry.count -= 1;
    if (entry.count <= 0) {
      this._body.items = this._body.items.filter(x => x.count > 0);
    }
    this._onBodyChanged?.(this._body);
    this.refresh();
  }

  /**
   * Move one unit of {defId} from player inventory → body.
   * Uses the Map-of-instances structure: pick any instance of that defId and
   * decrement (or remove) it. Non-stackable items consume the whole slot.
   */
  async _giveOne(defId) {
    if (!this._body) return;
    if (this._busy) return;

    if (this._onGiveOne) {
      this._setBusy(true);
      try {
        await this._onGiveOne(this._body, defId);
      } finally {
        this._setBusy(false);
      }
      this.refresh();
      return;
    }

    // Find an instance in the player's inventory matching defId
    let chosen = null;
    for (const [, item] of this.playerInv.items) {
      if (item.def.id === defId) { chosen = item; break; }
    }
    if (!chosen) return;

    if (chosen.def.stackable) {
      chosen.count -= 1;
      if (chosen.count <= 0) this.playerInv.removeItem(chosen.id);
    } else {
      this.playerInv.removeItem(chosen.id);
    }

    // Merge into body
    const existing = this._body.items.find(x => x.defId === defId);
    if (existing) {
      existing.count += 1;
    } else {
      this._body.items.push({ defId, count: 1 });
    }
    this._onBodyChanged?.(this._body);
    this.refresh();
  }

  /**
   * Transfer as many body items as will fit into the player's inventory.
   * Stops adding a given stack as soon as addItem returns false (inventory full).
   */
  async _takeAll() {
    if (!this._body) return;
    if (this._busy) return;

    if (this._onTakeAll) {
      this._setBusy(true);
      try {
        await this._onTakeAll(this._body);
      } finally {
        this._setBusy(false);
      }
      this.refresh();
      return;
    }

    const remaining = [];
    let partialFail = false;
    for (const it of this._body.items) {
      let moved = 0;
      for (let i = 0; i < it.count; i++) {
        const ok = this.playerInv.addItem(it.defId, 1);
        if (!ok) break;
        moved++;
      }
      if (moved < it.count) {
        partialFail = true;
        remaining.push({ defId: it.defId, count: it.count - moved });
      }
    }
    this._body.items = remaining;
    if (partialFail) this.hud?.showBubble?.('背包已满', 1.5);
    this._onBodyChanged?.(this._body);
    this.refresh();
  }
}
