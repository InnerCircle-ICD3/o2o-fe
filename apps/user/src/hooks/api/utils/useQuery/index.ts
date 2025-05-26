import type { AppError, ResultSuccess } from "@/apis/utils/result";
import {
  type UseQueryOptions,
  type UseQueryResult,
  useQuery as useAppQuery,
} from "@tanstack/react-query";

export const useQuery = <Data, QueryKey extends unknown[] = unknown[]>(
  options: UseQueryOptions<ResultSuccess<Data>, AppError, ResultSuccess<Data>, QueryKey>,
): UseQueryResult<ResultSuccess<Data>, AppError> => {
  return useAppQuery(options);
};
