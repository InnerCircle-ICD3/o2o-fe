import type { Product, ProductStatus } from "@/types/apis/stores.type";
import { act, renderHook } from "@testing-library/react";
import { it } from "vitest";
import useSelectedProducts from "../useSelectedProducts";

const mockProduct: Product = {
  id: "1",
  storeName: "블루문",
  name: "샌드위치",
  image: "",
  description: "",
  foodType: [],
  inventory: { quantity: 5, stock: 5 },
  price: {
    originalPrice: 5000,
    discountRate: 0,
    finalPrice: 5000,
  },
  size: "S",
  status: "ACTIVE" as ProductStatus,
  storeId: "1",
  createdAt: "",
};

describe("useSelectedProducts Test", () => {
  it("초기값은 빈 배열과 0 요약값을 리턴한다.", () => {
    const { result } = renderHook(() => useSelectedProducts());

    expect(result.current.selectedProducts).toEqual([]);
    expect(result.current.orderSummary).toEqual({
      count: 0,
      originalPrice: 0,
      finalPrice: 0,
    });
  });

  it("상품을 선택하면 selectedProducts에 선택한 상품이 추가된다.", () => {
    const { result } = renderHook(() => useSelectedProducts());

    act(() => {
      result.current.handleSelectProduct(mockProduct);
    });

    expect(result.current.selectedProducts.length).toBe(1);
    expect(result.current.selectedProducts[0]).toMatchObject({
      id: "1",
      name: "샌드위치",
      selectedCount: 1,
    });

    expect(result.current.orderSummary).toEqual({
      count: 1,
      originalPrice: 5000,
      finalPrice: 5000,
    });
  });

  it("같은 상품을 다시 선택하면 수량이 증가한다.", () => {
    const { result } = renderHook(() => useSelectedProducts());

    act(() => {
      result.current.handleSelectProduct(mockProduct);
      result.current.handleSelectProduct(mockProduct);
    });

    expect(result.current.selectedProducts[0].selectedCount).toBe(2);
    expect(result.current.orderSummary.count).toBe(2);
  });

  it("수량은 재고를 초과할 수 없다.", () => {
    const { result } = renderHook(() => useSelectedProducts());

    act(() => {
      for (let i = 0; i < 10; i++) {
        result.current.handleSelectProduct(mockProduct);
      }
    });

    expect(result.current.selectedProducts[0].selectedCount).toBe(5); // max
  });

  it("상품 수량을 증가/감소할 수 있다.", () => {
    const { result } = renderHook(() => useSelectedProducts());

    act(() => {
      result.current.handleSelectProduct(mockProduct);
      result.current.updateProductCount("1", 2); // +2 → 3
      result.current.updateProductCount("1", -1); // -1 → 2
    });

    expect(result.current.selectedProducts[0].selectedCount).toBe(2);
    expect(result.current.orderSummary.count).toBe(2);
  });

  it("상품 수량은 1 미만이 될 수 없다.", () => {
    const { result } = renderHook(() => useSelectedProducts());

    act(() => {
      result.current.handleSelectProduct(mockProduct);
      result.current.updateProductCount("1", -5);
    });

    expect(result.current.selectedProducts[0].selectedCount).toBe(1); // 최소값
  });

  it("상품을 삭제하면 selectedProducts에서 제거된다.", () => {
    const { result } = renderHook(() => useSelectedProducts());

    act(() => {
      result.current.handleSelectProduct(mockProduct);
      result.current.handleDeleteProduct("1");
    });

    expect(result.current.selectedProducts).toEqual([]);
    expect(result.current.orderSummary.count).toBe(0);
  });
});
