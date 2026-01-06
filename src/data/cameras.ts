import type { ZoneId } from "./zones";

export const CAMERA_NAMES: Record<
  ZoneId,
  {
    main: string;
    views?: string[];
  }
> = {
  overview: {
    main: "Camera_Overview",
  },

  cardio: {
    main: "Camera_Cardio_A",
    views: ["Camera_Cardio_A", "Camera_Cardio_B"],
  },

  strength: {
    main: "Camera_Strength_A",
    views: ["Camera_Strength_A", "Camera_Strength_B"],
  },

  free: {
    main: "Camera_Free",
    views: ["Camera_Free_A", "Camera_Free_B"],
  },

  dumbbells: {
    main: "Camera_Dumbbells_B",
    views: ["Camera_Dumbbells_B", "Camera_Dumbbells_A", ],
  },
};
