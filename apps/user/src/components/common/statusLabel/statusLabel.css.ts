import { globalTheme } from "@/styles/theme.css";
import { style, styleVariants } from "@vanilla-extract/css";

const statusLabelBase = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: "fit-content",

  padding: "6px 8px",
  borderRadius: "13px",

  fontSize: 12,
  fontWeight: "bold",
});

export const statusLabel = styleVariants(globalTheme.color.label, (label) => [
  statusLabelBase,
  {
    backgroundColor: label.background,
    color: label.color,
  },
]);
