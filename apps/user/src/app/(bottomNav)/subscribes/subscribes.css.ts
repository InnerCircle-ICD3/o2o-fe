import { style } from "@vanilla-extract/css";

export const container = style({
  height: "100%",
  overflowY: "auto",

  padding: "10px 0 20px",
});

export const title = style({
  fontSize: 18,
  fontWeight: "bold",
  marginTop: 20,
  marginBottom: 10,
});
