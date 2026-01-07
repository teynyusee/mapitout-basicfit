import { useEffect, useCallback, useRef } from "react";
import * as THREE from "three";
import { MACHINES } from "../data/machines";
import { SCENE_CONFIG } from "../data/sceneConfig";
import type { ZoneId } from "../data/zones";

export type MachineEntry = {
  obj: THREE.Object3D;
  baseY: number;
  meshes: THREE.Mesh[];
  active: boolean;
  activation: number;
  focused: boolean;
};

export function useMachinesSetup(
  scene: THREE.Object3D,
  activeZone: ZoneId
) {
  const machinesRef = useRef<MachineEntry[]>([]);

  const setupMachines = useCallback(() => {
    MACHINES.forEach((machine) => {
      const root = scene.getObjectByName(machine.meshName);
      if (!root) return;

      let entry = machinesRef.current.find(
        (m) => m.obj === root
      );

      if (!entry) {
        const meshes: THREE.Mesh[] = [];

        root.traverse((child) => {
          if (!(child as THREE.Mesh).isMesh) return;

          const mesh = child as THREE.Mesh;
          mesh.material = (
            mesh.material as THREE.Material
          ).clone();

          (
            mesh.material as THREE.MeshStandardMaterial
          ).emissive = new THREE.Color(
            SCENE_CONFIG.glowColor
          );

          (
            mesh.material as THREE.MeshStandardMaterial
          ).emissiveIntensity = 0;

          meshes.push(mesh);
        });

        entry = {
          obj: root,
          baseY: root.position.y,
          meshes,
          active: false,
          activation: 0,
          focused: false,
        };

        machinesRef.current.push(entry);
      }

      entry.active = machine.zone === activeZone;
      entry.focused = false;
    });
  }, [scene, activeZone]);

  useEffect(() => {
    setupMachines();
  }, [setupMachines]);

  return machinesRef;
}
