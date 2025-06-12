import { getStoreList } from "@/apis/ssr/stores";
import type { InfiniteQueryResponse, Result } from "@/apis/types";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useFilterTab } from "@/stores/useFilterTab";
import type { StoreListResponse } from "@/types/apis/stores.type";
import { useInfiniteQuery } from "@tanstack/react-query";

interface Coordinates {
  lat: number;
  lng: number;
}

const SIZE = 10;

//FIXME 처음 로딩될때 page 2개씩 호출됨
export const useStoreList = (locations: Coordinates | null) => {
  const { selectedFoodType, getPickupTimeString, reservable } = useFilterTab();
  const { queryParams, setAllQueryParams } = useQueryParams();
  const pickupTime = getPickupTimeString();

  const {
    data: stores,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    isError,
  } = useInfiniteQuery<Result<StoreListResponse>, Error, InfiniteQueryResponse<StoreListResponse>>({
    queryKey: ["stores", "locations", locations, selectedFoodType, pickupTime, reservable],
    queryFn: ({ pageParam }) => {
      // robust params: only string | number | undefined
      const params: Record<string, string | number | undefined> = {
        size: SIZE,
        latitude: locations?.lat,
        longitude: locations?.lng,
      };
      if (selectedFoodType) params.storeCategory = selectedFoodType;
      if (pickupTime) params.time = pickupTime;
      if (reservable !== undefined) params.onlyReservable = reservable ? "true" : undefined;
      if (pageParam !== undefined) params.lastId = String(pageParam);

      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== ""),
      );
      setAllQueryParams(filteredParams);
      return getStoreList(queryParams.toString());
    },
    getNextPageParam: (lastPage) => {
      return lastPage.success && lastPage.data.contents.length > 0
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
