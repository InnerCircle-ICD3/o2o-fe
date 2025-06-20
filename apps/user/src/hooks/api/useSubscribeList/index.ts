import { apiClient } from "@/apis/client";
import type { InfiniteQueryResponse, Result } from "@/apis/types";
import useLoading from "@/hooks/useLoading";
import { useQueryParams } from "@/hooks/useQueryParams";
import type { SubscribeList } from "@/types/apis/subscribe.type";
import { useInfiniteQuery } from "@tanstack/react-query";

const getMySubscribe = (params: string) => {
  return apiClient.get<SubscribeList>(`store-subscriptions/me?${params}`);
};

export const MY_SUBSCRIBE_QUERY_KEY = "subscribe";

const useSubscribeList = (id?: number) => {
  const { queryParams, setAllQueryParams } = useQueryParams();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useInfiniteQuery<Result<SubscribeList>, Error, InfiniteQueryResponse<SubscribeList>>({
      queryKey: [MY_SUBSCRIBE_QUERY_KEY, id],
      queryFn: ({ pageParam }) => {
        const params = {} as Record<string, string | number>;
        if (pageParam !== undefined) params.lastId = pageParam as number;

        setAllQueryParams(params);
        return getMySubscribe(queryParams.toString());
      },
      getNextPageParam: (lastPage) => {
        return lastPage.success && lastPage.data.contents.length > 0 && lastPage.data.lastId
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

export default useSubscribeList;
