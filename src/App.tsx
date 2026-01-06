import { useState, useRef } from "react";
import { GymCanvas } from "./components/canvas/GymCanvas";
import { SceneContents } from "./components/scenes/SceneContents";
import { NavBar } from "./components/ui/NavBar";
import { LogoScene } from "./components/intro/LogoScene";
import { IntroCamera } from "./hooks/useIntroCamera";

import type { ZoneId } from "./data/zones";
import type { MachineConfig } from "./data/machines";
import { CAMERA_NAMES } from "./data/cameras";

type ViewMode = "intro" | "map";

export default function App() {
  const [viewMode, setViewMode] =
    useState<ViewMode>("intro");

  const [activeZone, setActiveZone] =
    useState<ZoneId>("overview");

  const [selectedMachine, setSelectedMachine] =
    useState<MachineConfig | null>(null);

  const [zoneViewFactors, setZoneViewFactors] =
    useState<Record<ZoneId, number>>({
      overview: 0,
      cardio: 0,
      strength: 0,
      free: 0,
      dumbbells: 0,
    });

  const sliderRAF = useRef<number | null>(null);


  function handleStart() {
    setViewMode("map");
  }

  function handleZoneChange(zone: ZoneId) {
    setActiveZone(zone);
    setSelectedMachine(null);
    setZoneViewFactors((p) => ({ ...p, [zone]: 0 }));
  }

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <GymCanvas>
        {viewMode === "intro" && (
          <>
            <IntroCamera />
            <LogoScene onClick={handleStart} />
          </>
        )}

        {viewMode === "map" && (
          <SceneContents
            activeZone={activeZone}
            viewFactor={zoneViewFactors[activeZone]}
            onMachineSelect={setSelectedMachine}
          />
        )}
      </GymCanvas>

      {/* UI alleen in MAP */}
      {viewMode === "map" && (
        <>
          <NavBar
            activeZone={activeZone}
            onZoneChange={handleZoneChange}
          />

          {CAMERA_NAMES[activeZone]?.views && (
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={zoneViewFactors[activeZone]}
              onChange={(e) => {
                const value = Number(e.target.value);

                if (sliderRAF.current) {
                  cancelAnimationFrame(sliderRAF.current);
                }

                sliderRAF.current = requestAnimationFrame(() => {
                  setZoneViewFactors((p) => ({
                    ...p,
                    [activeZone]: value,
                  }));
                });
              }}
              style={{
                position: "absolute",
                bottom: 20,
                left: 20,
                width: 250,
                zIndex: 20,
              }}
            />
          )}

          {/* ✅ MACHINE INFO PANEL (DIT ONTBRAK) */}
          {selectedMachine && (
            <div
              style={{
                position: "absolute",
                right: 20,
                top: 80,
                width: 300,
                background: "rgba(0,0,0,0.85)",
                color: "#fff",
                padding: "1rem",
                borderRadius: 14,
                zIndex: 30,
              }}
            >
              <h3>{selectedMachine.info.title}</h3>
              <p>{selectedMachine.info.description}</p>

              <button
                onClick={() => setSelectedMachine(null)}
                style={{
                  marginTop: "0.75rem",
                  width: "100%",
                  padding: "0.4rem",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Sluiten
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
