import type { Result, ResultSuccess } from "@/apis/types";
import { HTTPError } from "ky";
import { CommonErrorCode, type ErrorCode, errorRegistry } from "o2o/errors";
import type { BaseError } from "o2o/errors/base/BaseError";

export class ApiError extends Error {
  errorCode: ErrorCode;
  errorMessage: string;

  constructor(errorCode: ErrorCode, errorMessage: string) {
    super(errorMessage);
    this.name = "ApiError";
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
  }
}

function resolveError(code: ErrorCode, data?: Record<string, unknown>): BaseError {
  const factory = errorRegistry[code] || errorRegistry[CommonErrorCode.UNKNOWN_ERROR];
  return factory(data);
}

function createErrorResult(code: ErrorCode): Result<never> {
  const error = resolveError(code).toJSON();
  return {
    success: false,
    ...error,
    errorCode: code,
  };
}

export const toResult = async <T>(fn: () => Promise<T>): Promise<ResultSuccess<T>> => {
  try {
    const data = await fn();
    if (data && typeof data === "object" && "success" in data) {
      return data as unknown as ResultSuccess<T>;
    }
    return {
      success: true,
      data,
    };
  } catch (error) {
    if (error instanceof HTTPError) {
      const json = await error.response.json();
      const data = json.data as Record<string, unknown> | undefined;
      throw resolveError(json.errorCode, data);
    }

    throw resolveError(CommonErrorCode.UNKNOWN_ERROR);
  }
};

export const toSafeResult = async <T>(fn: () => Promise<ResultSuccess<T>>): Promise<Result<T>> => {
  try {
    const data = await fn();
    if (data && typeof data === "object" && "success" in data) {
      return data as unknown as ResultSuccess<T>;
    }
    return {
      success: true,
      data,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return createErrorResult(error.errorCode);
    }

    return createErrorResult(CommonErrorCode.UNKNOWN_ERROR);
  }
};
