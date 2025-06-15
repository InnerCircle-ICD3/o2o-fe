import { style } from "@vanilla-extract/css";

export const reviewList = style({
  display: "flex",
  overflowX: "auto",
  gap: "16px",
  padding: "8px 0",
});

export const reviewCard = style({
  minWidth: 300,
  maxWidth: 400,
  borderRadius: 12,
  padding: 16,
  border: "1px solid #e0e0e0",
  marginBottom: 2,
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: 16,
});

export const reviewImageBox = style({
  width: 80,
  height: 80,
  flexShrink: 0,
  position: "relative",
});

export const reviewImage = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: 8,
  cursor: "pointer",
  background: "#fafafa",
});

export const reviewImageEmpty = style({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f0f0f0",
  borderRadius: 8,
  color: "#888",
  fontSize: 14,
});

export const reviewContent = style({
  flex: 1,
  minWidth: 0,
});

export const reviewStars = style({
  display: "flex",
  gap: 2,
  marginBottom: 4,
});

export const reviewStarIcon = style({
  width: 18,
  height: 18,
  display: "inline-block",
});

export const reviewNickname = style({
  fontWeight: 600,
  marginBottom: 4,
});

export const reviewText = style({
  fontSize: 14,
  color: "#333",
  whiteSpace: "pre-line",
  wordBreak: "break-all",
});

// Popup modal styles
export const popupOverlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
});

export const popupContent = style({
  position: "relative",
  background: "#fff",
  borderRadius: 12,
  padding: 16,
  maxWidth: "90vw",
  maxHeight: "90vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const popupClose = style({
  position: "absolute",
  top: 8,
  right: 8,
  background: "rgba(0,0,0,0.5)",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  width: 32,
  height: 32,
  fontSize: 20,
  cursor: "pointer",
  zIndex: 1,
});

export const popupMainImage = style({
  maxWidth: "70vw",
  maxHeight: "60vh",
  borderRadius: 8,
  objectFit: "contain",
  marginBottom: 16,
});

export const popupNoImage = style({
  width: "70vw",
  height: "60vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f0f0f0",
  borderRadius: 8,
  marginBottom: 16,
  color: "#888",
  fontSize: 16,
});

export const popupThumbnails = style({
  display: "flex",
  gap: 8,
});

export const popupThumbnail = style({
  width: 60,
  height: 60,
  objectFit: "cover",
  borderRadius: 6,
  border: "2px solid #eee",
  cursor: "pointer",
  background: "#fafafa",
});

export const popupThumbnailActive = style({
  border: "2px solid #FFD600",
});
