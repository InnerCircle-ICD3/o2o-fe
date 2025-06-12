"use client";

import ErrorUi from "@/components/common/errorUi";
import VirtualScroll, { VirtualItem } from "@/components/common/virtualScroll";
import { StoreCard } from "@/components/ui/storeList/storeCard";
import SkeletonStoreCard from "@/components/ui/storeList/storeCard/skeletonStoreCard";
import { useStoreList } from "@/hooks/api/useStoreList";
import { useGeolocation } from "@/hooks/useGeolocation";
import type { StoreList } from "@/types/apis/stores.type";
import Categories from "../categories";
import * as style from "./storeListContainer.css";

const StoreListContainer = () => {
  const locations = useGeolocation();
  const { stores, isLoading, fetchNextPage, isError, error } = useStoreList(locations);

  if (isError) {
    return <ErrorUi message={error?.message} />;
  }

  const list = stores?.pages.flatMap((page) => (page.success ? page.data.contents : [])) || [];

  return (
    <div className={style.container}>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, i) => (
          <SkeletonStoreCard key={`skeleton-${i}-${Date.now()}`} />
        ))
      ) : list.length === 0 ? (
        <ErrorUi
          type={"subscribe"}
          message={`이 근처에는 아직 등록된 가게가 없어요.
우리, 좀 더 유명해져야 할 이유가 생겼네요.`}
          isButton={false}
        />
      ) : (
        <VirtualScroll
          overscan={3}
          heights={{
            "store-title": {
              height: 48,
            },
            "store-item": {
              height: 228,
            },
            "store-category": {
              aspectRatio: 388 / 205,
            },
          }}
          onScrollEnd={fetchNextPage}
        >
          <VirtualItem name={"store-category"}>
            <Categories />
          </VirtualItem>
          <VirtualItem name={"store-title"}>
            <h2 className={style.title}>우리동네에서 지금 할인중이에요!</h2>
          </VirtualItem>
          {list.map((store: StoreList) => (
            <VirtualItem key={store.storeId} name={"store-item"}>
              <StoreCard storesDetail={store} />
            </VirtualItem>
          ))}
        </VirtualScroll>
      )}
    </div>
  );
};

export default StoreListContainer;
