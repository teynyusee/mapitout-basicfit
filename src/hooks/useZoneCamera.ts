/* eslint-disable react-hooks/immutability */
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { CAMERA_NAMES } from "../data/cameras";
import type { ZoneId } from "../data/zones";

/* =======================
   TYPES
======================= */

type GLTFWithCameras = {
  cameras: THREE.Camera[];
};

/* =======================
   HOOK
======================= */

export function useZoneCamera(
  activeZone: ZoneId,
  gltf: GLTFWithCameras,
  controlsRef: React.MutableRefObject<OrbitControlsImpl | null>,
  viewFactor: number,
  forcedCamera: THREE.Camera | null
) {
  const { camera } = useThree();

  const isFirstLoad = useRef(true);

  /* =======================
     🔊 CAMERA WHOOSH SOUND
  ======================= */

  const whooshAudioRef =
    useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    whooshAudioRef.current = new Audio(
      "/sounds/camera_whoosh.mp3"
    );
    whooshAudioRef.current.volume = 0.45;
  }, []);

  /* =======================
     CAMERA POSITIONS
  ======================= */

  const posA = useRef(new THREE.Vector3());
  const posB = useRef(new THREE.Vector3());
  const targetA = useRef(new THREE.Vector3());
  const targetB = useRef(new THREE.Vector3());

  const fromPos = useRef(new THREE.Vector3());
  const toPos = useRef(new THREE.Vector3());
  const fromTarget = useRef(new THREE.Vector3());
  const toTarget = useRef(new THREE.Vector3());

  const blendedPos = useRef(new THREE.Vector3());
  const blendedTarget = useRef(new THREE.Vector3());

  const transitionT = useRef(1);

  const SWITCH_DURATION = 1.2;
  const SLIDER_SMOOTHNESS = 8;

  function easeInOutCubic(t: number) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }


  useEffect(() => {
    const def = CAMERA_NAMES[activeZone];

    const camA = forcedCamera
      ? forcedCamera
      : gltf.cameras.find(
          (c) =>
            c.name ===
            (def.views ? def.views[0] : def.main)
        );

    const camB = forcedCamera
      ? forcedCamera
      : gltf.cameras.find(
          (c) =>
            c.name ===
            (def.views ? def.views[1] : def.main)
        );

    if (!camA || !camB) return;

    camA.updateMatrixWorld(true);
    camB.updateMatrixWorld(true);

    camA.getWorldPosition(posA.current);
    camB.getWorldPosition(posB.current);

    const dirA = new THREE.Vector3();
    const dirB = new THREE.Vector3();

    camA.getWorldDirection(dirA);
    camB.getWorldDirection(dirB);

    targetA.current.copy(posA.current).add(dirA);
    targetB.current.copy(posB.current).add(dirB);

    if (camA instanceof THREE.PerspectiveCamera) {
      const realCam =
        camera as THREE.PerspectiveCamera;
      realCam.fov = camA.fov;
      realCam.near = camA.near;
      realCam.far = camA.far;
      realCam.updateProjectionMatrix();
    }

    if (isFirstLoad.current) {
      camera.position.copy(posA.current);
      controlsRef.current?.target.copy(
        targetA.current
      );
      controlsRef.current?.update();
      transitionT.current = 1;
      isFirstLoad.current = false;
      return;
    }


    whooshAudioRef.current?.pause();
    whooshAudioRef.current!.currentTime = 0;
    whooshAudioRef.current
      ?.play()
      .catch(() => {});

    fromPos.current.copy(camera.position);
    toPos.current.copy(posA.current);

    fromTarget.current.copy(
      controlsRef.current?.target ??
        targetA.current
    );
    toTarget.current.copy(targetA.current);

    transitionT.current = 0;
  }, [
    activeZone,
    forcedCamera,
    gltf,
    camera,
    controlsRef,
  ]);


  useFrame((_, delta) => {
    if (transitionT.current < 1) {
      transitionT.current = Math.min(
        transitionT.current +
          delta / SWITCH_DURATION,
        1
      );

      const t = easeInOutCubic(
        transitionT.current
      );

      blendedPos.current.lerpVectors(
        fromPos.current,
        toPos.current,
        t
      );

      blendedTarget.current.lerpVectors(
        fromTarget.current,
        toTarget.current,
        t
      );

      camera.position.copy(blendedPos.current);
      controlsRef.current?.target.copy(
        blendedTarget.current
      );
      controlsRef.current?.update();
      return;
    }

    if (forcedCamera) return;

    const def = CAMERA_NAMES[activeZone];
    if (!def.views) return;

    const easedView = easeInOutCubic(viewFactor);
    const smooth =
      1 - Math.exp(-delta * SLIDER_SMOOTHNESS);

    const desiredPos = blendedPos.current
      .copy(posA.current)
      .lerp(posB.current, easedView);

    const desiredTarget = blendedTarget.current
      .copy(targetA.current)
      .lerp(targetB.current, easedView);

    camera.position.lerp(desiredPos, smooth);
    controlsRef.current?.target.lerp(
      desiredTarget,
      smooth
    );
    controlsRef.current?.update();
  });
}
