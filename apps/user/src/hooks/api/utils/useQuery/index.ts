import type { AppError } from "@/apis/utils/result";
import {
  type UseQueryOptions,
  type UseQueryResult,
  useQuery as useAppQuery,
} from "@tanstack/react-query";

export const useQuery = <Data, QueryKey extends unknown[] = unknown[]>(
  options: UseQueryOptions<Data, AppError, Data, QueryKey>,
): UseQueryResult<Data, AppError> => {
  return useAppQuery(options);
};
