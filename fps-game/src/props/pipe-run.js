import * as THREE from 'three';
import { MAT } from './materials.js';

const valveMat = new THREE.MeshStandardMaterial({ color: 0xcc3333, roughness: 0.6, metalness: 0.3 });
const flangeMat = new THREE.MeshStandardMaterial({ color: 0x444444, roughness: 0.4, metalness: 0.7 });
const gaugeMat = new THREE.MeshStandardMaterial({ color: 0xddddcc, roughness: 0.5, metalness: 0.2 });
const gaugeRim = new THREE.MeshStandardMaterial({ color: 0x666666, roughness: 0.3, metalness: 0.7 });
const leakMat = new THREE.MeshStandardMaterial({ color: 0x334433, roughness: 0.95 });

/**
 * 粗管道组 — 沿天花板/墙壁延伸，带阀门/接头/仪表
 * @param {number} length 管道长度
 * @param {number} count 管道数量 (2-4)
 * @param {number} ceilH 天花板高度
 */
export function createPipeRun(length = 10, count = 3, ceilH = 3.2) {
  const group = new THREE.Group();

  for (let i = 0; i < count; i++) {
    const radius = 0.08 + i * 0.02;
    const pipeX = i * 0.25;
    const pipeY = ceilH - 0.15 - i * 0.05;

    // Main pipe
    const pipe = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, length, 14),
      MAT.pipe
    );
    pipe.rotation.x = Math.PI / 2;
    pipe.position.set(pipeX, pipeY, 0);
    pipe.castShadow = true;
    group.add(pipe);

    // Flanged joints every ~2.5 units
    const jointSpacing = 2.2 + Math.random() * 0.6;
    for (let z = -length / 2 + jointSpacing; z < length / 2; z += jointSpacing) {
      // Flange ring
      const flange = new THREE.Mesh(
        new THREE.TorusGeometry(radius + 0.015, 0.008, 6, 16),
        flangeMat
      );
      flange.position.set(pipeX, pipeY, z);
      flange.rotation.x = Math.PI / 2;
      group.add(flange);

      // Bolts on flange (4)
      for (let b = 0; b < 4; b++) {
        const angle = b * Math.PI / 2 + Math.PI / 4;
        const bolt = new THREE.Mesh(
          new THREE.CylinderGeometry(0.005, 0.005, 0.012, 6),
          flangeMat
        );
        bolt.position.set(
          pipeX + Math.cos(angle) * (radius + 0.012),
          pipeY + Math.sin(angle) * (radius + 0.012),
          z
        );
        bolt.rotation.x = Math.PI / 2;
        group.add(bolt);
      }
    }
  }

  // Support brackets (more detailed)
  const bracketW = 0.25 * count + 0.3;
  for (let z = -length / 2 + 1.5; z < length / 2; z += 2.5) {
    // Horizontal bar
    const bar = new THREE.Mesh(
      new THREE.BoxGeometry(bracketW, 0.035, 0.05),
      MAT.metal
    );
    bar.position.set((count - 1) * 0.12, ceilH - 0.04, z);
    group.add(bar);

    // Vertical hangers (2)
    [-0.05, bracketW - 0.1].forEach(dx => {
      const hanger = new THREE.Mesh(
        new THREE.BoxGeometry(0.025, 0.08, 0.025),
        MAT.metal
      );
      hanger.position.set(dx, ceilH - 0.01, z);
      group.add(hanger);
    });

    // U-bolt clamps on each pipe
    for (let i = 0; i < count; i++) {
      const clamp = new THREE.Mesh(
        new THREE.TorusGeometry(0.08 + i * 0.02 + 0.01, 0.004, 4, 8, Math.PI),
        flangeMat
      );
      clamp.position.set(i * 0.25, ceilH - 0.15 - i * 0.05 - 0.01, z);
      clamp.rotation.z = Math.PI;
      group.add(clamp);
    }
  }

  // === Valve (on the largest pipe) ===
  const valveZ = -length * 0.15;
  const valvePipeIdx = 0;
  const valveX = valvePipeIdx * 0.25;
  const valveY = ceilH - 0.15;
  const valveR = 0.08;

  // Valve body
  const valveBody = new THREE.Mesh(
    new THREE.CylinderGeometry(valveR + 0.02, valveR + 0.02, 0.08, 12),
    flangeMat
  );
  valveBody.rotation.x = Math.PI / 2;
  valveBody.position.set(valveX, valveY, valveZ);
  group.add(valveBody);

  // Valve stem (pointing down)
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.008, 0.008, 0.12, 8),
    flangeMat
  );
  stem.position.set(valveX, valveY - valveR - 0.06, valveZ);
  group.add(stem);

  // Valve wheel (red)
  const wheel = new THREE.Mesh(
    new THREE.TorusGeometry(0.04, 0.006, 6, 16),
    valveMat
  );
  wheel.position.set(valveX, valveY - valveR - 0.12, valveZ);
  group.add(wheel);
  // Wheel spokes
  for (let s = 0; s < 4; s++) {
    const spoke = new THREE.Mesh(
      new THREE.BoxGeometry(0.075, 0.005, 0.005),
      valveMat
    );
    spoke.rotation.z = s * Math.PI / 4;
    spoke.position.copy(wheel.position);
    group.add(spoke);
  }

  // === Pressure gauge (on second pipe) ===
  if (count >= 2) {
    const gaugeZ = length * 0.2;
    const gaugePipeX = 0.25;
    const gaugePipeY = ceilH - 0.2;

    // Gauge connector stub
    const stub = new THREE.Mesh(
      new THREE.CylinderGeometry(0.006, 0.006, 0.06, 6),
      flangeMat
    );
    stub.position.set(gaugePipeX, gaugePipeY - 0.1 - 0.03, gaugeZ);
    group.add(stub);

    // Gauge face (circle)
    const face = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 0.012, 16),
      gaugeMat
    );
    face.position.set(gaugePipeX, gaugePipeY - 0.1 - 0.065, gaugeZ);
    group.add(face);

    // Gauge rim
    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(0.03, 0.004, 6, 16),
      gaugeRim
    );
    rim.position.copy(face.position);
    rim.position.y -= 0.005;
    group.add(rim);

    // Needle
    const needle = new THREE.Mesh(
      new THREE.BoxGeometry(0.025, 0.002, 0.002),
      valveMat
    );
    needle.position.copy(face.position);
    needle.position.y -= 0.007;
    needle.rotation.y = 0.4;
    group.add(needle);
  }

  // === Leak stain (subtle environmental storytelling) ===
  const leakZ = length * 0.1;
  const stain = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 0.15, 0.005),
    leakMat
  );
  stain.position.set(0, ceilH - 0.25, leakZ);
  group.add(stain);
  // Drip at bottom
  const drip = new THREE.Mesh(new THREE.SphereGeometry(0.008, 6, 4), leakMat);
  drip.position.set(0, ceilH - 0.32, leakZ);
  drip.scale.y = 1.5;
  group.add(drip);

  group.userData.type = 'pipe-run';
  return group;
}
