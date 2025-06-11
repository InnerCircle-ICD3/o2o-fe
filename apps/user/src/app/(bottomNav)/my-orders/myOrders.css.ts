import { globalTheme } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  height: "100%",
  overflowY: "auto",

  padding: "44px 0 20px",
});

export const title = style({
  position: "fixed",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 3,

  width: "100%",
  maxWidth: 480,

  padding: "10px 0",

  fontSize: 20,
  textAlign: "center",
  fontWeight: 500,

  borderBottom: `1px solid ${globalTheme.color.line}`,
  borderLeft: `1px solid ${globalTheme.color.line}`,
  borderRight: `1px solid ${globalTheme.color.line}`,
  backgroundColor: globalTheme.color.white,
});
