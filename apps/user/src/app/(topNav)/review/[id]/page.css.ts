import { style } from "@vanilla-extract/css";

export const loadingContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
});

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  padding: "20px 0",
});

export const ratingContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
});

export const starsContainer = style({
  display: "flex",
  gap: "8px",
});

export const starButton = style({
  padding: "4px",
});

export const ratingText = style({
  fontSize: "16px",
  fontWeight: "500",
  color: "#666",
});

export const contentContainer = style({
  padding: "16px",
  backgroundColor: "#FAFAFA",
  borderRadius: "8px",
});

export const content = style({
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#333",
  whiteSpace: "pre-wrap",
});

export const imageContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const imageGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "12px",
});

export const imageWrapper = style({
  position: "relative",
  width: "100%",
  paddingBottom: "100%",
  borderRadius: "8px",
  overflow: "hidden",
});

export const image = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const imageError = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#F5F5F5",
  borderRadius: "8px",
  gap: "8px",
});

export const errorIcon = style({
  opacity: 0.5,
});

export const errorText = style({
  fontSize: "12px",
  color: "#666",
  textAlign: "center",
  padding: "0 8px",
});
