import { globalTheme } from "@/styles/theme.css";
import { keyframes, style } from "@vanilla-extract/css";
const rotate = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const container = style({
  position: "relative",
  width: "100%",
  height: "100%",
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
  color: globalTheme.color.primary,
  fontSize: "14px",
  transform: "translateY(-100%)",
  transition: "transform 0.2s ease-out",
  zIndex: 1000,
});

export const pullIcon = style({
  width: "50px",
  height: "50px",
  marginRight: "8px",
  color: globalTheme.color.primary,
  transform: "rotate(0deg)",
  transition: "transform 0.3s ease-out",
});

export const pullIconRotating = style({
  transform: "rotate(180deg)",
});

export const refreshing = style({
  transform: "translateY(0) !important",
});

export const loadingIcon = style({
  width: "50px",
  height: "50px",
  marginRight: "8px",
  animation: `${rotate} 1s linear infinite`,
  color: globalTheme.color.primary,
});
