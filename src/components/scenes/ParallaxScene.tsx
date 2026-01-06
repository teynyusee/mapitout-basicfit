import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

export function ParallaxScene({ scene }: { scene: THREE.Object3D }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;

    const targetRotX = pointer.y * 0.05;
    const targetRotY = pointer.x * 0.1;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.1
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      0.1
    );
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}
