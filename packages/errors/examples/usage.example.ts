/**
 * 새로운 에러 구조 사용법 예시
 *
 * 기존 방식:
 * throw new Error("주문을 찾을 수 없습니다.") // 타입 안전성 없음, 에러 코드 없음
 *
 * 새로운 방식:
 * throw OrderError.notFound() // 타입 안전, 에러 코드 포함, HTTP 상태 코드 자동 설정
 */

import {
  BaseError,
  CommonError,
  CustomerError,
  OrderError,
  PaymentError,
  StoreError,
} from "../index";

// 🔥 사용법 예시

// 1. 주문 관련 에러
// biome-ignore lint/correctness/noUnusedVariables: <explanation>
function processOrder(orderId: string) {
  const order = findOrder(orderId);

  if (!order) {
    throw OrderError.notFound(); // 404 status, "O001" code
  }

  if (order.status === "COMPLETED") {
    throw OrderError.alreadyCompleted(); // 409 status, "O002" code
  }

  if (order.status === "CANCELLED") {
    throw OrderError.alreadyCancelled(); // 409 status, "O003" code
  }
}

// 2. 결제 관련 에러
// biome-ignore lint/correctness/noUnusedVariables: <explanation>
function processPayment(amount: number, expectedAmount: number) {
  if (amount !== expectedAmount) {
    throw PaymentError.amountMismatch(); // 400 status, "P003" code
  }

  try {
    // 결제 로직
    return { success: true };
  } catch {
    throw PaymentError.failed(); // 402 status, "P001" code
  }
}

// 3. 매장 관련 에러
// biome-ignore lint/correctness/noUnusedVariables: <explanation>
function getStoreInfo(storeId: string) {
  const store = findStore(storeId);

  if (!store) {
    throw StoreError.notFound(); // 404 status, "S001" code
  }

  if (!store.isOpen) {
    throw StoreError.closed(); // 403 status, "S002" code
  }
}

// 4. 고객 관련 에러
// biome-ignore lint/correctness/noUnusedVariables: <explanation>
function getUserInfo(userId: string) {
  const user = findUser(userId);

  if (!user) {
    throw CustomerError.userNotFound(); // 404 status, "U001" code
  }
}

// 5. 공통 에러
// biome-ignore lint/correctness/noUnusedVariables: <explanation>
function validateInput(data: unknown) {
  if (!data) {
    throw CommonError.invalidInput(); // 400 status, "CEC001" code
  }

  if (typeof data !== "object") {
    throw CommonError.invalidType(); // 400 status, "CEC005" code
  }
}

// 6. 에러 핸들링 예시
// biome-ignore lint/correctness/noUnusedVariables: <explanation>
function handleError(error: unknown) {
  if (error instanceof OrderError) {
    console.log("주문 관련 에러:", error.code, error.message);
    console.log("HTTP 상태 코드:", error.statusCode);
  } else if (error instanceof PaymentError) {
    console.log("결제 관련 에러:", error.code, error.message);
  } else if (error instanceof StoreError) {
    console.log("매장 관련 에러:", error.code, error.message);
  }

  // JSON 형태로 변환 가능
  console.log("에러 JSON:", error instanceof BaseError ? error.toJSON() : error);
}

// 더미 함수들 (실제 구현이 아닌 예시용)
// biome-ignore lint/correctness/noUnusedVariables: <explanation>
function findOrder(id: string): { status: string } | null {
  return null;
}
// biome-ignore lint/correctness/noUnusedVariables: <explanation>
function findStore(id: string): { isOpen: boolean } | null {
  return null;
}
// biome-ignore lint/correctness/noUnusedVariables: <explanation>
function findUser(id: string): object | null {
  return null;
}
