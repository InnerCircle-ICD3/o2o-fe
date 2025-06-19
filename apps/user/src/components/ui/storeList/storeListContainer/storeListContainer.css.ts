import { globalTheme } from "@/styles/theme.css";
import { keyframes, style } from "@vanilla-extract/css";

export const container = style({
  height: "100%",
});

export const title = style({
  fontSize: 18,
  fontWeight: "bold",
  marginTop: 20,
  marginBottom: 10,
});

export const loadingContainer = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "50px",
});

const rotate = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const pullIcon = style({
  width: "40px",
  height: "40px",
  color: globalTheme.color.primary,
  animation: `${rotate} 1s linear infinite`,
});
