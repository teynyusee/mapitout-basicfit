import type { MachineConfig } from "../../../data/machines";
import { theme } from "../../../styles/theme";
import { useState } from "react";

type Props = {
  machine: MachineConfig;
  onClick: () => void;
};

export function MachineSearchCard({ machine, onClick }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        gap: 12,
        padding: "10px 12px",
        borderRadius: 14,
        cursor: "pointer",
        alignItems: "center",

        background: hovered
          ? theme.colors.hoverBlue
          : "transparent",

        border: `1px solid ${
          hovered
            ? theme.colors.selectColor
            : "transparent"
        }`,

        boxShadow: hovered
          ? theme.colors.boxBlue
          : "none",

        transition: "all 0.2s ease",
      }}
    >
      {/* IMAGE */}
      <img
        src={machine.ui?.thumbnail}
        alt={machine.info.title}
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          objectFit: "cover",
          background: theme.colors.surface,
          boxShadow: hovered
            ? "0 0 0 1px rgba(255,255,255,0.15)"
            : "none",
          transition: "box-shadow 0.2s ease",
        }}
      />

      {/* TEXT */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          lineHeight: 1.2,
        }}
      >
        <span
          style={{
            fontSize: "0.85rem",
            fontWeight: 600,
            color: theme.colors.textMain,
          }}
        >
          {machine.info.title}
        </span>

        <span
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: theme.colors.textMuted,
          }}
        >
          {machine.info.category}
        </span>
      </div>
    </div>
  );
}
