import { CommonError, CommonErrorCode, CustomerError, CustomerErrorCode } from "..";
import type { BaseError } from "../base/BaseError";
import { OrderError, OrderErrorCode } from "../order/OrderError";
import { PaymentError, PaymentErrorCode } from "../payment/PaymentError";
import { StoreError, StoreErrorCode } from "../store/StoreError";

type ErrorConstructor = (data?: Record<string, unknown>) => BaseError;

const errorRegistry: Record<string, ErrorConstructor> = {
  [OrderErrorCode.ORDER_NOT_FOUND]: () => OrderError.notFound(),
  [OrderErrorCode.ORDER_ALREADY_COMPLETED]: () => OrderError.alreadyCompleted(),
  [OrderErrorCode.ORDER_ALREADY_CANCELLED]: () => OrderError.alreadyCancelled(),
  [OrderErrorCode.INVALID_ORDER_MENU]: () => OrderError.invalidMenu(),
  [OrderErrorCode.ORDER_ACCEPT_FAILED]: (data?: Record<string, unknown>) =>
    OrderError.acceptFailed(data),
  [OrderErrorCode.ORDER_REJECT_FAILED]: () => OrderError.rejectFailed(),
  [OrderErrorCode.ORDER_COMPLETE_FAILED]: () => OrderError.completeFailed(),
  [OrderErrorCode.ORDER_CANCEL_FAILED]: () => OrderError.cancelFailed(),
  [OrderErrorCode.INVALID_ORDER_STATUS]: () => OrderError.invalidStatus(),

  [PaymentErrorCode.PAYMENT_FAILED]: () => PaymentError.failed(),
  [PaymentErrorCode.PAYMENT_AMOUNT_MISMATCH]: () => PaymentError.amountMismatch(),
  [PaymentErrorCode.PAYMENT_ALREADY_PROCESSED]: () => PaymentError.alreadyProcessed(),

  [StoreErrorCode.STORE_CLOSED]: () => StoreError.closed(),
  [StoreErrorCode.STORE_NOT_FOUND]: () => StoreError.notFound(),
  [StoreErrorCode.STORE_UNAVAILABLE]: () => StoreError.unavailable(),
  [StoreErrorCode.SUBSCRIPTION_NOT_FOUND]: () => StoreError.subscriptionNotFound(),
  [StoreErrorCode.SUBSCRIPTION_UPDATE_FAILED]: () => StoreError.subscriptionUpdateFailed(),
  [StoreErrorCode.STORE_PRODUCT_NOT_ENOUGH]: () => StoreError.storeProductNotFound(),
  [StoreErrorCode.STORE_COUNT_EXCEEDED]: () => StoreError.storeCountExceeded(),

  [CustomerErrorCode.CUSTOMER_NOT_FOUND]: () => CustomerError.customerNotFound(),
  [CustomerErrorCode.USER_NOT_FOUND]: () => CustomerError.userNotFound(),
  [CustomerErrorCode.CUSTOMER_ADDRESS_NOT_FOUND]: () => CustomerError.addressNotFound(),
  [CustomerErrorCode.CUSTOMER_ADDRESS_ALREADY_EXISTS]: () => CustomerError.addressAlreadyExists(),

  [CommonErrorCode.INVALID_INPUT]: () => CommonError.invalidInput(),
  [CommonErrorCode.ENTITY_NOT_FOUND]: () => CommonError.entityNotFound(),
  [CommonErrorCode.INTERNAL_SERVER_ERROR]: () => CommonError.internalServerError(),
  [CommonErrorCode.INVALID_TYPE]: () => CommonError.invalidType(),
  [CommonErrorCode.ENTITY_ALREADY_EXISTS]: () => CommonError.entityAlreadyExists(),
  [CommonErrorCode.VALIDATION_FAILED]: () => CommonError.validationFailed(),
  [CommonErrorCode.IMAGE_URL_CONVERSION_FAILED]: () => CommonError.imageUrlConversionFailed(),
  [CommonErrorCode.UNKNOWN_ERROR]: () => CommonError.unknownError(),
};

export default errorRegistry;
