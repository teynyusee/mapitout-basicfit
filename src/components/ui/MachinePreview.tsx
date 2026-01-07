import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { MeshStandardMaterial } from "three";


type CameraConfig = {
  position: [number, number, number];
  fov?: number;
};

type Props = {
  root: THREE.Object3D;
  camera?: CameraConfig;
};

function PreviewScene({ object }: { object: THREE.Object3D }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
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

    clone.traverse((o: THREE.Object3D) => {
  if ((o as THREE.Mesh).isMesh) {
    const mesh = o as THREE.Mesh;
    const material = mesh.material;

    if (Array.isArray(material)) {
      mesh.material = material.map((m) => {
        const mat = m.clone();

        if (mat instanceof MeshStandardMaterial) {
          mat.side = THREE.DoubleSide;
          mat.emissive.set(0x000000);
          mat.emissiveIntensity = 0;
        }

        return mat;
      });
    } else {
      const mat = material.clone();

      if (mat instanceof MeshStandardMaterial) {
        mat.side = THREE.DoubleSide;
        mat.emissive.set(0x000000);
        mat.emissiveIntensity = 0;
      }

      mesh.material = mat;
    }
  }
});


    clone.position.set(0, 0, 0);
    clone.rotation.set(0, 0, 0);
    clone.scale.set(1, 1, 1);

    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    clone.position.sub(center);

    const TARGET_SIZE = 2.2;
    const maxAxis = Math.max(size.x, size.y, size.z);
    const scale = TARGET_SIZE / maxAxis;
    clone.scale.setScalar(scale);

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
        toneMappingExposure: 1.2,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
    >
      <color attach="background" args={["#151515"]} />

      <ambientLight intensity={0.8} />

      <directionalLight
        position={[6, 8, 6]}
        intensity={3}
      />

      <directionalLight
        position={[-6, 4, -6]}
        intensity={2}
      />

      <Environment preset="warehouse" />

      <PreviewScene object={previewObject} />

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
