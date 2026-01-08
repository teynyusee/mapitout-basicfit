import type * as THREE from "three";

export function useRaycastHits(
  camera: THREE.Camera,
  scene: THREE.Scene,
  raycaster: THREE.Raycaster,
  pointer: THREE.Vector2
) {
  return () => {
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObjects(
      scene.children,
      true
    );
  };
}
