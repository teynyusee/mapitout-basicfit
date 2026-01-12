import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { ThreeEvent } from "@react-three/fiber";
import type { ZoneId } from "../data/zones";
import { theme } from "../styles/theme";

const zoneHoverColor = new THREE.Color(theme.colors.primarySoft);

export function useZoneHover(
  scene: THREE.Object3D,
  activeZone: ZoneId
) {
  const [hoveredZone, setHoveredZone] = useState<ZoneId | null>(null);

  const initialized = useRef<Set<THREE.Mesh>>(new Set());

  const hoverAudioRef = useRef<HTMLAudioElement | null>(null);
  const lastHoveredZone = useRef<ZoneId | null>(null);

  useEffect(() => {
    hoverAudioRef.current = new Audio("/sounds/hover_sound.mp3");
    hoverAudioRef.current.volume = 0.4;
  }, []);

  useEffect(() => {
    scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      if (!obj.name.endsWith("_plane")) return;

      if (!initialized.current.has(obj)) {
        obj.material = (obj.material as THREE.Material).clone();
        initialized.current.add(obj);

        obj.userData.currentOpacity = 0;
        obj.userData.opacityTarget = 0;
      }
    });
  }, [scene]);

  useEffect(() => {
    scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      if (!obj.name.endsWith("_plane")) return;

      const zone = obj.name.replace("_plane", "") as ZoneId;

      obj.userData.opacityTarget =
        hoveredZone === zone ? 1 : 0;
    });
  }, [scene, hoveredZone]);

  useEffect(() => {
    let frameId: number;

    const animate = () => {
      scene.traverse((obj) => {
        if (!(obj instanceof THREE.Mesh)) return;
        if (!obj.name.endsWith("_plane")) return;

        const material = obj.material as THREE.MeshStandardMaterial;
        material.transparent = true;
        material.color.copy(zoneHoverColor);

        obj.userData.currentOpacity = THREE.MathUtils.lerp(
          obj.userData.currentOpacity ?? 0,
          obj.userData.opacityTarget ?? 0,
          0.12
        );

        material.opacity = obj.userData.currentOpacity;
        material.colorWrite = material.opacity > 0.01;
      });

      frameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frameId);
  }, [scene]);

  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (activeZone !== "overview") return;

    const hit = e.intersections.find(
      (i) =>
        i.object instanceof THREE.Mesh &&
        i.object.name.endsWith("_plane")
    );

    if (!hit) {
      setHoveredZone(null);
      lastHoveredZone.current = null;
      document.body.style.cursor = "default";
      return;
    }

    const zone = hit.object.name.replace("_plane", "") as ZoneId;

    if (lastHoveredZone.current !== zone) {
      hoverAudioRef.current?.pause();
      hoverAudioRef.current!.currentTime = 0;
      hoverAudioRef.current?.play().catch(() => {});
      lastHoveredZone.current = zone;
    }

    setHoveredZone(zone);
    document.body.style.cursor = "pointer";
  };

  const onPointerOut = () => {
    setHoveredZone(null);
    lastHoveredZone.current = null;
    document.body.style.cursor = "default";
  };

  const onClick = (e: ThreeEvent<MouseEvent>) => {
    if (activeZone !== "overview") return;

    const hit = e.intersections.find(
      (i) =>
        i.object instanceof THREE.Mesh &&
        i.object.name.endsWith("_plane")
    );

    if (!hit) return;

    setHoveredZone(null);
    lastHoveredZone.current = null;

    const zone = hit.object.name.replace("_plane", "") as ZoneId;

    window.dispatchEvent(
      new CustomEvent<ZoneId>("zone-change", {
        detail: zone,
      })
    );
  };

  return {
    onPointerMove: onPointerMove as (
      e: ThreeEvent<PointerEvent>
    ) => void,

    onPointerOut: onPointerOut as (
      e?: ThreeEvent<PointerEvent>
    ) => void,

    onClick: onClick as (
      e: ThreeEvent<MouseEvent>
    ) => void,
  };
}
