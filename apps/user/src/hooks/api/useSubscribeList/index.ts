import { apiClient } from "@/apis/client";
import type { InfiniteQueryResponse, Result } from "@/apis/types";
import { useQueryParams } from "@/hooks/useQueryParams";
import type { SubscribeList } from "@/types/apis/subscribe.type";
import { useInfiniteQuery } from "@tanstack/react-query";

const getMySubscribe = (params: string) => {
  return apiClient.get<SubscribeList>(`store-subscriptions/me?${params}`);
};

export const MY_SUBSCRIBE_QUERY_KEY = "subscribe";

const useSubscribeList = (id: number, isLogin: boolean) => {
  const { queryParams, setAllQueryParams } = useQueryParams();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useInfiniteQuery<Result<SubscribeList>, Error, InfiniteQueryResponse<SubscribeList>>({
      queryKey: [MY_SUBSCRIBE_QUERY_KEY, id],
      queryFn: ({ pageParam }) => {
        const params = { customerId: id.toString() } as Record<string, string | number>;
        if (pageParam !== undefined) params.lastId = pageParam as number;

        setAllQueryParams(params);
        return getMySubscribe(queryParams.toString());
      },
      getNextPageParam: (lastPage) => {
        return lastPage.success &&
          lastPage.data.contents.length > 0 &&
          lastPage.data.lastId !== lastPage.data.contents.at(-1)?.id
          ? lastPage.data.lastId
          : undefined;
      },
      initialPageParam: undefined,
      enabled: isLogin,
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

export default useSubscribeList;
