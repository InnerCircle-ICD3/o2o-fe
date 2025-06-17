import { globalTheme } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: 20,

  marginTop: 15,

  width: "100%",
});

export const button = style({
  width: "100%",
  height: "100%",
});

export const buttonInner = style({
  position: "relative",

  display: "inline-block",

  width: "100%",
  height: "auto",
  aspectRatio: "1 / 1",
});

export const buttonImage = style({
  width: "100%",
  height: "100%",
  borderRadius: 20,
  backgroundColor: globalTheme.color.gray.background,
});

export const buttonText = style({
  fontSize: 14,
  color: globalTheme.color.gray.base,
});
