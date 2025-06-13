"use client";

import { getStoresDetail } from "@/apis/ssr/stores";
import type { StoresDetail } from "@/types/apis/stores.type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SkeletonStoreCard from "../../storeList/storeCard/skeletonStoreCard";
import * as styles from "./storeMapInfo.css";

export const StoreInfoCard = ({ storeId }: { storeId: number }) => {
  const [storeDetail, setStoreDetail] = useState<StoresDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchStoreDetail = async () => {
      setIsLoading(true);
      const response = await getStoresDetail(storeId.toString());
      if (response.success) {
        setStoreDetail(response.data);
      }
      setIsLoading(false);
    };

    fetchStoreDetail();
  }, [storeId]);

  if (isLoading || !storeDetail) {
    return (
      <div className={styles.storeInfoCard}>
        <SkeletonStoreCard />
      </div>
    );
  }

  return (
    <div
      className={styles.storeInfoCard}
      onClick={() => router.push(`/stores/${storeId}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          router.push(`/stores/${storeId}`);
        }
      }}
    >
      <Image
        className={styles.mainThumbnail}
        src={storeDetail.mainImageUrl || "/images/thumb.png"}
        alt={storeDetail.name}
        width={500}
        height={120}
      />
      <div
        className={`${styles.statusBadge} ${
          storeDetail.status === "OPEN" ? styles.openStatus : styles.closedStatus
        }`}
      >
        {storeDetail.status === "OPEN" ? "영업중" : "영업종료"}
      </div>
      <div className={styles.likeButton}>
        <Image src="/icons/favorite.svg" alt="like" width={16} height={16} />
      </div>

      <div className={styles.storeCardContent}>
        <div className={styles.ratingRow}>
          <div className={styles.flexRow}>
            <h3 className={styles.storeCardTitle}>{storeDetail.name}</h3>
            <div className={styles.categoryText}>{storeDetail.foodCategory.join(" / ")}</div>
          </div>
          <div className={styles.flexRow}>
            <span className={styles.pickupTime}>픽업 시간</span>
          </div>
        </div>
        <div className={styles.ratingRow}>
          <div className={styles.flexRow}>
            <Image src="/icons/star.svg" alt="review" width={16} height={16} />
            <span>{storeDetail.ratingAverage}</span>
            <span>({storeDetail.ratingCount})</span>
          </div>
          <div className={styles.flexRow}>
            {storeDetail.todayPickupStartTime && storeDetail.todayPickupEndTime ? (
              <>
                {storeDetail.todayPickupStartTime.slice(0, 5)} ~{" "}
                {storeDetail.todayPickupEndTime.slice(0, 5)}
              </>
            ) : (
              "픽업 시간 정보 없음"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
