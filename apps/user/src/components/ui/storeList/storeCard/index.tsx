"use client";

import StatusLabel from "@/components/common/statusLabel";
import StoreInfo from "@/components/common/storeInfo";
import type { StoreList } from "@/types/apis/stores.type";
import generateProductStatus from "@/utils/productStatus";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as style from "./storeCard.css";

interface StoreCardProps {
  storesDetail: StoreList;
}

export const StoreCard = ({ storesDetail }: StoreCardProps) => {
  const router = useRouter();
  const { status, label } = generateProductStatus(storesDetail.totalStockCount);
  const handleClick = () => {
    router.push(`/stores/${storesDetail.storeId}`);
  };
  return (
    <div
      className={style.card}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          router.push(`/stores/${storesDetail.storeId}`);
        }
      }}
    >
      <Image
        src={storesDetail.storeImage || "/images/thumb.png"}
        alt={""}
        className={style.image}
        width={240}
        height={140}
        priority={false}
      />
      <div className={style.priceSectionWrapper}>
        <StoreInfo storesDetail={storesDetail} />
      </div>

      <div className={style.label}>
        <StatusLabel status={status}>{label}</StatusLabel>
      </div>
    </div>
  );
};
