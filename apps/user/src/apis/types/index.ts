export type ResultError = {
  success: false;
  errorCode: string;
  errorMessage: string;
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
