import type { ProductStatus, StoreStatus } from "@/types/apis/stores.type";

interface Inventory {
  quantity: number;
  stock: number;
}

interface ProductStatusResult {
  status: ProductStatus;
  label: string;
  uiStatus: "pending" | "soldOut" | "endSoon" | "sales";
}

interface StoreStatusResult {
  status: StoreStatus;
  label: string;
  uiStatus: "open" | "close" | "endSoon";
}

type StatusResult<T> = T extends ProductStatus ? ProductStatusResult : StoreStatusResult;

/**
 * 타입 체크를 위한 Exhaustive 함수
 * 모든 케이스가 처리되지 않았을 때 컴파일 오류를 발생시킴
 */
function assertNever(x: never): never {
  throw new Error(`Unexpected value: ${x}`);
}

/**
 * 상점 상태에 따른 UI 상태 라벨 정보를 생성합니다.
 * @param status 상점 상태
 * @param inventory 재고 정보 (상점 상태에서는 사용되지 않지만 일관된 API를 위해 유지)
 */

function generateProductStatus<T extends ProductStatus | StoreStatus>(
  status: T,
  inventory: Inventory,
): StatusResult<T> {
  // 상품 상태 처리
  if (isProductStatus(status)) {
    let result: ProductStatusResult;

    switch (status) {
      case "INACTIVE":
        result = { status: "INACTIVE", uiStatus: "pending", label: "판매 대기" };
        break;
      case "SOLD_OUT":
        result = { status: "SOLD_OUT", uiStatus: "soldOut", label: "품절" };
        break;
      case "ACTIVE":
        if (inventory.quantity === 0) {
          result = { status: "SOLD_OUT", uiStatus: "soldOut", label: "품절" };
        } else if (inventory.quantity === 1) {
          result = { status: "ACTIVE", uiStatus: "endSoon", label: "마감 임박" };
        } else {
          result = { status: "ACTIVE", uiStatus: "sales", label: "판매 중" };
        }
        break;
      default:
        return assertNever(status as never);
    }

    return result as StatusResult<T>;
  }

  // 상점 상태 처리
  if (isStoreStatus(status)) {
    let result: StoreStatusResult;

    switch (status) {
      case "OPEN":
        if (inventory.stock <= 5)
          result = { status: "OPEN", uiStatus: "endSoon", label: "마감 임박" };
        else result = { status: "OPEN", uiStatus: "open", label: "영업 중" };

        break;
      case "CLOSED":
        if (inventory.stock === -1)
          result = { status: "CLOSED", uiStatus: "close", label: "오늘은 재고 없음" };
        else result = { status: "CLOSED", uiStatus: "close", label: "영업 종료" };
        break;
      default:
        return assertNever(status as never);
    }
    return result as StatusResult<T>;
  }

  // 모든 케이스가 처리되지 않았을 경우 에러 발생
  throw new Error(`Unexpected status: ${status}`);
}

/**
 * 타입 가드: 주어진 상태가 ProductStatus 타입인지 확인
 */
function isProductStatus(status: ProductStatus | StoreStatus): status is ProductStatus {
  return ["ACTIVE", "INACTIVE", "SOLD_OUT"].includes(status as string);
}

/**
 * 타입 가드: 주어진 상태가 StoreStatus 타입인지 확인
 */
function isStoreStatus(status: ProductStatus | StoreStatus): status is StoreStatus {
  return ["OPEN", "CLOSED"].includes(status as string);
}

export default generateProductStatus;
