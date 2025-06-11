import { globalTheme } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  borderLeft: `0.5px solid ${globalTheme.color.line}`,
  borderRight: `0.5px solid ${globalTheme.color.line}`,
  borderRadius: 10,

  marginTop: 15,
  padding: "10px 15px",
});

export const wrapper = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  paddingBottom: "10px",
});

export const titleBox = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  marginBottom: 10,
});

export const title = style({
  fontSize: 18,
  fontWeight: "bold",
});

export const infoBox = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: 15,
});

export const image = style({
  objectFit: "cover",
  borderRadius: 10,
});

export const info = style({
  flex: 1,
});

export const storeTitle = style({
  fontSize: 16,
  fontWeight: 600,
});

export const productTitle = style({
  marginTop: 2,
  fontSize: 14,
  fontWeight: 500,
});

export const prices = style({
  display: "flex",
  justifyContent: "space-between",

  marginTop: 8,
});

export const discount = style({
  fontSize: 18,
  fontWeight: "bold",
});

export const original = style({
  textDecoration: "line-through",
  color: globalTheme.color.gray.base,
});

export const time = style({
  marginTop: 2,
  fontSize: 12,
  color: globalTheme.color.gray.base,
});
