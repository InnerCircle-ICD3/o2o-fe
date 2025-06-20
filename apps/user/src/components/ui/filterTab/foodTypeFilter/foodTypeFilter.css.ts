import { globalTheme } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import {
  bottomSheetListItemButtonStyle,
  bottomSheetListItemStyle,
  bottomSheetListStyle,
} from "../../mainHeader/mainHeader.css";

export const filterListStyle = bottomSheetListStyle;

export const filterListItemHover = style([
  bottomSheetListItemStyle,
  {
    width: "100%",
    borderRadius: 16.5,
    padding: "10px 12px",
  },
]);

export const filterListItemSelected = style([
  bottomSheetListItemStyle,
  {
    borderRadius: 16.5,
    padding: "10px 12px",
    border: `1px solid ${globalTheme.color.primary}`,
  },
]);

export const filterListItemButtonStyle = style([bottomSheetListItemButtonStyle]);

export const filterButtonContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: 10,
  marginTop: 20,
});
