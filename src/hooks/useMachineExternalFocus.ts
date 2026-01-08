import { useEffect } from "react";
import type { RefObject } from "react";
import type { MachineConfig } from "../data/machines";
import * as THREE from "three";

type MachineEntry = {
  machine: MachineConfig;
  obj: THREE.Object3D;
  focused: boolean;
};

export function useMachineExternalFocus(
  machinesRef: RefObject<MachineEntry[]>,
  focusedMachineId?: string | null
) {
  useEffect(() => {
    if (!focusedMachineId) return;

    machinesRef.current?.forEach((m) => {
      m.focused = m.machine.id === focusedMachineId;
    });
  }, [focusedMachineId, machinesRef]);
}
