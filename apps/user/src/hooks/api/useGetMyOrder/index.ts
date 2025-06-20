import { apiClient } from "@/apis/client";
import type { InfiniteQueryResponse, Result } from "@/apis/types";
import useLoading from "@/hooks/useLoading";
import { useQueryParams } from "@/hooks/useQueryParams";
import type { OrderList } from "@/types/apis/order.type";
import { useInfiniteQuery } from "@tanstack/react-query";

const getMyOrder = (params: string) => {
  return apiClient.get<OrderList>(`customers/orders?${params}`);
};

export const MY_ORDER_QUERY_KEY = "myOrder";

const useGetMyOrder = (id?: number) => {
  const { queryParams, setAllQueryParams } = useQueryParams();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useInfiniteQuery<Result<OrderList>, Error, InfiniteQueryResponse<OrderList>>({
      queryKey: [MY_ORDER_QUERY_KEY, id],
      queryFn: ({ pageParam }) => {
        const params = { customerId: id?.toString() } as Record<string, string | number>;
        if (pageParam !== undefined) params.lastId = pageParam as number;

        setAllQueryParams(params);
        return getMyOrder(queryParams.toString());
      },
      getNextPageParam: (lastPage) => {
        return lastPage.success &&
          lastPage.data.contents.length > 0 &&
          lastPage.data.lastId !== lastPage.data.contents.at(-1)?.id
          ? lastPage.data.lastId
          : undefined;
      },
      initialPageParam: undefined,
      enabled: !!id,
    });
  const loading = useLoading(isLoading);

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isError,
    isLoading: loading,
  };
};

export default useGetMyOrder;
