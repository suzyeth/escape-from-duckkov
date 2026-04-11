import * as THREE from 'three';
import { Renderer }          from './core/Renderer.js';
import { InputManager }      from './core/InputManager.js';
import { GameLoop }          from './core/GameLoop.js';
import { Player }            from './entities/Player.js';
import { Level }             from './world/Level.js';
import { HUD }               from './ui/HUD.js';
import { WeaponSystem }      from './systems/WeaponSystem.js';
import { BulletSystem }      from './systems/BulletSystem.js';
import { AISystem }          from './systems/AISystem.js';
import { InventorySystem, ITEM_DEFS } from './systems/InventorySystem.js';
import { LootSystem }        from './systems/LootSystem.js';
import { HealthSystem }      from './systems/HealthSystem.js';
import { TutorialSystem }    from './systems/TutorialSystem.js';
import { SoundSystem }       from './systems/SoundSystem.js';
import { DoorSystem }        from './systems/DoorSystem.js';
import { InventoryUI }       from './ui/InventoryUI.js';
import { StashScreen }       from './ui/StashScreen.js';
import { MinimapUI }         from './ui/MinimapUI.js';

// ── Scene ─────────────────────────────────────────────────────────────────────

const container = document.getElementById('canvas-container');
const renderer  = new Renderer(container);
const scene     = new THREE.Scene();
const camera    = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 300);
const CAM_OFFSET = new THREE.Vector3(0, 28, 16);

renderer.onResize((w, h) => { camera.aspect = w / h; camera.updateProjectionMatrix(); });

// ── Systems ───────────────────────────────────────────────────────────────────

const level     = new Level(scene);
const player    = new Player(scene);
const input     = new InputManager(renderer.domElement);
const weapons   = new WeaponSystem();
const bullets   = new BulletSystem(scene);
const aiSystem  = new AISystem(scene);
const inventory = new InventorySystem();
const loot      = new LootSystem(scene);
const health    = new HealthSystem();
const tutorial  = new TutorialSystem();
const hud       = new HUD();
const sound     = new SoundSystem();
const doors     = new DoorSystem(scene, level.collidables);
// Populate doors from building front-wall gaps recorded by Level
for (const slot of level.doorSlots) doors.addDoor(slot);

const invUI     = new InventoryUI(inventory);
const stash     = new StashScreen(document.getElementById('stash-screen'));
const minimap   = new MinimapUI(document.getElementById('minimap-canvas'));

// ── Mouse aim ─────────────────────────────────────────────────────────────────

const _groundPlane  = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const _aimRay       = new THREE.Raycaster();
const _mouseNDC     = new THREE.Vector2();
let   _aimWorldPos  = new THREE.Vector3(0, 0, -5);
let   _aimMoved     = false;

renderer.domElement.addEventListener('mousemove', (e) => {
  if (invUI.isOpen) return;
  _mouseNDC.set(
    (e.clientX / innerWidth)  *  2 - 1,
    -(e.clientY / innerHeight) * 2 + 1
  );
  _aimRay.setFromCamera(_mouseNDC, camera);
  _aimRay.ray.intersectPlane(_groundPlane, _aimWorldPos);
  _aimMoved = true;
});

// ── Mouse button ──────────────────────────────────────────────────────────────

renderer.domElement.addEventListener('mousedown', (e) => {
  if (e.button === 0) input.keys['Mouse0'] = true;
});
renderer.domElement.addEventListener('mouseup', (e) => {
  if (e.button === 0) input.keys['Mouse0'] = false;
});

// ── Shooting ──────────────────────────────────────────────────────────────────

// ── Healing channel state ─────────────────────────────────────────────────────

let _healTimer      = 0;    // remaining seconds
let _healDuration   = 0;    // total duration for current item
let _healAmount     = 0;    // HP to restore on completion
let _healInstanceId = null; // which inventory item is being consumed

// ── Recoil ────────────────────────────────────────────────────────────────────

let _recoilOffset = 0;   // camera Y kick (world units), decays per frame
let _shakeX       = 0;   // camera X shake
let _shakeZ       = 0;   // camera Z shake
let _shakeDecay   = 0;   // shake intensity multiplier

// ── Raid stats tracking ───────────────────────────────────────────────────────

let _killCount    = 0;
let _lootValue    = 0;
let _raidStart    = 0;   // performance.now() at raid begin
let _xp           = 0;   // accumulated XP this raid

const XP_REWARDS = {
  kill:       50,
  eliteKill: 200,
  loot:       10,
  container:  25,
  extract:   500,
};

// ── Shoot state ───────────────────────────────────────────────────────────────

let _playerFiredThisFrame = false;
let _playerFiredRecently  = false;
let _firedRecentlyTimer   = 0;

// ── Ambient sound timer ───────────────────────────────────────────────────────
let _ambientTimer = 18 + Math.random() * 15; // first distant shot in 18-33s
let _hitstopTimer = 0; // brief time freeze on kills

function _addScreenShake(intensity) {
  _shakeDecay = Math.min(_shakeDecay + intensity, 1.5);
}

function _gainXP(amount, reason) {
  _xp += amount;
  const xpEl = document.getElementById('xp-value');
  if (xpEl) xpEl.textContent = _xp;

  // Floating XP popup
  const popup = document.createElement('div');
  popup.className   = 'xp-popup';
  popup.textContent = `+${amount} XP`;
  popup.style.left  = `${innerWidth / 2 - 30}px`;
  popup.style.top   = `${innerHeight / 2 - 60}px`;
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 1300);
}

function handlePlayerShoot() {
  _playerFiredThisFrame = false;
  if (invUI.isOpen) return;
  if (!input.isDown('Mouse0')) return;

  const fired = weapons.tryFire();
  if (!fired) {
    if (weapons.current.mag === 0 && !weapons.current.isReloading) {
      sound.playDryFire();
    }
    return;
  }

  _playerFiredThisFrame = true;
  _playerFiredRecently  = true;
  _firedRecentlyTimer   = 1.5;

  // Recoil kick + screen shake
  const recoilStr = { rifle: 0.22, pistol: 0.12, shotgun: 0.45, vss: 0.40, mp5: 0.10 };
  const shakeStr  = { rifle: 0.25, pistol: 0.12, shotgun: 0.55, vss: 0.30, mp5: 0.15 };
  _recoilOffset += recoilStr[weapons.current.def.id] ?? 0.15;
  _addScreenShake(shakeStr[weapons.current.def.id] ?? 0.2);

  // Gunshot sound + crosshair bloom
  sound.playShot(weapons.current.def.id);
  const crosshair = document.getElementById('crosshair');
  if (crosshair) {
    crosshair.classList.add('shoot');
    setTimeout(() => crosshair.classList.remove('shoot'), 80);
  }

  const def      = weapons.current.def;
  const angle    = player.mesh.rotation.y;
  const muzzlePos = new THREE.Vector3(
    player.position.x + Math.sin(angle) * 0.6,
    0.5,
    player.position.z + Math.cos(angle) * 0.6
  );

  bullets.spawnMuzzleFlash(muzzlePos);

  // Apply spread penalty from arm injuries
  const spreadMult = health.spreadMultiplier;

  for (let p = 0; p < def.pellets; p++) {
    const spread = def.spread * spreadMult;
    const dir = new THREE.Vector3(
      Math.sin(angle) + (Math.random() - 0.5) * spread,
      0,
      Math.cos(angle) + (Math.random() - 0.5) * spread
    ).normalize();

    const hitEnemy = aiSystem.checkPlayerHit(muzzlePos, dir, def.range);
    if (hitEnemy) {
      hitEnemy.takeDamage(def.damage);
      bullets.spawnTracer(muzzlePos, hitEnemy.position, def.tracerColor);
      bullets.spawnHitEffect(hitEnemy.position);
      sound.playHitMarker();
      // Crosshair hit flash
      const ch = document.getElementById('crosshair');
      if (ch) {
        ch.classList.remove('shoot');
        ch.classList.add('hit');
        setTimeout(() => ch.classList.remove('hit'), 120);
      }
      if (!hitEnemy.isAlive) {
        _killCount++;
        const label = hitEnemy.isElite ? '★精英鸭卒' : '鸭卒';
        const xpGain = hitEnemy.isElite ? XP_REWARDS.eliteKill : XP_REWARDS.kill;
        hud.pushKillFeed(`击毙${label} [${_killCount}]`);
        _gainXP(xpGain, label);
        bullets.spawnKillEffect(hitEnemy.position);
        sound.playKillConfirm();
        _addScreenShake(hitEnemy.isElite ? 0.5 : 0.3);
        _hitstopTimer = hitEnemy.isElite ? 0.08 : 0.05;
        loot.dropLoot(hitEnemy.position, _randomEnemyDrop(hitEnemy.isElite));
      }
    } else {
      const ray  = new THREE.Raycaster(muzzlePos, dir, 0, def.range);
      const hits = ray.intersectObjects(level.collidables, false);
      const endPt = hits.length > 0
        ? hits[0].point
        : muzzlePos.clone().addScaledVector(dir, def.range);

      bullets.spawnTracer(muzzlePos, endPt, def.tracerColor);
      if (hits.length > 0) bullets.spawnHitEffect(hits[0].point);
    }
  }
}

function _randomEnemyDrop(isElite = false) {
  const drops = [];
  const r = Math.random();
  if (isElite) {
    // Elite drops: guaranteed medkit or armor + high cash
    if      (r < 0.25) drops.push({ defId: 'medkit',      count: 1 });
    else if (r < 0.45) drops.push({ defId: 'vest_light',  count: 1 });
    else if (r < 0.60) drops.push({ defId: 'painkillers', count: 1 });
    else               drops.push({ defId: 'dogtag',       count: 1 });
    drops.push({ defId: 'rifle_ammo', count: Math.ceil(Math.random() * 20 + 15) });
    drops.push({ defId: 'cash', count: Math.ceil(Math.random() * 600 + 300) });
  } else {
    if      (r < 0.15) drops.push({ defId: 'medkit',     count: 1 });
    else if (r < 0.30) drops.push({ defId: 'bandage',    count: 1 });
    else if (r < 0.60) drops.push({ defId: 'rifle_ammo', count: Math.ceil(Math.random() * 20 + 5) });
    drops.push({ defId: 'cash', count: Math.ceil(Math.random() * 300 + 50) });
  }
  return drops;
}

// ── Enemy shots ───────────────────────────────────────────────────────────────

const _enemyShotRay = new THREE.Raycaster();

function handleEnemyShots(shots) {
  for (const shot of shots) {
    _enemyShotRay.set(shot.origin, shot.dir);
    _enemyShotRay.near = 0;
    _enemyShotRay.far  = 30;
    const wallHits = _enemyShotRay.intersectObjects(level.collidables, false);
    const wallDist = wallHits.length > 0 && wallHits[0].object.name !== 'Floor'
      ? wallHits[0].distance
      : 30;

    const endPt = shot.origin.clone().addScaledVector(shot.dir, wallDist);
    bullets.spawnTracer(shot.origin, endPt, 0xff4444);

    const toPlayer = new THREE.Vector3(
      player.position.x - shot.origin.x, 0,
      player.position.z - shot.origin.z
    );
    const t = toPlayer.dot(shot.dir);
    if (t > 0 && t < wallDist) {
      const closest    = shot.origin.clone().addScaledVector(shot.dir, t);
      closest.y        = 0;
      const playerFlat = new THREE.Vector3(player.position.x, 0, player.position.z);
      if (closest.distanceTo(playerFlat) < 0.65) {
        // Route damage through HealthSystem (random body part)
        const partHit = health.takeDamage(shot.damage);
        // Sync simplified health to player for HUD bar
        player.health    = health.isAlive ? Math.round(health.effectiveHpFraction * player.maxHealth) : 0;
        player.speedMultiplier = health.speedMultiplier;
        hud.showDamageFlash();
        sound.playDamaged();
        _addScreenShake(0.6);
        hud.pushKillFeed(`中弹！(${_partLabel(partHit)})`);

        if (!health.isAlive) _onPlayerDied();
      }
    }
  }
}

function _partLabel(key) {
  const labels = { HEAD: '头部', TORSO: '躯干', LEFT_ARM: '左臂', RIGHT_ARM: '右臂', LEFT_LEG: '左腿', RIGHT_LEG: '右腿' };
  return labels[key] ?? key;
}

// ── Loot pickup ───────────────────────────────────────────────────────────────

let _lootedThisSession = false;

function handleLootPickup(dt) {
  const name = loot.getNearbyItemName(player.position);
  hud.setPickupHint(name ? `[E] 拾取 ${name}` : null);

  const pickup = loot.update(player.position, input.justPressed('KeyE'));
  if (pickup) {
    if (pickup.defId === '__container__') {
      // Container opened — add each drop to inventory
      let names = [];
      for (const drop of pickup.drops) {
        const added = inventory.addItem(drop.defId, drop.count);
        if (added) {
          _lootedThisSession = true;
          const def = ITEM_DEFS[drop.defId];
          if (def) { _lootValue += def.value * drop.count; names.push(def.name); }
        }
      }
      if (names.length > 0) {
        sound.playDryFire();
        if (invUI.isOpen) invUI.refresh();
        hud.pushKillFeed(`开箱: ${names.join(' / ')}`);
        _gainXP(XP_REWARDS.container, '开箱');
      }
    } else {
      const added = inventory.addItem(pickup.defId, pickup.count);
      if (added) {
        _lootedThisSession = true;
        const def = ITEM_DEFS[pickup.defId];
        if (def) _lootValue += def.value * pickup.count;
        // Auto-equip armor items
        if (def?.armor) {
          health.equipArmor(def.armor);
          hud.pushKillFeed(`装备: ${def.name} (${Math.round(def.armor.reduce * 100)}%减伤)`);
        } else {
          hud.pushKillFeed(`拾取: ${def?.name ?? pickup.defId}`);
          _gainXP(XP_REWARDS.loot, '拾取');
        }
        if (invUI.isOpen) invUI.refresh();
        sound.playDryFire();
      }
    }
  }
}

// ── Healing (H key) ───────────────────────────────────────────────────────────

function handleHealing() {
  // Cancel healing if shooting
  if (_healTimer > 0 && input.isDown('Mouse0')) {
    _healTimer = 0;
    player.isHealing = false;
    hud.setHealChannel(-1);
    hud.pushKillFeed('治疗中断');
    return;
  }

  // Block H press during active channel (timer ticked by game loop with real dt)
  if (_healTimer > 0) {
    return;
  }

  if (input.justPressed('KeyH')) {
    const result = inventory.getBestHealingItem();
    if (!result) {
      hud.pushKillFeed('背包里没有急救物品！');
      return;
    }
    const { def, instanceId } = result;
    // Validate item still exists in inventory
    if (!inventory.items.has(instanceId)) return;
    // Duration by item type (must be > 0)
    _healDuration   = Math.max(0.1, def.id === 'medkit' ? 3.0 : def.id === 'painkillers' ? 2.5 : 1.8);
    _healTimer      = _healDuration;
    _healAmount     = def.heals;
    _healInstanceId = instanceId;
    player.isHealing = true;
    hud.pushKillFeed(`使用 ${def.name}…`);
  }
}

// ── Door interaction ──────────────────────────────────────────────────────────

function handleDoors(dt) {
  const fPressed = input.justPressed('KeyF');
  const { nearDoor, justToggled } = doors.update(dt, player.position, fPressed);

  if (justToggled) sound.playDoor();

  // Show door hint only when no loot hint is showing
  if (nearDoor && !loot.getNearbyItemName(player.position)) {
    hud.setPickupHint(`[F] ${nearDoor.isOpen ? '关门' : '开门'}`);
  }
}

// ── Extraction ────────────────────────────────────────────────────────────────

let _extractTimer    = 0;
let _extractBeepTimer = 0;
const EXTRACT_HOLD = 10.0;  // 10 seconds per plan

function handleExtraction(dt) {
  // Find which extraction point the player is inside (if any)
  const activePoint = _getActiveExtractPoint();

  if (activePoint) {
    const needsKey = activePoint.requiresKey;

    // Key check
    if (needsKey) {
      const hasKey = _playerHasItem(needsKey);
      if (!hasKey) {
        hud.setPickupHint(`需要 [${needsKey}] 才能在此撤离`);
        _extractTimer = 0;
        hud.setExtractProgress(0);
        return;
      }
    }

    if (input.isDown('KeyE') && !_nearLoot()) {
      _extractTimer     += dt;
      _extractBeepTimer -= dt;
      if (_extractBeepTimer <= 0) {
        sound.playExtractBeep();
        _extractBeepTimer = 0.5; // beep every 0.5 s
      }
      hud.setExtractProgress(_extractTimer / EXTRACT_HOLD);
      hud.setPickupHint(`撤离中… ${activePoint.label}`);
      if (_extractTimer >= EXTRACT_HOLD) _onExtracted();
    } else {
      _extractTimer     = 0;
      _extractBeepTimer = 0;
      hud.setExtractProgress(0);
      if (!_nearLoot()) hud.setPickupHint(`[E] 按住撤离 — ${activePoint.label}`);
    }
  } else {
    _extractTimer = 0;
    hud.setExtractProgress(0);
  }
}

function _getActiveExtractPoint() {
  for (const ep of level.extractionPoints) {
    const dx = player.position.x - ep.center.x;
    const dz = player.position.z - ep.center.z;
    if (Math.sqrt(dx * dx + dz * dz) < ep.radius) return ep;
  }
  return null;
}

function _playerHasItem(defId) {
  for (const item of inventory.items.values()) {
    if (item.def.id === defId) return true;
  }
  return false;
}

function _nearLoot() {
  return loot.getNearbyItemName(player.position) !== null;
}

function _survivedSeconds() {
  return Math.floor((performance.now() - _raidStart) / 1000);
}

function _formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function _showEndScreen(survived) {
  tutorial.complete();
  loop.stop();
  hud.hide();

  const ss         = document.getElementById('start-screen');
  const statsEl    = document.getElementById('raid-stats');
  const controlsEl = document.getElementById('start-controls');
  const survivedSec = _survivedSeconds();

  ss.querySelector('h1').textContent = survived ? '✓ 撤离成功' : '✕ 阵亡';
  ss.querySelector('p').textContent  = survived ? '你带着战利品活下来了！' : '你的战利品已遗失在战场上';
  document.getElementById('start-btn').textContent = '再次进入';

  statsEl.innerHTML = `
    存活时间 &nbsp;<span>${_formatTime(survivedSec)}</span>&nbsp;&nbsp;
    击杀数 &nbsp;<span>${_killCount}</span>&nbsp;&nbsp;
    战利品价值 &nbsp;<span>${_lootValue} 鸭元</span>&nbsp;&nbsp;
    经验值 &nbsp;<span>${_xp} XP</span>
  `;
  statsEl.style.display   = 'block';
  controlsEl.style.display = 'none';

  ss.style.display = 'flex';
}

function _onExtracted() {
  _gainXP(XP_REWARDS.extract, '撤离');
  _showEndScreen(true);
}

function _onPlayerDied() {
  _showEndScreen(false);
}

// ── Stash screen flow ─────────────────────────────────────────────────────────

stash.onSelect((loadout) => {
  // Init audio on first user interaction
  sound.init();
  sound.resume();

  // Apply weapon loadout
  weapons.applyLoadout(loadout.weaponSlot);

  // Apply inventory loadout (clear starting gear, apply preset)
  inventory.reset();
  for (const item of loadout.items) {
    inventory.addItem(item.defId, item.count);
    // Auto-equip armor from starting loadout
    const def = ITEM_DEFS[item.defId];
    if (def?.armor) health.equipArmor(def.armor);
  }

  // Random spawn point
  const spawnPoints = level.playerSpawnPoints;
  const spawn = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
  player.position.copy(spawn);
  player.position.y = 0;

  // Reset health & stamina
  health.reset();
  player.health          = player.maxHealth;
  player.stamina         = player.maxStamina;
  player.speedMultiplier = 1.0;

  // Reset raid stats
  _killCount         = 0;
  _lootValue         = 0;
  _xp                = 0;
  _raidStart         = performance.now();
  _lootedThisSession = false;

  // Reset combat state
  _recoilOffset      = 0;
  _shakeX            = 0;
  _shakeZ            = 0;
  _shakeDecay        = 0;
  _hitstopTimer      = 0;
  _healTimer         = 0;
  _healInstanceId    = null;
  _extractTimer      = 0;
  const xpEl = document.getElementById('xp-value');
  if (xpEl) xpEl.textContent = '0';

  // Restore controls hint for next end screen
  const controlsEl = document.getElementById('start-controls');
  if (controlsEl) controlsEl.style.display = 'block';
  const statsEl = document.getElementById('raid-stats');
  if (statsEl)   statsEl.style.display    = 'none';

  // Snap camera to spawn
  camera.position.copy(spawn).add(CAM_OFFSET);
  camera.lookAt(spawn);

  // Reset raid timer
  hud.resetRaid(45 * 60);

  stash.hide();
  document.getElementById('start-screen').style.display = 'none';
  hud.show();
  hud.setHealth(player.health, player.maxHealth);
  hud.setBodyParts(health.getPartSnapshot());
  hud.setWeapon(weapons.current.def.name, weapons.current.mag, weapons.current.reserve);

  gameStarted = true;
  loop.start();
  // Start rolling tips ticker
  if (typeof window._showTipsTicker === 'function') window._showTipsTicker();
});

// ── Start screen ──────────────────────────────────────────────────────────────

const startScreen = document.getElementById('start-screen');
const startBtn    = document.getElementById('start-btn');
let   gameStarted = false;

startBtn.addEventListener('click', () => {
  startScreen.style.display = 'none';
  stash.show();
  // Game will start when loadout is selected in StashScreen
});

// ── Game loop ─────────────────────────────────────────────────────────────────

const loop = new GameLoop(
  // update
  (dt) => {
    if (!gameStarted) return;

    // Hitstop — brief freeze on kills
    if (_hitstopTimer > 0) {
      _hitstopTimer -= dt;
      // Still render but skip game logic
      return;
    }

    // Inventory toggle (Tab)
    if (input.justPressed('Tab')) invUI.toggle();

    // Pause movement when inventory is open
    if (!invUI.isOpen) {
      player.update(dt, input, _aimWorldPos, level.collidables);
      // Footstep sound while moving
      const moving = input.isDown('KeyW') || input.isDown('KeyS')
                  || input.isDown('KeyA') || input.isDown('KeyD');
      if (moving) sound.playFootstep(player._isSprinting);
    }

    // Weapons
    const wasReloading = weapons.current.isReloading;
    weapons.update(dt, input);
    // Play reload sound on reload start
    if (!wasReloading && weapons.current.isReloading) sound.playReload();

    // Shooting
    handlePlayerShoot();

    // Bullets
    bullets.update(dt);

    // AI
    _firedRecentlyTimer = Math.max(0, _firedRecentlyTimer - dt);
    _playerFiredRecently = _firedRecentlyTimer > 0;
    const aiResult = aiSystem.update(dt, player.position, level.collidables, _playerFiredRecently);
    handleEnemyShots(aiResult.shots);
    if (aiResult.eliteAlerted) {
      sound.playEliteAlert();
      hud.pushKillFeed('⚠ 精英鸭卒发现你！');
    }

    // Loot
    handleLootPickup(dt);

    // Healing channel tick (uses real dt)
    if (_healTimer > 0) {
      _healTimer = Math.max(0, _healTimer - dt);
      hud.setHealChannel(Math.max(0, Math.min(1, 1 - _healTimer / _healDuration)));
      if (input.isDown('Mouse0')) {
        // Cancel on shoot
        _healTimer = 0;
        player.isHealing = false;
        hud.setHealChannel(-1);
        hud.pushKillFeed('治疗中断');
      } else if (_healTimer <= 0) {
        // Complete — validate item still exists before consuming
        if (inventory.items.has(_healInstanceId)) {
          inventory.useHealing(_healInstanceId);
        }
        health.heal(_healAmount);
        const wasBleeding = health.isBleeding;
        health.stopBleeding();
        player.health          = health.isAlive ? Math.round(health.effectiveHpFraction * player.maxHealth) : 0;
        player.speedMultiplier = health.speedMultiplier;
        player.isHealing       = false;
        hud.setHealChannel(-1);
        if (invUI.isOpen) invUI.refresh();
        hud.pushKillFeed(wasBleeding ? `治疗完成 +${_healAmount}HP (已止血)` : `治疗完成 +${_healAmount}HP`);
      }
    }

    // Healing input
    handleHealing();

    // Doors
    handleDoors(dt);

    // Fracture effects (leg fracture prevents sprinting regardless of stamina)
    if (health.legFractured && player._isSprinting) {
      player._isSprinting = false;
    }

    // Weight penalty (overloaded pack slows walk speed)
    const kg = inventory.totalWeight;
    let weightMult = 1.0;
    if (kg > 35) weightMult = 0.7;
    else if (kg > 25) weightMult = 0.85;
    // Apply weight multiplier on top of health speed multiplier
    player.speedMultiplier = health.speedMultiplier * weightMult;

    // Extraction
    handleExtraction(dt);

    // Ambient distant shots
    _ambientTimer -= dt;
    if (_ambientTimer <= 0) {
      sound.playDistantShot();
      _ambientTimer = 20 + Math.random() * 25;
    }

    // Tutorial
    if (tutorial.isActive) {
      const hint = tutorial.update({
        playerPos: player.position,
        aimMoved:  _aimMoved,
        fired:     _playerFiredThisFrame,
        looted:    _lootedThisSession,
        inExtract: _getActiveExtractPoint() !== null,
      });
      hud.setTutorialHint(hint);
      _aimMoved = false;  // consume flag each frame
    }

    // Bleeding DOT
    if (health.isBleeding && health.isAlive) {
      health.tickBleeding(dt);
      player.health          = health.isAlive ? Math.round(health.effectiveHpFraction * player.maxHealth) : 0;
      player.speedMultiplier = health.speedMultiplier;
      if (!health.isAlive) _onPlayerDied();
    }

    // Recoil + shake decay (frame-rate independent)
    _recoilOffset *= Math.pow(0.82, dt * 60);
    if (_shakeDecay > 0.01) {
      _shakeX = (Math.random() - 0.5) * _shakeDecay * 0.8;
      _shakeZ = (Math.random() - 0.5) * _shakeDecay * 0.8;
      _shakeDecay *= Math.pow(0.85, dt * 60);
    } else {
      _shakeX = 0;
      _shakeZ = 0;
      _shakeDecay = 0;
    }

    // Roof-reveal: hide roof of building player is currently inside
    level.updateRoofs(player.position);

    // Minimap
    minimap.update(
      player.position,
      player.facingAngle,
      aiSystem.enemies,
      level.extractionPoints,
      level.buildingOutlines,
      loot.containers,
    );

    // Camera follow + recoil + shake
    const target = player.position.clone().add(CAM_OFFSET);
    target.x += _shakeX;
    target.y += _recoilOffset;
    target.z += _shakeZ;
    camera.position.lerp(target, 0.12);
    camera.lookAt(player.position);

    // HUD
    hud.update(dt);
    hud.setHealth(player.health, player.maxHealth);
    hud.setStamina(player.stamina, player.maxStamina);
    hud.setArmor(health.armorPct);
    hud.setBleedingState(health.isBleeding);
    hud.setBodyParts(health.getPartSnapshot());
    hud.setWeapon(
      weapons.current.def.name,
      weapons.current.isReloading ? -1 : weapons.current.mag,
      weapons.current.reserve
    );
    hud.setActiveWeaponSlot(weapons.activeSlot);
    hud.setFractureState(health.legFractured, health.armFractured);

    input.endFrame();
  },
  // render
  () => renderer.render(scene, camera)
);

// Initial camera snap
camera.position.copy(player.position).add(CAM_OFFSET);
camera.lookAt(player.position);
