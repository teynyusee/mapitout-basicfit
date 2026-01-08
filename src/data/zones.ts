export type ZoneId = "home" | "overview" | "cardio" | "strength" | "free" | "dumbbells";

export const ZONE_LABELS: Record<ZoneId, string> = {
  home: "Home",
  overview: "Overzicht",
  cardio: "Cardiozone",
  strength: "Krachttraining",
  free: "Functionele zone",
  dumbbells: "Vrije gewichten",
};

export const ZONES: { id: ZoneId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "overview", label: "Overzicht" },
  { id: "cardio", label: "Cardiozone" },
  { id: "strength", label: "Krachttraining" },
  { id: "free", label: "Functionele zone" },
  { id: "dumbbells", label: "Vrije gewichten" },
];
