import {
  ContactShadows,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

import type { ZoneId } from "../../data/zones";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { MachineConfig } from "../../data/machines";

import { ParallaxScene } from "./ParallaxScene";

import { useZoneCamera } from "../../hooks/useZoneCamera";
import { useMachinesSetup } from "../../hooks/useMachinesSetup";
import { useMachinesAnimation } from "../../hooks/useMachinesAnimation";
import { useZoneHover } from "../../hooks/useZoneHover";
import { useLogoAnimation } from "../../hooks/useLogoAnimation";
import { useMachineExternalFocus } from "../../hooks/useMachineExternalFocus";

import {
  createLogoClickHandler,
  createLogoHoverHandler,
  createLogoHoverOutHandler,
} from "../intro/LogoScene";
import { useMachineInteractions } from "./interactions/machines/useMachineInteractions";

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
};

export function SceneContents({
  activeZone,
  viewFactor,
  onMachineSelect,
  focusedMachine,
}: Props) {
  /* ================= REFS ================= */
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  /* ================= ASSETS ================= */
  const gltf = useGLTF("/models/gym_overview.glb");

  /* ================= CAMERA ================= */
  useZoneCamera(activeZone, gltf, controlsRef, viewFactor);

  /* ================= MACHINES ================= */
  const machinesRef = useMachinesSetup(
    gltf.scene,
    activeZone
  );

  useMachinesAnimation(machinesRef);

  // ✅ ENIGE focus-bron (search / externe selectie)
  useMachineExternalFocus(machinesRef, focusedMachine);

  /* ================= ZONE INTERACTION ================= */
  const zoneHandlers = useZoneHover(
    gltf.scene,
    activeZone
  );

  const machineInteractions = useMachineInteractions(
    activeZone,
    handleMachineSelect
  );

  /* ================= LOGO ================= */
  useLogoAnimation(gltf.scene, activeZone);

  const logoHandlers = useMemo(
    () => ({
      onClick: createLogoClickHandler(),
      onHover: createLogoHoverHandler(),
      onHoverOut: createLogoHoverOutHandler(),
    }),
    []
  );

  /* ================= MACHINE CLICK ================= */
  function handleMachineSelect(
    machine: MachineConfig,
    root: THREE.Object3D
  ) {
    // ❌ GEEN focus-logica meer hier
    // focus komt enkel van external focus (search)

    onMachineSelect(machine, root);
  }

  /* ================= SCENE ================= */
  return (
    <>
      <ParallaxScene
        scene={gltf.scene}
        onPointerMove={(e) => {
          if (logoHandlers.onHover(e)) return;

          machineInteractions.onPointerMove();
          zoneHandlers.onPointerMove(e);
        }}
        onPointerOut={(e) => {
          logoHandlers.onHoverOut(e);
          zoneHandlers.onPointerOut(e);
        }}
        onClick={(e) => {
          if (logoHandlers.onClick(e)) return;

          machineInteractions.onClick();
          zoneHandlers.onClick(e);
        }}
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
