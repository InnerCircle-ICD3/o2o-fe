import { globalTheme } from "@/styles/theme.css";
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
  border: `1px solid ${globalTheme.color.line}`,
  borderRadius: 50,
  backgroundColor: globalTheme.color.white,
  cursor: "pointer",

  selectors: {
    "&:active": {
      backgroundColor: globalTheme.color.gray.light,
    },
  },
});

export const resetPositionVariants = styleVariants({
  default: {
    bottom: 16,
  },
  withStoreInfo: {
    bottom: 340,
  },
});

export const buttonText = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
  fontSize: 14,
});
