import { BaseError } from "../base/BaseError";

export enum CustomerErrorCode {
  USER_NOT_FOUND = "U001",
  CUSTOMER_NOT_FOUND = "C001",
  CUSTOMER_ADDRESS_NOT_FOUND = "CA001",
  CUSTOMER_ADDRESS_ALREADY_EXISTS = "CA002",
}

export class CustomerError extends BaseError {
  private static readonly messages: Record<CustomerErrorCode, string> = {
    [CustomerErrorCode.USER_NOT_FOUND]: "사용자를 찾을 수 없습니다.",
    [CustomerErrorCode.CUSTOMER_NOT_FOUND]: "고객을 찾을 수 없습니다.",
    [CustomerErrorCode.CUSTOMER_ADDRESS_NOT_FOUND]: "고객 주소를 찾을 수 없습니다.",
    [CustomerErrorCode.CUSTOMER_ADDRESS_ALREADY_EXISTS]: "이미 등록된 고객 주소입니다.",
  };

  constructor(code: CustomerErrorCode, statusCode = 500) {
    super(code, CustomerError.messages[code], statusCode);
  }

  static userNotFound(): CustomerError {
    return new CustomerError(CustomerErrorCode.USER_NOT_FOUND, 404);
  }

  static customerNotFound(): CustomerError {
    return new CustomerError(CustomerErrorCode.CUSTOMER_NOT_FOUND, 404);
  }

  static addressNotFound(): CustomerError {
    return new CustomerError(CustomerErrorCode.CUSTOMER_ADDRESS_NOT_FOUND, 404);
  }

  static addressAlreadyExists(): CustomerError {
    return new CustomerError(CustomerErrorCode.CUSTOMER_ADDRESS_ALREADY_EXISTS, 409);
  }
}
