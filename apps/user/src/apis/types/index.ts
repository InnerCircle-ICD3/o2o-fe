import type { ErrorJson } from "o2o/errors";

export type ResultError = ErrorJson & {
  success: false;
  errorCode: string;
  response?: unknown;
};

export type ResultSuccess<T> = {
  success: true;
  data: T;
};

export type Result<T> = ResultSuccess<T> | ResultError;

export interface InfiniteQueryResponse<T> {
  pages: Result<T>[];
  pageParams: number[];
}
