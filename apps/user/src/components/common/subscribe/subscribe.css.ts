import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: 26,
  height: 26,

  borderRadius: "50%",
  backgroundColor: "rgba(255, 255, 255, 0.6)",
});
