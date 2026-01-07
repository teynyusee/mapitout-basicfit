import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export function LogoScene({
  onClick,
  fadingOut,
}: {
  onClick: () => void;
  fadingOut: boolean;
}) {
  const { scene } = useGLTF("/models/basic-fit_logo3D.glb");
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  const opacity = useRef(0);

  useEffect(() => {
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        const material = mesh.material as THREE.Material;
        material.transparent = true;
        material.opacity = 1;
      }
    });
  }, [scene]);

  useFrame(() => {
    if (!group.current) return;

    if (!fadingOut) {
      opacity.current = THREE.MathUtils.lerp(
        opacity.current,
        1,
        0.05
      );

      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        pointer.x * 0.25,
        0.08
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointer.y * 0.15,
        0.08
      );
    } else {
      // ❗ Alleen fade-out, geen movement
      opacity.current = THREE.MathUtils.lerp(
        opacity.current,
        0,
        0.08 // sneller
      );
    }

    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        const material = mesh.material as THREE.Material;
        material.opacity = opacity.current;
      }
    });
  });

  return (
    <group
      ref={group}
      position={[-0.2, -3.5, 0]}
      scale={5} // 👈 groter logo
      onClick={!fadingOut ? onClick : undefined}
    >
      <primitive object={scene} />
    </group>
  );
}
