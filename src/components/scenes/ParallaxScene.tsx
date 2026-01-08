import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type Props = {
  scene: THREE.Object3D;
  onPointerMove?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: () => void;
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
};

export function ParallaxScene({
  scene,
  onPointerMove,
  onPointerOut,
  onClick,
}: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    group.rotation.x = THREE.MathUtils.lerp(
      group.rotation.x,
      pointer.y * 0.02,
      delta * 6
    );
    group.rotation.y = THREE.MathUtils.lerp(
      group.rotation.y,
      pointer.x * 0.1,
      delta * 6
    );
  });

  return (
    <group
      ref={groupRef}
      onPointerMove={onPointerMove}
      onPointerOut={onPointerOut}
      onClick={onClick}
    >
      <primitive object={scene} />
    </group>
  );
}
