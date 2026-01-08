import type { ZoneId } from "../../data/zones";
import type { MachineConfig } from "../../data/machines";
import { MACHINES } from "../../data/machines";
import { useSearchMachines } from "../../hooks/useSearchMachine";
import { MachineSearchCard } from "./MachineSearchCard";

type Props = {
  onFocusMachine: (id: string, zone: ZoneId) => void;
};

export function MachineSearch({ onFocusMachine }: Props) {
  const {
    query,
    setQuery,
    results,
    hasResults,
  } = useSearchMachines(MACHINES);

  return (
    <div
      style={{
        position: "relative",
        width: 320,
        fontFamily: "inherit",
      }}
    >
      {/* INPUT */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Zoek een machine..."
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: 14,
          border: "1px solid #1f1f1f",
          outline: "none",
          background: "#0f0f0f",
          color: "white",
          fontSize: 14,
        }}
      />

      {/* RESULTS */}
      {hasResults && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            right: 0,
            background: "#0b0b0b",
            borderRadius: 14,
            padding: 6,
            maxHeight: 260,
            overflowY: "auto",
            boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
            zIndex: 20,
          }}
        >
          {results.map((machine: MachineConfig) => (
            <MachineSearchCard
              key={machine.id}
              machine={machine}
              onClick={() => {
                onFocusMachine(machine.id, machine.zone);
                setQuery("");
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
