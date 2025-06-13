import type { ResultError } from "@/apis/types";
import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation as useAppMutation,
} from "@tanstack/react-query";

export const useMutation = <Data, Variables>(
  options: UseMutationOptions<Data, ResultError, Variables>,
): UseMutationResult<Data, ResultError, Variables> => {
  return useAppMutation(options);
};
