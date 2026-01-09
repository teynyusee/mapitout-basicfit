import * as THREE from "three";

/* =======================
   CLICK
======================= */
export function createLogoClickHandler() {
  return (e: any) => {
    const obj = e.object as THREE.Object3D;

    if (obj?.name === "BASIC_FIT_LOGO") {
      window.dispatchEvent(
        new CustomEvent("zone-change", {
          detail: "overview",
        })
      );
      return true;
    }

    return false;
  };
}

/* =======================
   HOVER IN
======================= */
export function createLogoHoverHandler() {
  return (e: any) => {
    const obj = e.object as THREE.Mesh;
    if (obj?.name !== "BASIC_FIT_LOGO") return false;

    document.body.style.cursor = "pointer";
    obj.userData.hover = true;

    return true;
  };
}

/* =======================
   HOVER OUT
======================= */
export function createLogoHoverOutHandler() {
  return (e: any) => {
    const obj = e.object as THREE.Mesh;
    if (obj?.name !== "BASIC_FIT_LOGO") return false;

    document.body.style.cursor = "default";
    obj.userData.hover = false;

    return true;
  };
}
