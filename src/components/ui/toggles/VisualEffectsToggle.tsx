import { theme } from "../../../styles/theme";

type Props = {
  enabled: boolean;
  onToggle: () => void;
};

export function VisualEffectsToggle({
  enabled,
  onToggle,
}: Props) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: "100%",
        padding: "10px 14px",
        borderRadius: theme.radius.md,

        background: enabled
          ? theme.gradients.primary
          : theme.colors.surfaceGlass,

        color: enabled ? "#111" : theme.colors.textMain,

        border: `1px solid ${
          enabled
            ? "rgba(255,138,0,0.45)"
            : theme.colors.borderSubtle
        }`,

        boxShadow: enabled
          ? "0 8px 22px rgba(255,138,0,0.35)"
          : theme.shadow.soft,

        cursor: "pointer",
        fontWeight: theme.font.weight.medium,
        fontSize: "0.85rem",

        transition:
          "background 0.25s ease, box-shadow 0.25s ease, transform 0.15s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0)";
      }}
    >
      {enabled
        ? "Visuele effecten aan"
        : "Visuele effecten uit"}
    </button>
  );
}
