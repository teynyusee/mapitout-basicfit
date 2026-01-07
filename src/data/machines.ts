import type { ZoneId } from "./zones";

/* -------------------------------------------------
   TYPES
------------------------------------------------- */

export type MachineDifficulty = "Beginner" | "Intermediate" | "Advanced";

export type MachineConfig = {
  id: string;
  meshName: string;
  zone: ZoneId;

  info: {
    title: string;
    description: string;

    // UI / extra info
    category: string;
    tags: string[];
    difficulty: MachineDifficulty;
    muscleGroups: string[];
  };

  previewCamera?: {
    position: [number, number, number];
    fov?: number;
  };
};

/* -------------------------------------------------
   MACHINES
------------------------------------------------- */

export const MACHINES: MachineConfig[] = [
  // 🏃 CARDIO
  {
    id: "treadmill",
    meshName: "SM__TreadMill__main",
    zone: "cardio",
    info: {
      title: "Treadmill",
      description: "Ideaal voor cardio en conditie.",
      category: "Cardio",
      tags: ["Running", "Endurance", "Fat Burn"],
      difficulty: "Beginner",
      muscleGroups: ["Legs", "Cardio"],
    },
    previewCamera: {
      position: [0, 1.1, 2.4],
      fov: 38,
    },
  },
  {
    id: "stepper",
    meshName: "machine__stepper__main",
    zone: "cardio",
    info: {
      title: "Stair Stepper",
      description: "Versterkt benen en billen.",
      category: "Cardio",
      tags: ["Stairs", "Glutes", "Endurance"],
      difficulty: "Beginner",
      muscleGroups: ["Glutes", "Legs"],
    },
  },
  {
    id: "elliptical",
    meshName: "SM__Eleptical__Trainer__main",
    zone: "cardio",
    info: {
      title: "Elliptical Trainer",
      description: "Full-body cardio met lage impact.",
      category: "Cardio",
      tags: ["Low Impact", "Full Body"],
      difficulty: "Beginner",
      muscleGroups: ["Legs", "Arms", "Cardio"],
    },
  },

  // 🏋️ STRENGTH MACHINES
  {
    id: "lateral-raises",
    meshName: "SM__LateralRaises",
    zone: "strength",
    info: {
      title: "Lateral Raise Machine",
      description:
        "Gericht op de middelste schouderkop voor bredere schouders.",
      category: "Strength",
      tags: ["Shoulders", "Isolation"],
      difficulty: "Intermediate",
      muscleGroups: ["Shoulders"],
    },
  },
  {
    id: "lower-back",
    meshName: "SM__LowerBack",
    zone: "strength",
    info: {
      title: "Lower Back Extension",
      description: "Versterkt de onderrug en core-stabiliteit.",
      category: "Strength",
      tags: ["Lower Back", "Core"],
      difficulty: "Beginner",
      muscleGroups: ["Lower Back", "Core"],
    },
  },
  {
    id: "pec-fly",
    meshName: "SM__PecFly__main",
    zone: "strength",
    info: {
      title: "Pec Fly",
      description: "Isoleert de borstspieren en verbetert spierdefinitie.",
      category: "Strength",
      tags: ["Chest", "Isolation"],
      difficulty: "Beginner",
      muscleGroups: ["Chest"],
    },
  },
  {
    id: "lat-pulldown",
    meshName: "SM__PullDown__main",
    zone: "strength",
    info: {
      title: "Lat Pulldown",
      description: "Richt zich op de brede rugspieren (lats).",
      category: "Strength",
      tags: ["Back", "Lats"],
      difficulty: "Beginner",
      muscleGroups: ["Back"],
    },
  },
  {
    id: "seated-leg-curl",
    meshName: "SM__Seated__LegCurl",
    zone: "strength",
    info: {
      title: "Seated Leg Curl",
      description:
        "Isoleert de hamstrings aan de achterkant van de benen.",
      category: "Strength",
      tags: ["Legs", "Hamstrings"],
      difficulty: "Beginner",
      muscleGroups: ["Hamstrings"],
    },
  },
  {
    id: "biceps-curl",
    meshName: "SM_BicepsCurl",
    zone: "strength",
    info: {
      title: "Biceps Curl Machine",
      description:
        "Gecontroleerde bicepstraining met constante spanning.",
      category: "Strength",
      tags: ["Arms", "Biceps"],
      difficulty: "Beginner",
      muscleGroups: ["Biceps"],
    },
  },
  {
    id: "leg-press",
    meshName: "SM_LegPress",
    zone: "strength",
    info: {
      title: "Leg Press",
      description:
        "Krachttraining voor quadriceps, hamstrings en bilspieren.",
      category: "Strength",
      tags: ["Legs", "Compound"],
      difficulty: "Beginner",
      muscleGroups: ["Quadriceps", "Glutes", "Hamstrings"],
    },
  },
  {
    id: "chest-press",
    meshName: "SM_ChessPress",
    zone: "strength",
    info: {
      title: "Chest Press",
      description:
        "Gecontroleerde borsttraining met vaste bewegingsbaan.",
      category: "Strength",
      tags: ["Chest", "Push"],
      difficulty: "Beginner",
      muscleGroups: ["Chest", "Triceps"],
    },
  },

  // 🏋️ FREE WEIGHTS / FUNCTIONAL
  {
    id: "aerobic-mat",
    meshName: "SM__AerobicMat",
    zone: "free",
    info: {
      title: "Aerobic Mat",
      description:
        "Voor core-oefeningen, stretching en lichaamsgewichttraining.",
      category: "Functional",
      tags: ["Core", "Stretching"],
      difficulty: "Beginner",
      muscleGroups: ["Core"],
    },
  },
  {
    id: "barbell-rack",
    meshName: "SM__Barble__FixRack",
    zone: "free",
    info: {
      title: "Barbell Rack",
      description:
        "Vrije haltertraining voor compound lifts zoals squats en presses.",
      category: "Free Weights",
      tags: ["Barbell", "Compound"],
      difficulty: "Advanced",
      muscleGroups: ["Full Body"],
    },
  },
  {
    id: "decline-bench",
    meshName: "SM__DeclinedBench",
    zone: "free",
    info: {
      title: "Decline Bench",
      description:
        "Bench met negatieve hoek voor onderste borstspieren.",
      category: "Free Weights",
      tags: ["Bench", "Chest"],
      difficulty: "Intermediate",
      muscleGroups: ["Chest"],
    },
  },
  {
    id: "flat-bench-press",
    meshName: "SM__Flat__Press__main",
    zone: "free",
    info: {
      title: "Flat Bench Press",
      description:
        "Klassieke barbell oefening voor borst, schouders en triceps.",
      category: "Free Weights",
      tags: ["Bench Press", "Compound"],
      difficulty: "Advanced",
      muscleGroups: ["Chest", "Shoulders", "Triceps"],
    },
  },
  {
    id: "incline-bench",
    meshName: "SM__InclinedBench",
    zone: "free",
    info: {
      title: "Incline Bench",
      description: "Richt zich op de bovenste borstspieren.",
      category: "Free Weights",
      tags: ["Upper Chest"],
      difficulty: "Intermediate",
      muscleGroups: ["Upper Chest"],
    },
  },

  // 🏋️ DUMBBELLS
  {
    id: "dumbbell-rack",
    meshName: "SM__DumbbellReck",
    zone: "dumbbells",
    info: {
      title: "Dumbbell Rack",
      description:
        "Vrije gewichten voor isolatie- en compound oefeningen.",
      category: "Dumbbells",
      tags: ["Free Weights"],
      difficulty: "Beginner",
      muscleGroups: ["Full Body"],
    },
  },
];
