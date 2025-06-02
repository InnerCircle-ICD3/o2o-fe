"use client";

import { StoreCard } from "@/components/ui/storeList/storeCard";
import SkeletonStoreCard from "@/components/ui/storeList/storeCard/skeletonStoreCard";
import { useStoreList } from "@/hooks/api/useStoreList";
import type { StoreList } from "@/types/apis/stores.type";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const StoreListContainer = () => {
  const { stores, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, error } =
    useStoreList();

  const { ref: bottomRef, inView } = useInView({
    rootMargin: "100px",
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {isLoading
        ? Array.from({ length: 5 }).map((_, i) => (
            <SkeletonStoreCard key={`skeleton-${i}-${Date.now()}`} />
          ))
        : stores?.pages.map((page) =>
            page.success
              ? page.data.contents.map((store: StoreList) => (
                  <StoreCard key={store.storeId} storesDetail={store} />
                ))
              : null,
          )}

      {/* 감지용 sentinel 요소: 화면에 보이면 inView가 true가 됨 */}
      <div ref={bottomRef} style={{ height: 1 }} />

      {isFetchingNextPage && <SkeletonStoreCard key="loading-skeleton" />}
    </div>
  );
};

export default StoreListContainer;
