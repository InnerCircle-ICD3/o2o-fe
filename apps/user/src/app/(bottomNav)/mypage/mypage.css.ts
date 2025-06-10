import { globalTheme } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",

  width: "100%",
  height: "100%",

  padding: "44px 0 20px",
});

export const wrapper = style({
  flex: 1,

  paddingTop: 30,
});

export const title = style({
  position: "fixed",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 3,

  width: "100%",
  maxWidth: 480,

  padding: "10px 0",

  fontSize: 20,
  textAlign: "center",
  fontWeight: 500,

  borderBottom: `1px solid ${globalTheme.color.line}`,
  borderLeft: `1px solid ${globalTheme.color.line}`,
  borderRight: `1px solid ${globalTheme.color.line}`,
  backgroundColor: globalTheme.color.white,
});

export const loginLink = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  fontWeight: 600,
  padding: "16px 0",
});

export const loginHeading = style({
  fontSize: 20,
  marginBottom: 4,
});

export const loginText = style({
  fontSize: 14,
  color: globalTheme.color.gray.base,
});

export const shortcuts = style({
  display: "flex",
  justifyContent: "space-between",

  margin: "30px 0",

  border: `1px solid ${globalTheme.color.line}`,
  borderRadius: 8,
});

export const shortcutItem = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,

  width: "33.3%",
  height: 80,
});

export const menus = style({
  display: "flex",
  flexDirection: "column",
  gap: 30,
});

export const menuItem = style({
  fontSize: 18,
  fontWeight: 600,
});

export const bottomButtons = style({
  display: "flex",
  justifyContent: "center",
  gap: 8,

  textAlign: "center",
  color: globalTheme.color.gray.base,
});

export const bottomButton = style({
  fontSize: 16,
  fontWeight: 600,
  color: globalTheme.color.gray.base,
});
