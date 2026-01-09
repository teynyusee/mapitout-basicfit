import { useState, useRef, useCallback, useEffect } from "react";
import * as THREE from "three";

import { GymCanvas } from "./components/canvas/GymCanvas";
import { SceneContents } from "./components/scenes/SceneContents";
import { MachineInfoModal } from "./components/ui/machine-card/MachineInfoModal";
import { Header } from "./components/ui/Header";
import { Cards } from "./components/ui/home-cards/Cards";

import { ZoneViewSlider } from "./components/ui/ZoneViewSlider";
import { VisualEffectsToggle } from "./components/ui/toggles/VisualEffectsToggle";



import type { ZoneId } from "./data/zones";
import type { MachineConfig } from "./data/machines";
import { CAMERA_NAMES } from "./data/cameras";
import { div } from "three/tsl";

type SelectedMachine = {
  machine: MachineConfig;
  root: THREE.Object3D;
};

export default function App() {
  const [activeZone, setActiveZone] =
    useState<ZoneId>("home");

  const [selectedMachine, setSelectedMachine] =
    useState<SelectedMachine | null>(null);

  // ✅ FIX: focus mét tick
  const [focusedMachine, setFocusedMachine] = useState<{
    id: string | null;
    tick: number;
  }>({
    id: null,
    tick: 0,
  });

  const [visualEffectsEnabled, setVisualEffectsEnabled] =
  useState(true);


  const [zoneViewFactors, setZoneViewFactors] =
    useState<Record<ZoneId, number>>({
      home: 0,
      overview: 0,
      cardio: 0,
      strength: 0,
      free: 0,
      dumbbells: 0,
    });

  const sliderRAF = useRef<number | null>(null);

  const handleZoneChange = useCallback((zone: ZoneId) => {
    setActiveZone(zone);
    setFocusedMachine({ id: null, tick: 0 });
    setSelectedMachine(null);
    setZoneViewFactors((p) => ({
      ...p,
      [zone]: 0,
    }));
  }, []);

  const handleMachineSelect = useCallback(
    (machine: MachineConfig, root: THREE.Object3D) => {
      setSelectedMachine({ machine, root });
    },
    []
  );

  const handleSliderChange = useCallback(
    (value: number) => {
      if (sliderRAF.current)
        cancelAnimationFrame(sliderRAF.current);

      sliderRAF.current = requestAnimationFrame(() => {
        setZoneViewFactors((p) => ({
          ...p,
          [activeZone]: value,
        }));
      });
    },
    [activeZone]
  );

  useEffect(() => {
    const handler = (e: any) => {
      handleZoneChange(e.detail);
    };

    window.addEventListener("zone-change", handler);
    return () =>
      window.removeEventListener("zone-change", handler);
  }, [handleZoneChange]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <GymCanvas>
        <SceneContents
          activeZone={activeZone}
          viewFactor={zoneViewFactors[activeZone]}
          onMachineSelect={handleMachineSelect}
          focusedMachine={focusedMachine}
          visualEffectsEnabled={visualEffectsEnabled}
        />
      </GymCanvas>

      <>
        <Header
          activeZone={activeZone}
          onZoneChange={handleZoneChange}
          onFocusMachine={(id, zone) => {
            setActiveZone(zone);

            // ✅ ELKE klik = nieuwe tick
            setFocusedMachine((prev) => ({
              id,
              tick: prev.tick + 1,
            }));

            setZoneViewFactors((p) => ({
              ...p,
              [zone]: 0,
            }));
          }}
          
        />


        {/* 👇 HOME CARDS */}
        {activeZone === "home" && (
          <div
            style={{
              position: "absolute",
              bottom: 60, 
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              zIndex: 15,
              pointerEvents: "auto",
            }}
          >
            <Cards onSelectZone={handleZoneChange} activeZone={"overview"} />
          </div>
        )}

        {CAMERA_NAMES[activeZone]?.views && (
          <div className="Slider-Effects">
          <ZoneViewSlider
            value={zoneViewFactors[activeZone]}
            onChange={handleSliderChange}
          />
          <VisualEffectsToggle
            enabled={visualEffectsEnabled}
            onToggle={() =>
              setVisualEffectsEnabled((v) => !v)
            }
          />
          </div>
        )}

        {selectedMachine && (
          <MachineInfoModal
            machine={selectedMachine.machine}
            root={selectedMachine.root}
            onClose={() => setSelectedMachine(null)}
          />
        )}
      </>
    </div>
  );
}
