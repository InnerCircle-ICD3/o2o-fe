import type { Result, ResultError, ResultSuccess } from "@/apis/types";
import { HTTPError } from "ky";

export class ApiError extends Error {
  errorCode: string;
  errorMessage: string;

  constructor(errorCode: string, errorMessage: string) {
    super(errorMessage);
    this.name = "ApiError";
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

export const toResult = async <T>(fn: () => Promise<T>): Promise<ResultSuccess<T>> => {
  try {
    const data = await fn();
    if (data && typeof data === "object" && "success" in data) {
      // ResultType으로 들어올 때
      return data as unknown as ResultSuccess<T>;
    }
    return {
      success: true,
      data,
    };
  } catch (error) {
    if (error instanceof HTTPError) {
      try {
        const json = await error.response.json<ResultError>();
        throw new ApiError(json.errorCode, json.errorMessage);
      } catch {
        throw new ApiError("INVALID_JSON", "에러 응답 파싱 실패");
      }
    }

    throw new ApiError(
      "UNEXPECTED_ERROR",
      error instanceof Error ? error.message : "알 수 없는 오류입니다.",
    );
  }
};

export const toSafeResult = async <T>(fn: () => Promise<ResultSuccess<T>>): Promise<Result<T>> => {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        errorCode: error.errorCode ?? "UNKNOWN",
        errorMessage: error.errorMessage ?? "알 수 없는 서버 오류입니다.",
      };
    }

    return {
      success: false,
      errorCode: "UNKNOWN",
      errorMessage: "알 수 없는 오류입니다.",
    };
  }
};
