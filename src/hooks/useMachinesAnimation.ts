import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SCENE_CONFIG } from "../data/sceneConfig";
import type { MachineEntry } from "./useMachinesSetup";

export function useMachinesAnimation(
  machinesRef: React.MutableRefObject<
    MachineEntry[]
  >
) {
  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    machinesRef.current.forEach((entry, i) => {
      const target = entry.active ? 1 : 0;

      entry.activation = THREE.MathUtils.lerp(
        entry.activation,
        target,
        delta * SCENE_CONFIG.activationSpeed
      );

      const a = entry.activation;
      const focusBoost = entry.focused ? 1.6 : 1;

      entry.obj.position.y =
        entry.baseY +
        Math.sin(t * SCENE_CONFIG.floatSpeed + i) *
          SCENE_CONFIG.liftHeight *
          a *
          focusBoost;

      entry.obj.rotation.y =
        Math.sin(t * 0.6 + i) *
        SCENE_CONFIG.rotationAmount *
        a;

      entry.meshes.forEach((mesh) => {
        (
          mesh.material as THREE.MeshStandardMaterial
        ).emissiveIntensity =
          a *
          SCENE_CONFIG.maxGlowIntensity *
          (entry.focused ? 1.4 : 1);
      });
    });
  });
}
