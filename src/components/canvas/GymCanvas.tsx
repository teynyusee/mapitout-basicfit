import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";
import React, { Suspense } from "react";

export function GymCanvas({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Canvas
      // 🔥 shadows aan, maar slim gebruikt
      shadows="soft"
      dpr={[1, 1.5]} // 👈 beperkt GPU load op high-dpi schermen
      camera={{
        fov: 45,
        near: 0.1,
        far: 1500, // 👈 lager = minder depth work
        position: [0, 90, 120],
      }}
      style={{ width: "100vw", height: "100vh" }}
      onCreated={({ camera, gl }) => {
        camera.layers.enable(1); // bloom layer
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = 2; // PCFSoftShadowMap
        gl.setClearColor("#0a0a0a");
      }}
    >
      {/* 🌑 BACKGROUND */}
      <color attach="background" args={["#0a0a0a"]} />

      {/* 🌍 ENVIRONMENT (reflections only) */}
      <Environment
        preset="warehouse"
        environmentIntensity={1.1} // 👈 subtieler
      />

      {/* 🌫️ AMBIENT (iets hoger, minder nood aan shadows) */}
      <ambientLight intensity={0.6} />

      {/* ☀️ MAIN LIGHT — ENIGE SHADOW CAST */}
      <directionalLight
        position={[0, 45, 0]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024} // 👈 GROOT verschil
        shadow-mapSize-height={1024}
        shadow-camera-left={-70}
        shadow-camera-right={70}
        shadow-camera-top={70}
        shadow-camera-bottom={-70}
      />

      <directionalLight
      position={[0, -20, 0]}
      intensity={0.25}
      color="#ffffff"
      castShadow={false}
      />

      {/* 🔦 FILL LIGHT (GEEN shadows) */}
      <directionalLight
        position={[30, 30, 20]}
        intensity={0.6}
        color="#ffffff"
        castShadow={false}
      />

      {/* 🌗 COOL FILL */}
      <directionalLight
        position={[-30, 20, -10]}
        intensity={0.3}
        color="#8fbcd4"
        castShadow={false}
      />

      {/* 🔥 RIM LIGHT */}
      <directionalLight
        position={[0, 25, -50]}
        intensity={1.0}
        color="#ffb380"
        castShadow={false}
      />

      {/* ✨ BLOOM — LICHTER & GOEDKOPER */}
      <EffectComposer multisampling={0}>
        <SelectiveBloom
          lights={[]}
          intensity={0.9} // 👈 veel lager
          luminanceThreshold={0.25} // 👈 minder pixels
          luminanceSmoothing={0.6}
        />
      </EffectComposer>

      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
