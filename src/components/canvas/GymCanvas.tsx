import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
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
    >
      <color attach="background" args={["#070707"]} />

      <Environment preset="warehouse" environmentIntensity={0.75} />

      <ambientLight intensity={0.18} />

      <directionalLight
        castShadow
        position={[0, 55, 15]}
        intensity={2.2}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00015}
      />

      <Suspense fallback={null}>
        <Physics gravity={[0, -9.81, 0]}>
          {children}
        </Physics>
      </Suspense>
    </Canvas>
  );
}
