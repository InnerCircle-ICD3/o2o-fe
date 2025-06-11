import { createGlobalTheme, createThemeContract } from "@vanilla-extract/css";

export const globalTheme = createThemeContract({
  color: {
    primary: null,
    secondary: null,
    tertiary: null,

    black: null,
    white: null,

    line: null,

    text: {
      primary: null,
    },

    gray: {
      dark: null,
      base: null,
      light: null,
      background: null,
    },

    label: {
      sales: {
        background: null,
        color: null,
      },
      soldOut: {
        background: null,
        color: null,
      },
      endSoon: {
        background: null,
        color: null,
      },
      pending: {
        background: null,
        color: null,
      },
      completed: {
        background: null,
        color: null,
      },
      canceled: {
        background: null,
        color: null,
      },
    },
  },
});

export const theme = createGlobalTheme(":root", globalTheme, {
  color: {
    primary: "#35A865",
    secondary: "#284835",
    tertiary: "#EDF7F1",

    black: "#333333",
    white: "#ffffff",

    line: "#d9d9d9",

    gray: {
      dark: "#666666",
      base: "#999999",
      light: "#CCCCCC",
      background: "#F2F3F6",
    },
    text: {
      primary: "#284835",
    },
    label: {
      sales: {
        background: "#D8F4E4",
        color: "#35A865",
      },
      soldOut: {
        background: "#393A40",
        color: "#FFFFFF",
      },
      endSoon: {
        background: "#FFDDCF",
        color: " #F15937",
      },
      pending: {
        background: "#D7E3FA",
        color: "#447CC2",
      },
      completed: {
        background: "#D8F4E4",
        color: "#35A865",
      },
      canceled: {
        background: "#F3F3F3",
        color: "#666666",
      },
    },
  },
});
