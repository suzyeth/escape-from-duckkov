/**
 * NetworkSystem
 * WebSocket client for multiplayer.
 * Handles room management, state sync, and remote player rendering.
 */

const SEND_INTERVAL_MS = 50; // 20 updates/sec

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
    this._onError        = null;
    this._onDisconnect   = null;

    // Send throttle
    this._lastSendTime = 0;
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
  onError(fn)        { this._onError = fn; }
  onDisconnect(fn)   { this._onDisconnect = fn; }

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
      this._ws.close();
      this._ws = null;
    }
    this._connected = false;
    this._playerId = null;
    this._roomCode = null;
    this._isHost = false;
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

  // ── Private ────────────────────────────────────────────────────────────────

  _send(msg) {
    if (this._ws && this._ws.readyState === 1) {
      this._ws.send(JSON.stringify(msg));
    }
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
        if (this._onPlayerLeft) this._onPlayerLeft(String(msg.playerId || ''));
        break;

      case 'game_start':
        if (this._onGameStart) this._onGameStart(msg.hostId);
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

      case 'error':
        if (this._onError) this._onError(String(msg.message || 'Unknown error'));
        break;
    }
  }
}
