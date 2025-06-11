import type { ResultError, ResultSuccess } from "@/apis/types";
import {
  type UseQueryOptions,
  type UseQueryResult,
  useQuery as useAppQuery,
} from "@tanstack/react-query";

export const useQuery = <Data, QueryKey extends unknown[] = unknown[]>(
  options: UseQueryOptions<ResultSuccess<Data>, ResultError, ResultSuccess<Data>, QueryKey>,
): UseQueryResult<ResultSuccess<Data>, ResultError> => {
  return useAppQuery(options);
};
