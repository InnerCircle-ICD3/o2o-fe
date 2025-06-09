import { style } from "@vanilla-extract/css";

export const container = style({
  padding: "20px",
});

export const input = style({
  width: "100%",
  padding: "10px",
  fontSize: "16px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  marginBottom: "12px",
});

export const resultList = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
});

export const resultItem = style({
  padding: "12px",
  borderBottom: "1px solid #eee",
  cursor: "pointer",
  selectors: {
    "&:hover": {
      backgroundColor: "#f9f9f9",
    },
  },
});

export const noResultItem = style({
  padding: "1rem",
  color: "#888",
  textAlign: "center",
});

export const buttonContent = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "5px",
});
