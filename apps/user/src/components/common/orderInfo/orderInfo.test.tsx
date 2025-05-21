import type { OrderDetail } from "@/types/apis/order.type";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import OrderInfo from ".";

vi.mock("../products", () => ({
  default: () => <div data-testid="products-component">Products Component</div>,
}));

const mockOrderDetail: OrderDetail = {
  orderId: 2,
  store: {
    storeId: 1001,

    lotAddress: {
      addressName: "서울 강남구 역삼동 123-45",
      mainAddressNo: "123",
      subAddressNo: "45",
    },
    addressType: "ROAD",
    location: {
      lat: 37.12345,
      lng: 127.12345,
    },
    businessNumber: "123-45-67890",
    contact: "02-123-4567",
    description: "정성 가득 김밥집",
    mainImageUrl: "/images/thumb.png",
    status: "OPEN",
    name: "테스트 매장",
    openTime: "09:00",
    closeTime: "21:30",
    roadAddress: {
      addressName: "서울특별시 강남구 강남대로 123",
      zoneNo: "06232",
      buildingName: "카카오뱅크",
    },
  },
  products: [
    {
      id: 1,
      createdAt: "2025-05-06T10:15:30Z",
      description: "신선한 제철 과일 및 계절 채소로 구성된 특별 럭키백입니다.",
      foodType: ["크림빵", "야채빵"],
      imageUrl: "/images/thumb.png",
      inventory: {
        quantity: 1,
        stock: 10,
      },
      storeId: 1,
      name: "테스트 상품",
      price: {
        originalPrice: 20000,
        discountRate: 0.5,
        finalPrice: 10000,
      },
      size: "l",
      status: "ACTIVE",
    },
  ],
  status: "PENDING",
};

describe("OrderInfo", () => {
  it("매장명, 주소, 시간, 금액이 올바르게 표시된다", () => {
    render(<OrderInfo orderDetail={mockOrderDetail} />);

    // 매장명
    expect(screen.getByRole("heading", { name: /테스트 매장/i })).not.toBeNull();

    // 주소
    expect(screen.getByText(/서울특별시 강남구 강남대로 123/)).not.toBeNull();

    // 픽업 시간 텍스트
    expect(screen.getByText(/오전 9시 ~ 오후 9시 30분/)).not.toBeNull();

    // 픽업 안내 문구
    expect(screen.getByText(/픽업 가능 해요/)).not.toBeNull();

    // 결제 예정 금액
    expect(screen.getByText(/20,000₩/)).not.toBeNull();

    // Products 컴포넌트 확인
    expect(screen.getByTestId("products-component")).not.toBeNull();
  });
});
