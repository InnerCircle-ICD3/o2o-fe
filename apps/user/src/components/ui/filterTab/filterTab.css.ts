import { globalTheme } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const container = style({
  display: "flex",
  padding: "10px 0",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: 4,

  overflowX: "auto",
});

export const tab = recipe({
  base: {
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
  },

  variants: {
    active: {
      true: {
        backgroundColor: globalTheme.color.black,
        border: "none",
      },
    },
    hover: {
      default: {
        ":hover": {
          background: globalTheme.color.gray.background,
        },
      },
      active: {
        ":hover": {
          background: "rgba(51, 51, 51, 0.95)",
        },
      },
    },
  },

  compoundVariants: [
    {
      variants: {
        active: true,
      },
      style: {
        ":hover": {
          background: "rgba(51, 51, 51, 0.95)",
        },
      },
    },
  ],

  defaultVariants: {
    hover: "default",
  },
});

export const reservation = recipe({
  base: {
    backgroundColor: globalTheme.color.white,
    border: `1px solid ${globalTheme.color.gray.light}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    height: 34,
    padding: "10px 12px",
    flexShrink: 0,
    borderRadius: 16.5,
    fontSize: "0.875rem",
    fontWeight: 400,
  },
  variants: {
    parentActive: {
      true: {
        color: globalTheme.color.white,
        backgroundColor: globalTheme.color.black,
      },
    },
  },
});

export const textStyle = recipe({
  base: {
    lineHeight: "normal",
    textTransform: "uppercase",
  },
  variants: {
    type: {
      tab: {
        fontSize: "0.875rem",
        fontWeight: 400,
        color: globalTheme.color.black,
      },
      pickup: {
        fontSize: "0.75rem",
        fontWeight: 700,
        color: globalTheme.color.gray.base,
      },
    },
    parentActive: {
      true: {
        color: globalTheme.color.white,
      },
    },
  },
});

export const imageStyle = recipe({
  base: {},
  variants: {
    parentActive: {
      true: {
        filter: "invert(1)",
      },
    },
  },
});

export const tabText = textStyle({ type: "tab" });
export const pickupTime = textStyle({ type: "pickup" });
export const active = tab({ active: true });

export const pickupTimeActive = style({
  color: globalTheme.color.primary,
});
