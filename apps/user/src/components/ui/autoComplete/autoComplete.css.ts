import { globalTheme } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  position: "relative",
  width: "320px",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "40px",
});

export const input = style({
  width: "100%",
  border: `1px solid ${globalTheme.color.gray.light}`,
  borderRadius: "8px",
  padding: "8px 12px",
  fontSize: "16px",
  outline: "none",

  ":focus": {
    borderColor: globalTheme.color.primary,
  },
});

export const dropdown = style({
  position: "absolute",
  left: 0,
  right: 0,
  backgroundColor: globalTheme.color.white,
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  border: `1px solid ${globalTheme.color.gray.light}`,
  borderRadius: "8px",
  marginTop: "4px",
  zIndex: 10,
  maxHeight: "240px",
  overflowY: "auto",
});

export const emptyMessage = style({
  padding: "12px",
  color: globalTheme.color.gray.base,
  fontSize: "14px",
});

export const suggestionItem = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 12px",
  cursor: "pointer",

  ":hover": {
    backgroundColor: "#F5F5F5",
  },
});

export const tagLabel = style({
  marginLeft: "8px",
  fontSize: "12px",
  color: globalTheme.color.gray.base,
});

export const clearButtonContainer = style({
  padding: "8px",
  textAlign: "right",
});

export const clearButton = style({
  fontSize: "12px",
  color: globalTheme.color.primary,
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  padding: "4px",

  ":hover": {
    textDecoration: "underline",
  },
});
