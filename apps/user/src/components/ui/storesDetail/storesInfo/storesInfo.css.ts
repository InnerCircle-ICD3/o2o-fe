import { style } from "@vanilla-extract/css";

export const thumbnail = style({
  width: "100%",
  aspectRatio: "393 / 270",

  position: "relative",

  marginBottom: 16,
});

export const subscribeButton = style({
  position: "absolute",
  top: "10px",
  right: "10px",
});

export const title = style({
  display: "flex",
  padding: "0 8px",
  marginBottom: 6,

  fontSize: 18,
  fontWeight: 700,
});

export const storeName = style({
  width: "fit-content",
});

export const category = style({
  flex: 1,

  color: "#6B7684",
  paddingLeft: 8,
  fontSize: 16,
  fontWeight: 300,
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

  marginBottom: 10,
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

export const description = style({
  color: "#32343E",
});
