import { CARDIO_MACHINES } from "./cardio";
import { STRENGTH_MACHINES } from "./strength";
import { FREE_MACHINES } from "./free";
import { DUMBBELL_MACHINES } from "./dumbbells";

import type { MachineConfig } from "../machines";

export const ALL_MACHINES: MachineConfig[] = [
  ...CARDIO_MACHINES,
  ...STRENGTH_MACHINES,
  ...FREE_MACHINES,
  ...DUMBBELL_MACHINES,
];
