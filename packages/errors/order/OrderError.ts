import { BaseError } from "../base/BaseError";

export enum OrderErrorCode {
  ORDER_NOT_FOUND = "O001",
  ORDER_ALREADY_COMPLETED = "O002",
  ORDER_ALREADY_CANCELLED = "O003",
  INVALID_ORDER_MENU = "O004",
  ORDER_ACCEPT_FAILED = "O005",
  ORDER_REJECT_FAILED = "O006",
  ORDER_COMPLETE_FAILED = "O007",
  ORDER_CANCEL_FAILED = "O008",
  INVALID_ORDER_STATUS = "O009",
}

export class OrderError extends BaseError {
  private static readonly messages: Record<OrderErrorCode, string> = {
    [OrderErrorCode.ORDER_NOT_FOUND]: "주문을 찾을 수 없습니다.",
    [OrderErrorCode.ORDER_ALREADY_COMPLETED]: "이미 완료된 주문입니다.",
    [OrderErrorCode.ORDER_ALREADY_CANCELLED]: "이미 취소된 주문입니다.",
    [OrderErrorCode.INVALID_ORDER_MENU]: "주문 가능하지 않은 메뉴입니다.",
    [OrderErrorCode.ORDER_ACCEPT_FAILED]: "주문 수락에 실패했습니다.",
    [OrderErrorCode.ORDER_REJECT_FAILED]: "주문 거절에 실패했습니다.",
    [OrderErrorCode.ORDER_COMPLETE_FAILED]: "주문 완료 처리에 실패했습니다.",
    [OrderErrorCode.ORDER_CANCEL_FAILED]: "주문 취소에 실패했습니다.",
    [OrderErrorCode.INVALID_ORDER_STATUS]: "유효하지 않은 주문 상태입니다.",
  };

  constructor(code: OrderErrorCode, statusCode = 500, data?: Record<string, unknown>) {
    super(code, OrderError.messages[code], statusCode, data);
  }

  static notFound(): OrderError {
    return new OrderError(OrderErrorCode.ORDER_NOT_FOUND, 404);
  }

  static alreadyCompleted(): OrderError {
    return new OrderError(OrderErrorCode.ORDER_ALREADY_COMPLETED, 409);
  }

  static alreadyCancelled(): OrderError {
    return new OrderError(OrderErrorCode.ORDER_ALREADY_CANCELLED, 409);
  }

  static invalidMenu(): OrderError {
    return new OrderError(OrderErrorCode.INVALID_ORDER_MENU, 400);
  }

  static acceptFailed(data?: Record<string, unknown>): OrderError {
    return new OrderError(OrderErrorCode.ORDER_ACCEPT_FAILED, 500, data);
  }

  static rejectFailed(): OrderError {
    return new OrderError(OrderErrorCode.ORDER_REJECT_FAILED, 500);
  }

  static completeFailed(): OrderError {
    return new OrderError(OrderErrorCode.ORDER_COMPLETE_FAILED, 500);
  }

  static cancelFailed(): OrderError {
    return new OrderError(OrderErrorCode.ORDER_CANCEL_FAILED, 500);
  }

  static invalidStatus(): OrderError {
    return new OrderError(OrderErrorCode.INVALID_ORDER_STATUS, 400);
  }
}
