import { ZONES, type ZoneId } from "../../data/zones";
import { useRef } from "react";

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
        gap: "0.35rem",
        padding: "0.45rem",
        background: "rgba(15,15,15,0.65)",
        borderRadius: "999px",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow:
          "0 8px 30px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.06)",
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

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Clamp tussen -0.5 en 0.5
    const rx = Math.max(-0.5, Math.min(0.5, y - 0.5)) * -12;
    const ry = Math.max(-0.5, Math.min(0.5, x - 0.5)) * 12;

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
        padding: "0.5rem 1.05rem",
        borderRadius: "999px",
        border: "none",
        outline: "none",
        background: active
          ? "linear-gradient(135deg, #ff8a00, #ffb347)"
          : "transparent",
        color: active ? "#111" : "rgba(255,255,255,0.75)",
        fontSize: "0.85rem",
        fontWeight: 600,
        letterSpacing: "0.03em",
        cursor: "pointer",
        transition:
          "transform 0.12s ease-out, box-shadow 0.15s ease, background 0.25s ease, color 0.25s ease",
        boxShadow: active
          ? "0 12px 26px rgba(255,138,0,0.45)"
          : "0 4px 14px rgba(0,0,0,0.3)",
        willChange: "transform",
      }}
    >
      {label}
    </button>
  );
}
