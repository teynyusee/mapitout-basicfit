import type * as THREE from "three";
import type { ZoneId } from "../../../../data/zones";
import type { MachineConfig } from "../../../../data/machines";
import { findMachineRoot } from "./findMachineRoot";

export function resolveMachineHit(
  hits: THREE.Intersection[],
  activeZone: ZoneId,
  lookup: Map<string, MachineConfig>
) {
  for (const hit of hits) {
    const result = findMachineRoot(hit.object, lookup);
    if (result && result.machine.zone === activeZone) {
      return result;
    }
  }
  return null;
}
