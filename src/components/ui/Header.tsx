import { NavBar } from "./NavBar";
import { MachineSearch } from "./search/MachineSearch";
import type { ZoneId } from "../../data/zones";

export function Header({
  activeZone,
  onZoneChange,
  onFocusMachine,
}: {
  activeZone?: ZoneId;
  onZoneChange: (zone: ZoneId) => void;
  onFocusMachine: (id: string | null, zone: ZoneId) => void;
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
          gap: 50,
          pointerEvents: "auto",
        }}
      >
        <NavBar
          activeZone={activeZone}
          onZoneChange={onZoneChange}
        />

        <MachineSearch onFocusMachine={onFocusMachine} />
      </div>
    </div>
  );
}
