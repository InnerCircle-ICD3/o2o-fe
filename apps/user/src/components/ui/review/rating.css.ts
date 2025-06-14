import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
  paddingTop: "20px",
});

export const starsContainer = style({
  display: "flex",
  gap: "8px",
});

export const starButton = style({
  background: "none",
  border: "none",
  padding: "4px",
  cursor: "pointer",
  ":hover": {
    transform: "scale(1.1)",
  },
  transition: "transform 0.2s ease-in-out",
});

export const ratingText = style({
  fontSize: "16px",
  fontWeight: "500",
  color: "#666",
});

export const errorText = style({
  color: "#FF0000",
  fontSize: "12px",
  marginTop: "4px",
});
