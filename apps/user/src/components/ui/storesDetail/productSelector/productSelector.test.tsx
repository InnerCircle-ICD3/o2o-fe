import type { Product } from "@/types/apis/stores.type";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import ProductSelector from ".";

vi.mock("../productBottomSheet", () => ({
  default: ({ isShow, onClose }: { isShow: boolean; onClose: () => void }) => (
    <div>
      <p>BottomSheet is {isShow ? "Open" : "Closed"}</p>
      <button onClick={onClose} type={"button"}>
        닫기
      </button>
    </div>
  ),
}));

describe("ProductSelector Test", () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      name: "테스트 상품",
      imageUrl: "",
      description: "",
      foodType: [],
      inventory: { quantity: 3, stock: 5 },
      price: {
        originalPrice: 10000,
        discountRate: 10,
        finalPrice: 9000,
      },
      size: "S",
      status: "OPEN",
      storeId: 1,
      createdAt: "",
    },
  ];

  afterEach(() => {
    cleanup();
  });

  it("주문하기 버튼 클릭 시 ProductBottomSheet 열림", () => {
    render(<ProductSelector storesProducts={mockProducts} />);

    expect(screen.getByText("BottomSheet is Closed")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "주문하기" }));

    expect(screen.getByText("BottomSheet is Open")).toBeInTheDocument();
  });

  it("BottomSheet에서 onClose 실행 시 닫힘", () => {
    render(<ProductSelector storesProducts={mockProducts} />);

    fireEvent.click(screen.getByRole("button", { name: "주문하기" }));
    expect(screen.getByText("BottomSheet is Open")).toBeInTheDocument();

    fireEvent.click(screen.getByText("닫기"));

    expect(screen.getByText("BottomSheet is Closed")).toBeInTheDocument();
  });
});
