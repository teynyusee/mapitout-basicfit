import { useState, useRef, useCallback, useEffect } from "react";
import * as THREE from "three";

import { GymCanvas } from "./components/canvas/GymCanvas";
import { SceneContents } from "./components/scenes/SceneContents";
import { LogoScene } from "./components/intro/LogoScene";
import { IntroCamera } from "./hooks/useIntroCamera";
import { MachineInfoModal } from "./components/ui/MachineInfoCard";
import { Header } from "./components/ui/Header";


import type { ZoneId } from "./data/zones";
import type { MachineConfig } from "./data/machines";
import { CAMERA_NAMES } from "./data/cameras";

type ViewMode = "intro" | "map";

type SelectedMachine = {
  machine: MachineConfig;
  root: THREE.Object3D;
};

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("intro");
  const [logoFadingOut, setLogoFadingOut] = useState(false);

  const [activeZone, setActiveZone] =
    useState<ZoneId>("overview");

  const [selectedMachine, setSelectedMachine] =
    useState<SelectedMachine | null>(null);

  const [zoneViewFactors, setZoneViewFactors] =
    useState<Record<ZoneId, number>>({
      overview: 0,
      cardio: 0,
      strength: 0,
      free: 0,
      dumbbells: 0,
    });

  const sliderRAF = useRef<number | null>(null);

  const handleStart = useCallback(() => {
    setLogoFadingOut(true);
    setTimeout(() => setViewMode("map"), 1200);
  }, []);

  const handleZoneChange = useCallback((zone: ZoneId) => {
    setActiveZone(zone);
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
      if (sliderRAF.current) cancelAnimationFrame(sliderRAF.current);

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
        {viewMode === "intro" && (
          <>
            <IntroCamera />
            <LogoScene
              onClick={handleStart}
              fadingOut={logoFadingOut}
            />
          </>
        )}

        {viewMode === "map" && (
          <SceneContents
            activeZone={activeZone}
            viewFactor={zoneViewFactors[activeZone]}
            onMachineSelect={handleMachineSelect}
            introFade
          />
        )}
      </GymCanvas>

      {viewMode === "map" && (
  <>
    <Header
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
        onChange={(e) =>
          handleSliderChange(Number(e.target.value))
        }
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          width: 250,
          zIndex: 20,
        }}
      />
    )}

    {selectedMachine && (
      <MachineInfoModal
        machine={selectedMachine.machine}
        root={selectedMachine.root}
        onClose={() => setSelectedMachine(null)}
      />
    )}
  </>
)}

    </div>
  );
}
