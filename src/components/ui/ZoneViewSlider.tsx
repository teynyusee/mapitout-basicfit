import { theme } from "../../styles/theme";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export function ZoneViewSlider({ value, onChange }: Props) {
  return (
    <div
      style={{
        width: 240,
        padding: "14px 16px",
        borderRadius: theme.radius.lg,
        background: theme.colors.surfaceGlass,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: theme.shadow.soft,
        border: `1px solid ${theme.colors.borderSubtle}`,
      }}
    >
      <div
        style={{
          fontSize: "0.7rem",
          color: theme.colors.textMuted,
          marginBottom: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        Kamera Perspectief
      </div>

      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={(e) =>
          onChange(Number(e.target.value))
        }
        style={{
          width: "100%",
          appearance: "none",
          height: 4,
          borderRadius: 4,
          background: `linear-gradient(
            to right,
            ${theme.colors.primary} ${value * 100}%,
            rgba(255,255,255,0.12) ${value * 100}%
          )`,
          outline: "none",
          cursor: "pointer",
        }}
      />

      <style>
        {`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: ${theme.colors.primary};
            box-shadow: 0 0 10px rgba(255,138,0,0.6);
            cursor: pointer;
          }

          input[type="range"]::-moz-range-thumb {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: ${theme.colors.primary};
            box-shadow: 0 0 10px rgba(255,138,0,0.6);
            cursor: pointer;
            border: none;
          }
        `}
      </style>
    </div>
  );
}
