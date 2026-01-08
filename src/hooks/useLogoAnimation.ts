import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { theme } from "../styles/theme";

const logoHoverColor = new THREE.Color(theme.colors.primarySoft);

export function useLogoAnimation(
  scene: THREE.Object3D,
  activeZone: string
) {
  useFrame(() => {
    scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh) || obj.name !== "BASIC_FIT_LOGO") return;

      const mat = obj.material as THREE.MeshStandardMaterial;
      if (!mat) return;

      mat.transparent = true;

      if (!obj.userData.baseColor) {
        obj.userData.baseColor = mat.color.clone();
      }

      if (obj.userData.currentOpacity === undefined) {
        obj.userData.currentOpacity = 0;
      }

      const targetColor = obj.userData.hover
        ? logoHoverColor
        : obj.userData.baseColor;

      mat.color.lerp(targetColor, 0.08);

      const targetOpacity = activeZone === "home" ? 1 : 0;

      obj.userData.currentOpacity = THREE.MathUtils.lerp(
        obj.userData.currentOpacity,
        targetOpacity,
        0.08
      );

      mat.opacity = obj.userData.currentOpacity;

      if (mat.opacity < 0.05) {
        obj.userData.hover = false;
      }
    });
  });
}
