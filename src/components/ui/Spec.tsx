import { theme } from "../../styles/theme";

type Props = {
  label: string;
  value: string;
};

export function Spec({ label, value }: Props) {
  return (
    <div
      style={{
        background: theme.colors.primarySoft,
        padding: theme.spacing.sm,
        borderRadius: theme.radius.sm,
      }}
    >
      <div
        style={{
          fontSize: 12,
          color: theme.colors.textMuted,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontWeight: theme.font.weight.bold,
        }}
      >
        {value}
      </div>
    </div>
  );
}
