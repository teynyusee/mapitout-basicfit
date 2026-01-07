import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type CameraConfig = {
  position: [number, number, number];
  fov?: number;
};

type Props = {
  root: THREE.Object3D;
  camera?: CameraConfig;
};

/* =============================== */
/* SCENE MET AUTO + MOUSE ROTATIE */
/* =============================== */
function PreviewScene({ object }: { object: THREE.Object3D }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // 🍯 SLOW AUTO ROTATE
    groupRef.current.rotation.y += delta * 0.25;
  });

  return (
    <group ref={groupRef}>
      <primitive object={object} />
    </group>
  );
}

export function MachinePreview({ root, camera }: Props) {
  const previewObject = useMemo(() => {
    const clone = root.clone(true) as THREE.Group;

    clone.traverse((o: any) => {
  if (o.isMesh && o.material) {
    const mat = o.material.clone();

    // ✅ behoud originele GLTF kleuren
    mat.side = THREE.DoubleSide;
    mat.emissive?.set(0x000000);
    mat.emissiveIntensity = 0;

    // ❗ NIET aankomen aan color / roughness / metalness
    // GLTF weet dit al correct

    o.material = mat;
  }
});


    // 🔒 RESET TRANSFORMS
    clone.position.set(0, 0, 0);
    clone.rotation.set(0, 0, 0);
    clone.scale.set(1, 1, 1);

    // 📦 CENTER OBJECT
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    clone.position.sub(center);

    // 🎯 UNIFORME GROOTTE
    const TARGET_SIZE = 2.2;
    const maxAxis = Math.max(size.x, size.y, size.z);
    const scale = TARGET_SIZE / maxAxis;
    clone.scale.setScalar(scale);

    // ✅ FRONT VIEW (correct)
    clone.rotation.x = -Math.PI / 2;
    clone.rotation.y = Math.PI;

    return clone;
  }, [root]);

  return (
    <Canvas
      camera={{
        position: camera?.position ?? [0, 1.8, 4.2],
        fov: camera?.fov ?? 42,
        near: 0.1,
        far: 100,
      }}
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2, // 🔥 DIT FIXT JE ORANJE KLEUREN
        outputColorSpace: THREE.SRGBColorSpace,
      }}
    >
      <color attach="background" args={["#151515"]} />

      {/* 💡 CORRECTE BELICHTING */}
      <ambientLight intensity={0.8} />

      <directionalLight
        position={[6, 8, 6]}
        intensity={3}
      />

      <directionalLight
        position={[-6, 4, -6]}
        intensity={2}
      />

      {/* 🌍 DIT IS WAAR JE KLEUREN VANDAAN KOMEN */}
      <Environment preset="warehouse" />

      <PreviewScene object={previewObject} />

      {/* 🖱️ MOUSE ROTATIE */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.6}
        dampingFactor={0.08}
        enableDamping
      />
    </Canvas>
  );
}
