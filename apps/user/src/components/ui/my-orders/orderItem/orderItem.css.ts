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

export const titleBox = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const title = style({
  fontSize: 18,
  fontWeight: "bold",
});

export const infoBox = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: 5,
});

export const image = style({
  objectFit: "cover",
  borderRadius: 10,
});

export const info = style({
  flex: 1,
});

export const storeTitle = style({
  fontSize: 14,
  fontWeight: 600,
});

export const productTitle = style({
  marginTop: 4,
  fontSize: 12,
});

export const time = style({
  marginTop: 2,
  fontSize: 12,
});
