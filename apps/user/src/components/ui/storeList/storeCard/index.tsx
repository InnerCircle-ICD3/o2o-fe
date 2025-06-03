"use client";

import StoreInfo from "@/components/common/storeInfo";
import type { StoreList } from "@/types/apis/stores.type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as styles from "./storeCard.css";

interface StoreCardProps {
  storesDetail: StoreList;
}

export const StoreCard: React.FC<StoreCardProps> = ({ storesDetail }: StoreCardProps) => {
  const router = useRouter();

  const { storeId, storeImage, storeName } = storesDetail;

  const handleClick = () => {
    router.push(`/stores/${storeId}`);
  };
  return (
    <div
      className={styles.card}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          router.push(`/stores/${storeId}`);
        }
      }}
    >
      <Image
        src={storeImage}
        alt={storeName}
        className={styles.image}
        width={240}
        height={140}
        priority={false}
      />
      <div className={styles.priceSectionWrapper}>
        <div className={styles.content}>
          <StoreInfo storesDetail={storesDetail} />
        </div>
        <div className={styles.priceRightSection}>
          <p className={styles.originalPriceText}>10,000₩</p>
          <p className={styles.salePriceText}>5,000₩</p>
        </div>
      </div>
    </div>
  );
};
