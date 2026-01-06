import { GymCanvas } from "../canvas/GymCanvas";
import { SceneContents } from "./SceneContents";
import type { ZoneId } from "../../data/zones";
import { type MachineConfig} from "../../data/machines";

export function MapScene({
  activeZone,
  viewFactor,
  onMachineSelect,
}: {
  activeZone: ZoneId;
  viewFactor: number;
  onMachineSelect: (machine: MachineConfig) => void;
}) {

  return (
    <GymCanvas>
      <SceneContents
        activeZone={activeZone}
        viewFactor={viewFactor}
        onMachineSelect={onMachineSelect}
      />
    </GymCanvas>
  );
}
