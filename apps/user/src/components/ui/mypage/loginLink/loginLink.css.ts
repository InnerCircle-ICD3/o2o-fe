import { globalTheme } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const loginLink = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  fontWeight: 600,
  padding: "16px 0",
});

export const loginHeading = style({
  fontSize: 20,
  marginBottom: 4,
});

export const loginText = style({
  fontSize: 14,
  color: globalTheme.color.gray.base,
});
