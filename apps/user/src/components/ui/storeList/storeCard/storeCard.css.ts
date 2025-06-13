import { globalTheme } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const card = style({
  display: "flex",
  flexDirection: "column",
  borderRadius: "12px",
  overflow: "hidden",
  backgroundColor: "#fff",
  cursor: "pointer",
  marginBottom: "20px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  border: `0.5px solid ${globalTheme.color.line}`,
});

export const image = style({
  width: "100%",
  height: "140px",
  objectFit: "cover",
});

export const content = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const label = style({
  fontSize: "10px",
  backgroundColor: "#e0f5e0",
  color: "#1d7f1d",
  padding: "2px 6px",
  borderRadius: "6px",
  alignSelf: "flex-start",
  fontWeight: 500,
});

export const title = style({
  fontSize: "14px",
  fontWeight: 600,
  color: "#222",
});

export const subtitle = style({
  fontSize: "12px",
  color: "#666",
});

export const priceWrapper = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "4px",
});

export const originalPrice = style({
  textDecoration: "line-through",
  color: "#999",
  fontSize: "12px",
});

export const salePrice = style({
  color: "#008000",
  fontSize: "14px",
  fontWeight: 600,
});

export const rating = style({
  fontSize: "12px",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  color: "#444",
});

export const titleWrapper = style({
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

export const priceSectionWrapper = style({
  display: "flex",
  justifyContent: "space-between",
  padding: "12px",
});

export const priceRightSection = style({
  textAlign: "right",
});

export const originalPriceText = style({
  color: "#999",
  fontSize: "12px",
  fontWeight: 400,
  textDecoration: "line-through",
  marginBottom: "7px",
});

export const salePriceText = style({
  color: "#008000",
  fontSize: "16px",
  fontWeight: 700,
});
