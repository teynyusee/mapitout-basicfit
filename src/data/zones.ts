export type ZoneId = "overview" | "cardio" | "strength" | "free" | "dumbbells";

export const ZONES: { id: ZoneId; label: string }[] = [
  { id: "overview", label: "Overzicht" },
  { id: "cardio", label: "Cardio" },
  { id: "strength", label: "Strength" },
  { id: "free", label: "Free" },
  { id: "dumbbells", label: "Dumbbells" },
];
