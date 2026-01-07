import { useRef } from "react";
import { ZONES, type ZoneId } from "../../data/zones";
import { theme } from "../../styles/theme";

type NavBarProps = {
  activeZone: ZoneId;
  onZoneChange: (zone: ZoneId) => void;
};

export function NavBar({ activeZone, onZoneChange }: NavBarProps) {
  return (
    <nav
      style={{
        position: "absolute",
        top: 24,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: theme.spacing.xs,
        padding: theme.spacing.xs,
        background: theme.colors.surfaceGlass,
        borderRadius: theme.radius.pill,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: theme.shadow.soft,
        zIndex: 20,
      }}
    >
      {ZONES.map((zone) => (
        <NavButton
          key={zone.id}
          label={zone.label}
          active={zone.id === activeZone}
          onClick={() => onZoneChange(zone.id)}
        />
      ))}
    </nav>
  );
}

function NavButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  function handlePointerMove(e: React.PointerEvent) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const rx = Math.max(-0.5, Math.min(0.5, y)) * -12;
    const ry = Math.max(-0.5, Math.min(0.5, x)) * 12;

    ref.current.style.transform = `
      perspective(700px)
      rotateX(${rx}deg)
      rotateY(${ry}deg)
      translateZ(${active ? 14 : 10}px)
    `;
  }

  function reset() {
    if (!ref.current) return;

    ref.current.style.transform = `
      perspective(700px)
      rotateX(0deg)
      rotateY(0deg)
      translateZ(${active ? 14 : 0}px)
    `;
  }

  return (
    <button
      ref={ref}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onFocus={(e) => e.currentTarget.blur()}
      style={{
        position: "relative",
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        borderRadius: theme.radius.pill,
        border: "none",
        background: active
          ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primarySoft})`
          : "transparent",
        color: active ? "#111" : theme.colors.textMuted,
        fontFamily: theme.font.family,
        fontSize: "0.85rem",
        fontWeight: theme.font.weight.medium,
        letterSpacing: "0.03em",
        cursor: "pointer",
        boxShadow: active
          ? "0 12px 26px rgba(255,138,0,0.45)"
          : "0 4px 14px rgba(0,0,0,0.3)",
        transition:
          "transform 0.12s ease-out, box-shadow 0.15s ease, background 0.25s ease, color 0.25s ease",
        willChange: "transform",
      }}
    >
      {label}
    </button>
  );
}