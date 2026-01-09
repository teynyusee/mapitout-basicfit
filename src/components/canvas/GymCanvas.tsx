import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

type GymCanvasProps = {
  children: React.ReactNode;
};

export function GymCanvas({ children }: GymCanvasProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      style={{ width: "100vw", height: "100vh" }}
      camera={{
        fov: 42,
        near: 0.1,
        far: 2000,
        position: [0, 85, 120],
      }}
      gl={{
        outputColorSpace: THREE.SRGBColorSpace,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      onCreated={({ camera, gl }) => {
        camera.layers.enable(1);
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
    >
      {/* ================= BACKGROUND ================= */}
      <color attach="background" args={["#070707"]} />

      {/* ================= ENVIRONMENT ================= */}
      {/* Warehouse geeft realistische indirect lighting */}
      <Environment
        preset="warehouse"
        environmentIntensity={0.75}
      />

      {/* ================= GLOBAL AMBIENT ================= */}
      {/* Heel laag – alleen om zwart niet te crushen */}
      <ambientLight intensity={0.18} />

      {/* ================= KEY LIGHT (main) ================= */}
      <directionalLight
        castShadow
        position={[0, 55, 15]}
        intensity={2.2}
        color="#ffffff"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-90}
        shadow-camera-right={90}
        shadow-camera-top={90}
        shadow-camera-bottom={-90}
        shadow-bias={-0.00015}
      />

      {/* ================= FILL LIGHT (cool) ================= */}
      {/* Zorgt voor detail in schaduwen */}
      <directionalLight
        position={[-35, 30, -20]}
        intensity={0.55}
        color="#9fbcd6"
      />

      {/* ================= RIM / ACCENT LIGHT (warm) ================= */}
      {/* Geeft die “premium gym glow” */}
      <directionalLight
        position={[40, 25, 35]}
        intensity={0.9}
        color="#ffb380"
      />

      {/* ================= BACK DEPTH LIGHT ================= */}
      {/* Haalt silhouettes los van background */}
      <directionalLight
        position={[0, 30, -70]}
        intensity={1.1}
        color="#ff9a55"
      />

      {/* ================= CONTENT ================= */}
      <Suspense fallback={null}>
        {children}
      </Suspense>
    </Canvas>
  );
}
