"use client";
import * as commonStyles from "@/styles/common.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as styles from "./storeCard.css";

interface StoreCardProps {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
  originalPrice: number;
  salePrice: number;
  rating: number;
  reviews: number;
  distance: string;
  label?: string;
}

export const StoreCard: React.FC<StoreCardProps> = ({
  id,
  imageUrl,
  title,
  subtitle,
  originalPrice,
  salePrice,
  rating,
  reviews,
  distance,
  label = "판매중",
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/stores/${id}`);
  };
  return (
    <div
      className={styles.card}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          router.push(`/stores/${id}`);
        }
      }}
    >
      <Image
        src={imageUrl}
        alt={title}
        className={styles.image}
        width={240}
        height={140}
        priority={false}
      />
      <div className={styles.content}>
        <span className={styles.label}>{label}</span>
        <article>
          <div className={styles.titleWrapper}>
            <h2 className={commonStyles.title}>{title}</h2>
            <div className={styles.subtitle}>{subtitle}</div>
          </div>
          <div className={commonStyles.reviewAndDistanceWrapper}>
            <Image src={"/icons/review.svg"} alt={""} width={16} height={16} />
            <span>
              <strong>{rating.toFixed(1)}</strong> ({reviews}) · {distance}
            </span>
          </div>
        </article>
        <div className={styles.priceWrapper}>
          <div className={styles.originalPrice}>{originalPrice.toLocaleString()}₩</div>
          <div className={styles.salePrice}>{salePrice.toLocaleString()}₩</div>
        </div>
      </div>
    </div>
  );
};
