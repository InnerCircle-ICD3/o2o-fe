"use client";

import StatusLabel from "@/components/common/statusLabel";
import StoreInfo from "@/components/common/storeInfo";
import Subscribe from "@/components/common/subscribe";
import { userInfoStore } from "@/stores/userInfoStore";
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
  const { user } = userInfoStore();
  const isLogin = !!user;
  const { status, label } = generateProductStatus(storesDetail.totalStockCount);
  const handleClick = () => {
    router.push(`/stores/${storesDetail.storeId}`);
  };

  return (
    <div className={style.card}>
      {isLogin && (
        <div className={style.subscribeButton}>
          <Subscribe
            isFavorite={storesDetail.isFavorite}
            storeId={storesDetail.storeId}
            customerId={user.customerId}
          />
        </div>
      )}

      <button type={"button"} onClick={handleClick}>
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
      </button>
    </div>
  );
};
