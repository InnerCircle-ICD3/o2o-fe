import { ErrorMessages } from "../constants/errorMessages";
import type { BusinessErrorCode, CommonErrorCode } from "../types/errorCodes";

export const getErrorMessage = (code: CommonErrorCode | BusinessErrorCode): string => {
  return ErrorMessages[code] ?? "알 수 없는 오류가 발생했습니다.";
};

export const getError = (code: CommonErrorCode | BusinessErrorCode): Error => {
  return new Error(getErrorMessage(code));
};
