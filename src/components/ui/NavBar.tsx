import { useRef } from "react";
import { ZONES, type ZoneId } from "../../data/zones";
import { theme } from "../../styles/theme";

type NavBarProps = {
  activeZone?: ZoneId;
  onZoneChange: (zone: ZoneId) => void;
};

export function NavBar({ activeZone, onZoneChange }: NavBarProps) {
  return (
    <nav
      style={{
        display: "flex",
        gap: theme.spacing.sm,
        padding: `${theme.spacing.sm} ${theme.spacing.md}`,
        background: theme.colors.surfaceGlass,
        borderRadius: theme.radius.pill,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: theme.shadow.soft,
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

    ref.current.style.transform = `
      perspective(800px)
      rotateX(${y * -8}deg)
      rotateY(${x * 8}deg)
      translateZ(${active ? 12 : 6}px)
    `;
  }

  function reset() {
    if (!ref.current) return;

    ref.current.style.transform = `
      perspective(800px)
      rotateX(0deg)
      rotateY(0deg)
      translateZ(${active ? 12 : 0}px)
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
        padding: "10px 22px", // 👈 consistenter
        borderRadius: theme.radius.pill,
        border: "none",
        background: active
          ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primarySoft})`
          : "transparent",
        color: active ? "#111" : theme.colors.textMuted,
        fontFamily: theme.font.family,
        fontSize: "0.9rem",
        fontWeight: theme.font.weight.medium,
        letterSpacing: "0.04em",
        cursor: "pointer",
        boxShadow: active
          ? "0 8px 18px rgba(255,138,0,0.4)"
          : "0 3px 10px rgba(0,0,0,0.25)",
        transition:
          "transform 0.12s ease-out, box-shadow 0.15s ease, background 0.25s ease, color 0.25s ease",
      }}
    >
      {label}
    </button>
  );
}
