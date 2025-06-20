import { globalTheme } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  position: "relative",
  width: "100%",
  height: "100%",
});

export const bottomSheetContainer = style({
  position: "absolute",
  bottom: 0,
  left: 0,
  zIndex: 1000,
  width: "100%",
  height: "auto",
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "20px 20px 0 0",
  boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.3)",
});

export const bottomSheetHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
});

export const bottomSheetContent = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
});

export const bottomSheetTitle = style({
  fontSize: "20px",
  fontWeight: 900,
});

export const buttonText = style({
  fontSize: "24px",
});

export const trackWrapper = style({
  position: "absolute",
  bottom: "133px",
  left: "calc(12.5%)",
  width: "75%",
  height: "4px",
  zIndex: 0,
});

export const trackBg = style({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "5px",
  backgroundColor: "#ddd",
  zIndex: 0,
});

export const trackProgress = style({
  position: "absolute",
  top: 0,
  left: 0,
  height: "5px",
  backgroundColor: globalTheme.color.primary,
  zIndex: 1,
  transition: "width 0.3s ease",
});

export const option = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flex: 1,
  zIndex: 2,
});

export const input = style({
  display: "none",
});

export const circle = style({
  width: "25px",
  height: "25px",
  borderRadius: "50%",
  borderWidth: "5px",
  borderStyle: "solid",
  transition: "all 0.3s ease",
});

export const circleSelected = style({
  borderColor: "#1B9D5C",
  backgroundColor: "white",
  borderWidth: "8px",
});

export const circleDisabled = style({
  borderColor: "#ccc",
  backgroundColor: "#1B9D5C",
  borderWidth: "8px",
});

export const circlePassed = style({
  borderColor: "#35A865",
  backgroundColor: "white",
  borderWidth: "5px",
});

export const circleInactive = style({
  borderColor: "#ccc",
  backgroundColor: "white",
});

export const label = style({
  marginTop: "8px",
  fontSize: "12px",
  color: "#333",
  width: "60px",
  textAlign: "center",
});

export const buttonWrapper = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  padding: "10px 0",
  gap: "10px",
});

export const searchWrapper = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  padding: "10px 0",
});

export const rangeWrapper = style({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  padding: "10px 0",
});

export const buttonContent = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  gap: "5px",
});
