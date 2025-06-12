import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const shimmer = keyframes({
  "0%": { backgroundPosition: "-200px 0" },
  "100%": { backgroundPosition: "calc(200px + 100%) 0" },
});

export const skeleton = recipe({
  base: {
    animation: `${shimmer} 2.5s infinite linear`,
    background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
    backgroundSize: "200px 100%",
    borderRadius: "8px",
  },
  variants: {
    size: {
      imageTop: {
        width: "100%",
        height: "160px",
        borderRadius: "12px",
      },
      imageRight: {
        width: "100px",
        height: "100px",
        borderRadius: "12px",
      },
      text: {
        width: "70%",
        height: "16px",
      },
      price: {
        width: "40%",
        height: "20px",
      },
    },
  },
});

export const skeletonCardStyle = recipe({
  base: {
    padding: "16px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    marginBottom: "20px",
    display: "flex",
    gap: "12px",
  },
  variants: {
    imagePosition: {
      top: {
        flexDirection: "column",
      },
      right: {
        flexDirection: "row",
        alignItems: "center",
      },
      left: {
        flexDirection: "row-reverse",
        alignItems: "center",
      },
    },
  },
  defaultVariants: {
    imagePosition: "top",
  },
});

export const textGroupStyle = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  flex: 1,
});
