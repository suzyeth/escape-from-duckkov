import { renderTributeNotice } from './TributeNotice.js';

/**
 * LobbyScreen
 * Multiplayer lobby: create or join a room, wait for players, start game.
 */
export class LobbyScreen {
  constructor() {
    this._el = document.getElementById('lobby-screen');
    this._onStartSolo = null;
    this._onStartMulti = null;
    this._network = null;
    this._startBtnShown = false;
    this._playerCount = 1;
  }

  onStartSolo(fn) { this._onStartSolo = fn; }
  onStartMulti(fn) { this._onStartMulti = fn; }

  show(network) {
    this._network = network;
    this._renderMain();
    this._el.style.display = 'flex';
  }

  hide() {
    this._el.style.display = 'none';
  }

  _renderMain() {
    this._el.innerHTML = '';
    const content = document.createElement('div');
    content.className = 'lobby-content';

    const title = document.createElement('h2');
    title.className = 'lobby-title';
    title.textContent = '游戏模式';
    content.appendChild(title);

    const btns = document.createElement('div');
    btns.className = 'lobby-buttons';

    // Solo button
    const soloBtn = document.createElement('button');
    soloBtn.className = 'lobby-btn';
    soloBtn.textContent = '单人突袭';
    soloBtn.addEventListener('click', () => { this.hide(); if (this._onStartSolo) this._onStartSolo(); });
    btns.appendChild(soloBtn);

    // Create room button
    const createBtn = document.createElement('button');
    createBtn.className = 'lobby-btn';
    createBtn.textContent = '创建房间 (多人)';
    createBtn.addEventListener('click', () => this._createRoom());
    btns.appendChild(createBtn);

    // Join row
    const joinRow = document.createElement('div');
    joinRow.className = 'lobby-join-row';
    const codeInput = document.createElement('input');
    codeInput.type = 'text';
    codeInput.placeholder = '输入房间号';
    codeInput.maxLength = 4;
    codeInput.id = 'lobby-code-input';
    joinRow.appendChild(codeInput);
    const joinBtn = document.createElement('button');
    joinBtn.className = 'lobby-btn lobby-btn-sm';
    joinBtn.textContent = '加入';
    joinBtn.addEventListener('click', () => {
      const code = codeInput.value.trim();
      if (/^\d{4}$/.test(code)) this._joinRoom(code);
    });
    joinRow.appendChild(joinBtn);
    btns.appendChild(joinRow);

    content.appendChild(btns);

    // Status area
    const status = document.createElement('div');
    status.className = 'lobby-status';
    status.id = 'lobby-status';
    content.appendChild(status);

    renderTributeNotice(content);

    this._el.appendChild(content);
  }

  _setStatus(text) {
    const el = document.getElementById('lobby-status');
    if (el) el.textContent = text;
  }

  _appendStatus(text) {
    const el = document.getElementById('lobby-status');
    if (!el) return;
    const line = document.createElement('div');
    line.textContent = text;
    el.appendChild(line);
  }

  _showStartButton() {
    if (this._startBtnShown) return;
    const el = document.getElementById('lobby-status');
    if (!el) return;
    const goBtn = document.createElement('button');
    goBtn.className = 'lobby-btn';
    goBtn.textContent = '开始游戏';
    goBtn.style.marginTop = '0.8rem';
    goBtn.addEventListener('click', () => this._network.startGame());
    el.appendChild(goBtn);
    this._startBtnShown = true;
  }

  _hideStartButton() {
    const el = document.getElementById('lobby-status');
    if (!el) return;
    for (const btn of el.querySelectorAll('button')) btn.remove();
    this._startBtnShown = false;
  }

  _bindRoomHandlers() {
    this._startBtnShown = false;
    this._playerCount = 1;

    this._network.onGameStart(() => {
      this.hide();
      if (this._onStartMulti) this._onStartMulti();
    });

    this._network.onError((msg) => {
      this._setStatus(msg);
    });

    this._network.onDisconnect(() => {
      this._hideStartButton();
      if (this._el.style.display !== 'none') {
        this._setStatus('连接已断开。');
      }
    });

    this._network.onHostChanged((hostId, isHost) => {
      if (isHost && this._playerCount >= 2) this._showStartButton();
      else this._hideStartButton();
      this._appendStatus(isHost ? '你现在是房主。' : `房主已切换为 ${hostId}`);
    });

    this._network.onPlayerJoined((playerId, count) => {
      this._playerCount = count;
      this._appendStatus(`玩家 ${playerId} 已加入 (${count}/2)`);
      if (count >= 2 && this._network.isHost) {
        this._showStartButton();
      }
    });

    this._network.onPlayerLeft((playerId, count) => {
      this._playerCount = count;
      this._appendStatus(`玩家 ${playerId} 已离开 (${count}/2)`);
      if (count < 2) this._hideStartButton();
    });
  }

  async _createRoom() {
    this._setStatus('连接服务器…');

    try {
      const serverUrl = this._getServerUrl();
      await this._network.connect(serverUrl);
      this._bindRoomHandlers();

      this._network.onRoomCreated((code) => {
        this._playerCount = 1;
        this._setStatus('');
        const el = document.getElementById('lobby-status');
        if (!el) return;
        const codeLine = document.createElement('div');
        codeLine.textContent = '房间号: ' + code;
        codeLine.style.fontSize = '1.5rem';
        codeLine.style.color = '#c8a96e';
        el.appendChild(codeLine);
        this._appendStatus('等待其他玩家加入…');
      });

      this._network.createRoom();
    } catch {
      this._setStatus('无法连接服务器。请确认服务器已启动。');
    }
  }

  async _joinRoom(code) {
    this._setStatus('连接服务器…');

    try {
      const serverUrl = this._getServerUrl();
      await this._network.connect(serverUrl);
      this._bindRoomHandlers();

      this._network.onRoomJoined((roomCode) => {
        this._playerCount = 2;
        this._setStatus(`已加入房间 ${roomCode}，等待房主开始…`);
      });

      this._network.joinRoom(code);
    } catch {
      this._setStatus('无法连接服务器。');
    }
  }

  _getServerUrl() {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      return 'ws://localhost:8080';
    }
    return 'wss://duckkov-server.fly.dev';
  }
}
