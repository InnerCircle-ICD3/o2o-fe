import { style } from "@vanilla-extract/css";

export const container = style({
  position: "relative",
  width: "100%",
  height: "100vh",
});

export const resetPositionButton = style({
  position: "absolute",
  bottom: 16,
  right: 16,
  zIndex: 2,
  display: "flex",
  alignItems: "center",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: 50,
  cursor: "pointer",
  backgroundColor: "#fff",

  selectors: {
    "&:active": {
      backgroundColor: "#f0f0f0",
    },
  },
});
