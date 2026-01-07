import type { MachineConfig } from "../../data/machines";
import * as THREE from "three";
import { MachinePreview } from "./MachinePreview";

type Props = {
  machine: MachineConfig;
  root: THREE.Object3D;
  onClose: () => void;
};

export function MachineInfoModal({ machine, root, onClose }: Props) {
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
          borderRadius: 28,
          background: "rgba(18,18,18,0.95)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.65)",
          color: "#fff",
          zIndex: 50,
          display: "flex",
          overflow: "hidden",
        }}
      >
        <div style={{ flex: 1.3 }}>
          <MachinePreview root={root} camera={machine.previewCamera} />
        </div>

        <div
          style={{
            flex: 1,
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2>{machine.info.title}</h2>
            <p style={{ color: "#ccc" }}>
              {machine.info.description}
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: "0.75rem 2rem",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              background:
                "linear-gradient(135deg, #ff8a00, #ffb347)",
              color: "#111",
              fontWeight: 700,
            }}
          >
            Sluiten
          </button>
        </div>
      </div>
    </>
  );
}
