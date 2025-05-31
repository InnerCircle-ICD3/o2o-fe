import type { Product } from "@/types/apis/stores.type";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, it } from "vitest";
import Products from ".";

describe("Products Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("상품 목록이 올바르게 렌더링된다", () => {
    const mockProducts: Product[] = [
      {
        id: 2,
        createdAt: "2025-05-06T10:15:30Z",
        name: "럭키백 S",
        description: "소형 럭키백입니다",
        foodType: ["과자", "음료"],
        imageUrl: "/images/thumb.png",
        inventory: {
          quantity: 5,
          stock: 10,
        },
        storeId: 1,
        price: {
          originalPrice: 24000,
          discountRate: 0.5,
          finalPrice: 12000,
        },
        size: "M",
        status: "ACTIVE",
      },
    ];

    render(<Products products={mockProducts} />);

    expect(screen.getByText("럭키백 S")).toBeInTheDocument();

    expect(screen.getByText("소형 럭키백입니다")).toBeInTheDocument();

    expect(screen.getByText("24,000₩")).toBeInTheDocument();
    expect(screen.getByText("12,000₩")).toBeInTheDocument();

    expect(screen.getByText("과자, 음료")).toBeInTheDocument();
  });

  it("마감 상품에는 상태 라벨과 그림자 레이블이 표시된다", () => {
    const mockProducts: Product[] = [
      {
        id: 3,
        createdAt: "2025-05-06T10:15:30Z",
        name: "럭키백 L",
        description: "대형 럭키백입니다",
        foodType: ["간식", "과일"],
        imageUrl: "/images/thumb.png",
        inventory: {
          quantity: 0,
          stock: 10,
        },
        storeId: 1,
        price: {
          originalPrice: 10000,
          discountRate: 0.5,
          finalPrice: 5000,
        },
        size: "L",
        status: "ACTIVE",
      },
    ];

    render(<Products products={mockProducts} />);

    expect(screen.getByText("마감")).toBeInTheDocument();

    const shadowElements = document.querySelectorAll("[class*='shadowLabel']");
    expect(shadowElements.length).toBeGreaterThanOrEqual(1);
  });
});
