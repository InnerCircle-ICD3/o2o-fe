import { globalTheme } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const completeProfileContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
  padding: "0 16px",
  width: "100%",
});

export const input = style({
  width: "100%",
  padding: "24px",
  margin: "32px 0",
  border: `1px solid ${globalTheme.color.gray.light}`,
  borderRadius: "6px",
  fontSize: "16px",
});
