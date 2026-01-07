import { NavBar } from "./NavBar";
import type { ZoneId } from "../../data/zones";




export function Header({
  activeZone,
  onZoneChange,
}: {
  activeZone?: ZoneId;
  onZoneChange: (zone: ZoneId) => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 28,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 28,
          pointerEvents: "auto",
        }}
      >

        {/* NAVBAR */}
        <NavBar
          activeZone={activeZone}
          onZoneChange={onZoneChange}
        />
      </div>
    </div>
  );
}
