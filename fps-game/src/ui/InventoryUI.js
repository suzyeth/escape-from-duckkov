/**
 * InventoryUI
 * Renders the grid inventory as a DOM overlay (Tab to toggle).
 * Items are positioned via CSS Grid matching the inventory data model.
 * Supports drag-and-drop to reorder items within the grid.
 */
export class InventoryUI {
  /** @param {import('../systems/InventorySystem').InventorySystem} inventory */
  constructor(inventory) {
    this._inv     = inventory;
    this._visible = false;
    this._panel   = document.getElementById('inventory-panel');
    this._grid    = document.getElementById('inventory-grid');
    this._tooltip = document.getElementById('inv-tooltip');

    // Drag state
    this._dragItem    = null;   // item instance being dragged
    this._dragEl      = null;   // the ghost DOM element
    this._dragOffsetX = 0;
    this._dragOffsetY = 0;
    this._CELL        = 46;     // px per cell

    // Callbacks for use/drop actions (set by main.js)
    this._onUseItem  = null;
    this._onDropItem = null;

    if (!this._panel) {
      console.warn('InventoryUI: #inventory-panel not found in DOM');
      return;
    }
    this._setupGrid();
    this._setupDragListeners();

    // Right-click context menu
    this._grid.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this._onContextAction(e);
    });
  }

  /** Set callback for using an item (right-click). @param {(instanceId:number)=>void} fn */
  onUse(fn) { this._onUseItem = fn; }

  /** Set callback for dropping an item (Shift+click). @param {(instanceId:number)=>void} fn */
  onDrop(fn) { this._onDropItem = fn; }

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

    // Abort any in-progress drag to prevent ghost elements
    if (this._dragItem) {
      if (this._dragEl) { this._dragEl.remove(); this._dragEl = null; }
      if (this._dragSourceEl) { try { this._dragSourceEl.style.opacity = '1'; } catch {} this._dragSourceEl = null; }
      this._dragItem = null;
      this._clearDropPreview();
    }

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
      el.dataset.instanceId = item.id;
      el.style.gridRow    = `${item.row + 1} / span ${item.def.h}`;
      el.style.gridColumn = `${item.col + 1} / span ${item.def.w}`;
      el.style.background = item.def.color;
      el.style.cursor     = 'grab';

      el.innerHTML =
        `<span class="inv-item-name">${item.def.name}</span>` +
        (item.def.stackable ? `<span class="inv-item-count">×${item.count}</span>` : '') +
        (item.def.value     ? `<span class="inv-item-value">¥${item.def.value}</span>` : '');

      // Tooltip on hover
      el.addEventListener('mouseenter', () => {
        if (this._dragItem) return; // no tooltip while dragging
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
    this._grid.style.display             = 'grid';
    this._grid.style.gridTemplateColumns = `repeat(${this._inv.cols}, ${this._CELL}px)`;
    this._grid.style.gridTemplateRows    = `repeat(${this._inv.rows}, ${this._CELL}px)`;
    this._grid.style.position            = 'relative';
    this._grid.innerHTML                 = '';

    // Background cells
    for (let r = 0; r < this._inv.rows; r++) {
      for (let c = 0; c < this._inv.cols; c++) {
        const cell = document.createElement('div');
        cell.className        = 'inv-cell';
        cell.style.gridRow    = `${r + 1}`;
        cell.style.gridColumn = `${c + 1}`;
        cell.dataset.row      = r;
        cell.dataset.col      = c;
        this._grid.appendChild(cell);
      }
    }
  }

  _setupDragListeners() {
    this._grid.addEventListener('mousedown', (e) => this._onDragStart(e));
    document.addEventListener('mousemove', (e) => this._onDragMove(e));
    document.addEventListener('mouseup',   (e) => this._onDragEnd(e));
  }

  _onDragMove(e) {
    if (!this._dragItem || !this._dragEl) return;
    this._dragEl.style.left = `${e.clientX - this._dragOffsetX}px`;
    this._dragEl.style.top  = `${e.clientY - this._dragOffsetY}px`;
    this._showDropPreview(e);
  }

  _onDragEnd(e) {
    if (!this._dragItem) return;

    // Remove ghost
    if (this._dragEl) {
      this._dragEl.remove();
      this._dragEl = null;
    }

    // Clear preview highlights
    this._clearDropPreview();

    // Always restore source element opacity first
    if (this._dragSourceEl) {
      try { this._dragSourceEl.style.opacity = '1'; } catch { /* element may be gone */ }
      this._dragSourceEl = null;
    }

    // Calculate target cell from mouse position
    const gridRect = this._grid.getBoundingClientRect();
    const col = Math.floor((e.clientX - gridRect.left) / this._CELL);
    const row = Math.floor((e.clientY - gridRect.top) / this._CELL);

    const item = this._dragItem;
    this._dragItem = null;

    // Check if drop is within grid
    if (row < 0 || col < 0 || row >= this._inv.rows || col >= this._inv.cols) {
      return; // dropped outside grid, do nothing
    }

    // Check if there's an item at the target
    const targetId = this._inv.getItemAt(row, col);

    if (targetId !== null && targetId !== item.id) {
      // Try swap
      this._inv.swapItems(item.id, targetId);
    } else {
      // Try move
      this._inv.moveItem(item.id, row, col);
    }

    this.refresh();
  }

  _showDropPreview(e) {
    this._clearDropPreview();
    if (!this._dragItem) return;

    const gridRect = this._grid.getBoundingClientRect();
    const col = Math.floor((e.clientX - gridRect.left) / this._CELL);
    const row = Math.floor((e.clientY - gridRect.top) / this._CELL);

    const { w, h } = this._dragItem.def;

    for (let r = row; r < row + h; r++) {
      for (let c = col; c < col + w; c++) {
        const cell = this._grid.querySelector(`.inv-cell[data-row="${r}"][data-col="${c}"]`);
        if (cell) {
          cell.classList.add('inv-drop-target');
        }
      }
    }
  }

  _clearDropPreview() {
    this._grid.querySelectorAll('.inv-drop-target').forEach(el => {
      el.classList.remove('inv-drop-target');
    });
  }

  /** Handle right-click on item: use if healable, otherwise show drop option */
  _onContextAction(e) {
    const itemEl = e.target.closest('.inv-item');
    if (!itemEl) return;
    const instanceId = Number(itemEl.dataset.instanceId);
    const item = this._inv.items.get(instanceId);
    if (!item) return;

    // If item has heals property, use it
    if (item.def.heals && this._onUseItem) {
      this._onUseItem(instanceId);
      return;
    }

    // Otherwise drop it
    if (this._onDropItem) {
      this._onDropItem(instanceId);
    }
  }

  /** Handle shift+left-click on item: always drop */
  _onDragStart(e) {
    // Shift+click = drop item
    if (e.shiftKey) {
      const itemEl = e.target.closest('.inv-item');
      if (!itemEl) return;
      e.preventDefault();
      const instanceId = Number(itemEl.dataset.instanceId);
      if (this._onDropItem) this._onDropItem(instanceId);
      return;
    }

    // Normal drag
    this._startDrag(e);
  }

  _startDrag(e) {
    const itemEl = e.target.closest('.inv-item');
    if (!itemEl) return;

    e.preventDefault();
    const instanceId = Number(itemEl.dataset.instanceId);
    const item = this._inv.items.get(instanceId);
    if (!item) return;

    this._dragItem = item;

    // Hide the original
    itemEl.style.opacity = '0.3';
    this._dragSourceEl = itemEl;

    // Create ghost element
    const ghost = document.createElement('div');
    ghost.className        = 'inv-item inv-drag-ghost';
    ghost.style.position   = 'fixed';
    ghost.style.width      = `${item.def.w * this._CELL}px`;
    ghost.style.height     = `${item.def.h * this._CELL}px`;
    ghost.style.background = item.def.color;
    ghost.style.opacity    = '0.8';
    ghost.style.zIndex     = '9999';
    ghost.style.pointerEvents = 'none';
    ghost.style.border     = '2px solid #fff';
    ghost.style.boxSizing  = 'border-box';
    ghost.innerHTML        = `<span class="inv-item-name">${item.def.name}</span>`;

    document.body.appendChild(ghost);
    this._dragEl = ghost;

    this._dragOffsetX = (item.def.w * this._CELL) / 2;
    this._dragOffsetY = (item.def.h * this._CELL) / 2;
    ghost.style.left = `${e.clientX - this._dragOffsetX}px`;
    ghost.style.top  = `${e.clientY - this._dragOffsetY}px`;

    this._showDropPreview(e);
    if (this._tooltip) this._tooltip.style.display = 'none';
  }
}
