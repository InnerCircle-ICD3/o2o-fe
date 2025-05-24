import { globalTheme } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const fixedButton = style({
  position: "fixed",
  bottom: 0,
  left: "50%",
  zIndex: 2,

  transform: "translateX(-50%)",

  width: "100%",
  maxWidth: 480,

  padding: "0 15px 30px",

  borderLeft: `1px solid ${globalTheme.color.line}`,
  borderRight: `1px solid ${globalTheme.color.line}`,
  backgroundColor: globalTheme.color.white,
  fontSize: 16,
});
