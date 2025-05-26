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
    bottom: 260,
  },
});
