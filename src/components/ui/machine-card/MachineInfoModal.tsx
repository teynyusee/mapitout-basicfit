import * as THREE from "three";
import type { MachineConfig } from "../../../data/machines";
import { MachinePreview } from "./MachinePreview";
import { MachineInfoPanel } from "./MachineInfoPanel";
import { theme } from "../../../styles/theme";
import { useEffect, useState } from "react";

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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 250);
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={handleClose}
        style={{
          position: "absolute",
          inset: 0,
          background: theme.colors.overlayDark,
          backdropFilter: "blur(14px)",
          zIndex: 40,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `
            translate(-50%, -50%)
            scale(${visible ? 1 : 0.96})
          `,
          opacity: visible ? 1 : 0,
          transition:
            "opacity 0.25s ease, transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",

          width: "82vw",
          maxWidth: 1000,
          height: 460,

          background: theme.colors.surface,
          borderRadius: theme.radius.md,
          border: `1px solid ${theme.colors.borderSubtle}`,
          boxShadow: theme.shadow.strong,

          display: "flex",
          overflow: "hidden",
          zIndex: 50,
        }}
      >
        {/* Close button */}
        <CloseButton onClick={handleClose} />

        {/* Preview */}
        <div
          style={{
            flex: 1.4,
          }}
        >
          <MachinePreview
            root={root}
            camera={machine.previewCamera}
          />
        </div>

        {/* Info */}
        <MachineInfoPanel machine={machine} />
      </div>
    </>
  );
}

/* ================= CLOSE BUTTON ================= */

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Sluiten"
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        width: 36,
        height: 36,
        borderRadius: "50%",
        border: `1px solid ${theme.colors.borderSubtle}`,
        background: theme.colors.surfaceGlass,
        color: theme.colors.textMain,
        fontSize: 18,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
        transition: "all 0.15s ease",
        zIndex: 10,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background =
          "rgba(255,255,255,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background =
          theme.colors.surfaceGlass;
      }}
    >
      ✕
    </button>
  );
}
