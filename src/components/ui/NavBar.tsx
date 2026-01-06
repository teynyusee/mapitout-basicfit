import { ZONES, type ZoneId } from "../../data/zones";

type NavBarProps = {
  activeZone: ZoneId;
  onZoneChange: (zone: ZoneId) => void;
};

export function NavBar({ activeZone, onZoneChange }: NavBarProps) {
  return (
    <nav
      style={{
        position: "absolute",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "1rem",
        padding: "0.6rem 1rem",
        background: "rgba(0,0,0,0.5)",
        borderRadius: "12px",
        backdropFilter: "blur(10px)",
        zIndex: 20,
      }}
    >
      {ZONES.map((zone) => {
        const isActive = zone.id === activeZone;

        return (
          <button
            key={zone.id}
            onClick={() => onZoneChange(zone.id)}
            style={{
              padding: "0.4rem 0.8rem",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              background: isActive ? "#ff8a00" : "rgba(255,255,255,0.1)",
              color: isActive ? "#000" : "#fff",
              fontWeight: isActive ? "700" : "400",
              transition: "0.2s",
            }}
          >
            {zone.label}
          </button>
        );
      })}
    </nav>
  );
}
