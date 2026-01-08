import * as THREE from "three";
import type { MachineConfig } from "../../data/machines";
import { MachinePreview } from "./MachinePreview";
import { theme } from "../../styles/theme";

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
        <div style={{ flex: 1.4 }}>
          <MachinePreview root={root} camera={machine.previewCamera} />
        </div>

        {/* Info */}
        <div
          style={{
            flex: 1,
            padding: theme.spacing.lg,
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing.md,
          }}
        >
          {/* Header */}
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

            <div
              style={{
                display: "flex",
                gap: 8,
                marginTop: 8,
                flexWrap: "wrap",
              }}
            >
              <Tag label={machine.info.category} variant="category" />
              {machine.info.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
          </div>

          {/* Description */}
          <p
            style={{
              color: theme.colors.textMuted,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {machine.info.description}
          </p>

          {/* Specs */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
          </div>

          {/* Actions */}
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              gap: 12,
            }}
          >
            <button style={secondaryButton}>Details</button>
            <button onClick={onClose} style={primaryButton}>
              Sluiten
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* -------------------- */
/* UI COMPONENTS */
/* -------------------- */

function Tag({
  label,
  variant = "default",
}: {
  label: string;
  variant?: "default" | "category";
}) {
  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: theme.radius.pill,
        fontSize: 12,
        fontWeight: theme.font.weight.medium,
        background:
          variant === "category"
            ? "rgba(100,180,255,0.18)"
            : "rgba(255,255,255,0.08)",
        color:
          variant === "category"
            ? theme.colors.primary
            : theme.colors.textMuted,
      }}
    >
      {label}
    </span>
  );
}


const primaryButton: React.CSSProperties = {
  padding: "0.7rem 1.8rem",
  borderRadius: theme.radius.pill,
  border: "none",
  cursor: "pointer",
  background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primarySoft})`,
  color: "#111",
  fontWeight: theme.font.weight.bold,
};

const secondaryButton: React.CSSProperties = {
  padding: "0.7rem 1.8rem",
  borderRadius: theme.radius.pill,
  border: "1px solid rgba(255,255,255,0.15)",
  background: "transparent",
  color: theme.colors.textMain,
  cursor: "pointer",
};
