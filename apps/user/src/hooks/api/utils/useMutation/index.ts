import type { AppError } from "@/apis/utils/result";
import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation as useAppMutation,
} from "@tanstack/react-query";

export const useMutation = <Data, Variables>(
  options: UseMutationOptions<Data, AppError, Variables>,
): UseMutationResult<Data, AppError, Variables> => {
  return useAppMutation(options);
};
