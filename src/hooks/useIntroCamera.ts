import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

export function IntroCamera() {
  const state = useThree();

  useEffect(() => {
    // 👇 expliciet casten (fix voor ESLint + TS)
    const camera = state.camera as THREE.OrthographicCamera;
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);

    camera.updateProjectionMatrix();
  }, [state]);

  return null;
}
