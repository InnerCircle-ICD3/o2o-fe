import type { Product } from "@/types/apis/stores.type";
import type { SelectedProduct } from "@/types/orders.type";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Select from ".";

describe("Select Test", () => {
  const mockProducts: Product[] = [
    {
      id: "1",
      name: "상품 1",
      image: "",
      description: "",
      foodType: [],
      inventory: { quantity: 3, stock: 5 },
      price: {
        originalPrice: 10000,
        discountRate: 10,
        finalPrice: 9000,
      },
      size: "S",
      status: "ACTIVE",
      storeId: "1",
      storeName: "테스트 상점",
      createdAt: "",
    },
    {
      id: "2",
      name: "품절 상품",
      image: "",
      description: "",
      foodType: [],
      inventory: { quantity: 0, stock: 0 },
      price: {
        originalPrice: 8000,
        discountRate: 0,
        finalPrice: 8000,
      },
      size: "S",
      status: "ACTIVE",
      storeId: "1",
      storeName: "테스트 상점",
      createdAt: "",
    },
  ];

  const mockOnChange = vi.fn();

  afterEach(() => {
    cleanup();
    mockOnChange.mockClear();
  });

  it("리스트가 버튼 클릭 시 열리고 닫힘", () => {
    render(<Select storesProducts={mockProducts} selectedProducts={[]} onChange={mockOnChange} />);

    const button = screen.getByRole("button", {
      name: "잇고백을 선택해주세요 dropdown",
    });
    expect(screen.queryByText("상품 1")).not.toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByText("상품 1")).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByText("상품 1")).not.toBeInTheDocument();
  });

  it("선택 가능한 상품을 클릭하면 onChange가 호출됨", () => {
    render(<Select storesProducts={mockProducts} selectedProducts={[]} onChange={mockOnChange} />);

    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("상품 1"));
    expect(mockOnChange).toHaveBeenCalledWith(mockProducts[0]);
  });

  it("품절 상품은 클릭해도 onChange가 호출되지 않음", () => {
    render(<Select storesProducts={mockProducts} selectedProducts={[]} onChange={mockOnChange} />);

    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("품절 상품"));
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it("selectedProducts에 포함된 상품은 체크됨", () => {
    const selected: SelectedProduct[] = [
      {
        id: "1",
        name: "상품 1",
        price: mockProducts[0].price,
        quantity: 3,
        selectedCount: 1,
      },
    ];

    render(
      <Select storesProducts={mockProducts} selectedProducts={selected} onChange={mockOnChange} />,
    );

    fireEvent.click(screen.getByRole("button"));
    const checkbox = document.querySelector("input");
    expect(checkbox).toHaveProperty("checked", true);
  });
});
