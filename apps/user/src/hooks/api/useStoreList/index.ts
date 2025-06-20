import { getStoreList } from "@/apis/ssr/stores";
import type { InfiniteQueryResponse, Result } from "@/apis/types";
import { useGeolocation } from "@/hooks/useGeolocation";
import useLoading from "@/hooks/useLoading";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useFilterTab } from "@/stores/useFilterTab";
import type { StoreListResponse } from "@/types/apis/stores.type";
import { useInfiniteQuery } from "@tanstack/react-query";

const SIZE = 5;

export const STORE_LIST_QUERY_KEY = "storeList";

export const useStoreList = () => {
  const locations = useGeolocation();
  const { selectedFoodType, search, getPickupTimeString, reservable } = useFilterTab();
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
    queryKey: [STORE_LIST_QUERY_KEY, locations, search, selectedFoodType, pickupTime, reservable],
    queryFn: ({ pageParam }) => {
      const params: Record<string, string | number | undefined> = {
        size: SIZE,
        latitude: locations?.lat,
        longitude: locations?.lng,
      };
      if (selectedFoodType) params.storeCategory = selectedFoodType;
      if (pickupTime) params.time = pickupTime;
      if (reservable !== undefined) params.onlyReservable = reservable ? "true" : undefined;
      if (pageParam !== undefined) params.lastId = String(pageParam);
      if (search) params.searchText = search;

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
  const loading = useLoading(isLoading);
  const fetchingNextpage = useLoading(isFetchingNextPage);

  return {
    stores,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage: fetchingNextpage,
    isLoading: loading,
    error,
  };
};
