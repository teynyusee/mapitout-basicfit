import {
  ContactShadows,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useRef, useMemo, useState } from "react";
import * as THREE from "three";

import type { ZoneId } from "../../data/zones";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { MachineConfig } from "../../data/machines";

import { useZoneCamera } from "../../hooks/useZoneCamera";
import { useMachinesSetup } from "../../hooks/useMachinesSetup";
import { useMachinesAnimation } from "../../hooks/useMachinesAnimation";
import { useZoneHover } from "../../hooks/useZoneHover";
import { useLogoAnimation } from "../../hooks/useLogoAnimation";
import { useMachineExternalFocus } from "../../hooks/useMachineExternalFocus";
import { useMachineHoverFocus } from "../../hooks/useMachineHoverFocus";
import { useMachineInteractions } from "./interactions/machines/useMachineInteractions";


import {
  createLogoClickHandler,
  createLogoHoverHandler,
  createLogoHoverOutHandler,
} from "../intro/LogoScene";

import { DroppedDumbbells } from "../../hooks/useDroppedDumbbells";
import type { ThreeEvent } from "@react-three/fiber";

type Props = {
  activeZone: ZoneId;
  viewFactor: number;
  onMachineSelect: (
    machine: MachineConfig,
    root: THREE.Object3D
  ) => void;
  focusedMachine?: {
    id: string | null;
    tick: number;
  };
  visualEffectsEnabled: boolean;
};

export function SceneContents({
  activeZone,
  viewFactor,
  onMachineSelect,
  focusedMachine,
  visualEffectsEnabled,
}: Props) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const gltf = useGLTF("/models/gym_overview.glb");

  const [forcedCamera, setForcedCamera] =
    useState<THREE.Camera | null>(null);


  useZoneCamera(
    activeZone,
    gltf,
    controlsRef,
    viewFactor,
    forcedCamera
  );

  const machinesRef = useMachinesSetup(
    gltf.scene,
    activeZone
  );

  useMachinesAnimation(
    machinesRef,
    visualEffectsEnabled
  );

  useMachineExternalFocus(
    machinesRef,
    focusedMachine
  );

  const handleMachineHover =
    useMachineHoverFocus(machinesRef);

  const zoneHandlers = useZoneHover(
    gltf.scene,
    activeZone
  );

  useLogoAnimation(gltf.scene, activeZone);

  const logoHandlers = useMemo(
    () => ({
      onClick: createLogoClickHandler(),
      onHover: createLogoHoverHandler(),
      onHoverOut: createLogoHoverOutHandler(),
    }),
    []
  );

  const machineInteractions =
    useMachineInteractions(
      activeZone,
      onMachineSelect,
      handleMachineHover
    );

  return (
    <>
      <primitive
        object={gltf.scene}
        onPointerMove={(e: ThreeEvent<PointerEvent>) => {
          if (logoHandlers.onHover(e)) return;
          machineInteractions.onPointerMove();
          zoneHandlers.onPointerMove(e);
        }}
        onPointerOut={(e: ThreeEvent<PointerEvent> | undefined) => {
          logoHandlers.onHoverOut(e);
          zoneHandlers.onPointerOut(e);
        }}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          if (logoHandlers.onClick(e)) return;
          machineInteractions.onClick();
          zoneHandlers.onClick(e);
        }}
      />

      {gltf.nodes["reck_plane"] && (
        <RigidBody type="fixed" colliders="cuboid">
          <primitive object={gltf.nodes["reck_plane"]} />
        </RigidBody>
      )}

      <DroppedDumbbells
        gltf={gltf}
        setForcedCamera={setForcedCamera}
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
