import type { MachineConfig } from "../../data/machines";

type Props = {
  machine: MachineConfig;
  onClick: () => void;
};

export function MachineSearchCard({ machine, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        gap: 12,
        padding: "10px 12px",
        borderRadius: 12,
        cursor: "pointer",
        background: "#0f0f0f",
        transition: "background 0.15s",
        alignItems: "center",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "#161616")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = "#0f0f0f")
      }
    >
      {/* IMAGE */}
      <img
        src={machine.ui?.thumbnail}
        alt={machine.info.title}
        style={{
          width: 42,
          height: 42,
          borderRadius: 8,
          objectFit: "cover",
          background: "#1f1f1f",
        }}
      />

      {/* TEXT */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "white",
          }}
        >
          {machine.info.title}
        </span>
        <span
          style={{
            fontSize: 12,
            color: "#8a8a8a",
          }}
        >
          {machine.info.category}
        </span>
      </div>
    </div>
  );
}
