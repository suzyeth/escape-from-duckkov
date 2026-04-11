import * as THREE from 'three';

const INTERACT_RANGE = 1.8;   // metres
const SWING_SPEED    = Math.PI * 2.2; // rad/s — full 90° in ~0.4 s

/**
 * DoorSystem
 * Interactive doors for building entrances.
 * Press F when nearby to open / close.
 * Doors swing inward (negative Z) around their left pivot edge.
 */
export class DoorSystem {
  /**
   * @param {THREE.Scene}      scene
   * @param {THREE.Object3D[]} collidables  — shared collidable array from Level
   */
  constructor(scene, collidables) {
    this._scene       = scene;
    this._collidables = collidables;
    /** @type {Array<{mesh:THREE.Mesh, pivot:THREE.Group, pos:THREE.Vector3, isOpen:boolean, _curAngle:number, _targetAngle:number}>} */
    this._doors = [];
  }

  // ── Public ─────────────────────────────────────────────────────────────────

  /**
   * Add a door filling the gap in an X-aligned wall.
   * @param {{ cx:number, cz:number, gapW:number, h:number, color?:number, name?:string }} cfg
   */
  addDoor({ cx, cz, gapW, h, color = 0x8b6040, name = 'Door' }) {
    const geo = new THREE.BoxGeometry(gapW - 0.1, h, 0.14);
    const mat = new THREE.MeshLambertMaterial({ color });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow    = true;
    mesh.receiveShadow = true;
    mesh.name = name;

    // Pivot at left edge of gap so the door swings around that corner
    const pivotX = cx - gapW / 2;
    const pivot  = new THREE.Group();
    pivot.position.set(pivotX, h / 2, cz);

    // Door mesh offset: its left edge sits at the pivot
    mesh.position.set(gapW / 2, 0, 0);
    pivot.add(mesh);
    this._scene.add(pivot);

    const door = {
      mesh,
      pivot,
      pos:          new THREE.Vector3(cx, 0, cz),
      isOpen:       false,
      _curAngle:    0,
      _targetAngle: 0,
    };

    this._collidables.push(mesh);
    this._doors.push(door);
    return door;
  }

  /**
   * Animate doors and handle F-key interaction.
   * @param {number}        dt
   * @param {THREE.Vector3} playerPos
   * @param {boolean}       fPressed  — true on the frame F is first pressed
   * @returns nearest door within range, or null
   */
  update(dt, playerPos, fPressed) {
    // ── Animate ──────────────────────────────────────────────────────────────
    for (const d of this._doors) {
      if (Math.abs(d._curAngle - d._targetAngle) < 0.001) continue;

      const dir  = Math.sign(d._targetAngle - d._curAngle);
      const step = SWING_SPEED * dt;
      d._curAngle += dir * step;

      if (dir > 0) d._curAngle = Math.min(d._curAngle, d._targetAngle);
      else         d._curAngle = Math.max(d._curAngle, d._targetAngle);

      d.pivot.rotation.y = d._curAngle;

      // Remove collision once door has swung past 45° (clear path for player)
      const colIdx = this._collidables.indexOf(d.mesh);
      if (d.isOpen && colIdx !== -1 && d._curAngle <= -(Math.PI / 4)) {
        this._collidables.splice(colIdx, 1);
      }
    }

    // ── Proximity ────────────────────────────────────────────────────────────
    let nearest = null;
    let minDist = INTERACT_RANGE;
    for (const d of this._doors) {
      const dist = playerPos.distanceTo(d.pos);
      if (dist < minDist) { minDist = dist; nearest = d; }
    }

    let justToggled = false;
    if (fPressed && nearest) {
      this._toggle(nearest);
      justToggled = true;
    }

    return { nearDoor: nearest, justToggled };
  }

  // ── Private ─────────────────────────────────────────────────────────────────

  _toggle(door) {
    door.isOpen      = !door.isOpen;
    door._targetAngle = door.isOpen ? -(Math.PI / 2) : 0;

    // Restore collision immediately when starting to close
    if (!door.isOpen && !this._collidables.includes(door.mesh)) {
      this._collidables.push(door.mesh);
    }
  }
}
