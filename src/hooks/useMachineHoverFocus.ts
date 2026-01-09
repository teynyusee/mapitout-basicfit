import * as THREE from "three";
import type { MachineEntry } from "./useMachinesSetup";

const HOVER_BLUE_TIME = 0.6;

export function useMachineHoverFocus(
  machinesRef: React.MutableRefObject<MachineEntry[]>
) {
  return (root: THREE.Object3D | null) => {
    machinesRef.current.forEach((m) => {
      const isTarget = root === m.obj;

      if (isTarget) {
        m.focused = true;
        m.focusTimer = HOVER_BLUE_TIME;
        m.blueFade = 0;
      } else {
        m.focused = false;
      }
    });
  };
}
