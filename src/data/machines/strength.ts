import type { MachineConfig } from "../machines";

export const STRENGTH_MACHINES: MachineConfig[] = [
  {
    id: "hip-adduction",
    meshName: "SM__HipAdduction",
    zone: "strength",
    info: {
      title: "Hip Adduction",
      description:
        "De hip adduction machine traint de binnenkant van de bovenbenen en draagt bij aan heupstabiliteit.",
      category: "Kracht",
      tags: ["Benen", "Heupen"],
      muscleGroups: ["Adductoren"],
    },
    ui: {
      thumbnail: "/images/machines/hip-adduction.png",
    },
  },
  {
    id: "lateral-raise",
    meshName: "SM__LateralRaises",
    zone: "strength",
    info: {
      title: "Lateral Raise",
      description:
        "Isolatiemachine voor de middelste schouderkop, ideaal voor bredere schouders.",
      category: "Kracht",
      tags: ["Schouders", "Isolatie"],
      muscleGroups: ["Schouders"],
    },
    ui: {
      thumbnail: "/images/machines/lateral-raise.png",
    },
  },
  {
    id: "lower-back",
    meshName: "SM__LowerBack",
    zone: "strength",
    info: {
      title: "Lower Back Extension",
      description:
        "Versterkt de onderrug en ondersteunt een goede houding en core-stabiliteit.",
      category: "Kracht",
      tags: ["Onderrug", "Core"],
      muscleGroups: ["Onderrug", "Core"],
    },
    ui: {
      thumbnail: "/images/machines/lower-back.png",
    },
  },
  {
    id: "pec-fly",
    meshName: "SM__PecFly__main",
    zone: "strength",
    info: {
      title: "Pec Fly",
      description:
        "Isolatie-oefening voor de borstspieren met gecontroleerde spanning.",
      category: "Kracht",
      tags: ["Borst", "Isolatie"],
      muscleGroups: ["Borst"],
    },
    ui: {
      thumbnail: "/images/machines/pec-fly.png",
    },
  },
  {
    id: "lat-pulldown",
    meshName: "SM__PullDown__main",
    zone: "strength",
    info: {
      title: "Lat Pulldown",
      description:
        "Trekoefening voor een brede en sterke rug.",
      category: "Kracht",
      tags: ["Rug", "Lats"],
      muscleGroups: ["Rug"],
    },
    ui: {
      thumbnail: "/images/machines/lat-pulldown.png",
    },
  },
  {
    id: "seated-leg-curl",
    meshName: "SM__Seated__LegCurl",
    zone: "strength",
    info: {
      title: "Zittende Leg Curl",
      description:
        "Gerichte isolatie van de hamstrings in een stabiele houding.",
      category: "Kracht",
      tags: ["Benen", "Hamstrings"],
      muscleGroups: ["Hamstrings"],
    },
    ui: {
      thumbnail: "/images/machines/seated-leg-curl.png",
    },
  },
  {
    id: "biceps-curl",
    meshName: "SM_BicepsCurl",
    zone: "strength",
    info: {
      title: "Biceps Curl",
      description:
        "Gecontroleerde bicepstraining zonder vals spelen.",
      category: "Kracht",
      tags: ["Armen"],
      muscleGroups: ["Biceps"],
    },
    ui: {
      thumbnail: "/images/machines/biceps-curl.png",
    },
  },
  {
    id: "chest-press",
    meshName: "SM_ChestPress",
    zone: "strength",
    info: {
      title: "Chest Press",
      description:
        "Veilige borsttraining met vaste bewegingsbaan.",
      category: "Kracht",
      tags: ["Borst", "Triceps"],
      muscleGroups: ["Borst", "Triceps"],
    },
    ui: {
      thumbnail: "/images/machines/chest-press.png",
    },
  },
  {
    id: "leg-press",
    meshName: "SM_LegPress",
    zone: "strength",
    info: {
      title: "Leg Press",
      description:
        "Compound oefening voor het onderlichaam met ondersteuning van de rug.",
      category: "Kracht",
      tags: ["Benen", "Compound"],
      muscleGroups: ["Quadriceps", "Hamstrings", "Bilspieren"],
    },
    ui: {
      thumbnail: "/images/machines/leg-press.png",
    },
  },
];
