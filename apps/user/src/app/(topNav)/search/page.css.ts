import { style } from "@vanilla-extract/css";

export const sectionContainerStyle = style({
  padding: "0 20px",
  marginTop: 25,
});

export const recommendationStyle = style({
  display: "flex",
  flexDirection: "column",
  gap: 10,

  selectors: {
    "& h2": {
      fontSize: 18,
      fontWeight: 700,
    },
  },
});

export const searchHistoryStyle = style([
  recommendationStyle,
  {
    marginTop: 10,
  },
]);
