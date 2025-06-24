import { BaseError } from "../base/BaseError";

export enum StoreErrorCode {
  STORE_NOT_FOUND = "S001",
  STORE_CLOSED = "S002",
  STORE_UNAVAILABLE = "S003",
  SUBSCRIPTION_NOT_FOUND = "S004",
  SUBSCRIPTION_UPDATE_FAILED = "S005",
  STORE_COUNT_EXCEEDED = "S018",
  STORE_PRODUCT_NOT_ENOUGH = "ST004",
}

export class StoreError extends BaseError {
  private static readonly messages: Record<StoreErrorCode, string> = {
    [StoreErrorCode.STORE_NOT_FOUND]: "매장을 찾을 수 없습니다.",
    [StoreErrorCode.STORE_CLOSED]: "영업 종료된 매장입니다.",
    [StoreErrorCode.STORE_UNAVAILABLE]: "이용 불가능한 매장입니다.",
    [StoreErrorCode.SUBSCRIPTION_NOT_FOUND]: "구독 정보를 찾을 수 없습니다.",
    [StoreErrorCode.SUBSCRIPTION_UPDATE_FAILED]: "구독 정보 업데이트에 실패했습니다.",
    [StoreErrorCode.STORE_PRODUCT_NOT_ENOUGH]: "재고가 없어 매장을 오픈할 수 없습니다",
    [StoreErrorCode.STORE_COUNT_EXCEEDED]: "매장 등록 개수 제한을 초과했습니다. (최대 1개)",
  };

  constructor(code: StoreErrorCode, statusCode = 500) {
    super(code, StoreError.messages[code], statusCode);
  }

  static notFound(): StoreError {
    return new StoreError(StoreErrorCode.STORE_NOT_FOUND, 404);
  }

  static closed(): StoreError {
    return new StoreError(StoreErrorCode.STORE_CLOSED, 403);
  }

  static unavailable(): StoreError {
    return new StoreError(StoreErrorCode.STORE_UNAVAILABLE, 503);
  }

  static subscriptionNotFound(): StoreError {
    return new StoreError(StoreErrorCode.SUBSCRIPTION_NOT_FOUND, 404);
  }

  static subscriptionUpdateFailed(): StoreError {
    return new StoreError(StoreErrorCode.SUBSCRIPTION_UPDATE_FAILED, 500);
  }

  static storeProductNotFound(): StoreError {
    return new StoreError(StoreErrorCode.STORE_PRODUCT_NOT_ENOUGH, 409);
  }

  static storeCountExceeded(): StoreError {
    return new StoreError(StoreErrorCode.STORE_COUNT_EXCEEDED, 409);
  }
}
