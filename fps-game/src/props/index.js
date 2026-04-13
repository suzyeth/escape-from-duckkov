/**
 * Props Library — 道具资产统一入口
 */

// 材质
export { MAT } from './materials.js';

// 环境配置
export { FACTORY_ENV, applyFactoryEnv, addFactoryCeilingLight } from './env-factory.js';
export { OUTDOOR_ENV, applyOutdoorEnv, createOutdoorGround, createTree, createSandbags } from './env-outdoor.js';

// 室内道具
export { createCrateCluster } from './crate-cluster.js';
export { createPipeRun } from './pipe-run.js';
export { createLockerWall } from './locker-wall.js';
export { createVendingMachine } from './vending-machine.js';
export { createForklift } from './forklift.js';
export { createContainer } from './container.js';
export { createShelf } from './shelf.js';
export { createExtinguisher } from './extinguisher.js';
export { createAmmoCrate } from './ammo-crate.js';

// 室内外通用
export { createBarrel } from './barrel.js';

// 室外道具
export { createRock, createRockCluster } from './rock-cluster.js';
export { createWoodFence, createStakeRope } from './fence.js';
export { createBuilding, createUmbrella, createStreetLight, createBench } from './building.js';

// 角色
export { createPlayer, animatePlayerWalk } from './player.js';

// 背包物品 (Loot)
export {
  createAK47, createPistol, createShotgun, createShovel,
  createRifleAmmo, createShotgunAmmo, createPistolAmmo,
  createMedkit, createBandage, createSyringe, createPainkiller, createTourniquet,
  createArmor, createHelmet,
  createBackpack,
  createCannedFood, createWaterBottle, createEnergyBar, createHoney,
  createChip, createGoldBar, createKeycard, createIntelDoc,
  createWeaponParts, createLightbulb, createNotebook, createElectronics,
} from './loot-items.js';
