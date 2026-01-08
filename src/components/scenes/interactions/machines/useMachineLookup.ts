import { useMemo } from "react";
import { MACHINES } from "../../../../data/machines";

export function useMachineLookup() {
  return useMemo(
    () =>
      new Map(
        MACHINES.map((m) => [m.meshName, m])
      ),
    []
  );
}
