import { style } from "@vanilla-extract/css";

export const title = style({
  fontSize: 20,
  fontWeight: "700",

  marginTop: 24,
  marginBottom: 16,
});

export const content = style({
  fontSize: 16,
  lineHeight: 1.5,
  whiteSpace: "pre-wrap",

  paddingBottom: 24,
});
