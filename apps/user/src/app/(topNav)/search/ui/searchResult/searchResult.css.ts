import { globalTheme } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const recommendSearchContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

export const recentSearchContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

export const searchTitle = style({
  fontSize: 16,
  fontWeight: 700,
});

export const emphasize = style({
  color: globalTheme.color.primary,
});

export const listStyle = style({
  display: "flex",
  width: "100%",
  padding: "5px 0",
});

export const listItemButton = style({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: 10,
  width: "100%",
});

export const listItemText = style({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: 10,
  color: globalTheme.color.gray.base,
});

export const text = style({
  color: globalTheme.color.text.primary,
  fontSize: 16,
  fontWeight: 500,
  lineHeight: "normal",
});
