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
    this._build();
  }

  // ── Public ─────────────────────────────────────────────────────────────────

  get isOpen() { return this._visible; }

  open(body) {
    this._body = body;
    this._visible = true;
    this._panel.style.display = 'flex';
    document.body.style.cursor = 'default';
    this.refresh();
  }

  close() {
    this._visible = false;
    this._panel.style.display = 'none';
    // Restore crosshair/hidden cursor (game convention)
    document.body.style.cursor = 'none';
    this._body = null;
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
      grouped.set(item.defId, (grouped.get(item.defId) || 0) + item.count);
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
    panel.style.cssText =
      'position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:600;display:none;' +
      'align-items:center;justify-content:center;' +
      'font-family:"Courier New",monospace;color:#fff';
    panel.innerHTML = `
      <div style="display:flex;gap:24px">
        <div style="background:rgba(40,30,30,.95);border:2px solid #ff6633;padding:18px;min-width:320px;min-height:440px;box-shadow:0 0 24px rgba(255,102,51,.25)">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
            <div style="font-size:18px;letter-spacing:2px">尸体物品</div>
            <button id="body-loot-takeall" style="background:#ff6633;color:#fff;border:0;padding:6px 12px;font:inherit;cursor:pointer;letter-spacing:1px">全部拾取</button>
          </div>
          <div id="body-loot-left-items"></div>
        </div>
        <div style="background:rgba(20,30,40,.95);border:2px solid #4488cc;padding:18px;min-width:320px;min-height:440px;box-shadow:0 0 24px rgba(68,136,204,.25)">
          <div style="font-size:18px;letter-spacing:2px;margin-bottom:12px">我的背包</div>
          <div id="body-loot-right-items"></div>
        </div>
      </div>
      <div style="position:absolute;bottom:24px;color:#aaa;font-size:12px;letter-spacing:1px">
        左键点击物品转移 · ESC 关闭 · 走远自动关闭
      </div>
    `;
    document.body.appendChild(panel);
    this._panel   = panel;
    this._leftEl  = panel.querySelector('#body-loot-left-items');
    this._rightEl = panel.querySelector('#body-loot-right-items');
    panel.querySelector('#body-loot-takeall').onclick = () => this._takeAll();
  }

  /**
   * Move one unit of {defId} from body → player inventory.
   * InventorySystem.addItem returns true on success, false if inventory is full.
   */
  _takeOne(defId) {
    if (!this._body) return;
    const entry = this._body.items.find(x => x.defId === defId);
    if (!entry || entry.count <= 0) return;

    const ok = this.playerInv.addItem(defId, 1);
    if (!ok) {
      this.hud?.showBubble?.('背包已满', 1.5);
      return;
    }

    entry.count -= 1;
    if (entry.count <= 0) {
      this._body.items = this._body.items.filter(x => x.count > 0);
    }
    this.refresh();
  }

  /**
   * Move one unit of {defId} from player inventory → body.
   * Uses the Map-of-instances structure: pick any instance of that defId and
   * decrement (or remove) it. Non-stackable items consume the whole slot.
   */
  _giveOne(defId) {
    if (!this._body) return;

    // Find an instance in the player's inventory matching defId
    let chosen = null;
    for (const [, item] of this.playerInv.items) {
      if (item.defId === defId) { chosen = item; break; }
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
    this.refresh();
  }

  /**
   * Transfer as many body items as will fit into the player's inventory.
   * Stops adding a given stack as soon as addItem returns false (inventory full).
   */
  _takeAll() {
    if (!this._body) return;
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
    this.refresh();
  }
}
