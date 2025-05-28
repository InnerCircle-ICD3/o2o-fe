import type { ApiError } from "@/apis/utils/result";
import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation as useAppMutation,
} from "@tanstack/react-query";

export const useMutation = <Data, Variables>(
  options: UseMutationOptions<Data, ApiError, Variables>,
): UseMutationResult<Data, ApiError, Variables> => {
  return useAppMutation(options);
};
