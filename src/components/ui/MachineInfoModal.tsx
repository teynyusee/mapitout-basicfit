import * as THREE from "three";
import type { MachineConfig } from "../../data/machines";
import { MachinePreview } from "./MachinePreview";
import { MachineInfoPanel } from "./MachineInfoPanel";
import { theme } from "../../styles/theme";

type Props = {
  machine: MachineConfig;
  root: THREE.Object3D;
  onClose: () => void;
};

export function MachineInfoModal({
  machine,
  root,
  onClose,
}: Props) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(10px)",
          zIndex: 40,
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "82vw",
          maxWidth: 1000,
          height: 460,
          background: theme.colors.surface,
          borderRadius: theme.radius.md,
          boxShadow: theme.shadow.strong,
          color: theme.colors.textMain,
          display: "flex",
          overflow: "hidden",
          zIndex: 50,
        }}
      >
        {/* Preview */}
        <div
          style={{
            flex: 1.4,
            background: theme.colors.background,
          }}
        >
          <MachinePreview
            root={root}
            camera={machine.previewCamera}
          />
        </div>

        {/* Info */}
        <MachineInfoPanel
          machine={machine}
          onClose={onClose}
        />
      </div>
    </>
  );
}
