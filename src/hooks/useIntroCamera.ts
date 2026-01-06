import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

export function IntroCamera() {
  const { camera } = useThree();

  const targetPos = useRef(new THREE.Vector3(0, 1.6, 6));
  const targetLook = useRef(new THREE.Vector3(0, 1.4, 0));
  const look = useRef(new THREE.Vector3());

  useFrame(() => {
    camera.position.lerp(targetPos.current, 0.08);
    look.current.lerp(targetLook.current, 0.08);
    camera.lookAt(look.current);
  });

  return null;
}
