import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function LogoScene({
  onClick,
  fading,
}: {
  onClick: () => void;
  fading: boolean;
}) {
  const { scene } = useGLTF("/models/basic-fit_logo3D.glb");
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!group.current) return;

    if (!fading) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        pointer.x * 0.35,
        0.08
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointer.y * 0.15,
        0.08
      );
    } else {
      group.current.scale.lerp(
        new THREE.Vector3(0.75, 0.75, 0.75),
        0.05
      );
      group.current.position.y = THREE.MathUtils.lerp(
        group.current.position.y,
        -6,
        0.05
      );
    }
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
