import * as THREE from "three";
import type { MachineConfig } from "../../../../data/machines";

export function findMachineRoot(
  object: THREE.Object3D | null,
  lookup: Map<string, MachineConfig>
) {
  let current = object;

  while (current) {
    const machine = lookup.get(current.name);
    if (machine) {
      return { machine, root: current };
    }
    current = current.parent;
  }

  return null;
}
