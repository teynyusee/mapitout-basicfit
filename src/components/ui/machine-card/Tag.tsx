import { theme } from "../../../styles/theme";

type Props = {
  label: string;
  variant?: "default" | "category";
};

export function Tag({
  label,
  variant = "default",
}: Props) {
  const isCategory = variant === "category";

  return (
    <span
      style={{
        padding: "4px 12px",
        borderRadius: theme.radius.md,
        fontSize: 12,
        fontWeight: theme.font.weight.medium,
        letterSpacing: 0.3,
        whiteSpace: "nowrap",

        background: isCategory
          ? theme.tag.category.background
          : theme.tag.default.background,

        border: `1px solid ${theme.colors.primary}`,

        color: isCategory
          ? theme.tag.category.color
          : theme.tag.default.color,

        backdropFilter: "blur(6px)",
      }}
    >
      {label}
    </span>
  );
}
