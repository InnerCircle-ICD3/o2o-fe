import type { ResultSuccess } from "@/apis/types";
import type { ApiError } from "@/apis/utils/result";
import {
  type UseQueryOptions,
  type UseQueryResult,
  useQuery as useAppQuery,
} from "@tanstack/react-query";

export const useQuery = <Data, QueryKey extends unknown[] = unknown[]>(
  options: UseQueryOptions<ResultSuccess<Data>, ApiError, ResultSuccess<Data>, QueryKey>,
): UseQueryResult<ResultSuccess<Data>, ApiError> => {
  return useAppQuery(options);
};
