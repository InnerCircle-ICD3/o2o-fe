import type { OrderDetail } from "@/types/apis/order.type";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import OrderInfo from ".";

vi.mock("../products", () => ({
  default: () => <div data-testid="products-component">Products Component</div>,
}));

const mockOrderDetail = {
  orderId: 2,
  store: {
    id: 1001,
    name: "테스트 매장",
    mainImageUrl: "/images/thumb.png",
    contact: "02-123-4567",
    description: "정성 가득 김밥집",
    businessNumber: "123-45-67890",
    businessHours: [
      {
        dayOfWeek: "MONDAY",
        openTime: "09:00:00",
        closeTime: "21:30:00",
      },
    ],
    address: {
      roadNameAddress: "서울특별시 강남구 강남대로 123",
      lotNumberAddress: "서울 강남구 역삼동 123-45",
      buildingName: "카카오뱅크",
      zipCode: "06232",
      region1DepthName: "서울특별시",
      region2DepthName: "강남구",
      region3DepthName: "역삼동",
      coordinate: {
        latitude: 37.12345,
        longitude: 127.12345,
      },
    },
    pickupDay: "TODAY",
    todayPickupStartTime: "09:00:00",
    todayPickupEndTime: "21:30:00",
    status: "OPEN",
    ratingAverage: 4.5,
    ratingCount: 100,
    foodCategory: ["김밥", "분식"],
    storeCategory: ["RESTAURANT"],
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
      size: "L",
      status: "ACTIVE",
    },
  ],
  status: "PENDING",
} as unknown as OrderDetail;

describe("OrderInfo", () => {
  it("매장명, 주소, 시간, 금액이 올바르게 표시된다", () => {
    render(<OrderInfo orderDetail={mockOrderDetail} />);

    // 매장명
    expect(screen.getByRole("heading", { name: /테스트 매장/i })).toBeInTheDocument();

    // 주소
    expect(screen.getByText(/서울특별시 강남구 강남대로 123/)).toBeInTheDocument();

    // 픽업 시간 텍스트
    expect(screen.getByText(/오전 9시 ~ 오후 9시 30분/)).toBeInTheDocument();

    // 픽업 안내 문구
    expect(screen.getByText(/픽업 가능 해요/)).toBeInTheDocument();

    // 결제 예정 금액
    expect(screen.getByText(/20,000₩/)).toBeInTheDocument();

    // Products 컴포넌트 확인
    expect(screen.getByTestId("products-component")).toBeInTheDocument();
  });
});
