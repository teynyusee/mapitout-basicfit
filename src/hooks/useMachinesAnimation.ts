import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SCENE_CONFIG } from "../data/sceneConfig";
import type { MachineEntry } from "./useMachinesSetup";

const BLUE_FADE_SPEED = 1.6;

const glowColor = new THREE.Color(SCENE_CONFIG.glowColor);
const searchGlowColor = new THREE.Color(SCENE_CONFIG.selectedMachine);

export function useMachinesAnimation(
  machinesRef: React.MutableRefObject<MachineEntry[]>
) {
  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    machinesRef.current.forEach((entry, i) => {
      /* ---------------- Activation ---------------- */
      const activationTarget = entry.active ? 1 : 0;
      entry.activation = THREE.MathUtils.lerp(
        entry.activation,
        activationTarget,
        delta * SCENE_CONFIG.activationSpeed
      );

      /* ---------------- Focus intensity ---------------- */
      const focusTarget = entry.focused ? 1 : 0;
      entry.focusIntensity = THREE.MathUtils.lerp(
        entry.focusIntensity,
        focusTarget,
        delta * 1.8
      );

      /* ---------------- Blue fade ---------------- */
      entry.focusTimer = Math.max(0, entry.focusTimer - delta);

      const blueTarget = entry.focusTimer > 0 ? 1 : 0;
      entry.blueFade = THREE.MathUtils.lerp(
        entry.blueFade,
        blueTarget,
        delta * BLUE_FADE_SPEED
      );

      const a = entry.activation;
      const f = entry.focusIntensity;
      const b = entry.blueFade;

      /* ---------------- Floating ---------------- */
      entry.obj.position.y =
        entry.baseY +
        Math.sin(t * SCENE_CONFIG.floatSpeed + i) *
          SCENE_CONFIG.liftHeight *
          a *
          (1 + f * 0.6);

      /* ---------------- Rotation ---------------- */
      entry.obj.rotation.y =
        Math.sin(t * 0.6 + i) *
        SCENE_CONFIG.rotationAmount *
        a;

      /* ---------------- Glow ---------------- */
      const pulse = 0.6 + Math.sin(t * 4) * 0.4;

      entry.meshes.forEach((mesh) => {
        const mat = mesh.material as THREE.MeshStandardMaterial;

        mat.emissive
          .copy(glowColor)
          .lerp(searchGlowColor, b);

        mat.emissiveIntensity =
          pulse * SCENE_CONFIG.maxGlowIntensity * b +
          a * SCENE_CONFIG.maxGlowIntensity * (1 - b);
      });
    });
  });
}
