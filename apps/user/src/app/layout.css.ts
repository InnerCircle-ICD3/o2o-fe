import { globalTheme } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  maxWidth: "480px",

  margin: "0 auto",
  borderLeft: `1px solid ${globalTheme.color.line}`,
  borderRight: `1px solid ${globalTheme.color.line}`,

  backgroundColor: globalTheme.color.gray.light,
});

export const main = style({
  backgroundColor: globalTheme.color.white,
});
