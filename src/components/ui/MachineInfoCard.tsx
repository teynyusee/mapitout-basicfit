import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import type { MachineConfig } from "../../data/machines";

type Props = {
  machine: MachineConfig;
  root: THREE.Object3D;
  onClose: () => void;
};

export function MachineInfoModal({ machine, root, onClose }: Props) {
  const previewObject = useMemo(() => {
    const clone = root.clone(true);
    clone.traverse((o: any) => {
      if (o.isMesh) {
        o.material = o.material.clone();
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    clone.position.set(0, 0, 0);
    clone.rotation.set(0, Math.PI / 2, 0);
    return clone;
  }, [root]);

  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(6px)",
          zIndex: 40,
        }}
      />

      {/* MODAL */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 420,
          maxWidth: "90vw",
          borderRadius: 24,
          background: "rgba(15,15,15,0.85)",
          boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
          color: "#fff",
          zIndex: 50,
          overflow: "hidden",
        }}
      >
        {/* 3D PREVIEW */}
        <div style={{ height: 200 }}>
          <Canvas camera={{ position: [0, 1.2, 3], fov: 40 }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[2, 4, 2]} intensity={1} />
            <Stage environment="warehouse" intensity={0.6}>
              <primitive object={previewObject} />
            </Stage>
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>

        {/* CONTENT */}
        <div style={{ padding: "1.2rem" }}>
          <h3 style={{ margin: 0 }}>{machine.info.title}</h3>

          <p style={{ marginTop: "0.75rem", color: "#bbb" }}>
            {machine.info.description}
          </p>

          <button
            onClick={onClose}
            style={{
              marginTop: "1rem",
              width: "100%",
              padding: "0.6rem",
              borderRadius: 14,
              border: "none",
              cursor: "pointer",
              background:
                "linear-gradient(135deg, #ff8a00, #ffb347)",
              fontWeight: 600,
            }}
          >
            Sluiten
          </button>
        </div>
      </div>
    </>
  );
}
