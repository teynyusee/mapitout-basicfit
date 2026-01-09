import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
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

/* ----------------------------- */
/* Scene wrapper */
/* ----------------------------- */
function PreviewScene({ object }: { object: THREE.Object3D }) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useEffect(() => {
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera]);

  // OPTIONEEL: zachte rotatie (mag je schrappen)
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

/* ----------------------------- */
/* Main preview */
/* ----------------------------- */
export function MachinePreview({ root, camera }: Props) {
  const previewObject = useMemo(() => {
    const clone = root.clone(true) as THREE.Group;

    /* ---------- Materials ---------- */
    clone.traverse((o) => {
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

    /* ---------- Reset (geen rotatie!) ---------- */
    clone.position.set(0, 0, 0);
    clone.rotation.set(0, 0, 0);
    clone.scale.set(1, 1, 1);

    /* ---------- Center op basis van geometry ---------- */
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());

    clone.position.sub(center);

    return clone;
  }, [root]);

  return (
    <Canvas
      camera={{
        position: camera?.position ?? [0, 5, 10],
        fov: camera?.fov ?? 70,
        near: 0.1,
        far: 100,
      }}
      gl={{
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[6, 8, 6]} intensity={3} />
      <directionalLight position={[-6, 4, -6]} intensity={1.8} />

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
