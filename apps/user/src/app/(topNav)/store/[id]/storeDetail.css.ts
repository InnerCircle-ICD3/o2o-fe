import { globalTheme } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  height: "100%",

  overflowY: "auto",

  paddingBottom: 90,
});

export const wrapper = style({
  padding: "0 20px",
});

export const thumbnail = style({
  width: "100%",
  aspectRatio: "393 / 270",

  position: "relative",

  marginBottom: 16,
});

export const title = style({
  padding: "0 4px",
  marginBottom: 6,

  fontWeight: 700,
  fontSize: 16,
});

export const reviewAndDistanceWrapper = style({
  display: "flex",
  alignItems: "center",
  gap: 4,

  padding: "0 4px",

  fontSize: 12,
  lineHeight: 1.2,

  marginBottom: 16,
});

export const metaSection = style({
  display: "flex",
  flexDirection: "column",
  gap: 10,

  padding: "20px 18px",
  marginBottom: 10,

  borderRadius: 12,
  backgroundColor: globalTheme.color.gray.background,
});

export const metaRow = style({
  display: "flex",
  gap: 20,

  fontSize: 14,
});

export const metaLabel = style({
  width: 60,
});

export const metaValue = style({
  flex: 1,

  wordBreak: "keep-all",
});

export const primaryText = style({
  color: globalTheme.color.primary,
});

export const iconDescription = style({
  display: "flex",
  gap: 4,

  fontSize: 14,
  fontWeight: "bold",
  lineHeight: 1.2,
});

export const productTitle = style({
  fontSize: 18,
  fontWeight: "bold",

  marginTop: 20,
  marginBottom: 10,
});

export const fixedButton = style({
  position: "fixed",
  bottom: 0,
  left: 0,

  padding: "0 15px 30px",
});
