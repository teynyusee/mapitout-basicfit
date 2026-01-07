import {
  ContactShadows,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { useRef, useCallback } from "react";
import * as THREE from "three";

import type { ZoneId } from "../../data/zones";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { MachineConfig } from "../../data/machines";

import { ParallaxScene } from "./ParallaxScene";
import { MachineClickHandler } from "./interactions/MachineClickHandler";
import { useZoneCamera } from "../../hooks/useZoneCamera";
import { useMachinesSetup } from "../../hooks/useMachinesSetup";
import { useMachinesAnimation } from "../../hooks/useMachinesAnimation";

type Props = {
  activeZone: ZoneId;
  viewFactor: number;
  onMachineSelect: (
    machine: MachineConfig,
    rootObject: THREE.Object3D
  ) => void;
};

export function SceneContents({
  activeZone,
  viewFactor,
  onMachineSelect,
}: Props) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const gltf = useGLTF("/models/gym_overview.glb");

  useZoneCamera(activeZone, gltf, controlsRef, viewFactor);

  const machinesRef = useMachinesSetup(
    gltf.scene,
    activeZone
  );

  useMachinesAnimation(machinesRef);

  const handleSelect = useCallback(
    (machine: MachineConfig, root: THREE.Object3D) => {
      machinesRef.current.forEach((m) => {
        m.focused = m.obj === root;
      });

      onMachineSelect(machine, root);
    },
    [onMachineSelect, machinesRef]
  );

  return (
    <>
      <ParallaxScene scene={gltf.scene} />

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

      <OrbitControls
        ref={controlsRef}
        enabled={false}
      />
    </>
  );
}
