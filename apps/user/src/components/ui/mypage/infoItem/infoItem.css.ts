import { globalTheme } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  borderBottom: `1px solid ${globalTheme.color.line}`,

  selectors: {
    "&:last-child": {
      borderBottom: "none",
    },
  },
});

export const wrapper = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  width: "100%",

  padding: "18px 0",
});

export const title = style({
  fontSize: 18,
  fontWeight: "600",

  marginBottom: 4,
});

export const date = style({
  fontSize: 14,
  color: globalTheme.color.gray.base,
});
