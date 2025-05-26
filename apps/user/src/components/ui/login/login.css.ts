import { style } from "@vanilla-extract/css";

export const loginContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // justifyContent: "center",
  marginTop: "50px",
  height: "100vh",
});

export const kakaoButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  background: "#FFEB3B",
  color: "#222",
  border: "none",
  borderRadius: "10px",
  padding: "12px 0",
  width: "85%",
  height: "60px",
  fontSize: "18px",
  fontWeight: 500,
  marginTop: "40px",
  cursor: "pointer",
});
