import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  paddingBottom: "20px",
});

export const section = style({
  marginTop: "20px",
});

export const ratingContainer = style({
  paddingTop: "20px",
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

export const reviewContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  width: "100%",
});

export const reviewLabel = style({
  fontSize: "16px",
  fontWeight: "500",
  color: "#333",
});

export const reviewTextarea = style({
  width: "100%",
  minHeight: "120px",
  padding: "12px",
  border: "1px solid #E5E5E5",
  borderRadius: "8px",
  fontSize: "14px",
  resize: "none",
  outline: "none",
  ":focus": {
    borderColor: "#666",
  },
  "::placeholder": {
    color: "#999",
  },
});

export const imageContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  width: "100%",
});

export const imageLabel = style({
  fontSize: "16px",
  fontWeight: "500",
  color: "#333",
});

export const imageUploadContainer = style({
  display: "flex",
  gap: "8px",
  width: "100%",
});

export const imageUploadBox = style({
  width: "80px",
  height: "80px",
  border: "1px dashed #E5E5E5",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  backgroundColor: "#FAFAFA",
  transition: "all 0.2s ease-in-out",
  ":hover": {
    borderColor: "#666",
    backgroundColor: "#F5F5F5",
  },
});

export const imagePreviewContainer = style({
  position: "relative",
  width: "80px",
  height: "80px",
});

export const imagePreview = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "8px",
});

export const removeImageButton = style({
  position: "absolute",
  top: "-8px",
  right: "-8px",
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  backgroundColor: "#666",
  border: "none",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: "14px",
  padding: 0,
  ":hover": {
    backgroundColor: "#333",
  },
});

export const uploadIcon = style({
  width: "24px",
  height: "24px",
  marginBottom: "4px",
});

export const uploadText = style({
  fontSize: "12px",
  color: "#666",
});

export const submitButton = style({
  width: "100%",
  height: "48px",
  backgroundColor: "#FF6B00",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "500",
  cursor: "pointer",
  marginTop: "20px",
  ":hover": {
    backgroundColor: "#FF8533",
  },
  ":disabled": {
    backgroundColor: "#E5E5E5",
    cursor: "not-allowed",
  },
});
