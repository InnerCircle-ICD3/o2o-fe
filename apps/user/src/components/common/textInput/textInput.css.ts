import { globalTheme } from "@/styles/theme.css";
import { style, styleVariants } from "@vanilla-extract/css";

export const labelTextStyle = style({
  fontSize: 14,
  fontWeight: 500,
  color: globalTheme.color.gray.base,
  marginBottom: "8px",
  display: "block",
});

export const inputContainer = style({
  position: "relative",
});

export const iconLeft = style({
  position: "absolute",
  left: "12px",
  top: "50%",
  transform: "translateY(-50%)",
});

export const iconRight = style({
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
});

const input = style({
  width: "100%",
  height: 40,
  borderWidth: "1px",
  borderStyle: "solid",
  borderRadius: 8,
  padding: "0 12px",
  fontSize: 16,
  fontWeight: 400,
  outline: "none",

  selectors: {
    "&::placeholder": {
      fontSize: 14,
    },
  },
});

export const inputWithIcon = style({
  paddingLeft: "36px",
});

export const inputStatus = styleVariants({
  primary: [
    input,
    {
      border: "none",
      color: globalTheme.color.text.primary,
      backgroundColor: globalTheme.color.tertiary,
    },
  ],
  common: [
    input,
    {
      borderColor: globalTheme.color.gray.light,
      color: globalTheme.color.black,
      backgroundColor: globalTheme.color.white,

      ":focus": {
        borderColor: globalTheme.color.primary,
      },
    },
  ],
  error: [
    input,
    {
      borderColor: "#F15937",
      color: globalTheme.color.black,
      backgroundColor: globalTheme.color.white,
    },
  ],
  disabled: [
    input,
    {
      borderColor: globalTheme.color.gray.light,
      color: globalTheme.color.gray.base,
      backgroundColor: "#F3F3F3",
      cursor: "not-allowed",
    },
  ],
});
