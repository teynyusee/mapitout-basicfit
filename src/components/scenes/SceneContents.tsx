import {
  ContactShadows,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { useRef, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import type { ZoneId } from "../../data/zones";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { MachineConfig } from "../../data/machines";

import { ParallaxScene } from "./ParallaxScene";
import { MachineClickHandler } from "./interactions/MachineClickHandler";
import { useZoneCamera } from "../../hooks/useZoneCamera";
import { useMachinesSetup } from "../../hooks/useMachinesSetup";
import { useMachinesAnimation } from "../../hooks/useMachinesAnimation";
import { useZoneHover } from "../../hooks/useZoneHover";

type Props = {
  activeZone: ZoneId;
  viewFactor: number;
  onMachineSelect: (
    machine: MachineConfig,
    root: THREE.Object3D
  ) => void;
  introFade?: boolean;
};

export function SceneContents({
  activeZone,
  viewFactor,
  onMachineSelect,
  introFade,
}: Props) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const gltf = useGLTF("/models/gym_overview.glb");

  const fade = useRef(0);

  useZoneCamera(activeZone, gltf, controlsRef, viewFactor);

  const machinesRef = useMachinesSetup(gltf.scene, activeZone);
  useMachinesAnimation(machinesRef);

  const { onPointerMove, onPointerOut } = useZoneHover(
    gltf.scene,
    activeZone
  );

  const handleSelect = useCallback(
    (machine: MachineConfig, root: THREE.Object3D) => {
      machinesRef.current.forEach((m) => {
        m.focused = m.obj === root;
      });
      onMachineSelect(machine, root);
    },
    [onMachineSelect, machinesRef]
  );

  useFrame(() => {
    if (!introFade) return;

    fade.current = THREE.MathUtils.lerp(fade.current, 1, 0.025);

    gltf.scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      const mat = obj.material as THREE.Material;
      mat.transparent = true;
      mat.opacity = fade.current;
    });
  });

  return (
    <>
      <ParallaxScene
        scene={gltf.scene}
        onPointerMove={onPointerMove}
        onPointerOut={onPointerOut}
      />

      <MachineClickHandler
        activeZone={activeZone}
        onSelect={handleSelect}
      />

      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.4}
        width={300}
        height={300}
        blur={3}
        far={150}
      />

      <OrbitControls ref={controlsRef} enabled={false} />
    </>
  );
}
