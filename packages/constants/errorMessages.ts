import { BusinessErrorCode, CommonErrorCode } from "../types/errorCodes";

export const ErrorMessages: Record<CommonErrorCode | BusinessErrorCode, string> = {
  // 공통 에러 메시지
  [CommonErrorCode.INVALID_INPUT]: "입력값이 올바르지 않습니다.",
  [CommonErrorCode.ENTITY_NOT_FOUND]: "요청한 엔티티를 찾을 수 없습니다.",
  [CommonErrorCode.INTERNAL_SERVER_ERROR]: "서버 내부 오류가 발생했습니다.",
  [CommonErrorCode.INVALID_TYPE]: "잘못된 타입의 값이 입력되었습니다.",
  [CommonErrorCode.ENTITY_ALREADY_EXISTS]: "엔티티가 이미 존재합니다.",
  [CommonErrorCode.VALIDATION_FAILED]: "유효성 검증에 실패했습니다.",
  [CommonErrorCode.IMAGE_URL_CONVERSION_FAILED]: "이미지 URL 변환에 실패했습니다.",

  // 비즈니스 에러 메시지
  [BusinessErrorCode.BUSINESS_LOGIC_ERROR]: "비즈니스 로직 처리 중 오류가 발생했습니다.",

  [BusinessErrorCode.USER_NOT_FOUND]: "사용자를 찾을 수 없습니다.",
  [BusinessErrorCode.CUSTOMER_NOT_FOUND]: "고객을 찾을 수 없습니다.",
  [BusinessErrorCode.CUSTOMER_ADDRESS_NOT_FOUND]: "고객 주소를 찾을 수 없습니다.",
  [BusinessErrorCode.CUSTOMER_ADDRESS_ALREADY_EXISTS]: "이미 등록된 고객 주소입니다.",

  [BusinessErrorCode.ORDER_NOT_FOUND]: "주문을 찾을 수 없습니다.",
  [BusinessErrorCode.ORDER_ALREADY_COMPLETED]: "이미 완료된 주문입니다.",
  [BusinessErrorCode.ORDER_ALREADY_CANCELLED]: "이미 취소된 주문입니다.",
  [BusinessErrorCode.INVALID_ORDER_MENU]: "주문 가능하지 않은 메뉴입니다.",
  [BusinessErrorCode.ORDER_ACCEPT_FAILED]: "주문 수락에 실패했습니다.",
  [BusinessErrorCode.ORDER_REJECT_FAILED]: "주문 거절에 실패했습니다.",
  [BusinessErrorCode.ORDER_COMPLETE_FAILED]: "주문 완료 처리에 실패했습니다.",
  [BusinessErrorCode.ORDER_CANCEL_FAILED]: "주문 취소에 실패했습니다.",
  [BusinessErrorCode.INVALID_ORDER_STATUS]: "유효하지 않은 주문 상태입니다.",

  [BusinessErrorCode.PAYMENT_FAILED]: "결제에 실패했습니다.",
  [BusinessErrorCode.PAYMENT_ALREADY_PROCESSED]: "이미 처리된 결제입니다.",
  [BusinessErrorCode.PAYMENT_AMOUNT_MISMATCH]: "결제 금액이 일치하지 않습니다.",

  [BusinessErrorCode.STORE_NOT_FOUND]: "매장을 찾을 수 없습니다.",
  [BusinessErrorCode.STORE_CLOSED]: "영업 종료된 매장입니다.",
  [BusinessErrorCode.STORE_UNAVAILABLE]: "이용 불가능한 매장입니다.",
  [BusinessErrorCode.SUBSCRIPTION_NOT_FOUND]: "구독 정보를 찾을 수 없습니다.",
  [BusinessErrorCode.SUBSCRIPTION_UPDATE_FAILED]: "구독 정보 업데이트에 실패했습니다.",
};
