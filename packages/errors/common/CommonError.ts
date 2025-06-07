import { BaseError } from "../base/BaseError";

export enum CommonErrorCode {
  INVALID_INPUT = "CEC001",
  ENTITY_NOT_FOUND = "CEC003",
  INTERNAL_SERVER_ERROR = "CEC004",
  INVALID_TYPE = "CEC005",
  ENTITY_ALREADY_EXISTS = "CEC006",
  VALIDATION_FAILED = "CEC007",
  IMAGE_URL_CONVERSION_FAILED = "CEC008",

  UNKNOWN_ERROR = "CEC999", // 예외 처리되지 않은 오류
}

export class CommonError extends BaseError {
  private static readonly messages: Record<CommonErrorCode, string> = {
    [CommonErrorCode.INVALID_INPUT]: "입력값이 올바르지 않습니다.",
    [CommonErrorCode.ENTITY_NOT_FOUND]: "요청한 엔티티를 찾을 수 없습니다.",
    [CommonErrorCode.INTERNAL_SERVER_ERROR]: "서버 내부 오류가 발생했습니다.",
    [CommonErrorCode.INVALID_TYPE]: "잘못된 타입의 값이 입력되었습니다.",
    [CommonErrorCode.ENTITY_ALREADY_EXISTS]: "엔티티가 이미 존재합니다.",
    [CommonErrorCode.VALIDATION_FAILED]: "유효성 검증에 실패했습니다.",
    [CommonErrorCode.IMAGE_URL_CONVERSION_FAILED]: "이미지 URL 변환에 실패했습니다.",
    [CommonErrorCode.UNKNOWN_ERROR]: "알 수 없는 오류가 발생했습니다.",
  };

  constructor(code: CommonErrorCode, statusCode = 500) {
    super(code, CommonError.messages[code], statusCode);
  }

  static invalidInput(): CommonError {
    return new CommonError(CommonErrorCode.INVALID_INPUT, 400);
  }

  static entityNotFound(): CommonError {
    return new CommonError(CommonErrorCode.ENTITY_NOT_FOUND, 404);
  }

  static internalServerError(): CommonError {
    return new CommonError(CommonErrorCode.INTERNAL_SERVER_ERROR, 500);
  }

  static invalidType(): CommonError {
    return new CommonError(CommonErrorCode.INVALID_TYPE, 400);
  }

  static entityAlreadyExists(): CommonError {
    return new CommonError(CommonErrorCode.ENTITY_ALREADY_EXISTS, 409);
  }

  static validationFailed(): CommonError {
    return new CommonError(CommonErrorCode.VALIDATION_FAILED, 400);
  }

  static imageUrlConversionFailed(): CommonError {
    return new CommonError(CommonErrorCode.IMAGE_URL_CONVERSION_FAILED, 500);
  }

  static unknownError(): CommonError {
    return new CommonError(CommonErrorCode.UNKNOWN_ERROR, 500);
  }
}
