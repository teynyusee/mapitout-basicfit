import { useMemo, useState } from "react";
import type { MachineConfig } from "../data/machines";

export function useSearchMachines(machines: MachineConfig[]) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();

    return machines
      .filter((machine) => {
        const searchableText = [
          machine.info.title,
          machine.meshName,
          machine.info.category,
          ...machine.info.tags,
          ...machine.info.muscleGroups,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(q);
      })
      .slice(0, 8);
  }, [query, machines]);

  return {
    query,
    setQuery,
    results,
    hasResults: results.length > 0,
  };
}
