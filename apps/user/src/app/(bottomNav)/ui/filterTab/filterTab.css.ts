import { globalTheme } from "@/styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  padding: "10px 0",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: 4,
});

export const tab = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
  height: 34,
  padding: "10px 12px",
  flexShrink: 0,
  borderRadius: 16.5,
  border: `1px solid ${globalTheme.color.gray.light}`,
  background: globalTheme.color.white,

  selectors: {
    "&:hover": {
      background: globalTheme.color.gray.background,
    },
  },
});

export const tabText = style({
  color: globalTheme.color.black,
  fontSize: "0.875rem",
  fontWeight: 400,
  lineHeight: "normal",
  textTransform: "uppercase",
});

export const pickupTime = style({
  color: globalTheme.color.gray.base,
  fontSize: "0.75rem",
  fontWeight: 700,
  lineHeight: "normal",
  textTransform: "uppercase",
});

export const active = style({
  backgroundColor: globalTheme.color.black,
  border: "none",
});

// 전역 스타일로 active와 tabText, pickupTime의 관계 정의
globalStyle(`.${active} .${tabText}`, {
  color: globalTheme.color.white,
});

globalStyle(`.${active} .${pickupTime}`, {
  color: globalTheme.color.white,
});

globalStyle(`.${active} img`, {
  filter: "invert(1)",
});

// active 상태일 때 hover 스타일 추가
globalStyle(`.${active}:hover`, {
  background: "rgba(51, 51, 51, 0.95)",
});
