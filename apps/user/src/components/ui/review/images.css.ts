import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  width: "100%",
});

export const label = style({
  fontSize: "16px",
  fontWeight: "500",
  color: "#333",
});

export const uploadContainer = style({
  display: "flex",
  gap: "8px",
  width: "100%",
});

export const uploadBox = style({
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

export const previewContainer = style({
  position: "relative",
  width: "80px",
  height: "80px",
});

export const preview = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "8px",
});

export const removeButton = style({
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
