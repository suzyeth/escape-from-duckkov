/**
 * InventoryUI
 * Renders the grid inventory as a DOM overlay (Tab to toggle).
 * Items are positioned via CSS Grid matching the inventory data model.
 */
export class InventoryUI {
  /** @param {import('../systems/InventorySystem').InventorySystem} inventory */
  constructor(inventory) {
    this._inv     = inventory;
    this._visible = false;
    this._panel   = document.getElementById('inventory-panel');
    this._grid    = document.getElementById('inventory-grid');
    this._tooltip = document.getElementById('inv-tooltip');

    if (!this._panel) {
      console.warn('InventoryUI: #inventory-panel not found in DOM');
      return;
    }
    this._setupGrid();
  }

  // ── Public ─────────────────────────────────────────────────────────────────

  get isOpen() { return this._visible; }

  toggle() {
    this._visible = !this._visible;
    this._panel.style.display = this._visible ? 'flex' : 'none';
    if (this._visible) this.refresh();
  }

  open()  { this._visible = true;  this._panel.style.display = 'flex';  this.refresh(); }
  close() { this._visible = false; this._panel.style.display = 'none'; }

  /** Re-render after inventory changes */
  refresh() {
    if (!this._grid) return;

    // Update weight display
    const weightEl = document.getElementById('inv-weight');
    if (weightEl) {
      const kg = this._inv.totalWeight.toFixed(1);
      weightEl.textContent = `${kg} kg`;
      weightEl.className = this._inv.totalWeight > 35 ? 'overloaded'
                         : this._inv.totalWeight > 25 ? 'heavy' : '';
    }

    // Remove only item elements (keep cell backgrounds)
    this._grid.querySelectorAll('.inv-item').forEach(el => el.remove());

    const rendered = new Set();
    for (const [, item] of this._inv.items) {
      if (rendered.has(item.id)) continue;
      rendered.add(item.id);

      const el = document.createElement('div');
      el.className = 'inv-item';
      el.style.gridRow    = `${item.row + 1} / span ${item.def.h}`;
      el.style.gridColumn = `${item.col + 1} / span ${item.def.w}`;
      el.style.background = item.def.color;

      el.innerHTML =
        `<span class="inv-item-name">${item.def.name}</span>` +
        (item.def.stackable ? `<span class="inv-item-count">×${item.count}</span>` : '') +
        (item.def.value     ? `<span class="inv-item-value">¥${item.def.value}</span>` : '');

      // Tooltip on hover
      el.addEventListener('mouseenter', () => {
        if (this._tooltip) {
          this._tooltip.textContent = item.def.name +
            (item.def.stackable ? ` ×${item.count}` : '') +
            (item.def.heals     ? `  +${item.def.heals}HP` : '') +
            `  ¥${item.def.value * (item.count || 1)}`;
          this._tooltip.style.display = 'block';
        }
      });
      el.addEventListener('mouseleave', () => {
        if (this._tooltip) this._tooltip.style.display = 'none';
      });

      this._grid.appendChild(el);
    }
  }

  // ── Private ────────────────────────────────────────────────────────────────

  _setupGrid() {
    const CELL = 46; // px
    this._grid.style.display               = 'grid';
    this._grid.style.gridTemplateColumns   = `repeat(${this._inv.cols}, ${CELL}px)`;
    this._grid.style.gridTemplateRows      = `repeat(${this._inv.rows}, ${CELL}px)`;
    this._grid.innerHTML                   = '';

    // Background cells
    for (let r = 0; r < this._inv.rows; r++) {
      for (let c = 0; c < this._inv.cols; c++) {
        const cell = document.createElement('div');
        cell.className            = 'inv-cell';
        cell.style.gridRow        = `${r + 1}`;
        cell.style.gridColumn     = `${c + 1}`;
        this._grid.appendChild(cell);
      }
    }
  }
}
