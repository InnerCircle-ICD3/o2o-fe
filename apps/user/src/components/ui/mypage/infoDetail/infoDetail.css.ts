import { globalTheme } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const errorWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  gap: 16,
});

export const title = style({
  fontSize: 20,
  fontWeight: "700",

  marginTop: 24,
});

export const content = style({
  fontSize: 16,
  lineHeight: 1.5,
  whiteSpace: "pre-wrap",

  paddingBottom: 24,
});

export const date = style({
  fontSize: 14,
  textAlign: "right",
  color: globalTheme.color.gray.base,

  marginBottom: 16,
});
