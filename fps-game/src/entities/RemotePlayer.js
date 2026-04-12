import * as THREE from 'three';

/**
 * RemotePlayer
 * Renders another player's position received via network.
 * Uses position interpolation for smooth movement.
 */
export class RemotePlayer {
  constructor(scene, playerId) {
    this._scene = scene;
    this.playerId = playerId;
    this.position = new THREE.Vector3(0, 0, 0);
    this._targetPos = new THREE.Vector3(0, 0, 0);
    this._angle = 0;
    this._targetAngle = 0;
    this.health = 100;

    this.mesh = this._buildMesh();
    scene.add(this.mesh);

    // Name label
    this._label = this._makeLabel(playerId);
    scene.add(this._label);
  }

  /**
   * Update target state from network data.
   */
  setNetworkState(x, z, angle, health) {
    this._targetPos.set(x, 0, z);
    this._targetAngle = angle;
    this.health = health;
  }

  /**
   * Interpolate toward target state each frame.
   */
  update(dt) {
    // Position lerp
    this.position.lerp(this._targetPos, 0.15);
    this.mesh.position.set(this.position.x, 0.8, this.position.z);

    // Angle lerp
    const angleDiff = this._targetAngle - this._angle;
    this._angle += angleDiff * 0.15;
    this.mesh.rotation.y = this._angle;

    // Label follow
    this._label.position.set(this.position.x, 2.2, this.position.z);
  }

  destroy() {
    this._scene.remove(this.mesh);
    this._scene.remove(this._label);
    this.mesh.traverse(child => {
      if (child.isMesh) {
        child.geometry.dispose();
        child.material.dispose();
      }
    });
  }

  _buildMesh() {
    const group = new THREE.Group();

    // Body — blue tint to distinguish from local player (green)
    const bodyGeo = new THREE.BoxGeometry(0.52, 0.65, 0.35);
    const bodyMat = new THREE.MeshLambertMaterial({ color: 0x3a4a6a });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.05;
    body.castShadow = true;
    group.add(body);

    // Head
    const headGeo = new THREE.SphereGeometry(0.22, 8, 6);
    const headMat = new THREE.MeshLambertMaterial({ color: 0xf5c87a });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 0.58;
    head.castShadow = true;
    group.add(head);

    // Helmet — blue
    const helmetGeo = new THREE.SphereGeometry(0.25, 8, 5, 0, Math.PI * 2, 0, Math.PI * 0.6);
    const helmetMat = new THREE.MeshLambertMaterial({ color: 0x3a3a5a });
    const helmet = new THREE.Mesh(helmetGeo, helmetMat);
    helmet.position.y = 0.62;
    group.add(helmet);

    // Weapon
    const gunMat = new THREE.MeshLambertMaterial({ color: 0x2a2a2a });
    const gun = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 0.55), gunMat);
    gun.position.set(0.18, 0.0, 0.42);
    group.add(gun);

    // Legs
    const legMat = new THREE.MeshLambertMaterial({ color: 0x2a3a4a });
    const ll = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.5, 6), legMat);
    ll.position.set(-0.15, -0.35, 0); ll.castShadow = true; group.add(ll);
    const rl = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.5, 6), legMat);
    rl.position.set(0.15, -0.35, 0); rl.castShadow = true; group.add(rl);

    return group;
  }

  _makeLabel(text) {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#4488ff';
    ctx.font = 'bold 16px Courier New';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 64, 16);
    const tex = new THREE.CanvasTexture(canvas);
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(2, 0.5, 1);
    return sprite;
  }
}
