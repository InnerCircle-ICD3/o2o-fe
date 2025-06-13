import { globalTheme } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const timePickerContainer = style({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  gap: 8,
  marginTop: 20,
});

export const timePickerColumn = style({
  flex: 1,
  maxHeight: "200px",
  overflowY: "auto",
  borderRadius: 8,
  backgroundColor: globalTheme.color.white,
  scrollbarWidth: "none",
  "::-webkit-scrollbar": {
    display: "none",
  },
});

export const timeItem = style({
  width: "100%",
  padding: "16px 0",
  textAlign: "center",
  borderRadius: 8,
  cursor: "pointer",

  ":hover": {
    backgroundColor: globalTheme.color.tertiary,
    color: globalTheme.color.primary,
  },
});

export const timeItemSelected = style([
  timeItem,
  {
    backgroundColor: globalTheme.color.tertiary,
    color: globalTheme.color.primary,
    borderRadius: 8,

    ":hover": {
      // todo
    },
  },
]);

export const pickupTimeActive = style({
  color: globalTheme.color.primary,
});

export const filterButtonContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: 10,
  marginTop: 20,
});
