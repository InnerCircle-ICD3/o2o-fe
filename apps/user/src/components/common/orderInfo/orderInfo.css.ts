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

export const category = style({
  fontSize: 14,
  fontWeight: "normal",
  color: globalTheme.color.gray.base,
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

export const orderList = style({
  display: "flex",
});

export const infoWrapper = style({
  position: "relative",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: 2,

  textAlign: "left",
});

export const strongText = style({
  fontWeight: 700,
  fontSize: 16,
});

export const subText = style({
  fontSize: 12,
});

export const productLabel = style({
  position: "absolute",
  top: 5,
  right: 5,
});

const statusLabelBase = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: "fit-content",

  padding: "6px 8px",
  borderRadius: "13px",

  fontSize: 12,
  fontWeight: "bold",
});

export const statusStyle = style(
  {
    background: "#D8F4E4",
    color: "#35A865",
  },
  statusLabelBase,
);

export const thumbnail = style({
  position: "relative",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  width: 150,
  height: 150,

  backgroundColor: globalTheme.color.gray.background,
  borderRadius: 12,
});
