import { globalTheme } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",

  marginTop: 80,
});

export const title = style({
  margin: "40px 0 10px",

  fontSize: 24,
  fontWeight: "bold",
  color: globalTheme.color.secondary,
});

export const description = style({
  marginBottom: 40,

  fontSize: 18,
  fontWeight: 500,
  textAlign: "center",
});

export const buttons = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,

  width: "100%",
});
