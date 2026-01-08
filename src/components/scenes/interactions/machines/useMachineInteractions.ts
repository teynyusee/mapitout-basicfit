import { useThree } from "@react-three/fiber";
import { useCallback } from "react";
import type * as THREE from "three";
import type { ZoneId } from "../../../../data/zones";
import type { MachineConfig } from "../../../../data/machines";

import { useRaycastHits } from "./useRaycastHits";
import { useMachineLookup } from "./useMachineLookup";
import { resolveMachineHit } from "./resolveMachineHit";

export function useMachineInteractions(
  activeZone: ZoneId,
  onSelect: (machine: MachineConfig, root: THREE.Object3D) => void,
  onHover?: (root: THREE.Object3D | null) => void
) {
  const { camera, scene, raycaster, pointer } = useThree();

  const getHits = useRaycastHits(
    camera,
    scene,
    raycaster,
    pointer
  );

  const machineLookup = useMachineLookup();

  const handleHover = useCallback(() => {
    const hits = getHits();
    const result = resolveMachineHit(
      hits,
      activeZone,
      machineLookup
    );

    onHover?.(result?.root ?? null);
    document.body.style.cursor = result ? "pointer" : "default";
  }, [activeZone, getHits, machineLookup, onHover]);

  const handleClick = useCallback(() => {
    const hits = getHits();
    const result = resolveMachineHit(
      hits,
      activeZone,
      machineLookup
    );

    if (result) {
      onSelect(result.machine, result.root);
    }
  }, [activeZone, getHits, machineLookup, onSelect]);

  return {
    onPointerMove: handleHover,
    onClick: handleClick,
  };
}
