import type { StoreStatus } from "@/types/apis/stores.type";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { StoreCard } from ".";
import SkeletonStoreCard from "./skeletonStoreCard";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: (url: string) => mockPush(url),
  }),
}));

describe("StoreCard Test", () => {
  const mockStoreDetail = {
    storeId: 1,
    storeName: "테스트 매장",
    storeImage: "/test.png",
    foodCategory: ["김밥", "주먹밥", "가정식"],
    distanceKm: 1,
    totalStockCount: 10,
    status: "OPEN" as StoreStatus,
    open: true,
    stock: 10,
    roadAddress: {
      addressName: "서울시 강남구",
      zoneNo: "12345",
      buildingName: "테스트빌딩",
    },
    lotAddress: {
      addressName: "서울시 강남구",
      mainAddressNo: "123",
      subAddressNo: "45",
    },
    addressType: "ROAD",
    location: {
      lat: 37.123,
      lng: 127.123,
    },
    businessHours: {
      openTime: "09:00",
      closeTime: "21:00",
    },
    ratingCount: 257,
    ratingAverage: 4.7,
    isFavorite: false,
  };

  it("스토어 이름이 렌더링된다.", () => {
    render(<StoreCard storesDetail={mockStoreDetail} isFavorite={false} />);
    expect(screen.getByText("테스트 매장")).toBeInTheDocument();
  });

  it("스토어카드를 클릭하면 스토어 상세 페이지로 이동한다.", () => {
    render(<StoreCard storesDetail={mockStoreDetail} isFavorite={false} />);
    const storeCard = screen.getByText("테스트 매장").closest("div");
    if (!storeCard) throw new Error("Store card element not found");
    fireEvent.click(storeCard);
    expect(mockPush).toHaveBeenCalledWith("/stores/1");
  });

  describe("SkeletonStoreCard Test", () => {
    it("SkeletonStoreCard가 로드된다.", () => {
      render(<SkeletonStoreCard />);
      const skeletonCard = document.querySelector('[class*="skeletonCardStyle"]');
      expect(skeletonCard).toBeInTheDocument();
    });
  });
});
