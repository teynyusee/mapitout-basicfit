/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ContactShadows,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import type { ZoneId } from "../../data/zones";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { MachineConfig } from "../../data/machines";

import { MACHINES } from "../../data/machines";
import { SCENE_CONFIG } from "../../data/sceneConfig";

import { ParallaxScene } from "./ParallaxScene";
import { MachineClickHandler } from "./MachineClickHandler";
import { useZoneCamera } from "../../hooks/useZoneCamera";

type MachineEntry = {
  obj: THREE.Object3D;
  baseY: number;
  meshes: THREE.Mesh[];
  active: boolean;
  activation: number;
};

export function SceneContents({
  activeZone,
  viewFactor,
  onMachineSelect,
}: {
  activeZone: ZoneId;
  viewFactor: number;
  onMachineSelect: (machine: MachineConfig) => void;
}) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const gltf = useGLTF("/models/gym_overview.glb") as any;

  useZoneCamera(activeZone, gltf, controlsRef, viewFactor);

  const machinesRef = useRef<MachineEntry[]>([]);

  // 🔁 ZONE CHANGE → update active flags
  useEffect(() => {
    MACHINES.forEach((machine) => {
      const root = gltf.scene.getObjectByName(machine.meshName);
      if (!root) return;

      let entry = machinesRef.current.find(
        (m) => m.obj === root
      );

      // 👉 Eerste keer dat we deze machine zien
      if (!entry) {
        const meshes: THREE.Mesh[] = [];

        root.traverse((child: any) => {
          if (!child.isMesh) return;

          child.material = child.material.clone();
          child.material.emissive = new THREE.Color(
            SCENE_CONFIG.glowColor
          );
          child.material.emissiveIntensity = 0;

          meshes.push(child);
        });

        entry = {
          obj: root,
          baseY: root.position.y,
          meshes,
          active: false,
          activation: 0,
        };

        machinesRef.current.push(entry);
      }

      // 👉 Active flag correct zetten
      entry.active = machine.zone === activeZone;
    });
  }, [gltf, activeZone]);

  // 🎞️ PER FRAME: animatie + glow
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

      entry.obj.position.y =
        entry.baseY +
        Math.sin(t * SCENE_CONFIG.floatSpeed + i) *
          SCENE_CONFIG.liftHeight *
          a;

      entry.obj.rotation.y =
        Math.sin(t * 0.6 + i) *
        SCENE_CONFIG.rotationAmount *
        a;

      entry.meshes.forEach((mesh) => {
        (
          mesh.material as THREE.MeshStandardMaterial
        ).emissiveIntensity =
          a * SCENE_CONFIG.maxGlowIntensity;
      });
    });
  });

  return (
    <>
      <ParallaxScene scene={gltf.scene} />

      <MachineClickHandler
        activeZone={activeZone}
        onSelect={onMachineSelect}
      />

      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.4}
        width={300}
        height={300}
        blur={3}
        far={150}
      />

      <OrbitControls
        ref={controlsRef}
        enabled={false}
      />
    </>
  );
}
