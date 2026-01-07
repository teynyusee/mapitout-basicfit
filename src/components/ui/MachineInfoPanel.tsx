import type { MachineConfig } from "../../data/machines";
import { Tag } from "./Tag";
import { Spec } from "./Spec";
import { theme } from "../../styles/theme";

type Props = {
  machine: MachineConfig;
  onClose: () => void;
};

export function MachineInfoPanel({
  machine,
  onClose,
}: Props) {
  const { info } = machine;

  return (
    <div
      style={{
        flex: 1,
        padding: theme.spacing.lg,
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing.md,
        background: theme.colors.surface,
      }}
    >
      {/* Header */}
      <div>
        <h2
          style={{
            margin: 0,
            fontFamily: theme.font.family,
            fontWeight: theme.font.weight.bold,
          }}
        >
          {info.title}
        </h2>

        <div
          style={{
            display: "flex",
            gap: theme.spacing.xs,
            marginTop: theme.spacing.sm,
            flexWrap: "wrap",
          }}
        >
          <Tag
            label={info.category}
            variant="category"
          />
          {info.tags.map((tag) => (
            <Tag
              key={tag}
              label={tag}
            />
          ))}
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          margin: 0,
          color: theme.colors.textMuted,
          lineHeight: 1.6,
        }}
      >
        {info.description}
      </p>

      {/* Specs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: theme.spacing.sm,
        }}
      >
        <Spec
          label="Difficulty"
          value={info.difficulty}
        />
      </div>

      {/* Actions */}
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          gap: theme.spacing.sm,
        }}
      >
        <button
          style={{
            padding: "0.7rem 1.8rem",
            borderRadius: theme.radius.pill,
            border: `1px solid ${theme.colors.borderSubtle}`,
            background: "transparent",
            color: theme.colors.textMain,
            cursor: "pointer",
          }}
        >
          Details
        </button>

        <button
          onClick={onClose}
          style={{
            padding: "0.7rem 1.8rem",
            borderRadius: theme.radius.pill,
            border: "none",
            cursor: "pointer",
            background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primarySoft})`,
            color: "#111",
            fontWeight: theme.font.weight.bold,
          }}
        >
          Sluiten
        </button>
      </div>
    </div>
  );
}
