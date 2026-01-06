import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function LogoScene({
  onClick,
}: {
  onClick: () => void;
}) {
  const { scene } = useGLTF("/models/basic-fit_logo3D.glb");
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!group.current) return;

    // 🎯 subtiele target rotatie op basis van muis
    const targetRotY = pointer.x * 0.35;
    const targetRotX = pointer.y * 0.15;

    // 🧈 smooth lerp
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetRotY,
      0.08
    );

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetRotX,
      0.08
    );
  });

  return (
    <group
      ref={group}
      position={[0, -2.4, 0]}
      scale={4}
      onClick={onClick}
    >
      <primitive object={scene} />
    </group>
  );
}
