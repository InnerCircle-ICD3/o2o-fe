"use client";

import { StoreCard } from "@/components/ui/storeList/storeCard";
import SkeletonStoreCard from "@/components/ui/storeList/storeCard/skeletonStoreCard";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useEffect, useRef } from "react";

const StoreListContainer = () => {
  const size = 5;

  const { stores, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, error } =
    useInfiniteScroll({
      size,
      api: "search/store",
    });

  const observerRef = useRef<IntersectionObserver | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0,
      },
    );

    if (bottomRef.current) {
      observerRef.current.observe(bottomRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [fetchNextPage, hasNextPage]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {isLoading
        ? Array.from({ length: 5 }).map((_, i) => (
            <SkeletonStoreCard key={`skeleton-${i}-${Date.now()}`} />
          ))
        : stores.map((store) => (
            <StoreCard
              key={store.id}
              imageUrl="/images/store_1.png"
              title={store.name}
              subtitle="김밥 / 주먹밥 / 가정식"
              originalPrice={10000}
              salePrice={5000}
              rating={4.7}
              reviews={257}
              distance="1km"
            />
          ))}

      {/* 감지용 sentinel 요소 */}
      <div ref={bottomRef} style={{ height: 1 }} />

      {isFetchingNextPage && <SkeletonStoreCard key="loading-skeleton" />}
    </div>
  );
};

export default StoreListContainer;
