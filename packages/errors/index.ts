// Base Error
export { BaseError, type ErrorJson } from "./base/BaseError";

// Common Errors
export { CommonError, CommonErrorCode } from "./common/CommonError";

// Order Errors
export { OrderError, OrderErrorCode } from "./order/OrderError";

// Payment Errors
export { PaymentError, PaymentErrorCode } from "./payment/PaymentError";

// Store Errors
export { StoreError, StoreErrorCode } from "./store/StoreError";

// Customer Errors
export { CustomerError, CustomerErrorCode } from "./customer/CustomerError";

// Error Registry
export { default as errorRegistry } from "./utils/errorRegistry";

// Error Types
import type { CommonError, CommonErrorCode } from "./common/CommonError";
import type { CustomerError, CustomerErrorCode } from "./customer/CustomerError";
import type { OrderError, OrderErrorCode } from "./order/OrderError";
import type { PaymentError, PaymentErrorCode } from "./payment/PaymentError";
import type { StoreError, StoreErrorCode } from "./store/StoreError";

export type ErrorClass = CommonError | OrderError | PaymentError | StoreError | CustomerError;

export type ErrorCode =
  | CommonErrorCode
  | OrderErrorCode
  | PaymentErrorCode
  | StoreErrorCode
  | CustomerErrorCode;
