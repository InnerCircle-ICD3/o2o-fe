import { globalTheme } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  borderBottom: `1px solid ${globalTheme.color.line}`,

  selectors: {
    "&:last-child": {
      borderBottom: "none",
    },
  },
});

export const wrapper = style({
  display: "flex",
  justifyContent: "space-between",

  padding: "10px 0",
});

export const info = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 5,
});

export const dates = style({
  fontSize: 12,
});

export const thumbnail = style({
  position: "relative",

  width: 130,
  height: 130,

  borderRadius: 12,
  overflow: "hidden",
});

export const image = style({
  objectFit: "cover",
});

export const label = style({
  position: "absolute",
  top: 4,
  right: 4,

  zIndex: 2,
});

export const cover = style({
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 1,

  width: "100%",
  height: "100%",

  backgroundColor: globalTheme.color.black,
  opacity: 0.5,
});
