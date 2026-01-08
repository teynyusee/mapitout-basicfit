export type ZoneId = "home" | "overview" | "cardio" | "strength" | "free" | "dumbbells";

export const ZONE_LABELS: Record<ZoneId, string> = {
  home: "Home",
  overview: "Overzicht",
  cardio: "Cardio",
  strength: "Strength",
  free: "Free",
  dumbbells: "Dumbbells",
};

export const ZONES: { id: ZoneId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "overview", label: "Overzicht" },
  { id: "cardio", label: "Cardio" },
  { id: "strength", label: "Strength" },
  { id: "free", label: "Free" },
  { id: "dumbbells", label: "Dumbbells" },
];
