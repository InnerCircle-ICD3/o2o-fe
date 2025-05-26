import { apiClient } from "@/apis/client";
import { useInfiniteQuery } from "@tanstack/react-query";

interface InfiniteScrollOptions<T> {
  size: number;
  api: string;
  queryKey: string | string[];
  select?: (data: PaginationResponse<T>) => PaginationResponse<T>;
}
interface PaginationResponse<T> {
  contents: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  isLastPage: boolean;
  isFirstPage: boolean;
}

export const useInfiniteScroll = <T,>({
  size,
  api,
  queryKey,
  select,
}: InfiniteScrollOptions<T>) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error, isLoading, status } =
    useInfiniteQuery({
      queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
      queryFn: async ({ pageParam = 0 }) => {
        const res = await apiClient.get<PaginationResponse<T>>(
          `${api}?page=${pageParam}&size=${size}`,
        );
        return select ? select(res) : res;
      },
      getNextPageParam: (lastPage) => (!lastPage.isLastPage ? lastPage.pageNumber + 1 : undefined),
      initialPageParam: 0,
    });

  const items = data?.pages.flatMap((page) => page.contents) ?? [];

  return {
    items,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    status,
    isLoading,
    pages: data?.pages,
  };
};
