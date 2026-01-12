import * as THREE from "three";
import { useEffect, useRef } from "react";
import type { MachineEntry } from "./useMachinesSetup";

const HOVER_BLUE_TIME = 0.6;

export function useMachineHoverFocus(
  machinesRef: React.MutableRefObject<MachineEntry[]>
) {
  const focusAudioRef = useRef<HTMLAudioElement | null>(
    null
  );
  const lastFocusedMachine =
    useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    focusAudioRef.current = new Audio(
      "/sounds/hover_sound.mp3"
    );
    focusAudioRef.current.volume = 0.35;
  }, []);

  return (root: THREE.Object3D | null) => {
    machinesRef.current.forEach((m) => {
      const isTarget = root === m.obj;

      if (isTarget) {
        // 🔊 Play sound only when NEW machine is focused
        if (lastFocusedMachine.current !== m.obj) {
          focusAudioRef.current?.pause();
          focusAudioRef.current!.currentTime = 0;
          focusAudioRef.current
            ?.play()
            .catch(() => {});
          lastFocusedMachine.current = m.obj;
        }

        m.focused = true;
        m.focusTimer = HOVER_BLUE_TIME;
        m.blueFade = 0;
      } else {
        m.focused = false;
      }
    });

    if (!root) {
      lastFocusedMachine.current = null;
    }
  };
}
