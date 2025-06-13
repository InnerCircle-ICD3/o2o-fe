import { style } from "@vanilla-extract/css";

export const container = style({
  position: "relative",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  width: "100%",
  height: "100%",
});

export const message = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 8,

  fontSize: 16,
  fontWeight: "700",

  whiteSpace: "pre-wrap",
  textAlign: "center",
});

export const buttons = style({
  position: "absolute",
  bottom: 24,
  left: "50%",
  transform: "translateX(-50%)",

  display: "flex",
  flexDirection: "column",
  gap: 8,

  width: "100%",
});
