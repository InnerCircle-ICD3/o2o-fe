import { BaseError } from "../base/BaseError";

export enum PaymentErrorCode {
  PAYMENT_FAILED = "P001",
  PAYMENT_ALREADY_PROCESSED = "P002",
  PAYMENT_AMOUNT_MISMATCH = "P003",
}

export class PaymentError extends BaseError {
  private static readonly messages: Record<PaymentErrorCode, string> = {
    [PaymentErrorCode.PAYMENT_FAILED]: "결제에 실패했습니다.",
    [PaymentErrorCode.PAYMENT_ALREADY_PROCESSED]: "이미 처리된 결제입니다.",
    [PaymentErrorCode.PAYMENT_AMOUNT_MISMATCH]: "결제 금액이 일치하지 않습니다.",
  };

  constructor(code: PaymentErrorCode, statusCode = 500) {
    super(code, PaymentError.messages[code], statusCode);
  }

  static failed(): PaymentError {
    return new PaymentError(PaymentErrorCode.PAYMENT_FAILED, 402);
  }

  static alreadyProcessed(): PaymentError {
    return new PaymentError(PaymentErrorCode.PAYMENT_ALREADY_PROCESSED, 409);
  }

  static amountMismatch(): PaymentError {
    return new PaymentError(PaymentErrorCode.PAYMENT_AMOUNT_MISMATCH, 400);
  }
}
