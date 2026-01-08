import type { MachineConfig } from "../../../data/machines";
import { Tag } from "./Tag";
import { theme } from "../../../styles/theme";

type Props = {
  machine: MachineConfig;
};

export function MachineInfoPanel({ machine }: Props) {
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
        <span
          style={{
            display: "inline-block",
            fontSize: 12,
            fontWeight: theme.font.weight.bold,
            letterSpacing: 0.6,
            textTransform: "uppercase",
            color: theme.colors.primary,
            marginBottom: 6,
          }}
        >
          {info.category}
        </span>

        <h2
          style={{
            margin: 0,
            fontFamily: theme.font.family,
            fontWeight: theme.font.weight.bold,
            fontSize: 26,
            lineHeight: 1.2,
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
          {info.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          margin: 0,
          color: theme.colors.textMuted,
          lineHeight: 1.7,
          fontSize: 15,
        }}
      >
        {info.description}
      </p>
    </div>
  );
}
