import { keyframes, style } from "@vanilla-extract/css";

export const container = style({
  marginTop: 30,
  marginBottom: 30,
  whiteSpace: "pre-wrap",
  fontSize: 14,
});

export const contentWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

export const checkboxLabel = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  cursor: "pointer",
  userSelect: "none",
});

export const checkbox = style({
  width: 20,
  height: 20,
  accentColor: "var(--primary)",
});

export const warningText = style({
  fontSize: 12,
  color: "#6B7280",
  marginTop: 8,
});

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const slideIn = keyframes({
  from: { transform: "translate(-50%, -48%)", opacity: 0 },
  to: { transform: "translate(-50%, -50%)", opacity: 1 },
});

export const modalOverlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  animation: `${fadeIn} 150ms ease-out`,
  zIndex: 1000,
});

export const modalContent = style({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  borderRadius: 8,
  padding: 24,
  width: "90%",
  maxWidth: 450,
  animation: `${slideIn} 150ms ease-out`,
  zIndex: 1001,
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
});

export const modalTitle = style({
  margin: 0,
  fontSize: 18,
  fontWeight: 600,
  marginBottom: 16,
});

export const modalDescription = style({
  margin: "0 0 24px",
  fontSize: 14,
  lineHeight: 1.5,
  color: "#4B5563",
  whiteSpace: "pre-line",
});

export const modalButtons = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: 12,
});
