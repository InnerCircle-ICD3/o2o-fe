import { globalTheme } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const containerStyle = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  width: "100%",
  height: 44,
  padding: 12,
  border: `1px solid ${globalTheme.color.gray}`,
  borderRadius: 8,
});

export const inputStyle = style({
  flex: 1,
  border: "none",
  outline: "none",
  fontSize: 16,
  fontWeight: 400,
  color: globalTheme.color.black,

  selectors: {
    "&::placeholder": {
      color: globalTheme.color.black,
    },
  },
});
