import { HTTPError } from "ky";

export class AppError extends Error {
  errorCode: string;
  errorMessage: string;

  constructor(errorCode: string, errorMessage: string) {
    super(errorMessage);
    this.name = "AppError";
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
  }

  toResult(): ResultError {
    return {
      success: false,
      errorCode: this.errorCode,
      errorMessage: this.errorMessage,
    };
  }
}

type ResultError = {
  success: false;
  errorCode: string;
  errorMessage: string;
};

export type ResultSuccess<T> = {
  success: true;
  data: T;
};

type Result<T> = ResultSuccess<T> | ResultError;

export const toResult = async <T>(
  fn: () => Promise<ResultSuccess<T>>,
): Promise<ResultSuccess<T>> => {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof HTTPError) {
      try {
        const json = await error.response.json<ResultError>();
        throw new AppError(json.errorCode, json.errorMessage);
      } catch {
        throw new AppError("INVALID_JSON", "에러 응답 파싱 실패");
      }
    }

    throw new AppError(
      "UNEXPECTED_ERROR",
      error instanceof Error ? error.message : "알 수 없는 오류입니다.",
    );
  }
};

export const toResultWithError = async <T>(
  fn: () => Promise<ResultSuccess<T>>,
): Promise<Result<T>> => {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof AppError) {
      try {
        return {
          success: false,
          errorCode: error.errorCode || "UNKNOWN",
          errorMessage: error.errorMessage || "알 수 없는 서버 오류입니다.",
        };
      } catch {
        return {
          success: false,
          errorCode: "INVALID_JSON",
          errorMessage: "에러 응답을 파싱할 수 없습니다.",
        };
      }
    }

    return {
      success: false,
      errorCode: "UNEXPECTED_ERROR",
      errorMessage: error instanceof Error ? error.message : "알 수 없는 오류입니다.",
    };
  }
};
