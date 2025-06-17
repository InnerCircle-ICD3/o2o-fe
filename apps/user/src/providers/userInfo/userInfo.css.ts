import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  height: "100%",
  width: "100%",
});

export const image = style({
  borderRadius: "50%",
});
