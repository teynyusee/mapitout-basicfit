import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";
import React, { Suspense } from "react";

export function GymCanvas({ children }: { children: React.ReactNode }) {
  return (
    <Canvas
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 2000,
        position: [0, 90, 120],
      }}
      style={{ width: "100vw", height: "100vh" }}
      onCreated={({ camera, gl }) => {
        camera.layers.enable(1); // bloom layer
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = 2; // PCFSoftShadowMap
      }}
    >
      {/* 🌑 Dark gym background */}
      <color attach="background" args={["#0a0a0a"]} />

      {/* 🌍 Environment (low intensity, just reflections) */}
      <Environment preset="warehouse" intensity={0.45} />

      {/* 🌫️ VERY subtle ambient */}
      <ambientLight intensity={0.25} />

      {/* ☀️ MAIN OVERHEAD LIGHT (gym ceiling) */}
      <directionalLight
        position={[0, 40, 0]}
        intensity={1.6}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-camera-top={80}
        shadow-camera-bottom={-80}
      />

      {/* 🔦 SECONDARY OVERHEAD (depth) */}
      <directionalLight
        position={[25, 35, 20]}
        intensity={0.9}
        color={"#ffffff"}
      />

      {/* 🌗 COOL FILL (industrial feel) */}
      <directionalLight
        position={[-30, 20, -10]}
        intensity={0.35}
        color={"#8fbcd4"}
      />

      {/* 🔥 RIM / BACK LIGHT (muscle outlines) */}
      <directionalLight
        position={[0, 25, -50]}
        intensity={1.2}
        color={"#ffb380"}
      />

      {/* ✨ BLOOM FOR NEON / LED / SCREENS */}
      <EffectComposer>
        <SelectiveBloom
          lights={[]}
          intensity={1.6}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.85}
        />
      </EffectComposer>

      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
