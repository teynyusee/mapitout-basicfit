/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/purity */
import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

/* =======================
   TYPES
======================= */

type DumbbellSpawn = {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
  meshes: {
    geometry: THREE.BufferGeometry;
    material: THREE.Material | THREE.Material[];
  }[];
};

type Props = {
  gltf: any;
  setForcedCamera: (cam: THREE.Camera | null) => void;
};

/* =======================
   RACK COLLIDER
======================= */

function RackCollider({
  gltf,
  onClickRack,
}: {
  gltf: any;
  onClickRack: () => void;
}) {
  const rackMeshes = Object.values(gltf.nodes).filter(
    (o: any) => o.isMesh && o.name.toLowerCase().includes("rack")
  ) as THREE.Mesh[];

  return (
    <RigidBody type="fixed" colliders="trimesh">
      <group>
        {rackMeshes.map((m, i) => {
          const clickable = m.name === "SM__DB__rack";

          return (
            <mesh
              key={i}
              geometry={m.geometry}
              material={m.material}
              position={m.position}
              rotation={m.rotation}
              scale={m.scale}
              castShadow
              receiveShadow
              onPointerDown={(e) => {
                if (!clickable) return;
                e.stopPropagation();
                onClickRack();
              }}
            />
          );
        })}
      </group>
    </RigidBody>
  );
}

/* =======================
   MAIN COMPONENT
======================= */

export function DroppedDumbbells({
  gltf,
  setForcedCamera,
}: Props) {
  const { camera } = useThree();

  const [active, setActive] = useState(false);
  const [dumbbells, setDumbbells] = useState<DumbbellSpawn[]>([]);

  const bodiesRef = useRef<any[]>([]);
  const triggeredRef = useRef(false);
  const originalDumbbellsRef = useRef<THREE.Object3D[]>([]);

  /* =======================
     CAMERA
  ======================= */

  const camC = gltf.cameras.find(
    (c: any) => c.name === "Camera_Dumbbells_C"
  );

  /* =======================
     SOUND SYSTEM
  ======================= */

  const listenerRef = useRef<THREE.AudioListener | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);
  const lastHitRef = useRef<number[]>([]);

  useEffect(() => {
    const listener = new THREE.AudioListener();
    camera.add(listener);
    listenerRef.current = listener;

    const loader = new THREE.AudioLoader();
    loader.load("/sounds/dumbbells_fall.mp3", (buffer) => {
      bufferRef.current = buffer;
    });

    return () => {
      camera.remove(listener);
    };
  }, [camera]);

  const playImpactSound = (index: number, strength: number) => {
    if (!listenerRef.current || !bufferRef.current) return;

    const now = performance.now();
    if (lastHitRef.current[index] && now - lastHitRef.current[index] < 400) {
      return;
    }

    lastHitRef.current[index] = now;

    const sound = new THREE.Audio(listenerRef.current);
    sound.setBuffer(bufferRef.current);
    sound.setVolume(
      THREE.MathUtils.clamp(strength * 0.07, 0.25, 0.65)
    );
    sound.play();
  };

  /* =======================
     RESET
  ======================= */

  const resetDumbbells = () => {
    setDumbbells([]);
    bodiesRef.current = [];
    lastHitRef.current = [];

    originalDumbbellsRef.current.forEach((o) => {
      o.visible = true;
    });

    setActive(false);
    triggeredRef.current = false;
  };

  /* =======================
     CLICK SEQUENCE
  ======================= */

  const triggerSequence = () => {
    if (triggeredRef.current) return;
    triggeredRef.current = true;

    if (camC) setForcedCamera(camC);
    setActive(true);

    setTimeout(() => setForcedCamera(null), 2500);

    // ⏱️ langer blijven liggen
    setTimeout(() => resetDumbbells(), 9000);
  };

  /* =======================
     SPAWN DUMBBELLS
  ======================= */

  useEffect(() => {
    if (!active) return;

    originalDumbbellsRef.current = [];

    const objects = Object.values(gltf.nodes).filter(
      (o: any) =>
        o.isObject3D &&
        o.name.toLowerCase().includes("dumbbell") &&
        !o.name.toLowerCase().includes("rack")
    ) as THREE.Object3D[];

    const data: DumbbellSpawn[] = objects.map((obj) => {
      obj.updateWorldMatrix(true, false);

      const meshes: DumbbellSpawn["meshes"] = [];
      obj.traverse((c) => {
        if ((c as THREE.Mesh).isMesh) {
          meshes.push({
            geometry: (c as THREE.Mesh).geometry,
            material: (c as THREE.Mesh).material,
          });
        }
      });

      obj.visible = false;
      originalDumbbellsRef.current.push(obj);

      return {
        position: obj.getWorldPosition(new THREE.Vector3()),
        rotation: new THREE.Euler().setFromQuaternion(
          obj.getWorldQuaternion(new THREE.Quaternion())
        ),
        scale: obj.getWorldScale(new THREE.Vector3()),
        meshes,
      };
    });

    setDumbbells(data);

    setTimeout(() => {
      bodiesRef.current.forEach((body) => {
        if (!body) return;

        // 💥 agressievere initiële beweging
        body.applyImpulse({ x: 0, y: -0.6, z: -0.45 }, true);

        body.applyTorqueImpulse(
          {
            x: (Math.random() - 0.5) * 0.4,
            y: 0,
            z: (Math.random() - 0.5) * 0.4,
          },
          true
        );
      });
    }, 20);
  }, [active, gltf]);

  /* =======================
     RENDER
  ======================= */

  return (
    <>
      <RackCollider gltf={gltf} onClickRack={triggerSequence} />

      {active &&
        dumbbells.map((d, i) => (
          <RigidBody
            key={i}
            ref={(api) => (bodiesRef.current[i] = api)}
            type="dynamic"
            mass={18}
            gravityScale={1.8}      
            friction={2.2}          
            restitution={0.02}      
            linearDamping={0.15}    
            angularDamping={1.2}    
            colliders="cuboid"
            position={[d.position.x, d.position.y, d.position.z]}
            rotation={[d.rotation.x, d.rotation.y, d.rotation.z]}
            onCollisionEnter={() => {
              const body = bodiesRef.current[i];
              if (!body) return;

              const v = body.linvel();
              const speed = Math.sqrt(
                v.x * v.x + v.y * v.y + v.z * v.z
              );

              if (speed > 1.1) {
                playImpactSound(i, speed);
              }
            }}
          >
            <group scale={[d.scale.x, d.scale.y, d.scale.z]}>
              {d.meshes.map((m, j) => (
                <mesh
                  key={j}
                  geometry={m.geometry}
                  material={m.material}
                  castShadow
                  receiveShadow
                />
              ))}
            </group>
          </RigidBody>
        ))}
    </>
  );
}
