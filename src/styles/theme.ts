export const theme = {
  colors: {
    background: "#0a0a0a",
    surface: "#121212",
    surfaceGlass: "rgba(15,15,15,0.65)",

    primary: "#ff8a00",
    primarySoft: "#ffb347",

    textMain: "#ffffff",
    textMuted: "rgba(255,255,255,0.75)",

    borderSubtle: "rgba(255,255,255,0.06)",
  },

  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "2rem",
  },

  radius: {
    sm: "6px",
    md: "12px",
    pill: "999px",
  },

  shadow: {
    soft: "0 8px 30px rgba(0,0,0,0.35)",
    strong: "0 40px 80px rgba(0,0,0,0.65)",
  },

  font: {
    family: `"HeadingPro", system-ui, sans-serif`,
    weight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
} as const;
