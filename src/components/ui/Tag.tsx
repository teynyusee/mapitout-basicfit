import { theme } from "../../styles/theme";

type Props = {
  label: string;
  variant?: "default" | "category";
};

export function Tag({
  label,
  variant = "default",
}: Props) {
  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: theme.radius.pill,
        fontSize: 12,
        fontWeight: theme.font.weight.medium,
        background:
          variant === "category"
            ? "rgba(255,138,0,0.18)"
            : "rgba(255,255,255,0.08)",
        color:
          variant === "category"
            ? theme.colors.primary
            : theme.colors.textMuted,
      }}
    >
      {label}
    </span>
  );
}
