import { skeleton, skeletonCardStyle, textGroupStyle } from "@/styles/skeleton.css";

const SkeletonStoreCard = ({
  hasImage = true,
  hasText = true,
  hasPrice = true,
  imagePosition = "top",
  textLength = 2,
}: {
  hasImage?: boolean;
  hasText?: boolean;
  hasPrice?: boolean;
  imagePosition?: "top" | "right" | "left";
  textLength?: number;
}) => {
  return (
    <div className={skeletonCardStyle({ imagePosition })}>
      {hasImage && imagePosition === "top" && (
        <div
          className={skeleton({
            size: "imageTop",
          })}
        />
      )}

      <div className={textGroupStyle}>
        {hasText &&
          Array.from({ length: textLength }).map((_, index) => (
            <div
              key={`skeleton-text-${index}-${Date.now()}`}
              className={skeleton({ size: "text" })}
            />
          ))}
        {hasPrice && <div className={skeleton({ size: "price" })} />}
      </div>
      {hasImage && imagePosition === "left" && (
        <div
          className={skeleton({
            size: "imageRight",
          })}
        />
      )}
      {hasImage && imagePosition === "right" && (
        <div
          className={skeleton({
            size: "imageRight",
          })}
        />
      )}
    </div>
  );
};

export default SkeletonStoreCard;
