/**
 * NetworkSystem
 * WebSocket client for multiplayer.
 * Handles room management, state sync, and remote player rendering.
 */

const SEND_INTERVAL_MS = 50; // 20 updates/sec
const AI_SEND_INTERVAL_MS = 100;

export class NetworkSystem {
  constructor() {
    /** @type {WebSocket|null} */
    this._ws = null;
    this._connected = false;
    this._playerId = null;
    this._roomCode = null;
    this._isHost = false;

    // Callbacks
    this._onRoomCreated  = null;
    this._onRoomJoined   = null;
    this._onPlayerJoined = null;
    this._onPlayerLeft   = null;
    this._onGameStart    = null;
    this._onRemoteState  = null;
    this._onRemoteShoot  = null;
    this._onRemoteHit    = null;
    this._onAIStateUpdate = null;
    this._onBodyStateUpdate = null;
    this._onError        = null;
    this._onDisconnect   = null;

    // Send throttle
    this._lastSendTime = 0;
    this._lastAiSendTime = 0;
    this._nextBodyActionId = 1;
    this._pendingBodyActions = new Map();
    this._onHostChanged = null;
  }

  // ── Public ─────────────────────────────────────────────────────────────────

  get connected()  { return this._connected; }
  get playerId()   { return this._playerId; }
  get roomCode()   { return this._roomCode; }
  get isHost()     { return this._isHost; }

  // Callback setters
  onRoomCreated(fn)  { this._onRoomCreated = fn; }
  onRoomJoined(fn)   { this._onRoomJoined = fn; }
  onPlayerJoined(fn) { this._onPlayerJoined = fn; }
  onPlayerLeft(fn)   { this._onPlayerLeft = fn; }
  onGameStart(fn)    { this._onGameStart = fn; }
  onRemoteState(fn)  { this._onRemoteState = fn; }
  onRemoteShoot(fn)  { this._onRemoteShoot = fn; }
  onRemoteHit(fn)    { this._onRemoteHit = fn; }
  onAIStateUpdate(fn) { this._onAIStateUpdate = fn; }
  onBodyStateUpdate(fn) { this._onBodyStateUpdate = fn; }
  onError(fn)        { this._onError = fn; }
  onDisconnect(fn)   { this._onDisconnect = fn; }
  onHostChanged(fn)  { this._onHostChanged = fn; }

  /**
   * Connect to the multiplayer server.
   * Closes any existing connection first.
   */
  connect(url) {
    // Guard: close existing socket
    if (this._ws) {
      this._ws.onmessage = null;
      this._ws.onclose = null;
      this._ws.onerror = null;
      this._ws.close();
      this._ws = null;
    }

    return new Promise((resolve, reject) => {
      try {
        this._ws = new WebSocket(url);
      } catch (e) {
        reject(e);
        return;
      }

      this._ws.onopen = () => {
        this._connected = true;
        resolve();
      };

      this._ws.onerror = () => {
        this._connected = false;
        reject(new Error('WebSocket connection failed'));
      };

      this._ws.onclose = () => {
        this._connected = false;
        this._playerId = null;
        this._roomCode = null;
        this._isHost = false;
        this._rejectPendingBodyActions();
        if (this._onDisconnect) this._onDisconnect();
      };

      this._ws.onmessage = (event) => {
        let msg;
        try { msg = JSON.parse(event.data); } catch { return; } // discard bad frames
        if (!msg || typeof msg.type !== 'string') return;        // structural guard
        this._handleMessage(msg);
      };
    });
  }

  disconnect() {
    if (this._ws) {
      this._ws.onmessage = null;
      this._ws.onclose = null;
      this._ws.onerror = null;
      this._ws.close();
      this._ws = null;
    }
    this._connected = false;
    this._playerId = null;
    this._roomCode = null;
    this._isHost = false;
    this._lastSendTime = 0;
    this._lastAiSendTime = 0;
    this._rejectPendingBodyActions();
    if (this._onDisconnect) this._onDisconnect();
  }

  createRoom() {
    this._send({ type: 'create_room' });
  }

  joinRoom(code) {
    this._send({ type: 'join_room', code: String(code).slice(0, 4) });
  }

  startGame() {
    this._send({ type: 'start_game' });
  }

  sendPlayerState(x, z, angle, health, weaponId) {
    const now = performance.now();
    if (now - this._lastSendTime < SEND_INTERVAL_MS) return;
    this._lastSendTime = now;
    this._send({ type: 'player_state', x: +x || 0, z: +z || 0, angle: +angle || 0, health: +health || 0, weaponId });
  }

  sendPlayerShoot(x, z, angle, weaponId) {
    this._send({ type: 'player_shoot', x: +x || 0, z: +z || 0, angle: +angle || 0, weaponId });
  }

  sendPlayerHit(targetType, targetId, damage) {
    this._send({ type: 'player_hit', targetType, targetId, damage: +damage || 0 });
  }

  sendAIState(enemies, shots = [], eliteAlerted = false, waveCount = 0) {
    const now = performance.now();
    if (shots.length === 0 && !eliteAlerted && now - this._lastAiSendTime < AI_SEND_INTERVAL_MS) return;
    this._lastAiSendTime = now;

    const serializedShots = shots.map((shot) => ({
      origin: { x: +shot.origin?.x || 0, z: +shot.origin?.z || 0 },
      dir: { x: +shot.dir?.x || 0, z: +shot.dir?.z || 0 },
      damage: +shot.damage || 0,
      isMelee: !!shot.isMelee,
    }));

    this._send({
      type: 'ai_state',
      enemies,
      shots: serializedShots,
      eliteAlerted: !!eliteAlerted,
      waveCount: +waveCount || 0,
    });
  }

  sendBodyState(body) {
    if (!body?.id) return;
    this._send({ type: 'body_state', body });
  }

  sendBodyAction(bodyId, action, defId, count = 1) {
    if (!bodyId || !action || !this._ws || this._ws.readyState !== 1) {
      return Promise.resolve({ accepted: false, body: null, message: 'Not connected' });
    }
    const requestId = `ba${this._nextBodyActionId++}`;
    this._send({ type: 'body_action', requestId, bodyId, action, defId, count: +count || 1 });
    return new Promise((resolve, reject) => {
      this._pendingBodyActions.set(requestId, { resolve, reject });
    });
  }

  // ── Private ────────────────────────────────────────────────────────────────

  _send(msg) {
    if (this._ws && this._ws.readyState === 1) {
      this._ws.send(JSON.stringify(msg));
    }
  }

  _rejectPendingBodyActions() {
    for (const pending of this._pendingBodyActions.values()) {
      pending.reject?.(new Error('Body action cancelled'));
    }
    this._pendingBodyActions.clear();
  }

  _handleMessage(msg) {
    switch (msg.type) {
      case 'room_created':
        this._playerId = String(msg.playerId || '');
        this._roomCode = String(msg.code || '');
        this._isHost = !!msg.isHost;
        if (this._onRoomCreated) this._onRoomCreated(this._roomCode, this._playerId);
        break;

      case 'room_joined':
        this._playerId = String(msg.playerId || '');
        this._roomCode = String(msg.code || '');
        this._isHost = !!msg.isHost;
        if (this._onRoomJoined) this._onRoomJoined(this._roomCode, this._playerId, msg.players || []);
        break;

      case 'player_joined':
        if (this._onPlayerJoined) this._onPlayerJoined(String(msg.playerId || ''), msg.playerCount || 0);
        break;

      case 'player_left':
        if (this._onPlayerLeft) this._onPlayerLeft(String(msg.playerId || ''), msg.playerCount || 0);
        break;

      case 'game_start':
        if (this._onGameStart) this._onGameStart(msg.hostId);
        break;

      case 'host_changed':
        this._isHost = msg.hostId === this._playerId;
        if (this._onHostChanged) this._onHostChanged(String(msg.hostId || ''), this._isHost);
        break;

      case 'remote_player_state': {
        // Validate numeric fields
        const x = Number(msg.x); const z = Number(msg.z);
        if (!isFinite(x) || !isFinite(z)) break;
        if (this._onRemoteState) this._onRemoteState({ ...msg, x, z, angle: Number(msg.angle) || 0, health: Number(msg.health) || 0 });
        break;
      }

      case 'remote_player_shoot': {
        const x = Number(msg.x); const z = Number(msg.z);
        if (!isFinite(x) || !isFinite(z)) break;
        if (this._onRemoteShoot) this._onRemoteShoot({ ...msg, x, z, angle: Number(msg.angle) || 0 });
        break;
      }

      case 'remote_player_hit':
        if (this._onRemoteHit) {
          this._onRemoteHit({
            ...msg,
            damage: Number(msg.damage) || 0,
            targetId: String(msg.targetId || ''),
            targetType: String(msg.targetType || ''),
          });
        }
        break;

      case 'ai_state_update':
        if (this._onAIStateUpdate) {
          this._onAIStateUpdate({
            enemies: Array.isArray(msg.enemies) ? msg.enemies : [],
            shots: Array.isArray(msg.shots) ? msg.shots : [],
            eliteAlerted: !!msg.eliteAlerted,
            waveCount: Number(msg.waveCount) || 0,
          });
        }
        break;

      case 'body_state_update':
        if (this._onBodyStateUpdate && msg.body) this._onBodyStateUpdate(msg.body);
        break;

      case 'body_action_result': {
        const requestId = String(msg.requestId || '');
        const pending = this._pendingBodyActions.get(requestId);
        if (!pending) break;
        this._pendingBodyActions.delete(requestId);
        pending.resolve({
          accepted: !!msg.accepted,
          message: String(msg.message || ''),
          body: msg.body || null,
          action: String(msg.action || ''),
          defId: String(msg.defId || ''),
          count: Number(msg.count) || 0,
        });
        break;
      }

      case 'error':
        if (this._onError) this._onError(String(msg.message || 'Unknown error'));
        break;
    }
  }
}
