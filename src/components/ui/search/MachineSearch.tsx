import type { ZoneId } from "../../../data/zones";
import type { MachineConfig } from "../../../data/machines";
import { MACHINES } from "../../../data/machines";
import { useSearchMachines } from "../../../hooks/useSearchMachine";
import { MachineSearchCard } from "./MachineSearchCard";
import { theme } from "../../../styles/theme";
import { Search } from "lucide-react";


type Props = {
  onFocusMachine: (id: string | null, zone: ZoneId) => void;
};

export function MachineSearch({ onFocusMachine }: Props) {
  const { query, setQuery, results, hasResults } =
    useSearchMachines(MACHINES);

  return (
    <div
      style={{
        position: "relative",
        width: 320,
        fontFamily: theme.font.family,
      }}
    >
      {/* SEARCH INPUT */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 16px",
          borderRadius: theme.radius.pill,
          background: theme.colors.surfaceGlass,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: theme.shadow.soft,
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
      {/* ICON */}
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: theme.colors.primary,
            display: "grid",
            placeItems: "center",
            color: "#111",
            fontSize: 14,
            boxShadow: "0 0 12px rgba(255,138,0,0.6)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: theme.colors.primary,
              display: "grid",
              placeItems: "center",
              color: "#111",
            }}
          >
            <Search size={14} />
          </div>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Zoek een machine..."
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: theme.colors.textMain,
            fontSize: "0.9rem",
            fontFamily: "inherit",
          }}
        />


      </div>

      {/* RESULTS */}
      {hasResults && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 10px)",
            left: 0,
            right: 0,
            background: theme.colors.surfaceGlass,
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderRadius: 18,
            padding: 6,
            maxHeight: 280,
            overflowY: "auto",
            boxShadow: "0 18px 40px rgba(0,0,0,0.55)",
            border: "1px solid rgba(255,255,255,0.06)",
            zIndex: 30,
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
