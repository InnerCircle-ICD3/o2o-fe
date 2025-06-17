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

export const textarea = style({
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
