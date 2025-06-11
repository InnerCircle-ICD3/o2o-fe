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

//FIXME 처음 로딩될때 page 2개씩 호출됨
export const useStoreList = (locations: Coordinates | null) => {
  const { queryParams, setAllQueryParams } = useQueryParams();

  const {
    data: stores,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    isError,
  } = useInfiniteQuery<Result<StoreListResponse>, Error, InfiniteQueryResponse<StoreListResponse>>({
    queryKey: ["stores", "locations"],
    queryFn: ({ pageParam }) => {
      const params = {
        size: SIZE,
        latitude: locations?.lat,
        longitude: locations?.lng,
        searchText: "",
      } as Record<string, string | number>;
      if (pageParam !== undefined) params.lastId = pageParam as string;

      setAllQueryParams(params);
      return getStoreList(queryParams.toString());
    },
    getNextPageParam: (lastPage) => {
      return lastPage.success &&
        lastPage.data.storeList.length > 0 &&
        lastPage.data.lastId !== lastPage.data.storeList.at(-1)?.storeId.toString()
        ? lastPage.data.lastId
        : undefined;
    },
    initialPageParam: undefined,
  });

  return {
    stores,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  };
};
