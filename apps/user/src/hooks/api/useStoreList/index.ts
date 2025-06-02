import { getStoreList } from "@/apis/ssr/stores";
import type { InfiniteQueryResponse, Result } from "@/apis/types";
import { useQueryParams } from "@/hooks/useQueryParams";
import type { StoreListResponse } from "@/types/apis/stores.type";
import { useInfiniteQuery } from "@tanstack/react-query";

interface Coordinates {
  lat: number;
  lng: number;
}

const SIZE = 10;

export const useStoreList = (locations: Coordinates | null) => {
  const { queryParams, setAllQueryParams } = useQueryParams();

  const {
    data: stores,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery<Result<StoreListResponse>, Error, InfiniteQueryResponse<StoreListResponse>>({
    queryKey: ["stores"],
    queryFn: ({ pageParam = 0 }) => {
      setAllQueryParams({
        size: SIZE,
        page: pageParam as number,
        latitude: locations?.lat,
        longitude: locations?.lng,
      });
      return getStoreList(queryParams.toString());
    },
    getNextPageParam: (lastPage) =>
      lastPage.success ? lastPage.data.storeList.length + 1 : undefined,
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
