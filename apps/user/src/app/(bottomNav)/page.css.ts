import { globalTheme } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  paddingTop: 100,
  height: "100%",

  overflowY: "auto",
});

export const header = style({
  position: "fixed",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 3,

  padding: "0 20px",

  width: "100%",
  maxWidth: 480,

  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1);",
  backgroundColor: globalTheme.color.white,
});
