import { apiClient } from "@/apis/client";
import type { InfiniteQueryResponse, Result } from "@/apis/types";
import { useQueryParams } from "@/hooks/useQueryParams";
import type { OrderList } from "@/types/apis/order.type";
import { useInfiniteQuery } from "@tanstack/react-query";

const getMyOrder = (params: string) => {
  return apiClient.get<OrderList>(`customers/orders?${params}`);
};

const MY_ORDER_QUERY_KEY = "myOrder";

const useGetMyOrder = (id: number) => {
  const { queryParams, setAllQueryParams } = useQueryParams();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useInfiniteQuery<Result<OrderList>, Error, InfiniteQueryResponse<OrderList>>({
      queryKey: [MY_ORDER_QUERY_KEY, id],
      queryFn: ({ pageParam }) => {
        const params = { custromerId: id.toString() } as Record<string, string | number>;
        if (pageParam !== undefined) params.lastId = pageParam as number;

        setAllQueryParams(params);
        return getMyOrder(queryParams.toString());
      },
      getNextPageParam: (lastPage) => {
        return lastPage.success && lastPage.data.contents.length > 0
          ? lastPage.data.lastId
          : undefined;
      },
      initialPageParam: undefined,
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isError,
    isLoading,
  };
};

export default useGetMyOrder;
