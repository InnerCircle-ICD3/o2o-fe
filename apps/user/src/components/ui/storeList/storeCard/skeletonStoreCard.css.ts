import { keyframes, style } from "@vanilla-extract/css";

const shimmer = keyframes({
  "0%": { backgroundPosition: "-200px 0" },
  "100%": { backgroundPosition: "calc(200px + 100%) 0" },
});

const baseSkeleton = style({
  animation: `${shimmer} 2.5s infinite linear`,
  background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
  backgroundSize: "200px 100%",
  borderRadius: "8px",
});

export const skeletonCardStyle = style({
  display: "flex",
  flexDirection: "column",
  padding: "16px",
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  gap: "12px",
  marginBottom: "20px",
});

export const imageSkeleton = style([
  baseSkeleton,
  {
    width: "100%",
    height: "160px",
    borderRadius: "12px",
  },
]);

export const textSkeleton = style([
  baseSkeleton,
  {
    width: "70%",
    height: "16px",
  },
]);

export const priceSkeleton = style([
  baseSkeleton,
  {
    width: "40%",
    height: "20px",
  },
]);
