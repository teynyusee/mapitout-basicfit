import type { ZoneId } from "./zones";
import {
  Activity,
  Dumbbell,
  Brain,
  Weight,
} from "lucide-react";

export const HOME_CARDS: {
  id: ZoneId;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number }>;
}[] = [
  {
    id: "cardio",
    title: "Cardiozone",
    description:
      "Boost jouw uithoudingsvermogen met state-of-the-art apparatuur.",
    icon: Activity,
  },
  {
    id: "strength",
    title: "Krachttraining",
    description:
      "Bouw kracht en spiermassa met premium gewichten en machines.",
    icon: Dumbbell,
  },
  {
    id: "free",
    title: "Functionele zone",
    description:
      "Verbeter jouw bewegingskwaliteit en performance.",
    icon: Brain,
  },
  {
    id: "dumbbells",
    title: "Vrije gewichten",
    description:
      "Train klassiek en intens met dumbbells en barbells.",
    icon: Weight,
  },
];
