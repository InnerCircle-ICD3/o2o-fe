import { style } from "@vanilla-extract/css";

export const container = style({
  position: "relative",
  width: "100%",
  minHeight: "100%",
});

export const pullIndicator = style({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  color: "#666",
  fontSize: "14px",
  transform: "translateY(-100%)",
  transition: "transform 0.2s ease-out",
  zIndex: 1000,
});

export const refreshing = style({
  transform: "translateY(0) !important",
});
