import { useRef } from "react";
import { ZONES, type ZoneId } from "../../data/zones";
import { theme } from "../../styles/theme";

type NavBarProps = {
  activeZone?: ZoneId;
  onZoneChange: (zone: ZoneId) => void;
};

export function NavBar({
  activeZone,
  onZoneChange,
}: NavBarProps) {
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

/* ===============================
   NAV BUTTON
   =============================== */

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

  /* ===============================
     POINTER MOVE (3D TILT)
     =============================== */
  function handlePointerMove(
    e: React.PointerEvent
  ) {
    if (!ref.current) return;

    const rect =
      ref.current.getBoundingClientRect();
    const x =
      (e.clientX - rect.left) /
        rect.width -
      0.5;
    const y =
      (e.clientY - rect.top) /
        rect.height -
      0.5;

    ref.current.style.transform = `
      perspective(800px)
      rotateX(${y * -8}deg)
      rotateY(${x * 8}deg)
      translateZ(${active ? 12 : 6}px)
    `;
  }

  /* ===============================
     HOVER IN
     =============================== */
  function handlePointerEnter() {
    if (!ref.current || active) return;

    ref.current.style.background =
      theme.colors.hoverBlue;

    ref.current.style.boxShadow =
      theme.colors.boxBlue;

    ref.current.style.color =
      theme.colors.textMain;
  }

  /* ===============================
     RESET (HOVER OUT)
     =============================== */
  function reset() {
    if (!ref.current) return;

    ref.current.style.transform = `
      perspective(800px)
      rotateX(0deg)
      rotateY(0deg)
      translateZ(${active ? 12 : 0}px)
    `;

    if (!active) {
      ref.current.style.background =
        "none";
      ref.current.style.boxShadow =
        "none";
      ref.current.style.color =
        theme.colors.textMuted;
    }
  }

  /* ===============================
     RENDER
     =============================== */
  return (
    <button
      ref={ref}
      onClick={onClick}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onFocus={(e) =>
        e.currentTarget.blur()
      }
      style={{
        padding: "10px 22px",
        borderRadius: theme.radius.pill,
        border: "none",

        background: active
          ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primarySoft})`
          : "none",

        color: active
          ? "#111"
          : theme.colors.textMuted,

        fontFamily: theme.font.family,
        fontSize: "0.9rem",
        fontWeight:
          theme.font.weight.medium,
        letterSpacing: "0.04em",

        cursor: "pointer",

        boxShadow: active
          ? "0 8px 18px rgba(255,138,0,0.4)"
          : "none",

        transition:
          "transform 0.12s ease-out, box-shadow 0.15s ease, background 0.25s ease, color 0.25s ease",
      }}
    >
      {label}
    </button>
  );
}
