"use client";

import { getStoresDetail } from "@/apis/ssr/stores";
import type { StoresDetail } from "@/types/apis/stores.type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SkeletonStoreCard from "../../storeList/storeCard/skeletonStoreCard";
import * as styles from "./storeMapInfo.css";

interface MockProduct {
  success: boolean;
  data: StoresDetail;
}

const mockProduct: MockProduct = {
  success: true,
  data: {
    id: 105,
    name: "맛있는 분식집",
    mainImageUrl: "/images/thumb.png",
    contact: "010-1234-5678",
    description: "분식 전문점입니다.",
    businessNumber: "1234567890",
    businessHours: [
      {
        dayOfWeek: "MONDAY",
        openTime: "09:00:00",
        closeTime: "18:00:00",
      },
    ],
    address: {
      roadNameAddress: "서울특별시 강남구 테헤란로 427",
      lotNumberAddress: "서울특별시 강남구 삼성동 143-48",
      buildingName: "위워크타워",
      zipCode: "06159",
      region1DepthName: "서울특별시",
      region2DepthName: "강남구",
      region3DepthName: "삼성동",
      coordinate: {
        longitude: 127.0276368,
        latitude: 37.497942,
      },
    },
    pickupDay: "TODAY",
    todayPickupStartTime: "10:00:00",
    todayPickupEndTime: "20:00:00",
    status: "CLOSED",
    ratingAverage: 4.5,
    ratingCount: 123,
    foodCategory: ["소금빵", "메론빵"],
    storeCategory: ["BREAD"],
  },
};

export const StoreInfoCard = ({ storeId }: { storeId: number }) => {
  const [storeDetail, setStoreDetail] = useState<StoresDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    setStoreDetail(mockProduct.data);
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
          <span className={styles.pickupTime}>픽업 시간</span>
        </div>
        <div className={styles.ratingRow}>
          <div className={styles.flexRow}>
            <Image src="/icons/star.svg" alt="review" width={16} height={16} />
            <span>{storeDetail.ratingAverage}</span>
            <span>({storeDetail.ratingCount})</span>
          </div>
          <div className={styles.flexRow}>
            {storeDetail.todayPickupStartTime.slice(0, 5)} ~{" "}
            {storeDetail.todayPickupEndTime.slice(0, 5)}
          </div>
        </div>
      </div>
    </div>
  );
};
