import { globalTheme } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const map = style({
  position: "relative",

  width: "100%",
  height: "auto",
  aspectRatio: "395/270",

  backgroundColor: globalTheme.color.gray.light,
});

export const container = style({
  marginTop: 16,
});

export const title = style({
  fontWeight: "bold",
});

export const location = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: 4,

  marginTop: 6,

  fontSize: 14,
  fontWeight: "500",
  lineHeight: 1,
});

export const wrapper = style({
  marginBottom: 30,
});

export const subTitle = style({
  fontSize: 18,
});

export const marginBottom = style({
  marginBottom: 10,
});

export const paymentAmount = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const price = style({
  fontSize: 26,
  fontWeight: "bold",
});
