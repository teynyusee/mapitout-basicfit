import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import { MACHINES, type MachineConfig } from "../../data/machines";
import type { ZoneId } from "../../data/zones";

type Props = {
  activeZone: ZoneId;
  onSelect: (machine: MachineConfig, root: THREE.Object3D) => void;
};

export function MachineClickHandler({
  activeZone,
  onSelect,
}: Props) {
  const { camera, scene, raycaster, pointer } = useThree();
  const rafRef = useRef<number | null>(null);

  /**
   * 🔍 Zoek MachineConfig + ROOT OBJECT
   * → NIET de submesh / material / face
   */
  function getMachineAndRoot(obj: THREE.Object3D | null): {
    machine: MachineConfig;
    root: THREE.Object3D;
  } | null {
    let current: THREE.Object3D | null = obj;

    while (current) {
      const machine = MACHINES.find(
        (m) => m.meshName === current.name
      );

      if (machine) {
        return { machine, root: current };
      }

      current = current.parent;
    }

    return null;
  }

  function runRaycast(click = false) {
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(scene.children, true);

    if (!click) {
      const hovering = hits.some((h) => {
        const result = getMachineAndRoot(h.object);
        return result?.machine.zone === activeZone;
      });

      document.body.style.cursor = hovering ? "pointer" : "default";
      return;
    }

    for (const hit of hits) {
      const result = getMachineAndRoot(hit.object);

      if (result && result.machine.zone === activeZone) {
        // ✅ ALTIJD ROOT OBJECT DOORGEVEN
        onSelect(result.machine, result.root);
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
