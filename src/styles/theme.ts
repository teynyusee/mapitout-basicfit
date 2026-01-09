export const theme = {
  /* ================= COLORS ================= */
  colors: {
    background: "#0a0a0a",
    surface: "#121212",
    surfaceGlass: "rgba(15,15,15,0.65)",

    primary: "#FE7000",
    primarySoft: "#ffb347",
    selectColor: "#0AD5DD",

    textMain: "#ffffff",
    textMuted: "rgba(255,255,255,0.75)",

    borderSubtle: "rgba(255,255,255,0.06)",
    borderStrong: "rgba(255,255,255,0.12)",

    overlayDark:
      "radial-gradient(circle at center, rgba(0,0,0,0.55), rgba(0,0,0,0.85))",

    hoverBlue:
      "radial-gradient(circle at center, #0AD5DD, rgba(146, 191, 255, 0.66))",

    boxBlue:
      "0 6px 16px #0ad6dda6",
  },

  /* ================= GRADIENTS ================= */
  gradients: {
    primary:
      "linear-gradient(135deg, #FE7000, #ffb347)",
    subtleSurface:
      "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.2))",
  },

  /* ================= SPACING ================= */
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "2rem",
    xl: "3rem",
  },

  /* ================= RADIUS ================= */
  radius: {
    sm: "6px",
    md: "12px",
    lg: "18px",
    pill: "20px",
  },

  /* ================= SHADOWS ================= */
  shadow: {
    soft: "0 8px 30px rgba(0,0,0,0.35)",
    strong: "0 40px 80px rgba(0,0,0,0.65)",
  },

  /* ================= BUTTONS ================= */
  button: {
    primary: {
      background:
        "linear-gradient(135deg, #FE7000, #ffb347)",
      color: "#111",
      border: "none",
      fontWeight: 700,
      boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
    },

    secondary: {
      background: "rgba(255,255,255,0.04)",
      color: "#ffffff",
      border: "1px solid rgba(255,255,255,0.15)",
      fontWeight: 500,
    },
  },

  /* ================= TAGS ================= */
  tag: {
    default: {
      background: "rgba(255,255,255,0.06)",
      color: "rgba(255,255,255,0.75)",
      border: "rgba(255,255,255,0.08)",
    },

    category: {
      background:
        "linear-gradient(135deg, rgba(255,138,0,0.28), rgba(255,138,0,0.12))",
      color: "#ff8a00",
      border: "rgba(255,138,0,0.35)",
    },
  },

  /* ================= TYPOGRAPHY ================= */
  font: {
    family: `"HeadingPro", system-ui, sans-serif`,
    weight: {
      regular: 400,
      medium: 500,
      semibold: 700,
    },
  },
} as const;
