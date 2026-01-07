import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { ThreeEvent } from "@react-three/fiber";
import type { ZoneId } from "../data/zones";

export function useZoneHover(
  scene: THREE.Object3D,
  activeZone: ZoneId
) {
  const [hoveredZone, setHoveredZone] = useState<ZoneId | null>(null);

  // 🧠 Onthoud welke meshes al een uniek material kregen
  const initialized = useRef<Set<THREE.Mesh>>(new Set());

  /**
   * 🔧 INIT: clone material PER PLANE (1x)
   */
  useEffect(() => {
    scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      if (!obj.name.endsWith("_plane")) return;

      if (!initialized.current.has(obj)) {
        obj.material = (obj.material as THREE.Material).clone();
        initialized.current.add(obj);
      }
    });
  }, [scene]);

  /**
   * 🎨 KLEUR LOGICA
   */
useEffect(() => {
  scene.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh)) return;
    if (!obj.name.endsWith("_plane")) return;

    const zone = obj.name.replace("_plane", "") as ZoneId;
    const material = obj.material as THREE.MeshStandardMaterial;

    material.transparent = true;

    if (hoveredZone === zone) {
      material.colorWrite = true;          // 👈 NU TEKENEN
      material.opacity = 0.6;
      material.color.set("#ff9f1c");
    } else {
      material.colorWrite = false;         // 👈 NIET TEKENEN
      material.opacity = 0;                // safety
    }
  });
}, [scene, hoveredZone]);


  /**
   * 🖱️ POINTER MOVE
   */
  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    const hit = e.intersections.find(
      (i) =>
        i.object instanceof THREE.Mesh &&
        i.object.name.endsWith("_plane")
    );

    if (!hit) {
      setHoveredZone(null);
      document.body.style.cursor = "default";
      return;
    }

    const zone = hit.object.name.replace(
      "_plane",
      ""
    ) as ZoneId;

    setHoveredZone(zone);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    setHoveredZone(null);
    document.body.style.cursor = "default";
  };

  return {
    onPointerMove: handlePointerMove,
    onPointerOut: handlePointerOut,
  };
}
