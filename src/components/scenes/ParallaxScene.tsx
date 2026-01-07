import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type Props = {
  scene: THREE.Object3D;
};

const ROTATION = {
  x: 0.02,
  y: 0.1,
};

const LERP_SPEED = 0.1;

export function ParallaxScene({ scene }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const targetX = pointer.y * ROTATION.x;
    const targetY = pointer.x * ROTATION.y;

    group.rotation.x = THREE.MathUtils.lerp(
      group.rotation.x,
      targetX,
      LERP_SPEED * delta * 60
    );

    group.rotation.y = THREE.MathUtils.lerp(
      group.rotation.y,
      targetY,
      LERP_SPEED * delta * 60
    );
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}
