import { style } from "@vanilla-extract/css";

export const toastContainer = style({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "12px 24px",
  borderRadius: "8px",
  color: "white",
  transition: "opacity 0.3s ease-in-out",
  zIndex: 9999,
});

export const successToast = style({
  backgroundColor: "rgba(0, 0, 0, 0.8)",
});

export const errorToast = style({
  backgroundColor: "rgba(220, 38, 38, 0.8)",
});

export const fadeOut = style({
  opacity: 0,
});

export const fadeIn = style({
  opacity: 1,
});
