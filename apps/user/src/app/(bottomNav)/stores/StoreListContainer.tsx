"use client";
import { getStoreList } from "@/apis/ssr/stores";
import type { Result } from "@/apis/utils/result";
import { StoreCard } from "@/components/ui/storeList/storeCard";
import SkeletonStoreCard from "@/components/ui/storeList/storeCard/skeletonStoreCard";
import type {
  InfiniteQueryResponse,
  StoreList,
  StoreSearchResponse,
} from "@/types/apis/stores.type";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const size = 10;
const StoreListContainer = () => {
  const {
    data: stores,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery<Result<StoreSearchResponse>, Error, InfiniteQueryResponse>({
    queryKey: ["stores"],
    queryFn: ({ pageParam = 0 }) => getStoreList(size, pageParam as number),
    getNextPageParam: (lastPage) => (lastPage.success ? lastPage.data.pageNumber + 1 : undefined),
    initialPageParam: 0,
  });

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
                  <StoreCard
                    key={store.id}
                    id={store.id}
                    imageUrl="/images/store_1.png"
                    title={store.name}
                    subtitle="김밥 / 주먹밥 / 가정식"
                    originalPrice={10000}
                    salePrice={5000}
                    rating={4.7}
                    reviews={257}
                    distance="1km"
                  />
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
