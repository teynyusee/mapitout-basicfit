import { useThree } from "@react-three/fiber";
import { useEffect, useMemo, useCallback } from "react";
import * as THREE from "three";
import { MACHINES, type MachineConfig } from "../../../data/machines";
import type { ZoneId } from "../../../data/zones";

type Props = {
  activeZone: ZoneId;
  onSelect: (machine: MachineConfig, root: THREE.Object3D) => void;
  onHover?: (root: THREE.Object3D | null) => void;
};

type MachineHit = {
  machine: MachineConfig;
  root: THREE.Object3D;
};

export function MachineClickHandler({
  activeZone,
  onSelect,
  onHover,
}: Props) {
  const { camera, scene, raycaster, pointer } = useThree();

  const machineByMeshName = useMemo(
    () => new Map(MACHINES.map((m) => [m.meshName, m])),
    []
  );

  const findMachineRoot = useCallback(
    (object: THREE.Object3D | null): MachineHit | null => {
      let current = object;

      while (current) {
        const machine = machineByMeshName.get(current.name);
        if (machine) {
          return { machine, root: current };
        }
        current = current.parent;
      }

      return null;
    },
    [machineByMeshName]
  );

  const getHits = useCallback(() => {
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObjects(scene.children, true);
  }, [camera, scene, raycaster, pointer]);

  const handleHover = useCallback(() => {
    const hits = getHits();
    let hoveredRoot: THREE.Object3D | null = null;

    for (const hit of hits) {
      const result = findMachineRoot(hit.object);
      if (result && result.machine.zone === activeZone) {
        hoveredRoot = result.root;
        break;
      }
    }

    onHover?.(hoveredRoot);
    document.body.style.cursor = hoveredRoot ? "pointer" : "default";
  }, [activeZone, findMachineRoot, getHits, onHover]);

  const handleClick = useCallback(() => {
    const hits = getHits();

    for (const hit of hits) {
      const result = findMachineRoot(hit.object);
      if (result && result.machine.zone === activeZone) {
        onSelect(result.machine, result.root);
        break;
      }
    }
  }, [activeZone, findMachineRoot, getHits, onSelect]);

  useEffect(() => {
    window.addEventListener("pointermove", handleHover);
    window.addEventListener("pointerdown", handleClick);

    return () => {
      window.removeEventListener("pointermove", handleHover);
      window.removeEventListener("pointerdown", handleClick);
    };
  }, [handleHover, handleClick]);

  return null;
}
