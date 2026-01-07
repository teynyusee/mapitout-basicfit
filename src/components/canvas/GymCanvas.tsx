import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

type GymCanvasProps = {
  children: React.ReactNode;
};

export function GymCanvas({ children }: GymCanvasProps) {
  return (
    <Canvas
      shadows
      style={{ width: "100vw", height: "100vh" }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 2000,
        position: [0, 90, 120],
      }}
      onCreated={({ camera, gl }) => {
        camera.layers.enable(1);
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = 2;
      }}
    >
      <color attach="background" args={["#0a0a0a"]} />

      <Environment preset="warehouse" />

      <ambientLight intensity={0.25} />

      <directionalLight
        castShadow
        position={[0, 40, 0]}
        intensity={1.6}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-camera-top={80}
        shadow-camera-bottom={-80}
      />

      <directionalLight
        position={[25, 35, 20]}
        intensity={0.9}
        color="#ffffff"
      />

      <directionalLight
        position={[-30, 20, -10]}
        intensity={0.35}
        color="#8fbcd4"
      />

      <directionalLight
        position={[0, 25, -50]}
        intensity={1.2}
        color="#ffb380"
      />

      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
