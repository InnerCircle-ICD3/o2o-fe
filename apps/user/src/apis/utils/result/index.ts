import { HTTPError } from "ky";

type ResultSuccess<T> = {
  success: true;
  data: T;
};

type ResultError = {
  success: false;
  errorCode: string;
  errorMessage: string;
};

export type Result<T> = ResultSuccess<T> | ResultError;

interface BackendResponseError {
  success: false;
  errorCode: string;
  errorMessage: string;
}

export const toResult = async <T>(fn: () => Promise<T>): Promise<Result<T>> => {
  try {
    const data = await fn();

    return {
      success: true,
      data,
    };
  } catch (error) {
    if (error instanceof HTTPError) {
      try {
        const json = await error.response.json<BackendResponseError>();
        return {
          success: false,
          errorCode: json.errorCode || "UNKNOWN",
          errorMessage: json.errorMessage || "알 수 없는 서버 오류입니다.",
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
