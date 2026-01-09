import type { MachineConfig } from "../machines";

export const DUMBBELL_MACHINES: MachineConfig[] = [
  {
    id: "dumbbell-bench",
    meshName: "SM__Bench__main",
    zone: "dumbbells",
    info: {
      title: "Dumbbell Bench",
      description:
        "Bench voor oefeningen met dumbbells zoals presses en rows.",
      category: "Dumbbells",
      tags: ["Bench", "Free Weights"],
      muscleGroups: ["Borst", "Schouders", "Armen"],
    },
    ui: {
      thumbnail: "/images/machines/dumbbell-bench.png",
    },
  },
  {
    id: "dumbbell-rack",
    meshName: "SM__DumbbellReck",
    zone: "dumbbells",
    info: {
      title: "Dumbbell Rack",
      description:
        "Rek met dumbbells in verschillende gewichten.",
      category: "Dumbbells",
      tags: ["Free Weights"],
      muscleGroups: ["Full Body"],
    },
    ui: {
      thumbnail: "/images/machines/dumbbell-rack.png",
    },
  },
  {
    id: "dumbbell-station",
    meshName: "SM__Station",
    zone: "dumbbells",
    info: {
      title: "Dumbbell Station",
      description:
        "Zone voor functionele training met dumbbells.",
      category: "Dumbbells",
      tags: ["Functional"],
      muscleGroups: ["Full Body"],
    },
    ui: {
      thumbnail: "/images/machines/dumbbell-station.png",
    },
  },
  {
    id: "leg-press",
    meshName: "SM__LegPress__main",
    zone: "dumbbells",
    info: {
      title: "Leg Press",
      description:
        "Onderlichaamstraining met focus op kracht en stabiliteit.",
      category: "Kracht",
      tags: ["Benen", "Compound"],
      muscleGroups: ["Quadriceps", "Hamstrings", "Bilspieren"],
    },
    ui: {
      thumbnail: "/images/machines/leg-press.png",
    },
  },
];
