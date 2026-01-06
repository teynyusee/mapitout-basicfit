import type { ZoneId } from "./zones";

export type MachineConfig = {
  id: string;

  // 👇 exact de naam van het ROOT object in Blender
  meshName: string;

  // 👇 zone waarin deze machine actief is
  zone: ZoneId;

  // 👇 UI info
  info: {
    title: string;
    description: string;
  };
};

export const MACHINES: MachineConfig[] = [
  {
    id: "treadmill",
    meshName: "SM__TreadMill__main",
    zone: "cardio",
    info: {
      title: "Treadmill",
      description: "Ideaal voor cardio en conditie.",
    },
  },
  {
    id: "stepper",
    meshName: "machine__stepper__main",
    zone: "cardio",
    info: {
      title: "Stair Stepper",
      description: "Versterkt benen en billen.",
    },
  },
  {
    id: "elliptical",
    meshName: "SM__Eleptical__Trainer__main",
    zone: "cardio",
    info: {
      title: "Elliptical Trainer",
      description: "Full-body cardio met lage impact.",
    },
  },

  // 👉 later:
  // strength machines
  // free weights
  // dumbbells
];
