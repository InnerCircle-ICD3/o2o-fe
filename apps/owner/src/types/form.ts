import type { UseFormReturn } from "use-form-light";

export type UseFormOptions<T> = {
  defaultValues: T;
  resolver?: (data: unknown) => Promise<{
    values: unknown;
    errors: Record<string, string>;
  }>;
  mode?: string;
};

export type ExtendedUseFormReturn<T> = UseFormReturn<T>;
