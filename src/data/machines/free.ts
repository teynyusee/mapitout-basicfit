import type { MachineConfig } from "../machines";

export const FREE_MACHINES: MachineConfig[] = [
  {
    id: "aerobic-mat",
    meshName: "SM__AerobicMat",
    zone: "free",
    info: {
      title: "Aerobic Mat",
      description:
        "Mat voor core-oefeningen, stretching en lichaamsgewichttraining.",
      category: "Free",
      tags: ["Core", "Stretching"],
      muscleGroups: ["Core"],
    },
    ui: {
      thumbnail: "/images/machines/aerobic-mat.png",
    },
  },
  {
    id: "barbell-fix-rack",
    meshName: "SM__Barble__FixRack",
    zone: "free",
    info: {
      title: "Barbell Rack",
      description:
        "Rack met halters voor zware compound oefeningen.",
      category: "Free Weights",
      tags: ["Barbell", "Compound"],
      muscleGroups: ["Full Body"],
    },
    ui: {
      thumbnail: "/images/machines/barbell-fix-rack.png",
    },
  },
  {
    id: "decline-bench",
    meshName: "SM__DeclinedBench",
    zone: "free",
    info: {
      title: "Decline Bench",
      description:
        "Bench met negatieve hoek voor focus op de onderste borst.",
      category: "Free Weights",
      tags: ["Bench", "Chest"],
      muscleGroups: ["Borst"],
    },
    ui: {
      thumbnail: "/images/machines/decline-bench.png",
    },
  },
  {
    id: "flat-bench-press",
    meshName: "SM__Flat__Press__main",
    zone: "free",
    info: {
      title: "Flat Bench Press",
      description:
        "Klassieke bench press voor borst, schouders en triceps.",
      category: "Free Weights",
      tags: ["Bench Press", "Compound"],
      muscleGroups: ["Borst", "Schouders", "Triceps"],
    },
    ui: {
      thumbnail: "/images/machines/flat-bench-press.png",
    },
  },
  {
    id: "incline-bench",
    meshName: "SM__InclinedBench",
    zone: "free",
    info: {
      title: "Incline Bench",
      description:
        "Bench met helling voor extra focus op de bovenste borst.",
      category: "Free Weights",
      tags: ["Upper Chest"],
      muscleGroups: ["Borst", "Schouders"],
    },
    ui: {
      thumbnail: "/images/machines/incline-bench.png",
    },
  },
  {
    id: "leg-raise",
    meshName: "SM__LegRaise",
    zone: "free",
    info: {
      title: "Leg Raise Station",
      description:
        "Station voor buikspieroefeningen en core training.",
      category: "Free",
      tags: ["Core"],
      muscleGroups: ["Buikspieren"],
    },
    ui: {
      thumbnail: "/images/machines/leg-raise.png",
    },
  },
  {
    id: "smith-machine",
    meshName: "SM__Smith__Machine",
    zone: "free",
    info: {
      title: "Smith Machine",
      description:
        "Machine met vaste bewegingsbaan voor gecontroleerde compound oefeningen.",
      category: "Free Weights",
      tags: ["Compound"],
      muscleGroups: ["Full Body"],
    },
    ui: {
      thumbnail: "/images/machines/smith-machine.png",
    },
  },
  {
    id: "back-extension",
    meshName: "SM_BackExtensions",
    zone: "free",
    info: {
      title: "Back Extension",
      description:
        "Oefening voor het versterken van de onderrug en core.",
      category: "Free",
      tags: ["Lower Back", "Core"],
      muscleGroups: ["Onderrug", "Core"],
    },
    ui: {
      thumbnail: "/images/machines/back-extension.png",
    },
  },
  {
    id: "kettlebell",
    meshName: "SM__Kettlle__Bell",
    zone: "free",
    info: {
      title: "Kettlebell",
      description:
        "Vrij gewicht voor functionele en explosieve training.",
      category: "Free Weights",
      tags: ["Functional"],
      muscleGroups: ["Full Body"],
    },
    ui: {
      thumbnail: "/images/machines/kettlebell.png",
    },
  },
];
