import type { MachineConfig } from "../machines";

export const CARDIO_MACHINES: MachineConfig[] = [
  {
    id: "treadmill",
    meshName: "SM__TreadMill__main",
    zone: "cardio",
    info: {
      title: "Loopband",
      description:
        "De loopband is een veelzijdig cardioapparaat waarmee je kunt wandelen, joggen of lopen aan instelbare snelheden en hellingen. Ideaal voor conditieopbouw en vetverbranding.",
      category: "Cardio",
      tags: ["Lopen", "Conditie", "Vetverbranding"],
      muscleGroups: ["Benen", "Cardio"],
    },
    ui: {
      thumbnail: "/images/machines/treadmill.png",
    },
  },
  {
    id: "stepper",
    meshName: "machine__stepper__main",
    zone: "cardio",
    info: {
      title: "Stepper",
      description:
        "De stepper simuleert traplopen en biedt een intensieve cardiotraining met extra focus op bilspieren en bovenbenen.",
      category: "Cardio",
      tags: ["Benen", "Glutes"],
      muscleGroups: ["Benen", "Bilspieren"],
    },
    ui: {
      thumbnail: "/images/machines/stepper.png",
    },
  },
  {
    id: "elliptical",
    meshName: "SM__Eleptical__Trainer__main",
    zone: "cardio",
    info: {
      title: "Crosstrainer",
      description:
        "De crosstrainer combineert arm- en beenbewegingen voor een vloeiende full-body cardiotraining met lage impact op de gewrichten.",
      category: "Cardio",
      tags: ["Full Body", "Low Impact"],
      muscleGroups: ["Benen", "Armen", "Cardio"],
    },
    ui: {
      thumbnail: "/images/machines/elliptical.png",
    },
  },
  {
    id: "virtual-bike",
    meshName: "SM__VirtualBike",
    zone: "cardio",
    info: {
      title: "Virtuele Fiets",
      description:
        "Een moderne fietstrainer die cardiovasculaire conditie verbetert en vaak gecombineerd wordt met virtuele routes.",
      category: "Cardio",
      tags: ["Fietsen", "Conditie"],
      muscleGroups: ["Benen", "Cardio"],
    },
    ui: {
      thumbnail: "/images/machines/virtual-bike.png",
    },
  },
  {
    id: "stationary-bike",
    meshName: "SM_Stationary__Bike",
    zone: "cardio",
    info: {
      title: "Hometrainer",
      description:
        "De hometrainer is ideaal voor langdurige cardiotraining met minimale belasting op de gewrichten.",
      category: "Cardio",
      tags: ["Fietsen", "Low Impact"],
      muscleGroups: ["Benen", "Cardio"],
    },
    ui: {
      thumbnail: "/images/machines/stationary-bike.png",
    },
  },
];
