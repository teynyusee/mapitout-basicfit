import { useEffect, useCallback, useRef } from "react";
import * as THREE from "three";
import { MACHINES, type MachineConfig } from "../data/machines";
import { SCENE_CONFIG } from "../data/sceneConfig";
import type { ZoneId } from "../data/zones";

export type MachineEntry = {
  machine: MachineConfig;
  obj: THREE.Object3D;
  meshes: THREE.Mesh[];
  baseY: number;

  active: boolean;
  focused: boolean;

  activation: number;
  focusIntensity: number;

  focusTimer: number;
  blueFade: number;
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
          mesh.material = (mesh.material as THREE.Material).clone();

          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.emissive = new THREE.Color(SCENE_CONFIG.glowColor);
          mat.emissiveIntensity = 0;

          meshes.push(mesh);
        });

        entry = {
          machine,
          obj: root,
          baseY: root.position.y,
          meshes,

          active: false,
          activation: 0,

          focused: false,
          focusIntensity: 0,

          blueFade: 0,
          focusTimer: 0,

        };

        machinesRef.current.push(entry);
      }

      entry.active = machine.zone === activeZone;
    });
  }, [scene, activeZone]);

  useEffect(() => {
    setupMachines();
  }, [setupMachines]);

  return machinesRef;
}
