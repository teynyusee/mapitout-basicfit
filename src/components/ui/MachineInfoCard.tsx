import * as THREE from "three";
import type { MachineConfig } from "../../data/machines";
import { MachinePreview } from "./MachinePreview";
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
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(8px)",
          zIndex: 40,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80vw",
          maxWidth: 960,
          height: 420,
          borderRadius: theme.radius.md,
          background: theme.colors.surface,
          boxShadow: theme.shadow.strong,
          color: theme.colors.textMain,
          zIndex: 50,
          display: "flex",
          overflow: "hidden",
        }}
      >
        <div style={{ flex: 1.3 }}>
          <MachinePreview
            root={root}
            camera={machine.previewCamera}
          />
        </div>

        <div
          style={{
            flex: 1,
            padding: theme.spacing.lg,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontFamily: theme.font.family,
                fontWeight: theme.font.weight.bold,
              }}
            >
              {machine.info.title}
            </h2>

            <p
              style={{
                marginTop: theme.spacing.sm,
                color: theme.colors.textMuted,
                lineHeight: 1.5,
              }}
            >
              {machine.info.description}
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              alignSelf: "flex-start",
              padding: "0.75rem 2rem",
              borderRadius: theme.radius.pill,
              border: "none",
              cursor: "pointer",
              background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primarySoft})`,
              color: "#111",
              fontWeight: theme.font.weight.bold,
              fontFamily: theme.font.family,
            }}
          >
            Sluiten
          </button>
        </div>
      </div>
    </>
  );
}
