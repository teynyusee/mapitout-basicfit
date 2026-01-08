import {
  ContactShadows,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { useRef, useMemo, useEffect } from "react";
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

import { theme } from "../../styles/theme";

import {
  createLogoClickHandler,
  createLogoHoverHandler,
  createLogoHoverOutHandler,
} from "../intro/LogoScene";

type Props = {
  activeZone: ZoneId;
  viewFactor: number;
  onMachineSelect: (
    machine: MachineConfig,
    root: THREE.Object3D
  ) => void;
  focusedMachineId?: string | null;
  introFade?: boolean;
};

const logoHoverColor = new THREE.Color(
  theme.colors.primarySoft
);

export function SceneContents({
  activeZone,
  viewFactor,
  onMachineSelect,
  focusedMachineId,
}: Props) {
  const controlsRef =
    useRef<OrbitControlsImpl | null>(null);

  const gltf = useGLTF("/models/gym_overview.glb");

  /* ---------------- CAMERA ---------------- */
  useZoneCamera(activeZone, gltf, controlsRef, viewFactor);

  /* ---------------- MACHINES ---------------- */
  const machinesRef = useMachinesSetup(
    gltf.scene,
    activeZone
  );
  useMachinesAnimation(machinesRef);

  /* 🔑 SYNC SEARCH / EXTERNAL FOCUS → MACHINE ENTRIES */
  useEffect(() => {
    if (!focusedMachineId) return;

    machinesRef.current.forEach((m) => {
      m.focused = m.machine.id === focusedMachineId;
    });
  }, [focusedMachineId, machinesRef]);

  /* ---------------- ZONE HOVER ---------------- */
  const { onPointerMove, onPointerOut, onClick } =
    useZoneHover(gltf.scene, activeZone);

  /* ---------------- LOGO HANDLERS ---------------- */
  const logoClickHandler = useMemo(
    () => createLogoClickHandler(),
    []
  );
  const logoHoverHandler = useMemo(
    () => createLogoHoverHandler(),
    []
  );
  const logoHoverOutHandler = useMemo(
    () => createLogoHoverOutHandler(),
    []
  );

  /* ---------------- LOGO HOVER ANIMATION ---------------- */
  useFrame(() => {
    gltf.scene.traverse((obj) => {
      if (
        !(obj instanceof THREE.Mesh) ||
        obj.name !== "BASIC_FIT_LOGO"
      )
        return;

      const mat = obj.material as THREE.Material & {
        color?: THREE.Color;
      };
      if (!mat.color) return;

      if (!obj.userData.baseColor) {
        obj.userData.baseColor = mat.color.clone();
      }

      const targetColor = obj.userData.hover
        ? logoHoverColor
        : obj.userData.baseColor;

      mat.color.lerp(targetColor, 0.08);
    });
  });

  /* ---------------- SCENE ---------------- */
  return (
    <>
      <ParallaxScene
        scene={gltf.scene}
        onPointerMove={(e) => {
          if (logoHoverHandler(e)) return;
          onPointerMove(e);
        }}
        onPointerOut={(e) => {
          logoHoverOutHandler(e);
          onPointerOut(e);
        }}
        onClick={(e) => {
          if (logoClickHandler(e)) return;
          onClick(e);
        }}
      />

      <MachineClickHandler
        activeZone={activeZone}
        onSelect={handleMachineSelect}
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

  /* ---------------- MACHINE CLICK (SCENE) ---------------- */
  function handleMachineSelect(
    machine: MachineConfig,
    root: THREE.Object3D
  ) {
    machinesRef.current.forEach((m) => {
      m.focused = m.obj === root;
    });

    onMachineSelect(machine, root);
  }
}
