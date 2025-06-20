import type { Product } from "@/types/apis/stores.type";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import ProductBottomSheet from ".";
const mockSubmit = vi.fn();

vi.mock("@/hooks/api/usePostOrder", () => ({
  default: () => mockSubmit,
}));

// Date.now를 mock해서 일관된 테스트를 위해 고정된 시간 사용
const mockNow = new Date("2024-01-01T12:00:00Z").getTime();
vi.spyOn(Date, "now").mockReturnValue(mockNow);

const mockProducts: Product[] = [
  {
    id: "1L",
    createdAt: "2025-05-06T10:15:30Z",
    description: "신선한 제철 과일 및 계절 채소로 구성된 특별 잇고백입니다.",
    foodType: ["크림빵", "야채빵"],
    image: "https://example.com/images/luckybags/1L.jpg",
    inventory: {
      quantity: 10,
      stock: 10,
    },
    storeId: "1L",
    storeName: "상점1",
    name: "오늘의 서프라이즈 잇고백",
    price: {
      originalPrice: 20000,
      discountRate: 0.5,
      finalPrice: 10000,
    },
    size: "M",
    status: "ACTIVE",
  },
];

afterEach(() => {
  cleanup();
});

describe("ProductBottomSheet Test", () => {
  it("초기 렌더링 시 버튼과 선택 컴포넌트가 표시됨", () => {
    render(
      <>
        <div id={"bottom-sheet"} />
        <ProductBottomSheet isShow={true} storesProducts={mockProducts} onClose={vi.fn()} />
      </>,
    );

    expect(screen.getByText("옵션 선택하기")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "주문하기" })).toBeInTheDocument();
  });

  it("주문하기 버튼 클릭 시 usePostOrder가 호출됨", () => {
    render(
      <>
        <div id="bottom-sheet" />
        <ProductBottomSheet isShow={true} storesProducts={mockProducts} onClose={vi.fn()} />
      </>,
    );

    // 잇고백 선택 드롭다운 열기
    fireEvent.click(screen.getByRole("button", { name: "잇고백을 선택해주세요 dropdown" }));

    // 실제 상품명으로 선택
    fireEvent.click(screen.getByText("오늘의 서프라이즈 잇고백"));

    const orderButton = screen.getByRole("button", { name: "주문하기" });
    fireEvent.click(orderButton);

    // 현재 시간 + 30분으로 설정된 pickupDateTime 포함하여 검증
    const expectedPickupDateTime = new Date(mockNow + 30 * 60 * 1000).toISOString();

    expect(mockSubmit).toHaveBeenCalledWith({
      pickupDateTime: expectedPickupDateTime,
      storeId: "1L",
      orderItems: [
        {
          productId: "1L",
          productName: "오늘의 서프라이즈 잇고백",
          price: 10000,
          quantity: 1,
        },
      ],
    });
  });
});
