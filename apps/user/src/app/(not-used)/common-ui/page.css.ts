import { style } from "@vanilla-extract/css";

export const container = style({
  boxSizing: "border-box",

  width: "100%",
  maxWidth: 400,
  height: "100vh",

  padding: "0 33px",
  margin: "0 auto",
});

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: 20,
});

export const header = style({
  fontSize: 18,
  marginTop: 20,
  marginBottom: 10,
});
