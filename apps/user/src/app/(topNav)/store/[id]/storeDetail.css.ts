import { globalTheme } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
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

export const grayBackground = style({
  display: "flex",
  flexDirection: "column",
  gap: 10,

  padding: "20px 18px",
  marginBottom: 10,

  borderRadius: 12,
  backgroundColor: globalTheme.color.gray.background,
});

export const metaInfo = style({
  display: "flex",
  gap: 20,

  fontSize: 14,
});

export const metaTitle = style({
  width: 60,
});

export const metaContent = style({
  flex: 1,

  wordBreak: "keep-all",
});

export const pickupTime = style({
  color: globalTheme.color.primary,
});
