import type { ZoneId } from "./zones";
import { ALL_MACHINES } from "./machines/index";

export type MachineConfig = {
  id: string;
  meshName: string;
  zone: ZoneId;

  info: {
    title: string;
    description: string;
    category: string;
    tags: string[];
    muscleGroups: string[];
  };

  ui?: {
    thumbnail: string;
  };
};

export const MACHINES: MachineConfig[] = ALL_MACHINES;
export const MACHINES_BY_MESH = Object.fromEntries(
  MACHINES.map((machine) => [machine.meshName, machine])
);
export const MACHINES_BY_ID = Object.fromEntries(
  MACHINES.map((machine) => [machine.id, machine])
);
