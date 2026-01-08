import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { ThreeEvent } from "@react-three/fiber";
import type { ZoneId } from "../data/zones";

export function useZoneHover(
  scene: THREE.Object3D,
  activeZone: ZoneId
) {
  const [hoveredZone, setHoveredZone] = useState<ZoneId | null>(null);
  const initialized = useRef<Set<THREE.Mesh>>(new Set());

  /**
   * 1️⃣ Clone material per plane (1x)
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
   * 2️⃣ Visibility logic (colorWrite)
   */
  useEffect(() => {
    scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      if (!obj.name.endsWith("_plane")) return;

      const zone = obj.name.replace("_plane", "") as ZoneId;
      const material = obj.material as THREE.MeshStandardMaterial;

      material.transparent = true;

      if (hoveredZone === zone) {
        material.colorWrite = true;
        material.opacity = 1;
        material.color.set("#ff9f1c");
      } else {
        material.colorWrite = false;
        material.opacity = 0;
      }
    });
  }, [scene, hoveredZone]);

  /**
   * 3️⃣ Hover detectie via intersections
   */
    const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (activeZone !== "overview") return;

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

    const zone = hit.object.name.replace("_plane", "") as ZoneId;
    setHoveredZone(zone);
    document.body.style.cursor = "pointer";
    };


  const onPointerOut = () => {
    setHoveredZone(null);
    document.body.style.cursor = "default";
  };

  /**
   * 4️⃣ CLICK → zone-change event (zelfde als NavBar)
   */
const onClick = (e: ThreeEvent<MouseEvent>) => {
  if (activeZone !== "overview") return; // 👈 BLOKKEER CLICK

  const hit = e.intersections.find(
    (i) =>
      i.object instanceof THREE.Mesh &&
      i.object.name.endsWith("_plane")
  );

  if (!hit) return;

  const zone = hit.object.name.replace("_plane", "") as ZoneId;

  window.dispatchEvent(
    new CustomEvent<ZoneId>("zone-change", {
      detail: zone,
    })
  );
};


  return {
    onPointerMove,
    onPointerOut,
    onClick,
  };
}
