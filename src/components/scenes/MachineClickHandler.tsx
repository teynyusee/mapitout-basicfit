import { useThree } from "@react-three/fiber";
import { useEffect, useRef  } from "react";
import * as THREE from "three";

import { MACHINES, type MachineConfig } from "../../data/machines";
import type { ZoneId } from "../../data/zones";

type Props = {
  activeZone: ZoneId;
  onSelect: (machine: MachineConfig) => void;
};

export function MachineClickHandler({
  activeZone,
  onSelect,
}: Props) {
  const { camera, scene, raycaster, pointer } = useThree();
  const rafRef = useRef<number | null>(null);

  function getMachine(obj: THREE.Object3D | null) {
    while (obj) {
      const machine = MACHINES.find(
        (m) => m.meshName === obj?.name
      );
      if (machine) return machine;
      obj = obj.parent as THREE.Object3D | null;
    }
    return null;
  }

  function runRaycast(click = false) {
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(
      scene.children,
      true
    );

    if (!click) {
      const hovering = hits.some((h) => {
        const m = getMachine(h.object);
        return m?.zone === activeZone;
      });

      document.body.style.cursor = hovering
        ? "pointer"
        : "default";
      return;
    }

    for (const hit of hits) {
      const machine = getMachine(hit.object);
      if (machine && machine.zone === activeZone) {
        onSelect(machine);
        break;
      }
    }
  }

  useEffect(() => {
    function onMove() {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        runRaycast(false);
        rafRef.current = null;
      });
    }

    function onDown() {
      runRaycast(true);
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [activeZone]);

  return null;
}
