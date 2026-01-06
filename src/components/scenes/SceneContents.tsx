/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContactShadows, OrbitControls, useGLTF } from "@react-three/drei";
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

  const machinesRef = useRef<
    { obj: THREE.Object3D; baseY: number; meshes: THREE.Mesh[] }[]
  >([]);

  const activation = useRef(0);
  const activationTarget = useRef(0);

  useEffect(() => {
    activationTarget.current = 0;

    MACHINES.forEach((machine) => {
      if (machine.zone !== activeZone) return;

      const root = gltf.scene.getObjectByName(machine.meshName);
      if (!root) return;

      if (
        machinesRef.current.some(
          (m) => m.obj === root
        )
      ) {
        activationTarget.current = 1;
        return;
      }

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

      machinesRef.current.push({
        obj: root,
        baseY: root.position.y,
        meshes,
      });

      activationTarget.current = 1;
    });
  }, [gltf, activeZone]);

  useFrame(({ clock }, delta) => {
    activation.current = THREE.MathUtils.lerp(
      activation.current,
      activationTarget.current,
      delta * SCENE_CONFIG.activationSpeed
    );

    const t = clock.getElapsedTime();

    machinesRef.current.forEach(({ obj, baseY, meshes }, i) => {
      const a = activation.current;

      obj.position.y =
        baseY +
        Math.sin(t * SCENE_CONFIG.floatSpeed + i) *
          SCENE_CONFIG.liftHeight *
          a;

      obj.rotation.y =
        Math.sin(t * 0.6 + i) *
        SCENE_CONFIG.rotationAmount *
        a;

      meshes.forEach((mesh) => {
        (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity =
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
