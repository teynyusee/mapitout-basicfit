import { useEffect } from "react";
import type { RefObject } from "react";
import type { MachineConfig } from "../data/machines";

type MachineEntry = {
  machine: MachineConfig;
  focused: boolean;
  focusTimer: number;
  blueFade: number;
};

const BLUE_ACTIVE_TIME = 3.5;

export function useMachineExternalFocus(
  machinesRef: RefObject<MachineEntry[]>,
  focusedMachine?: { id: string | null; tick: number }
) {
  useEffect(() => {
    if (!focusedMachine?.id) return;

    machinesRef.current?.forEach((m) => {
      const isTarget = m.machine.id === focusedMachine.id;

      if (isTarget) {
        // 🔥 ALTIJD resetten bij klik
        m.focusTimer = BLUE_ACTIVE_TIME;
        m.blueFade = 0;
      }

      m.focused = isTarget;
    });
  }, [focusedMachine?.tick]); // 👈 BELANGRIJK
}
