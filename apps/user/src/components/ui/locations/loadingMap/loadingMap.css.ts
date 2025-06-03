import { style } from "@vanilla-extract/css";

export const loadingMap = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 16,
});

export const loadingMapText = style({
  fontSize: 16,
  fontWeight: 600,
  textAlign: "center",
});
