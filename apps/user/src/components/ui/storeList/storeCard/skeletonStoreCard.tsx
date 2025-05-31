import {
  imageSkeleton,
  priceSkeleton,
  skeletonCardStyle,
  textSkeleton,
} from "./skeletonStoreCard.css";

const SkeletonStoreCard = () => {
  return (
    <div className={skeletonCardStyle}>
      <div className={imageSkeleton} />
      <div className={textSkeleton} />
      <div className={textSkeleton} />
      <div className={priceSkeleton} />
    </div>
  );
};

export default SkeletonStoreCard;
