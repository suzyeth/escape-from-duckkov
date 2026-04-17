// First-run deterministic state. Judges see identical opening 60 seconds.
// Drives: spawn position index, starting weapon, starting ammo, starting armor.

const SEEN_KEY = 'duckkov_hasPlayedBefore';

export function isFirstRun() {
  try { return !localStorage.getItem(SEEN_KEY); } catch { return false; }
}

export function markPlayed() {
  try { localStorage.setItem(SEEN_KEY, '1'); } catch {}
}

// Fixed values for first run. Indices reference existing arrays; IDs reference InventorySystem defs.
export const DEMO_SEED = {
  spawnPointIndex: 0,        // Level.playerSpawnPoints[0]
  startingWeaponSlot: 0,     // WeaponSystem slot index (rifle = AK-74)
  startingAmmo: 60,
  startingArmor: 'vest_light',
};
