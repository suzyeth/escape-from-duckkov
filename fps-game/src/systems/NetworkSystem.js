/**
 * NetworkSystem
 * WebSocket client for multiplayer.
 * Handles room management, state sync, and remote player rendering.
 */

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

    // Send throttle
    this._lastSendTime = 0;
    this._sendInterval = 50; // ms
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

  /**
   * Connect to the multiplayer server.
   * @param {string} url  WebSocket URL (e.g. ws://localhost:8080)
   */
  connect(url) {
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
      };

      this._ws.onmessage = (event) => {
        this._handleMessage(JSON.parse(event.data));
      };
    });
  }

  disconnect() {
    if (this._ws) {
      this._ws.close();
      this._ws = null;
    }
    this._connected = false;
    this._playerId = null;
    this._roomCode = null;
  }

  createRoom() {
    this._send({ type: 'create_room' });
  }

  joinRoom(code) {
    this._send({ type: 'join_room', code });
  }

  startGame() {
    this._send({ type: 'start_game' });
  }

  /**
   * Send local player state (throttled to 20 FPS).
   */
  sendPlayerState(x, z, angle, health, weaponId) {
    const now = performance.now();
    if (now - this._lastSendTime < this._sendInterval) return;
    this._lastSendTime = now;
    this._send({ type: 'player_state', x, z, angle, health, weaponId });
  }

  sendPlayerShoot(x, z, angle, weaponId) {
    this._send({ type: 'player_shoot', x, z, angle, weaponId });
  }

  sendPlayerHit(targetType, targetId, damage) {
    this._send({ type: 'player_hit', targetType, targetId, damage });
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
        this._playerId = msg.playerId;
        this._roomCode = msg.code;
        this._isHost = msg.isHost;
        if (this._onRoomCreated) this._onRoomCreated(msg.code, msg.playerId);
        break;

      case 'room_joined':
        this._playerId = msg.playerId;
        this._roomCode = msg.code;
        this._isHost = msg.isHost;
        if (this._onRoomJoined) this._onRoomJoined(msg.code, msg.playerId, msg.players);
        break;

      case 'player_joined':
        if (this._onPlayerJoined) this._onPlayerJoined(msg.playerId, msg.playerCount);
        break;

      case 'player_left':
        if (this._onPlayerLeft) this._onPlayerLeft(msg.playerId);
        break;

      case 'game_start':
        if (this._onGameStart) this._onGameStart(msg.hostId);
        break;

      case 'remote_player_state':
        if (this._onRemoteState) this._onRemoteState(msg);
        break;

      case 'remote_player_shoot':
        if (this._onRemoteShoot) this._onRemoteShoot(msg);
        break;

      case 'error':
        if (this._onError) this._onError(msg.message);
        break;
    }
  }
}
