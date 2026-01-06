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
  // 🏋️ STRENGTH MACHINES
  {
    id: "lateral-raises",
    meshName: "SM__LateralRaises",
    zone: "strength",
    info: {
      title: "Lateral Raise Machine",
      description:
        "Gericht op de middelste schouderkop voor bredere schouders.",
    },
  },
  {
    id: "lower-back",
    meshName: "SM__LowerBack",
    zone: "strength",
    info: {
      title: "Lower Back Extension",
      description:
        "Versterkt de onderrug en core-stabiliteit.",
    },
  },
  {
    id: "pec-fly",
    meshName: "SM__PecFly__main",
    zone: "strength",
    info: {
      title: "Pec Fly",
      description:
        "Isoleert de borstspieren en verbetert spierdefinitie.",
    },
  },
  {
    id: "lat-pulldown",
    meshName: "SM__PullDown__main",
    zone: "strength",
    info: {
      title: "Lat Pulldown",
      description:
        "Richt zich op de brede rugspieren (lats).",
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
    },
  },
    {
    id: "SM_ChessPress",
    meshName: "SM_ChessPress",
    zone: "strength",
    info: {
      title: "Chest Press",
      description:
        "Krachttraining voor quadriceps, hamstrings en bilspieren.",
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
    },
  },
  {
    id: "incline-bench",
    meshName: "SM__InclinedBench",
    zone: "free",
    info: {
      title: "Incline Bench",
      description:
        "Richt zich op de bovenste borstspieren.",
    },
  },
  {
    id: "leg-raise-station",
    meshName: "SM__LegRaise",
    zone: "free",
    info: {
      title: "Leg Raise Station",
      description:
        "Core-oefening voor buikspieren en heupflexoren.",
    },
  },
  {
    id: "smith-machine",
    meshName: "SM__Smith__Machine",
    zone: "free",
    info: {
      title: "Smith Machine",
      description:
        "Begeleide barbell voor gecontroleerde compound oefeningen.",
    },
  },
  {
    id: "back-extension",
    meshName: "SM__BackExtensions",
    zone: "free",
    info: {
      title: "Back Extension",
      description:
        "Versterkt onderrug en posterior chain.",
    },
  },
  {
    id: "kettlebell",
    meshName: "SM__Kettle__Bell",
    zone: "free",
    info: {
      title: "Kettlebell",
      description:
        "Functionele kracht- en conditionele training.",
    },
  },
  // 🏋️ DUMBBELLS ZONE
{
  id: "dumbbell-bench",
  meshName: "SM__Bench__main",
  zone: "dumbbells",
  info: {
    title: "Training Bench",
    description:
      "Verstelbare bank voor dumbbell presses, rows en flyes.",
  },
},
{
  id: "dumbbell-rack",
  meshName: "SM__DumbbellReck",
  zone: "dumbbells",
  info: {
    title: "Dumbbell Rack",
    description:
      "Vrije gewichten voor isolatie- en compound oefeningen.",
  },
},
{
  id: "squat-rack",
  meshName: "SM__Squat__Reck",
  zone: "dumbbells",
  info: {
    title: "Squat Rack",
    description:
      "Vrije barbell training voor squats, presses en pulls.",
  },
},
{
  id: "functional-station",
  meshName: "SM__Station",
  zone: "dumbbells",
  info: {
    title: "Functional Station",
    description:
      "Multifunctionele zone voor vrije en functionele training.",
  },
},
{
  id: "leg-press-dumbbells",
  meshName: "SM__LegPress__main",
  zone: "dumbbells",
  info: {
    title: "Leg Press",
    description:
      "Krachttraining voor benen met gecontroleerde beweging.",
  },
},


];
