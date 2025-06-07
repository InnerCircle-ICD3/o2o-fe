import { globalTheme } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "1rem",
  gap: "1.5rem",
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

export const requireLogin = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",

  marginTop: "120px",
  flex: 1,
  gap: "1.5rem",
});

export const requireLoginText = style({
  fontSize: "13px",
  fontWeight: 500,
  marginBottom: "20px",
});

export const loginOptionButton = style({
  width: "100%",
  padding: "16px 20px",
  backgroundColor: globalTheme.color.white,
  border: `1px solid ${globalTheme.color.line}`,
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
  gap: "10px",
  textAlign: "left",
});

export const loginOptionTextContainer = style({
  display: "flex",
  flexDirection: "column",
});

export const loginOptionTitle = style({
  fontSize: "16px",
  fontWeight: 600,
});

export const loginOptionSub = style({
  fontSize: "13px",
  color: "#999",
  marginTop: "4px",
});
