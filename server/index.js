/**
 * Multiplayer Server — Escape From Duckkov
 * Minimal WebSocket server for 2-player co-op.
 *
 * Features:
 *   - Room creation & joining via 4-digit code
 *   - Player state broadcasting (position, angle, shooting)
 *   - AI state relay (host runs AI, broadcasts to guest)
 *   - Heartbeat & disconnect cleanup
 *
 * Usage: node server/index.js
 */

const { WebSocketServer } = require('ws');

const PORT = process.env.PORT || 8080;
const MAX_PLAYERS = 2;

// ── Room Management ──────────────────────────────────────────────────────────

const rooms = new Map();

function generateRoomCode() {
  let code;
  do {
    code = String(Math.floor(1000 + Math.random() * 9000));
  } while (rooms.has(code));
  return code;
}

function createRoom(ws) {
  const code = generateRoomCode();
  const room = {
    code,
    players: new Map(),
    hostId: null,
    started: false,
  };
  rooms.set(code, room);
  return room;
}

function joinRoom(code) {
  return rooms.get(code) || null;
}

function removePlayerFromRoom(playerId) {
  for (const [code, room] of rooms) {
    if (room.players.has(playerId)) {
      room.players.delete(playerId);
      // Notify remaining players
      broadcast(room, { type: 'player_left', playerId });
      // Clean up empty rooms
      if (room.players.size === 0) {
        rooms.delete(code);
      } else if (room.hostId === playerId) {
        // Transfer host
        const newHost = room.players.keys().next().value;
        room.hostId = newHost;
        broadcast(room, { type: 'host_changed', hostId: newHost });
      }
      return;
    }
  }
}

function broadcast(room, msg, excludeId = null) {
  const data = JSON.stringify(msg);
  for (const [id, p] of room.players) {
    if (id !== excludeId && p.ws.readyState === 1) {
      p.ws.send(data);
    }
  }
}

// ── WebSocket Server ─────────────────────────────────────────────────────────

const wss = new WebSocketServer({ port: PORT });
let nextPlayerId = 1;

console.log(`Duckkov server listening on ws://localhost:${PORT}`);

wss.on('connection', (ws) => {
  const playerId = `p${nextPlayerId++}`;
  let currentRoom = null;

  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }

    switch (msg.type) {
      // ── Room Management ────────────────────────────────────────────────
      case 'create_room': {
        const room = createRoom(ws);
        room.hostId = playerId;
        room.players.set(playerId, { ws, state: {} });
        currentRoom = room;
        ws.send(JSON.stringify({
          type: 'room_created',
          code: room.code,
          playerId,
          isHost: true,
        }));
        break;
      }

      case 'join_room': {
        const room = joinRoom(msg.code);
        if (!room) {
          ws.send(JSON.stringify({ type: 'error', message: '房间不存在' }));
          break;
        }
        if (room.players.size >= MAX_PLAYERS) {
          ws.send(JSON.stringify({ type: 'error', message: '房间已满' }));
          break;
        }
        room.players.set(playerId, { ws, state: {} });
        currentRoom = room;

        ws.send(JSON.stringify({
          type: 'room_joined',
          code: room.code,
          playerId,
          isHost: false,
          players: Array.from(room.players.keys()),
        }));

        // Notify host
        broadcast(room, {
          type: 'player_joined',
          playerId,
          playerCount: room.players.size,
        }, playerId);
        break;
      }

      case 'start_game': {
        if (!currentRoom || currentRoom.hostId !== playerId) break;
        currentRoom.started = true;
        broadcast(currentRoom, { type: 'game_start', hostId: currentRoom.hostId });
        break;
      }

      // ── Game State ─────────────────────────────────────────────────────
      case 'player_state': {
        if (!currentRoom) break;
        // Relay player position/angle/shooting to other players
        broadcast(currentRoom, {
          type: 'remote_player_state',
          playerId,
          x: msg.x,
          z: msg.z,
          angle: msg.angle,
          health: msg.health,
          weaponId: msg.weaponId,
        }, playerId);
        break;
      }

      case 'player_shoot': {
        if (!currentRoom) break;
        broadcast(currentRoom, {
          type: 'remote_player_shoot',
          playerId,
          x: msg.x,
          z: msg.z,
          angle: msg.angle,
          weaponId: msg.weaponId,
        }, playerId);
        break;
      }

      case 'player_hit': {
        if (!currentRoom) break;
        // Relay hit event (enemy killed, damage dealt)
        broadcast(currentRoom, {
          type: 'remote_player_hit',
          playerId,
          targetType: msg.targetType,
          targetId: msg.targetId,
          damage: msg.damage,
        }, playerId);
        break;
      }

      // Host broadcasts AI state to guest
      case 'ai_state': {
        if (!currentRoom || currentRoom.hostId !== playerId) break;
        broadcast(currentRoom, {
          type: 'ai_state_update',
          enemies: msg.enemies,
        }, playerId);
        break;
      }
    }
  });

  // ── Heartbeat ──────────────────────────────────────────────────────────
  ws.isAlive = true;
  ws.on('pong', () => { ws.isAlive = true; });

  ws.on('close', () => {
    removePlayerFromRoom(playerId);
    currentRoom = null;
  });

  ws.on('error', () => {
    removePlayerFromRoom(playerId);
    currentRoom = null;
  });
});

// Heartbeat interval
const heartbeat = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (!ws.isAlive) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 15000);

wss.on('close', () => clearInterval(heartbeat));
