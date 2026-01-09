import * as THREE from "three";
import type { MachineConfig } from "../../../data/machines";
import { MachinePreview } from "./MachinePreview";
import { theme } from "../../../styles/theme";
import { Tag } from "./Tag";

type Props = {
  machine: MachineConfig;
  root: THREE.Object3D;
  onClose: () => void;
};

export function MachineInfoModal({ machine, root, onClose }: Props) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0.55), rgba(0,0,0,0.8))",
          backdropFilter: "blur(12px)",
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
          width: "86vw",
          maxWidth: 1100,
          height: 500,
          background: theme.colors.surface,
          borderRadius: theme.radius.md,
          boxShadow: "0 40px 120px rgba(0,0,0,0.45)",
          border: "1px solid rgba(255,255,255,0.06)",
          color: theme.colors.textMain,
          display: "flex",
          overflow: "hidden",
          zIndex: 50,
        }}
      >
        {/* Preview */}
        <div
          style={{
            flex: 1.6,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.15))",
          }}
        >
          <MachinePreview
            root={root}
            camera={machine.previewCamera}
          />
        </div>

        {/* Info */}
        <div
          style={{
            flex: 1,
            padding: theme.spacing.lg,
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing.lg,
          }}
        >
          {/* Header */}
          <div>
            <span
              style={{
                display: "inline-block",
                fontSize: 12,
                fontWeight: theme.font.weight.semibold,
                letterSpacing: 0.6,
                textTransform: "uppercase",
                color: theme.colors.primary,
                marginBottom: 6,
              }}
            >
              {machine.info.category}
            </span>

            <h2
              style={{
                margin: 0,
                fontSize: 28,
                lineHeight: 1.2,
                fontFamily: theme.font.family,
                fontWeight: theme.font.weight.semibold,
              }}
            >
              {machine.info.title}
            </h2>

            <div
              style={{
                display: "flex",
                gap: 8,
                marginTop: 12,
                flexWrap: "wrap",
              }}
            >
              {machine.info.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.15), rgba(255,255,255,0))",
            }}
          />

          {/* Description */}
          <p
            style={{
              color: theme.colors.textMuted,
              lineHeight: 1.7,
              fontSize: 15,
              margin: 0,
            }}
          >
            {machine.info.description}
          </p>

          {/* Actions */}
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={onClose}
              style={secondaryButton}
            >
              Sluiten
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const secondaryButton: React.CSSProperties = {
  padding: "0.7rem 1.6rem",
  borderRadius: theme.radius.pill,
  border: "1px solid rgba(255,255,255,0.15)",
  background: "rgba(255,255,255,0.04)",
  color: theme.colors.textMain,
  fontWeight: theme.font.weight.medium,
  cursor: "pointer",
  transition: "all 0.2s ease",
};
