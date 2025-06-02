import { getStoreList } from "@/apis/ssr/stores";
import type { Result } from "@/apis/utils/result";
import type { InfiniteQueryResponse, StoreSearchResponse } from "@/types/apis/stores.type";
import { useInfiniteQuery } from "@tanstack/react-query";

const SIZE = 10;

export const useStoreList = () => {
  const {
    data: stores,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery<Result<StoreSearchResponse>, Error, InfiniteQueryResponse>({
    queryKey: ["stores"],
    queryFn: ({ pageParam = 0 }) => getStoreList(SIZE, pageParam as number),
    getNextPageParam: (lastPage) => (lastPage.success ? lastPage.data.pageNumber + 1 : undefined),
    initialPageParam: 0,
  });

  return {
    stores,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  };
};
