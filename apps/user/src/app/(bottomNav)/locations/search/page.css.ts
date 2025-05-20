import { style, styleVariants } from "@vanilla-extract/css";

export const container = style({
  position: "relative",
  width: "100%",
  height: "calc(100vh - 70px)",
});

export const resetPositionButtonBase = style({
  position: "absolute",
  right: 16,
  zIndex: 10,
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: 50,
  backgroundColor: "#fff",
  cursor: "pointer",

  selectors: {
    "&:active": {
      backgroundColor: "#f0f0f0",
    },
  },
});

export const resetPositionVariants = styleVariants({
  default: {
    bottom: 16,
  },
  withStoreInfo: {
    bottom: 180,
  },
});

export const storeInfoCard = style({
  position: "absolute",
  bottom: 16,
  left: "50%",
  transform: "translateX(-50%)",
  right: 0,
  width: "90%",
  backgroundColor: "#fff",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
  borderRadius: 16,
  zIndex: 1,
});

export const thumbnail = style({
  width: 80,
  height: 80,
  borderRadius: 8,
  objectFit: "cover",
  flexShrink: 0,
});

export const flexRow = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

export const flexColumn = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

export const storeName = style({
  fontWeight: 800,
  fontSize: 16,
});

export const tagList = style({
  display: "flex",
  gap: 4,
  fontSize: 12,
  color: "#666",
});

export const address = style({
  fontSize: 12,
  color: "#666",
});

export const pickupTime = style({
  fontSize: 12,
  color: "#666",
  fontWeight: 600,
});

export const strikethroughPrice = style({
  fontSize: 12,
  color: "#aaa",
  textDecoration: "line-through",
});

export const minPrice = style({
  fontSize: 16,
  fontWeight: 600,
  color: "#00B26F",
});

export const maxPrice = style({
  fontSize: 10,
  fontWeight: 600,
  color: "#00B26F",
});

export const loadingMap = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 16,
});

export const loadingMapText = style({
  fontSize: 16,
  fontWeight: 600,
  textAlign: "center",
});
