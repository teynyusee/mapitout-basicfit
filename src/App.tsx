import { useState, useRef, useCallback, useEffect } from "react";
import * as THREE from "three";

import { GymCanvas } from "./components/canvas/GymCanvas";
import { SceneContents } from "./components/scenes/SceneContents";
import { MachineInfoModal } from "./components/ui/MachineInfoCard";
import { Header } from "./components/ui/Header";

import type { ZoneId } from "./data/zones";
import type { MachineConfig } from "./data/machines";
import { CAMERA_NAMES } from "./data/cameras";

type SelectedMachine = {
  machine: MachineConfig;
  root: THREE.Object3D;
};

export default function App() {
  const [activeZone, setActiveZone] =
    useState<ZoneId>("home");

  const [selectedMachine, setSelectedMachine] =
    useState<SelectedMachine | null>(null);

  const [focusedMachineId, setFocusedMachineId] =
    useState<string | null>(null);

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
    setFocusedMachineId(null);
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
          focusedMachineId={focusedMachineId}
        />
      </GymCanvas>

      <>
        <Header
          activeZone={activeZone}
          onZoneChange={handleZoneChange}
          onFocusMachine={(id, zone) => {
            setActiveZone(zone);
            setFocusedMachineId(id);
            setZoneViewFactors((p) => ({
              ...p,
              [zone]: 0,
            }));
          }}
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
    </div>
  );
}
