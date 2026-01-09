import { useState } from "react";
import type { ComponentType, SVGProps } from "react";
import { theme } from "../../../styles/theme";

type Props = {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
  active: boolean;
  onClick: () => void;
};

export function CardItem({
  title,
  description,
  icon: Icon,
  active,
  onClick,
}: Props) {
  const [hovered, setHovered] = useState(false);

  const isHighlighted = active || hovered;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 270,
        padding: "18px 20px",
        borderRadius: theme.radius.lg,
        cursor: "pointer",

        background: isHighlighted
          ? theme.colors.hoverBlue
          : theme.colors.surfaceGlass,

        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",

        border: `1px solid ${
          isHighlighted
            ? theme.colors.selectColor
            : theme.colors.primary
        }`,

        boxShadow: isHighlighted
          ? theme.colors.selectColor
          : theme.shadow.soft,

        transform: isHighlighted
          ? "translateY(-6px)"
          : "translateY(0)",

        transition: "all 0.25s ease",

        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {/* ICON */}
      <Icon
        size={24}
        style={{
          color: isHighlighted ? "#111" : theme.colors.textMuted,
          filter: isHighlighted
            ? "drop-shadow(0 0 6px rgba(255,138,0,0.6))"
            : "none",
          transition: "color 0.25s ease, filter 0.25s ease",
        }}
      />

      {/* TITLE */}
      <h3
        style={{
          margin: 0,
          fontSize: "0.95rem",
          fontWeight: theme.font.weight.semibold,
          letterSpacing: "0.02em",
          color: isHighlighted ? "#111" : theme.colors.textMain,
        }}
      >
        {title}
      </h3>

      {/* DESCRIPTION */}
      <p
        style={{
          margin: 0,
          fontSize: "0.8rem",
          lineHeight: 1.45,
          color: isHighlighted
            ? "#222"
            : theme.colors.textMuted,
        }}
      >
        {description}
      </p>
    </div>
  );
}
