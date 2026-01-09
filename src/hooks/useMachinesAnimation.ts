import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SCENE_CONFIG } from "../data/sceneConfig";
import type { MachineEntry } from "./useMachinesSetup";

const BLUE_FADE_SPEED = 1.6;

const glowColor = new THREE.Color(SCENE_CONFIG.glowColor);
const searchGlowColor = new THREE.Color(
  SCENE_CONFIG.selectedMachine
);

export function useMachinesAnimation(
  machinesRef: React.MutableRefObject<MachineEntry[]>,
  visualEffectsEnabled: boolean
) {
  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    machinesRef.current.forEach((entry, i) => {
      /* ================= ACTIVATION ================= */
      const activationTarget = entry.active ? 1 : 0;
      entry.activation = THREE.MathUtils.lerp(
        entry.activation,
        activationTarget,
        delta * SCENE_CONFIG.activationSpeed
      );

      /* ================= FOCUS ================= */
      const focusTarget = entry.focused ? 1 : 0;
      entry.focusIntensity = THREE.MathUtils.lerp(
        entry.focusIntensity,
        focusTarget,
        delta * 1.8
      );

      /* ================= BLUE FADE (SEARCH / FOCUS) ================= */
      entry.focusTimer = Math.max(
        0,
        entry.focusTimer - delta
      );

      const blueTarget = entry.focusTimer > 0 ? 1 : 0;
      entry.blueFade = THREE.MathUtils.lerp(
        entry.blueFade,
        blueTarget,
        delta * BLUE_FADE_SPEED
      );

      const a = entry.activation;      // zone actief
      const f = entry.focusIntensity;  // hover / focus
      const b = entry.blueFade;        // search highlight

      /* ================= MOTION FACTOR ================= */
      const motionFactor = visualEffectsEnabled ? 1 : 0;

      /* ================= FLOATING ================= */
      entry.obj.position.y =
        entry.baseY +
        Math.sin(
          t * SCENE_CONFIG.floatSpeed + i
        ) *
          SCENE_CONFIG.liftHeight *
          a *
          motionFactor *
          (1 + f * 0.6);

      /* ================= ROTATION ================= */
      entry.obj.rotation.y =
        Math.sin(t * 0.6 + i) *
        SCENE_CONFIG.rotationAmount *
        a *
        motionFactor;

      /* ================= GLOW ================= */
      const pulse = 0.6 + Math.sin(t * 4) * 0.4;

      const ambientGlow = visualEffectsEnabled
        ? a * SCENE_CONFIG.maxGlowIntensity
        : 0;

      const focusGlow =
        pulse *
        SCENE_CONFIG.maxGlowIntensity *
        b;

      entry.meshes.forEach((mesh) => {
        const mat =
          mesh.material as THREE.MeshStandardMaterial;

        /* kleur mengen */
        mat.emissive
          .copy(glowColor)
          .lerp(searchGlowColor, b);

        /* intensity bepalen */
        mat.emissiveIntensity =
          ambientGlow + focusGlow;
      });
    });
  });
}
