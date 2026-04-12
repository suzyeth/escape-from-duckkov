/**
 * CraftingSystem
 * Recipes for crafting items from materials.
 * Recipes unlock by finding blueprints in raids.
 */
import { ITEM_DEFS } from './InventorySystem.js';

export const RECIPES = [
  {
    id: 'craft_bandage',
    name: '制造绷带',
    output: { defId: 'bandage', count: 3 },
    cost: [{ defId: 'cash', count: 100 }],
    blueprint: null, // always available
  },
  {
    id: 'craft_medkit',
    name: '制造急救包',
    output: { defId: 'medkit', count: 1 },
    cost: [{ defId: 'bandage', count: 3 }, { defId: 'cash', count: 300 }],
    blueprint: 'bp_medkit',
  },
  {
    id: 'craft_rifle_ammo',
    name: '制造步枪弹药',
    output: { defId: 'rifle_ammo', count: 30 },
    cost: [{ defId: 'cash', count: 150 }],
    blueprint: null,
  },
  {
    id: 'craft_pistol_ammo',
    name: '制造手枪弹药',
    output: { defId: 'pistol_ammo', count: 20 },
    cost: [{ defId: 'cash', count: 80 }],
    blueprint: null,
  },
  {
    id: 'craft_shotgun_ammo',
    name: '制造霰弹',
    output: { defId: 'shotgun_ammo', count: 10 },
    cost: [{ defId: 'cash', count: 120 }],
    blueprint: null,
  },
  {
    id: 'craft_vest_light',
    name: '制造轻型防弹衣',
    output: { defId: 'vest_light', count: 1 },
    cost: [{ defId: 'cash', count: 800 }],
    blueprint: 'bp_vest',
  },
  {
    id: 'craft_painkillers',
    name: '制造止痛药',
    output: { defId: 'painkillers', count: 2 },
    cost: [{ defId: 'cash', count: 200 }],
    blueprint: 'bp_painkillers',
  },
  {
    id: 'craft_helmet',
    name: '制造防弹头盔',
    output: { defId: 'helmet', count: 1 },
    cost: [{ defId: 'cash', count: 1200 }],
    blueprint: 'bp_helmet',
  },
];

export class CraftingSystem {
  /**
   * @param {import('./SaveSystem').SaveSystem} save
   */
  constructor(save) {
    this._save = save;
  }

  /** Get all recipes with availability status */
  getRecipes() {
    return RECIPES.map(r => ({
      ...r,
      unlocked: !r.blueprint || this._save.blueprints.includes(r.blueprint),
      canCraft: this._canCraft(r),
    }));
  }

  _canCraft(recipe) {
    if (recipe.blueprint && !this._save.blueprints.includes(recipe.blueprint)) return false;
    for (const mat of recipe.cost) {
      if (mat.defId === 'cash') {
        if (this._save.currency < mat.count) return false;
      } else {
        const stashItem = this._save.stash.find(s => s.defId === mat.defId);
        if (!stashItem || stashItem.count < mat.count) return false;
      }
    }
    return true;
  }

  /**
   * Craft a recipe. Consumes materials, produces output into stash.
   * @returns {boolean} success
   */
  craft(recipeId) {
    const recipe = RECIPES.find(r => r.id === recipeId);
    if (!recipe || !this._canCraft(recipe)) return false;

    // Consume materials
    for (const mat of recipe.cost) {
      if (mat.defId === 'cash') {
        this._save.spendCurrency(mat.count);
      } else {
        this._save.removeFromStash(mat.defId, mat.count);
      }
    }

    // Produce output
    this._save.addToStash(recipe.output.defId, recipe.output.count);
    return true;
  }
}
