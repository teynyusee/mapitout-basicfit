import { theme } from "../styles/theme";
import * as THREE from "three";

export const SCENE_CONFIG = {
  glowColor: new THREE.Color(theme.colors.primary),
  selectedMachine: new THREE.Color(theme.colors.selectColor),

  maxGlowIntensity: 0.35,

  liftHeight: 0.6,
  floatSpeed: 1.1,
  rotationAmount: 0.08,

  activationSpeed: 1.2,
} as const;
