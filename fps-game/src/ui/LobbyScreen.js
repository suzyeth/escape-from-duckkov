/**
 * LobbyScreen
 * Multiplayer lobby: create or join a room, wait for players, start game.
 */
export class LobbyScreen {
  constructor() {
    this._el = document.getElementById('lobby-screen');
    this._onStartSolo = null;
    this._onStartMulti = null;
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
    this._el.innerHTML = `
      <div class="lobby-content">
        <h2 class="lobby-title">游戏模式</h2>
        <div class="lobby-buttons">
          <button class="lobby-btn" id="lobby-solo">单人突袭</button>
          <button class="lobby-btn" id="lobby-create">创建房间 (多人)</button>
          <div class="lobby-join-row">
            <input type="text" id="lobby-code-input" placeholder="输入房间号" maxlength="4" />
            <button class="lobby-btn lobby-btn-sm" id="lobby-join">加入</button>
          </div>
        </div>
        <div id="lobby-status" class="lobby-status"></div>
      </div>
    `;

    this._el.querySelector('#lobby-solo').addEventListener('click', () => {
      this.hide();
      if (this._onStartSolo) this._onStartSolo();
    });

    this._el.querySelector('#lobby-create').addEventListener('click', () => {
      this._createRoom();
    });

    this._el.querySelector('#lobby-join').addEventListener('click', () => {
      const code = this._el.querySelector('#lobby-code-input').value.trim();
      if (code.length === 4) this._joinRoom(code);
    });
  }

  async _createRoom() {
    const status = this._el.querySelector('#lobby-status');
    status.textContent = '连接服务器…';

    try {
      const serverUrl = this._getServerUrl();
      await this._network.connect(serverUrl);

      this._network.onRoomCreated((code) => {
        status.innerHTML = `房间号: <span style="font-size:1.5rem;color:#c8a96e">${code}</span><br>等待其他玩家加入…`;
      });

      this._network.onPlayerJoined((playerId, count) => {
        status.innerHTML += `<br>玩家 ${playerId} 已加入 (${count}/2)`;
        if (count >= 2) {
          status.innerHTML += `<br><button class="lobby-btn" id="lobby-go">开始游戏</button>`;
          this._el.querySelector('#lobby-go').addEventListener('click', () => {
            this._network.startGame();
          });
        }
      });

      this._network.onGameStart(() => {
        this.hide();
        if (this._onStartMulti) this._onStartMulti();
      });

      this._network.createRoom();
    } catch {
      status.textContent = '无法连接服务器。请确认服务器已启动。';
    }
  }

  async _joinRoom(code) {
    const status = this._el.querySelector('#lobby-status');
    status.textContent = '连接服务器…';

    try {
      const serverUrl = this._getServerUrl();
      await this._network.connect(serverUrl);

      this._network.onRoomJoined((roomCode) => {
        status.textContent = `已加入房间 ${roomCode}，等待房主开始…`;
      });

      this._network.onGameStart(() => {
        this.hide();
        if (this._onStartMulti) this._onStartMulti();
      });

      this._network.onError((msg) => {
        status.textContent = msg;
      });

      this._network.joinRoom(code);
    } catch {
      status.textContent = '无法连接服务器。';
    }
  }

  _getServerUrl() {
    // Development: ws://localhost:8080
    // Production: wss://your-server.fly.dev
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      return 'ws://localhost:8080';
    }
    // For production, update this URL:
    return 'wss://duckkov-server.fly.dev';
  }
}
