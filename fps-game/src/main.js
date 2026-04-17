import * as THREE from 'three';
import GUI from 'lil-gui';
import { Renderer }          from './core/Renderer.js';
import { InputManager }      from './core/InputManager.js';
import { GameLoop }          from './core/GameLoop.js';
import { Player }            from './entities/Player.js';
import { Level }             from './world/Level.js';
import { HUD }               from './ui/HUD.js';
import { WeaponSystem }      from './systems/WeaponSystem.js';
import { BulletSystem }      from './systems/BulletSystem.js';
import { AISystem }          from './systems/AISystem.js';
import { ENEMY_TYPES }       from './entities/Enemy.js';
import { InventorySystem, ITEM_DEFS } from './systems/InventorySystem.js';
import { LootSystem }        from './systems/LootSystem.js';
import { HealthSystem }      from './systems/HealthSystem.js';
import { TutorialSystem }    from './systems/TutorialSystem.js';
import { SoundSystem }       from './systems/SoundSystem.js';
import { DoorSystem }        from './systems/DoorSystem.js';
import { InventoryUI }       from './ui/InventoryUI.js';
import { BodyLootUI }        from './ui/BodyLootUI.js';
import { StashScreen }       from './ui/StashScreen.js';
import { MinimapUI }         from './ui/MinimapUI.js';
import { SaveSystem }        from './systems/SaveSystem.js';
import { FogOfWar }          from './systems/FogOfWar.js';
import { TalentSystem }      from './systems/TalentSystem.js';
import { CraftingSystem }    from './systems/CraftingSystem.js';
import { BaseScreen }        from './ui/BaseScreen.js';
import { NetworkSystem }     from './systems/NetworkSystem.js';
import { LobbyScreen }       from './ui/LobbyScreen.js';
import { RemotePlayer }      from './entities/RemotePlayer.js';
import { isFirstRun, markPlayed, DEMO_SEED } from './systems/DemoSeed.js';

// ── Scene ─────────────────────────────────────────────────────────────────────

const container = document.getElementById('canvas-container');
const renderer  = new Renderer(container);
const scene     = new THREE.Scene();
const camera    = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 300);
const CAM_OFFSET = new THREE.Vector3(0, 20, 12);

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
const hud       = new HUD();
const tutorial  = new TutorialSystem(hud);
const sound     = new SoundSystem();
const doors     = new DoorSystem(scene, level.collidables);
// Populate doors from building front-wall gaps recorded by Level
for (const slot of level.doorSlots) doors.addDoor(slot);

const saveSystem = new SaveSystem();
const fogOfWar   = new FogOfWar();
const talentSystem = new TalentSystem(saveSystem);
const craftingSystem = new CraftingSystem(saveSystem);
const baseScreen = new BaseScreen(saveSystem, talentSystem, craftingSystem);
const network    = new NetworkSystem();
const lobbyScreen = new LobbyScreen();
const invUI     = new InventoryUI(inventory);
const bodyLootUI = new BodyLootUI(inventory, ITEM_DEFS, hud);

// ── Art Debug GUI (lil-gui) ───────────────────────────────────────────────────
// Toggle with G key. Lets you adjust colors, lighting, fog in real-time.
const _artGUI = new GUI({ title: 'Art Debug', width: 280 });
_artGUI.domElement.style.zIndex = '9999';

// Sky & Fog
const _skyFolder = _artGUI.addFolder('Sky & Fog');
const _skyParams = {
  skyColor: '#' + scene.background.getHexString(),
  fogNear: scene.fog.near,
  fogFar: scene.fog.far,
};
_skyFolder.addColor(_skyParams, 'skyColor').name('Sky Color').onChange(v => {
  scene.background.set(v);
  scene.fog.color.set(v);
});
_skyFolder.add(_skyParams, 'fogNear', 10, 200).name('Fog Near').onChange(v => { scene.fog.near = v; });
_skyFolder.add(_skyParams, 'fogFar', 50, 400).name('Fog Far').onChange(v => { scene.fog.far = v; });

// Lighting
const _lightFolder = _artGUI.addFolder('Lighting');
const _lightParams = {
  sunColor: '#' + level._sun.color.getHexString(),
  sunIntensity: level._sun.intensity,
  sunX: level._sun.position.x,
  sunY: level._sun.position.y,
  sunZ: level._sun.position.z,
  fillColor: '#' + level._fill.color.getHexString(),
  fillIntensity: level._fill.intensity,
};
_lightFolder.addColor(_lightParams, 'sunColor').name('Sun Color').onChange(v => level._sun.color.set(v));
_lightFolder.add(_lightParams, 'sunIntensity', 0, 3).name('Sun Intensity').onChange(v => { level._sun.intensity = v; });
_lightFolder.add(_lightParams, 'sunX', -100, 100).name('Sun X').onChange(v => { level._sun.position.x = v; });
_lightFolder.add(_lightParams, 'sunY', 10, 120).name('Sun Y').onChange(v => { level._sun.position.y = v; });
_lightFolder.add(_lightParams, 'sunZ', -100, 100).name('Sun Z').onChange(v => { level._sun.position.z = v; });
_lightFolder.addColor(_lightParams, 'fillColor').name('Fill Color').onChange(v => level._fill.color.set(v));
_lightFolder.add(_lightParams, 'fillIntensity', 0, 2).name('Fill Intensity').onChange(v => { level._fill.intensity = v; });

// Ground (vertex-colored — only roughness is tunable)
const _groundFolder = _artGUI.addFolder('Ground');
const _groundParams = { roughness: level._groundMat.roughness };
_groundFolder.add(_groundParams, 'roughness', 0, 1).name('Roughness').onChange(v => { level._groundMat.roughness = v; });

// Misc
const _miscFolder = _artGUI.addFolder('Misc');
const _miscParams = { fogOfWar: true };
_miscFolder.add(_miscParams, 'fogOfWar').name('Fog of War').onChange(v => { fogOfWar.enabled = v; });

// Start collapsed — press G to toggle
_artGUI.close();
let _guiVisible = true;
window.addEventListener('keydown', (e) => {
  // ESC closes body-loot UI before it reaches the pause toggle
  if (e.code === 'Escape' && bodyLootUI.isOpen) {
    bodyLootUI.close();
    e.stopPropagation();
    return;
  }
  if (e.code === 'Escape') { _togglePause(); return; }
  if (e.code === 'KeyG' && !e.ctrlKey && !e.metaKey && !e.altKey) {
    _guiVisible = !_guiVisible;
    _artGUI.domElement.style.display = _guiVisible ? '' : 'none';
  }
});

// Remote players map
const remotePlayers = new Map();

// Network: render remote players
network.onRemoteState((msg) => {
  let rp = remotePlayers.get(msg.playerId);
  if (!rp) {
    rp = new RemotePlayer(scene, msg.playerId);
    remotePlayers.set(msg.playerId, rp);
  }
  rp.setNetworkState(msg.x, msg.z, msg.angle, msg.health);
});

network.onRemoteShoot((msg) => {
  // Show remote player's shooting effects
  const muzzle = new THREE.Vector3(
    msg.x + Math.sin(msg.angle) * 0.6,
    0.5,
    msg.z + Math.cos(msg.angle) * 0.6
  );
  bullets.spawnMuzzleFlash(muzzle);
  sound.playShot(msg.weaponId);
});

network.onPlayerLeft((playerId) => {
  const rp = remotePlayers.get(playerId);
  if (rp) {
    rp.destroy();
    remotePlayers.delete(playerId);
  }
});

network.onDisconnect(() => {
  // Clean up all remote players on disconnect
  for (const rp of remotePlayers.values()) rp.destroy();
  remotePlayers.clear();
  _isMultiplayer = false;
});

function _cleanupRemotePlayers() {
  for (const rp of remotePlayers.values()) rp.destroy();
  remotePlayers.clear();
}

// Right-click: use healing item from inventory
invUI.onUse((instanceId) => {
  const item = inventory.items.get(instanceId);
  if (!item || !item.def.heals) return;
  if (_healTimer > 0) return; // already healing
  if (health.effectiveHpFraction >= 0.99 && !health.isBleeding) {
    hud.pushKillFeed('当前血量充足');
    return;
  }

  const def = item.def;
  _healDuration   = Math.max(0.1, def.id === 'medkit' ? 3.0 : def.id === 'painkillers' ? 2.5 : 1.8);
  _healTimer      = _healDuration;
  _healAmount     = def.heals;
  _healInstanceId    = instanceId;
  _healStopsBleeding = def.stopsBleeding !== false;
  player.isHealing = true;
  hud.pushKillFeed(`使用 ${def.name}…`);
  invUI.close();
  if (_crosshairEl) _crosshairEl.style.display = 'block';
  fogOfWar.show();
});

// Shift+click or right-click non-healing: drop item
invUI.onDrop((instanceId) => {
  const def = inventory.dropItem(instanceId);
  if (def) {
    hud.pushKillFeed(`丢弃: ${def.name}`);
    invUI.refresh();
  }
});
const stash     = new StashScreen(document.getElementById('stash-screen'));
const minimap   = new MinimapUI(document.getElementById('minimap-canvas'));

// ── Mouse aim ─────────────────────────────────────────────────────────────────

const _groundPlane  = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const _aimRay       = new THREE.Raycaster();
const _mouseNDC     = new THREE.Vector2();
let   _aimWorldPos  = new THREE.Vector3(0, 0, -5);
let   _aimMoved     = false;

// Scratch vectors for hot paths (avoid per-frame allocations)
const _scratchMuzzle    = new THREE.Vector3();
const _scratchDir       = new THREE.Vector3();
const _scratchMissRay   = new THREE.Raycaster();
const _scratchCamTarget = new THREE.Vector3();
const _scratchFogProj   = new THREE.Vector3();

// Cached DOM refs
const _crosshairEl = document.getElementById('crosshair');
const _bossWrap    = document.getElementById('boss-health-wrap');
const _bossBar     = document.getElementById('boss-health-inner');
const _bossNameEl  = document.getElementById('boss-name');

// Weapon constants (hoisted from handlePlayerShoot)
const RECOIL_STR = { rifle: 0.22, pistol: 0.12, shotgun: 0.45, vss: 0.40, mp5: 0.10 };
const SHAKE_STR  = { rifle: 0.25, pistol: 0.12, shotgun: 0.55, vss: 0.30, mp5: 0.15 };

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
  if (e.button === 2) input.keys['Mouse2'] = true;
});
renderer.domElement.addEventListener('mouseup', (e) => {
  if (e.button === 0) input.keys['Mouse0'] = false;
  if (e.button === 2) input.keys['Mouse2'] = false;
});
renderer.domElement.addEventListener('contextmenu', (e) => e.preventDefault());

// ── Shooting ──────────────────────────────────────────────────────────────────

// ── Healing channel state ─────────────────────────────────────────────────────

let _healTimer      = 0;    // remaining seconds
let _healDuration   = 0;    // total duration for current item
let _healAmount     = 0;    // HP to restore on completion
let _healInstanceId  = null; // which inventory item is being consumed
let _healStopsBleeding = true; // whether current heal item stops bleeding

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
let _lastWaveCount  = 0; // track wave spawns for notification
let _errorCount     = 0; // game loop error counter
let _isMultiplayer  = false;
let _currentLevelId = 0;
let _isPaused       = false;
window._screenShakeEnabled = true;

function _addScreenShake(intensity) {
  if (window._screenShakeEnabled === false) return;
  _shakeDecay = Math.min(_shakeDecay + intensity, 1.5);
}

// ── Pause ────────────────────────────────────────────────────────────────────

function _togglePause() {
  if (!hud._hud || hud._hud.style.display === 'none') return; // not in game
  _isPaused = !_isPaused;
  const el = document.getElementById('pause-screen');
  if (el) el.style.display = _isPaused ? 'flex' : 'none';
  // Close settings when unpausing
  if (!_isPaused) {
    const settingsEl = document.getElementById('settings-screen');
    if (settingsEl) settingsEl.style.display = 'none';
  }
}

document.getElementById('pause-resume')?.addEventListener('click', () => _togglePause());
document.getElementById('pause-settings')?.addEventListener('click', () => {
  const el = document.getElementById('settings-screen');
  if (el) el.style.display = 'flex';
});
document.getElementById('pause-rules')?.addEventListener('click', () => {
  const el = document.getElementById('rules-screen');
  if (el) el.style.display = 'flex';
});
document.getElementById('pause-quit')?.addEventListener('click', () => {
  _isPaused = false;
  const pauseEl = document.getElementById('pause-screen');
  if (pauseEl) pauseEl.style.display = 'none';
  const settingsEl = document.getElementById('settings-screen');
  if (settingsEl) settingsEl.style.display = 'none';
  _showEndScreen(false);
});

// ── Settings ─────────────────────────────────────────────────────────────────

document.getElementById('settings-close')?.addEventListener('click', () => {
  const el = document.getElementById('settings-screen');
  if (el) el.style.display = 'none';
});

document.getElementById('setting-volume')?.addEventListener('input', (e) => {
  const v = e.target.value;
  document.getElementById('setting-volume-val').textContent = v + '%';
  sound.setVolume(v / 100);
});

document.getElementById('setting-sensitivity')?.addEventListener('input', (e) => {
  const v = e.target.value;
  document.getElementById('setting-sensitivity-val').textContent = v + '%';
});

document.getElementById('setting-fog')?.addEventListener('change', (e) => {
  fogOfWar.enabled = e.target.checked;
  e.target.nextElementSibling.textContent = e.target.checked ? '开启' : '关闭';
});

document.getElementById('setting-shake')?.addEventListener('change', (e) => {
  window._screenShakeEnabled = e.target.checked;
  e.target.nextElementSibling.textContent = e.target.checked ? '开启' : '关闭';
});

// ── Damage direction indicator ───────────────────────────────────────────────

function _showDamageDirection(fromX, fromZ) {
  const container = document.getElementById('damage-direction');
  if (!container) return;
  // Cap at 5 simultaneous indicators
  while (container.children.length >= 5) container.firstChild.remove();

  const dx = fromX - player.position.x;
  const dz = fromZ - player.position.z;
  const angle = Math.atan2(dx, dz);

  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const edgeDist = Math.min(cx, cy) * 0.85;

  const screenX = cx + Math.sin(angle) * edgeDist - 30;
  const screenY = cy - Math.cos(angle) * edgeDist - 30;

  const el = document.createElement('div');
  el.className = 'dmg-indicator';
  el.style.left = screenX + 'px';
  el.style.top = screenY + 'px';
  container.appendChild(el);
  setTimeout(() => el.remove(), 800);
}

function _gainXP(amount, reason) {
  _xp += amount;
  const xpEl = document.getElementById('xp-value');
  if (xpEl) xpEl.textContent = _xp;

  // Cap XP popups
  const existing = document.querySelectorAll('.xp-popup');
  if (existing.length >= 5) existing[0].remove();

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
  _recoilOffset += RECOIL_STR[weapons.current.def.id] ?? 0.15;
  _addScreenShake(SHAKE_STR[weapons.current.def.id] ?? 0.2);

  // Gunshot sound + crosshair bloom + network
  sound.playShot(weapons.current.def.id);
  if (_isMultiplayer && network.connected) {
    network.sendPlayerShoot(player.position.x, player.position.z, player.mesh.rotation.y, weapons.current.def.id);
  }
  if (_crosshairEl) {
    _crosshairEl.classList.add('shoot');
    setTimeout(() => _crosshairEl.classList.remove('shoot'), 80);
  }

  const def      = weapons.current.def;
  const angle    = player.mesh.rotation.y;
  _scratchMuzzle.set(
    player.position.x + Math.sin(angle) * 0.6,
    0.5,
    player.position.z + Math.cos(angle) * 0.6
  );
  const muzzlePos = _scratchMuzzle;

  bullets.spawnMuzzleFlash(muzzlePos);

  // Apply spread penalty from arm injuries
  // ADS reduces spread by 70%
  const adsMult    = player.isAiming ? 0.3 : 1.0;
  const spreadMult = health.spreadMultiplier * adsMult * talentSystem.getStats().spreadMult;

  for (let p = 0; p < def.pellets; p++) {
    const spread = def.spread * spreadMult;
    _scratchDir.set(
      Math.sin(angle) + (Math.random() - 0.5) * spread,
      0,
      Math.cos(angle) + (Math.random() - 0.5) * spread
    ).normalize();

    // Spawn physical projectile instead of hitscan
    bullets.spawnProjectile(muzzlePos, _scratchDir, def, 'player', def.tracerColor);
  }
}

const BLUEPRINTS = ['bp_medkit', 'bp_vest', 'bp_painkillers', 'bp_helmet'];

function _randomEnemyDrop(enemyType = 'normal') {
  const drops = [];
  const r = Math.random();

  if (enemyType === 'rusher') {
    // Rusher: bandage + pistol ammo + small cash
    drops.push({ defId: 'bandage',     count: 1 });
    drops.push({ defId: 'pistol_ammo', count: Math.ceil(Math.random() * 10 + 5) });
    drops.push({ defId: 'cash',        count: Math.ceil(Math.random() * 150 + 50) });

  } else if (enemyType === 'tank') {
    // Tank: vest_heavy(25%) or medkit + rifle ammo(20-30) + medium cash(400-800)
    if (r < 0.25) drops.push({ defId: 'vest_heavy', count: 1 });
    else          drops.push({ defId: 'medkit',      count: 1 });
    drops.push({ defId: 'rifle_ammo', count: Math.ceil(Math.random() * 10 + 20) });
    drops.push({ defId: 'cash',       count: Math.ceil(Math.random() * 400 + 400) });

  } else if (enemyType === 'boss') {
    // Boss: vest_heavy(50%) or helmet + rifle ammo(25-40) + high cash(800-1500) + guaranteed blueprint
    if (r < 0.50) drops.push({ defId: 'vest_heavy', count: 1 });
    else          drops.push({ defId: 'helmet',      count: 1 });
    drops.push({ defId: 'rifle_ammo', count: Math.ceil(Math.random() * 15 + 25) });
    drops.push({ defId: 'cash',       count: Math.ceil(Math.random() * 700 + 800) });
    // Guaranteed blueprint
    const bp = BLUEPRINTS[Math.floor(Math.random() * BLUEPRINTS.length)];
    drops.push({ defId: bp, count: 1 });

  } else if (enemyType === 'elite') {
    // Elite drops: guaranteed medkit or armor + high cash + chance of blueprint
    if      (r < 0.25) drops.push({ defId: 'medkit',      count: 1 });
    else if (r < 0.45) drops.push({ defId: 'vest_light',  count: 1 });
    else if (r < 0.60) drops.push({ defId: 'painkillers', count: 1 });
    else               drops.push({ defId: 'dogtag',       count: 1 });
    drops.push({ defId: 'rifle_ammo', count: Math.ceil(Math.random() * 20 + 15) });
    drops.push({ defId: 'cash', count: Math.ceil(Math.random() * 600 + 300) });
    // 25% chance to drop a blueprint
    if (Math.random() < 0.25) {
      const bp = BLUEPRINTS[Math.floor(Math.random() * BLUEPRINTS.length)];
      drops.push({ defId: bp, count: 1 });
    }
  } else {
    // Normal enemy drops
    if      (r < 0.15) drops.push({ defId: 'medkit',     count: 1 });
    else if (r < 0.30) drops.push({ defId: 'bandage',    count: 1 });
    else if (r < 0.60) drops.push({ defId: 'rifle_ammo', count: Math.ceil(Math.random() * 20 + 5) });
    drops.push({ defId: 'cash', count: Math.ceil(Math.random() * 300 + 50) });
  }
  return drops;
}

// ── Enemy shots ───────────────────────────────────────────────────────────────

const _enemyShotRay = new THREE.Raycaster();

// Enemy shot definition for projectile system
const ENEMY_BULLET_DEF = {
  damage: 10,
  bulletSpeed: 55,
  range: 30,
  falloffStart: 0.5,
};

function handleEnemyShots(shots) {
  for (const shot of shots) {
    if (shot.isMelee) {
      // Melee: instant damage, no projectile
      const partHit = health.takeDamage(shot.damage);
      player.health = health.isAlive ? Math.round(health.effectiveHpFraction * player.maxHealth) : 0;
      player.speedMultiplier = health.speedMultiplier;
      hud.showDamageFlash();
      sound.playDamaged();
      _addScreenShake(0.8);
      _showDamageDirection(shot.origin.x, shot.origin.z);
      hud.pushKillFeed(`被近战攻击！(${_partLabel(partHit)}) -${shot.damage}HP`);
      bodyLootUI.notifyPlayerHit();
      if (!health.isAlive) _onPlayerDied();
    } else {
      // Ranged: spawn enemy projectile
      const enemyDef = { ...ENEMY_BULLET_DEF, damage: shot.damage };
      bullets.spawnProjectile(shot.origin, shot.dir, enemyDef, 'enemy', 0xff4444);
      bullets.spawnMuzzleFlash(shot.origin);
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
  if (name) tutorial.notifyNearLoot();

  // Body loot takes priority over loose items / containers when player is in range.
  // Opening the dual-panel UI suppresses the E-press for the rest of this frame
  // so loot.update() doesn't also pick up a co-located loose item.
  const ePressed = input.justPressed('KeyE');
  if (ePressed && !bodyLootUI.isOpen) {
    const body = loot.getNearbyBody(player.position);
    if (body) {
      bodyLootUI.open(body);
      return;
    }
  }

  const pickup = loot.update(player.position, ePressed);
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
      // If it's ammo for current weapon, refill reserve first
      const AMMO_TO_WEAPON = { rifle_ammo: 'rifle', pistol_ammo: 'pistol', shotgun_ammo: 'shotgun', vss_ammo: 'vss', mp5_ammo: 'mp5' };
      const weaponId = AMMO_TO_WEAPON[pickup.defId];
      let pickupCount = pickup.count;
      if (weaponId) {
        for (const slot of weapons.slots) {
          if (slot.def.id === weaponId && slot.reserve < slot.def.reserveMax) {
            const fill = Math.min(pickupCount, slot.def.reserveMax - slot.reserve);
            slot.reserve += fill;
            pickupCount -= fill;
          }
        }
      }
      // Remaining goes to inventory
      const added = pickupCount <= 0 || inventory.addItem(pickup.defId, pickupCount);
      if (!added) {
        hud.pushKillFeed('⚠ 背包已满！');
      } else {
        _lootedThisSession = true;
        const def = ITEM_DEFS[pickup.defId];
        if (def) _lootValue += def.value * pickup.count;
        // Auto-equip armor items
        if (def?.armor) {
          health.equipArmor(def.armor, talentSystem.getStats().armorBonus);
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
  // H during active heal = cancel
  if (_healTimer > 0 && input.justPressed('KeyH')) {
    _healTimer = 0;
    player.isHealing = false;
    hud.setHealChannel(-1);
    hud.pushKillFeed('治疗中断');
    return;
  }

  // Block H press during active channel
  if (_healTimer > 0) {
    return;
  }

  if (input.justPressed('KeyH')) {
    // Don't heal at full HP if not bleeding
    if (health.effectiveHpFraction >= 0.99 && !health.isBleeding) {
      hud.pushKillFeed('当前血量充足');
      return;
    }
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
    _healAmount         = def.heals;
    _healInstanceId     = instanceId;
    _healStopsBleeding  = def.stopsBleeding !== false;
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
  _isPaused = false;
  const _pauseEl = document.getElementById('pause-screen');
  if (_pauseEl) _pauseEl.style.display = 'none';
  const _settingsEl = document.getElementById('settings-screen');
  if (_settingsEl) _settingsEl.style.display = 'none';

  tutorial.complete();
  loop.stop();
  hud.hide();

  // Save progress
  saveSystem.addKills(_killCount);
  saveSystem.addXP(_xp);
  saveSystem.updateBestLoot(_lootValue);

  if (survived) {
    saveSystem.addExtract();
    saveSystem.addCurrency(_lootValue);
    // Deposit inventory items to stash + register blueprints
    const items = [];
    for (const item of inventory.items.values()) {
      if (item.def.isBlueprint) {
        if (saveSystem.addBlueprint(item.def.id)) {
          hud.pushKillFeed(`蓝图已注册: ${item.def.name}`);
        }
      } else {
        items.push({ defId: item.def.id, count: item.count });
      }
    }
    saveSystem.depositInventory(items);
    saveSystem.clearDeathRecovery();
  } else {
    saveSystem.addDeath();
    // Save death position for recovery
    const items = [];
    for (const item of inventory.items.values()) {
      items.push({ defId: item.def.id, count: item.count });
    }
    if (items.length > 0) {
      saveSystem.setDeathRecovery(_currentLevelId, player.position.x, player.position.z, items);
    }
  }

  const ss         = document.getElementById('start-screen');
  const statsEl    = document.getElementById('raid-stats');
  const controlsEl = document.getElementById('start-controls');
  const survivedSec = _survivedSeconds();

  ss.querySelector('h1').textContent = survived ? '✓ 撤离成功' : '✕ 阵亡';
  ss.querySelector('p').textContent  = survived
    ? `战利品已存入仓库！获得 ${_lootValue} 鸭元`
    : '你的战利品已遗失在战场上（下次可拾回）';
  document.getElementById('start-btn').textContent = '返回基地';

  const rating = _getRaidRating(survived, _killCount, _lootValue, survivedSec);
  statsEl.innerHTML = `
    存活时间 &nbsp;<span>${_formatTime(survivedSec)}</span>&nbsp;&nbsp;
    击杀数 &nbsp;<span>${_killCount}</span>&nbsp;&nbsp;
    战利品价值 &nbsp;<span>${_lootValue} 鸭元</span>&nbsp;&nbsp;
    经验值 &nbsp;<span>${_xp} XP</span><br>
    <span style="font-size:1.2rem;margin-top:.5rem;display:inline-block">${rating}</span>
  `;
  statsEl.style.display   = 'block';
  controlsEl.style.display = 'none';

  ss.style.display = 'flex';
}

function _getRaidRating(survived, kills, loot, seconds) {
  if (!survived) return '评级: F — 阵亡';
  let score = 0;
  score += Math.min(kills * 10, 60);        // max 60 from kills
  score += Math.min(loot / 50, 30);         // max 30 from loot value
  score += Math.min(seconds / 60, 10);      // max 10 from survival time
  if (score >= 80) return '评级: S — 完美突袭！';
  if (score >= 60) return '评级: A — 出色表现';
  if (score >= 40) return '评级: B — 稳扎稳打';
  if (score >= 20) return '评级: C — 勉强过关';
  return '评级: D — 需要加强';
}

function _onExtracted() {
  markPlayed();
  _gainXP(XP_REWARDS.extract, '撤离');
  _showEndScreen(true);
}

function _onPlayerDied() {
  markPlayed();
  _showEndScreen(false);
}

// ── Stash screen flow ─────────────────────────────────────────────────────────

let _difficulty = 1; // 0=easy, 1=normal, 2=hard

stash.onSelect((loadout) => {
  // Clean up previous raid state
  _cleanupRemotePlayers();
  _difficulty = loadout.difficulty ?? 1;

  // Apply difficulty scaling to all enemies (from base stats, not current)
  const hpMult  = [0.5, 1.0, 1.5][_difficulty];
  const dmgMult = [0.5, 1.0, 1.5][_difficulty];
  aiSystem._difficultyHpMult  = hpMult;  // for wave spawns
  aiSystem._difficultyDmgMult = dmgMult;
  for (const enemy of aiSystem.enemies) {
    const baseDef = ENEMY_TYPES[enemy.enemyType] || ENEMY_TYPES.normal;
    enemy.maxHealth    = Math.round(baseDef.hp * hpMult);
    enemy.health       = enemy.maxHealth;
    enemy._shootDamage = Math.round(baseDef.damage * dmgMult);
  }

  // Init audio on first user interaction
  sound.init();
  sound.resume();

  // First-run demo seed: judges see identical opening state.
  const firstRun = isFirstRun();

  // Apply weapon loadout (first run: force DEMO_SEED slot)
  weapons.applyLoadout(firstRun ? DEMO_SEED.startingWeaponSlot : loadout.weaponSlot);

  // Apply inventory loadout (clear starting gear, apply preset)
  inventory.reset();
  if (firstRun) {
    // Deterministic first-run loadout: starting armor only. Ammo override below.
    inventory.addItem(DEMO_SEED.startingArmor, 1);
    const armorDef = ITEM_DEFS[DEMO_SEED.startingArmor];
    if (armorDef?.armor) health.equipArmor(armorDef.armor, talentSystem.getStats().armorBonus);
    // Override reserve ammo on the active weapon to the seeded amount.
    const activeWeapon = weapons.slots[weapons.activeSlot];
    activeWeapon.reserve = Math.min(activeWeapon.def.reserveMax, DEMO_SEED.startingAmmo);
  } else {
    for (const item of loadout.items) {
      inventory.addItem(item.defId, item.count);
      // Auto-equip armor from starting loadout
      const def = ITEM_DEFS[item.defId];
      if (def?.armor) health.equipArmor(def.armor, talentSystem.getStats().armorBonus);
    }
  }

  // Spawn point — first run forces DEMO_SEED.spawnPointIndex; otherwise random.
  const spawnPoints = level.playerSpawnPoints;
  const spIdx = firstRun
    ? Math.min(DEMO_SEED.spawnPointIndex, spawnPoints.length - 1)
    : Math.floor(Math.random() * spawnPoints.length);
  const spawn = spawnPoints[spIdx];
  player.position.copy(spawn);
  player.position.y = 0;

  // Apply talent bonuses
  const talentStats = talentSystem.getStats();
  player.maxHealth  = 100 + talentStats.hpBonus;
  player.maxStamina = 100 + talentStats.staminaBonus;

  // Reset health & stamina (pass talent HP bonus to increase body part HP)
  health.reset(talentStats.hpBonus);
  player.health          = player.maxHealth;
  player.stamina         = player.maxStamina;
  player.speedMultiplier = talentStats.speedMult;

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
  _lastWaveCount     = 0;
  _healTimer         = 0;
  _healInstanceId    = null;
  _extractTimer      = 0;
  const xpEl = document.getElementById('xp-value');
  if (xpEl) xpEl.textContent = '0';
  hud.setKillCount(0);

  // Restore controls hint for next end screen
  const controlsEl = document.getElementById('start-controls');
  if (controlsEl) controlsEl.style.display = 'block';
  const statsEl = document.getElementById('raid-stats');
  if (statsEl)   statsEl.style.display    = 'none';

  // Snap camera to spawn
  camera.position.copy(spawn).add(CAM_OFFSET);
  camera.lookAt(spawn);

  // Reset raid timer
  hud.resetRaid(8 * 60);  // Jam: 8-min raid (was 45 min)
  hud.onTimerExpire(() => {
    hud.pushKillFeed('⚠ 时间耗尽！突袭失败');
    _onPlayerDied();
  });

  // Reset pause state
  _isPaused = false;
  const pauseEl = document.getElementById('pause-screen');
  if (pauseEl) pauseEl.style.display = 'none';
  const settingsEl = document.getElementById('settings-screen');
  if (settingsEl) settingsEl.style.display = 'none';

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
  try {
    lobbyScreen.show(network);
  } catch (e) {
    console.error('Lobby error:', e);
    // Fallback: skip lobby, go to base as solo
    _isMultiplayer = false;
    baseScreen.show();
  }
});

lobbyScreen.onStartSolo(() => {
  _isMultiplayer = false;
  baseScreen.show();
});

lobbyScreen.onStartMulti(() => {
  _isMultiplayer = true;
  baseScreen.show();
});

// Base screen → stash screen → raid
baseScreen.onStartRaid((levelId) => {
  _currentLevelId = levelId;
  stash.show();
});

// ── Game loop ─────────────────────────────────────────────────────────────────

const loop = new GameLoop(
  // update
  (dt) => {
    if (!gameStarted) return;
    if (_isPaused) return;
    try {

    // Hitstop — brief freeze on kills
    if (_hitstopTimer > 0) {
      _hitstopTimer -= dt;
      input.endFrame(); // consume input to prevent stuck justPressed
      return;
    }

    // Inventory toggle (Tab)
    if (input.justPressed('Tab')) {
      invUI.toggle();
      if (_crosshairEl) _crosshairEl.style.display = invUI.isOpen ? 'none' : 'block';
      if (invUI.isOpen) fogOfWar.hide(); else fogOfWar.show();
    }

    // Pause movement when inventory is open
    if (!invUI.isOpen) {
      player.update(dt, input, _aimWorldPos, level.collidables);
      // Footstep sound while moving
      const moving = input.isDown('KeyW') || input.isDown('KeyS')
                  || input.isDown('KeyA') || input.isDown('KeyD');
      if (moving) {
        sound.playFootstep(player._isSprinting);
        tutorial.notifyMove();
      }
    }

    // Weapons
    const wasReloading = weapons.current.isReloading;
    weapons.update(dt, input);
    // Play reload sound on reload start
    if (!wasReloading && weapons.current.isReloading) sound.playReload();

    // Auto-refill weapon reserve from inventory ammo
    const AMMO_MAP = { rifle: 'rifle_ammo', pistol: 'pistol_ammo', shotgun: 'shotgun_ammo', vss: 'vss_ammo', mp5: 'mp5_ammo' };
    const cur = weapons.current;
    if (cur.reserve <= 0) {
      const ammoId = AMMO_MAP[cur.def.id];
      if (ammoId) {
        // Find ammo in inventory and consume it
        for (const [instId, item] of inventory.items) {
          if (item.def.id === ammoId) {
            const take = Math.min(item.count, cur.def.reserveMax);
            cur.reserve += take;
            if (item.def.stackable) {
              item.count -= take;
              if (item.count <= 0) inventory.removeItem(instId);
            } else {
              inventory.removeItem(instId);
            }
            hud.pushKillFeed(`从背包补充 ${take} 发弹药`);
            if (invUI.isOpen) invUI.refresh();
            break;
          }
        }
      }
    }

    // Shooting
    handlePlayerShoot();

    // Bullets — visual effects
    bullets.update(dt);

    // Projectiles — physical bullet movement + collision
    const projResult = bullets.updateProjectiles(dt, aiSystem, level.collidables, player);
    for (const hit of projResult.hits) {
      if (hit.target === 'enemy' && hit.enemy) {
        hit.enemy.takeDamage(hit.damage);
        bullets.spawnHitEffect(hit.pos);
        sound.playHitMarker();
        if (_crosshairEl) {
          _crosshairEl.classList.remove('shoot');
          _crosshairEl.classList.add('hit');
          setTimeout(() => _crosshairEl.classList.remove('hit'), 120);
        }
        if (!hit.enemy.isAlive) {
          _killCount++;
          const LABELS = { normal: '鸭卒', elite: '★精英鸭卒', rusher: '暴走鸭', tank: '重甲鸭', boss: 'BOSS 鸭王' };
          const label = LABELS[hit.enemy.enemyType] ?? '鸭卒';
          const XP_BY_TYPE = { normal: 50, elite: 200, rusher: 75, tank: 150, boss: 500 };
          const xpGain = XP_BY_TYPE[hit.enemy.enemyType] ?? XP_REWARDS.kill;
          hud.pushKillFeed(`击毙${label} [${_killCount}]`);
          hud.setKillCount(_killCount);
          _gainXP(xpGain, label);
          bullets.spawnKillEffect(hit.enemy.position);
          sound.playKillConfirm();
          _addScreenShake(hit.enemy.isElite ? 0.5 : 0.3);
          _hitstopTimer = hit.enemy.isElite ? 0.08 : 0.05;
          // Tarkov-style body loot: enemy carries inventory until searched.
          // Containers (crates) still use dropLoot; only enemy deaths go through registerBody.
          loot.registerBody(hit.enemy, _randomEnemyDrop(hit.enemy.enemyType));
        }
      } else if (hit.target === 'player') {
        const partHit = health.takeDamage(hit.damage);
        player.health = health.isAlive ? Math.round(health.effectiveHpFraction * player.maxHealth) : 0;
        player.speedMultiplier = health.speedMultiplier;
        hud.showDamageFlash();
        sound.playDamaged();
        _addScreenShake(0.4);
        _showDamageDirection(hit.pos.x, hit.pos.z);
        hud.pushKillFeed(`中弹！(${_partLabel(partHit)}) -${hit.damage}HP`);
        if (health.armorJustBroke) hud.pushKillFeed('⚠ 护甲已损毁！');
        bodyLootUI.notifyPlayerHit();
        if (!health.isAlive) _onPlayerDied();
      }
    }

    // AI
    _firedRecentlyTimer = Math.max(0, _firedRecentlyTimer - dt);
    _playerFiredRecently = _firedRecentlyTimer > 0;
    const aiResult = aiSystem.update(dt, player.position, level.collidables, _playerFiredRecently);
    handleEnemyShots(aiResult.shots);
    if (aiResult.eliteAlerted) {
      sound.playEliteAlert();
      hud.pushKillFeed('⚠ 精英鸭卒发现你！');
    }

    // Boss health bar
    if (_bossWrap && _bossBar) {
      const boss = aiSystem.enemies.find(e => e.enemyType === 'boss' && e.isAlive);
      if (boss) {
        _bossWrap.style.display = 'block';
        _bossBar.style.width = `${(boss.health / boss.maxHealth) * 100}%`;
        const typeDef = ENEMY_TYPES[boss.enemyType];
        if (_bossNameEl) _bossNameEl.textContent = (typeDef && typeDef.label) || 'BOSS 鸭王';
      } else {
        _bossWrap.style.display = 'none';
      }
    }

    // Wave spawn notification
    if (aiSystem.waveCount > _lastWaveCount) {
      _lastWaveCount = aiSystem.waveCount;
      hud.pushKillFeed(`⚠ 新一波鸭卒增援到达！`);
      sound.playEliteAlert();
    }

    // Auto-close body loot UI if player walks too far from the body
    if (bodyLootUI.isOpen) {
      const body = bodyLootUI._body;
      if (!body || player.position.distanceTo(body.pos) > 3.0) bodyLootUI.close();
    }

    // Loot
    handleLootPickup(dt);

    // Healing channel tick (uses real dt)
    if (_healTimer > 0) {
      _healTimer = Math.max(0, _healTimer - dt);
      hud.setHealChannel(Math.max(0, Math.min(1, 1 - _healTimer / _healDuration)));
      if (input.isDown('Mouse0')) {
        // Cancel on shoot only (not movement — player is usually moving during combat)
        _healTimer = 0;
        player.isHealing = false;
        hud.setHealChannel(-1);
        hud.pushKillFeed('治疗中断');
      } else if (_healTimer <= 0) {
        // Complete — consume the item; skip heal if item was already used
        const consumed = inventory.useHealing(_healInstanceId);
        if (consumed) {
          health.heal(_healAmount);
          const wasBleeding = health.isBleeding;
          if (_healStopsBleeding) health.stopBleeding();
          player.health          = health.isAlive ? Math.round(health.effectiveHpFraction * player.maxHealth) : 0;
          player.speedMultiplier = health.speedMultiplier;
          if (invUI.isOpen) invUI.refresh();
          const bleedMsg = wasBleeding && _healStopsBleeding ? ' (已止血)' : wasBleeding ? ' (仍在流血!)' : '';
          hud.pushKillFeed(`治疗完成 +${_healAmount}HP${bleedMsg}`);
        } else {
          hud.pushKillFeed('治疗失败：物品已消耗');
        }
        player.isHealing       = false;
        hud.setHealChannel(-1);
      }
    }

    // Safety: ensure isHealing is reset if timer expired
    if (player.isHealing && _healTimer <= 0) {
      player.isHealing = false;
      hud.setHealChannel(-1);
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
    player.speedMultiplier = health.speedMultiplier * weightMult * talentSystem.getStats().speedMult;

    // Extraction
    handleExtraction(dt);

    // Ambient distant shots
    _ambientTimer -= dt;
    if (_ambientTimer <= 0) {
      sound.playDistantShot();
      _ambientTimer = 20 + Math.random() * 25;
    }

    // Tutorial (first-run onboarding bubbles; no-op after first run)
    tutorial.update(dt);
    _aimMoved = false;  // consume flag each frame

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

    // Network sync
    if (_isMultiplayer && network.connected) {
      network.sendPlayerState(
        player.position.x, player.position.z,
        player.mesh.rotation.y, player.health,
        weapons.current.def.id
      );
      // Update remote players
      for (const rp of remotePlayers.values()) {
        rp.update(dt);
      }
    }

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
    _scratchCamTarget.copy(player.position).add(CAM_OFFSET);
    _scratchCamTarget.x += _shakeX;
    _scratchCamTarget.y += _recoilOffset;
    _scratchCamTarget.z += _shakeZ;
    camera.position.lerp(_scratchCamTarget, 0.12);
    camera.lookAt(player.position);

    // Fog of war — project player world position to screen
    _scratchFogProj.copy(player.position).project(camera);
    fogOfWar.update((_scratchFogProj.x + 1) / 2, (-_scratchFogProj.y + 1) / 2);

    // Hide enemies outside player's vision cone (must match fog-of-war direction)
    if (fogOfWar.enabled) {
      const visionRange = 18;
      const halfFov = fogOfWar._fovAngle / 2;
      // Derive facing angle from player→mouse in world space (same source as fog overlay)
      const facingDx = _aimWorldPos.x - player.position.x;
      const facingDz = _aimWorldPos.z - player.position.z;
      // Skip if aim not yet initialized (first frame before mouse move)
      if (facingDx === 0 && facingDz === 0) {
        for (const enemy of aiSystem.enemies) enemy.mesh.visible = true;
      } else {
      const pAngle = Math.atan2(facingDx, facingDz);
      for (const enemy of aiSystem.enemies) {
        if (enemy.state === 4) continue; // DEAD — keep as-is
        const dx = enemy.position.x - player.position.x;
        const dz = enemy.position.z - player.position.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        // Always visible if very close
        if (dist < 3) { enemy.mesh.visible = true; continue; }
        // Outside vision range
        if (dist > visionRange) { enemy.mesh.visible = false; continue; }
        // Check angle
        const angleToEnemy = Math.atan2(dx, dz);
        let diff = angleToEnemy - pAngle;
        // Normalize to [-PI, PI]
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        enemy.mesh.visible = Math.abs(diff) < halfFov;
      }
      } // end else (aim initialized)
    } else {
      for (const enemy of aiSystem.enemies) enemy.mesh.visible = true;
    }

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
    hud.setWeight(inventory.totalWeight, 50);
    hud.setReloadProgress(weapons.current.isReloading ? weapons.current.reloadProgress : -1);
    hud.setFractureState(health.legFractured, health.armFractured);
    if (_crosshairEl) _crosshairEl.classList.toggle('ads', player.isAiming && !invUI.isOpen);

    input.endFrame();

    } catch (err) {
      _errorCount = (_errorCount ?? 0) + 1;
      if (_errorCount <= 3) console.error('Game loop error:', err);
      if (_errorCount >= 10) {
        loop.stop();
        console.error('Too many errors, game loop stopped');
        _showEndScreen(false);
        return;
      }
      // Reset stuck states
      player.isHealing = false;
      _healTimer = 0;
      _hitstopTimer = 0;
      hud.setHealChannel(-1);
      input.endFrame();
    }
  },
  // render
  () => renderer.render(scene, camera)
);

// Post-processing
renderer.initPostProcessing(scene, camera);

// Initial camera snap
camera.position.copy(player.position).add(CAM_OFFSET);
camera.lookAt(player.position);
