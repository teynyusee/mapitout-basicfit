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
        gap: theme.spacing.lg,
        background: theme.colors.surface,
      }}
    >
      <div>
        <span
          style={{
            display: "inline-block",
            fontSize: 12,
            fontWeight: theme.font.weight.semibold,
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
            fontWeight: theme.font.weight.semibold,
            fontSize: 26,
            lineHeight: 1.2,
          }}
        >
          {info.title}
        </h2>

        {info.tags?.length > 0 && (
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
        )}
      </div>

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

      {info.muscleGroups?.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing.sm,
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: theme.font.weight.semibold,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: theme.colors.textMuted,
            }}
          >
            Spiergroepen
          </span>

          <div
            style={{
              display: "flex",
              gap: theme.spacing.xs,
              flexWrap: "wrap",
            }}
          >
            {info.muscleGroups.map((muscle) => (
              <Tag
                key={muscle}
                label={muscle}
                variant="category"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
