import { globalTheme } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const storeInfoCard = style({
  position: "absolute",
  bottom: 16,
  left: "50%",
  transform: "translateX(-50%)",
  right: 0,
  width: "90%",
  backgroundColor: globalTheme.color.white,
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
  borderRadius: 16,
  zIndex: 1,
});

export const flexRow = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

export const statusBadge = style({
  position: "absolute",
  top: 20,
  left: 25,
  fontSize: 12,
  fontWeight: 600,
  padding: "6px 10px",
  borderRadius: 999,
});

export const openStatus = style({
  backgroundColor: globalTheme.color.label.sales.background,
  color: globalTheme.color.label.sales.color,
});

export const closedStatus = style({
  backgroundColor: "#FFE5E5",
  color: "#FF4D4D",
});

export const likeButton = style({
  position: "absolute",
  top: 20,
  right: 25,
  backgroundColor: globalTheme.color.white,
  width: 32,
  height: 32,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 0 4px rgba(0,0,0,0.1)",
  cursor: "pointer",
});

export const mainThumbnail = style({
  width: "100%",
  height: 140,
  objectFit: "cover",
  borderRadius: 20,
});

export const storeCardContent = style({
  padding: "12px 5px",
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

export const storeCardTitle = style({
  fontSize: 16,
  fontWeight: 700,
  color: globalTheme.color.text.primary,
});

// 카테고리
export const categoryText = style({
  fontSize: 12,
  color: globalTheme.color.gray.dark,
});

// 별점 및 거리
export const ratingRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: 12,
  color: globalTheme.color.gray.base,
  gap: 8,
  marginTop: 4,
});

export const originPrice = style({
  fontSize: 14,
  color: globalTheme.color.gray.base,
  textDecoration: "line-through",
});

export const salePrice = style({
  fontSize: 18,
  fontWeight: 700,
  color: globalTheme.color.label.sales.color,
});

export const pickupTime = style({
  fontWeight: 700,
  color: globalTheme.color.primary,
});
