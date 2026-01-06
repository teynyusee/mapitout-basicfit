/* eslint-disable react-hooks/immutability */
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { CAMERA_NAMES } from "../data/cameras";
import type { ZoneId } from "../data/zones";

type GLTFWithCameras = {
  cameras: THREE.Camera[];
};

export function useZoneCamera(
  activeZone: ZoneId,
  gltf: GLTFWithCameras,
  controlsRef: React.MutableRefObject<OrbitControlsImpl | null>,
  viewFactor: number
) {
  const { camera } = useThree();

  /* ===============================
     STATE
  =============================== */
  const isFirstLoad = useRef(true);

  /* ===============================
     VECTORS (NO GC)
  =============================== */
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

  /* ===============================
     TRANSITION
  =============================== */
  const transitionT = useRef(1);
  const SWITCH_DURATION = 1.2;
  const SLIDER_SMOOTHNESS = 8;

  /* ===============================
     EASING
  =============================== */
  function easeInOutCubic(t: number) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  /* ===============================
     ZONE CHANGE
  =============================== */
  useEffect(() => {
    const def = CAMERA_NAMES[activeZone];

    const camAName = def.views ? def.views[0] : def.main;
    const camBName = def.views ? def.views[1] : def.main;

    const camA = gltf.cameras.find(c => c.name === camAName);
    const camB = gltf.cameras.find(c => c.name === camBName);

    if (!camA || !camB) return;

    camA.updateMatrixWorld(true);
    camB.updateMatrixWorld(true);

    // POSITIONS
    camA.getWorldPosition(posA.current);
    camB.getWorldPosition(posB.current);

    // TARGETS
    const dirA = new THREE.Vector3();
    const dirB = new THREE.Vector3();
    camA.getWorldDirection(dirA);
    camB.getWorldDirection(dirB);

    targetA.current.copy(posA.current).add(dirA);
    targetB.current.copy(posB.current).add(dirB);

    // FOV
    if (camA instanceof THREE.PerspectiveCamera) {
      const realCam = camera as THREE.PerspectiveCamera;
      realCam.fov = camA.fov;
      realCam.near = camA.near;
      realCam.far = camA.far;
      realCam.updateProjectionMatrix();
    }

    /* ---------- FIRST LOAD ---------- */
    if (isFirstLoad.current) {
      camera.position.copy(posA.current);

      if (controlsRef.current) {
        controlsRef.current.target.copy(targetA.current);
        controlsRef.current.update();
      } else {
        camera.lookAt(targetA.current);
      }

      transitionT.current = 1;
      isFirstLoad.current = false;
      return;
    }

    /* ---------- ZONE SWITCH ---------- */
    fromPos.current.copy(camera.position);
    toPos.current.copy(posA.current);

    if (controlsRef.current) {
      fromTarget.current.copy(controlsRef.current.target);
    } else {
      fromTarget.current.copy(targetA.current);
    }

    toTarget.current.copy(targetA.current);
    transitionT.current = 0;

  }, [activeZone, gltf, camera, controlsRef]);

  /* ===============================
     FRAME LOOP
  =============================== */
  useFrame((_, delta) => {
    /* -------- ZONE TRANSITION -------- */
    if (transitionT.current < 1) {
      transitionT.current = Math.min(
        transitionT.current + delta / SWITCH_DURATION,
        1
      );

      const t = easeInOutCubic(transitionT.current);

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

      if (controlsRef.current) {
        controlsRef.current.target.copy(blendedTarget.current);
        controlsRef.current.update();
      } else {
        camera.lookAt(blendedTarget.current);
      }

      return;
    }

    /* -------- SLIDER A ↔ B -------- */
    const def = CAMERA_NAMES[activeZone];
    if (!def.views) return;

    const easedView = easeInOutCubic(viewFactor);
    const smooth = 1 - Math.exp(-delta * SLIDER_SMOOTHNESS);

    const desiredPos = blendedPos.current
      .copy(posA.current)
      .lerp(posB.current, easedView);

    const desiredTarget = blendedTarget.current
      .copy(targetA.current)
      .lerp(targetB.current, easedView);

    camera.position.lerp(desiredPos, smooth);

    if (controlsRef.current) {
      controlsRef.current.target.lerp(desiredTarget, smooth);
      controlsRef.current.update();
    } else {
      camera.lookAt(desiredTarget);
    }
  });
}
