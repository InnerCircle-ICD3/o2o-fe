import { getStoresDetail } from "@/apis/ssr/stores";
import { act, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { type Mock, vi } from "vitest";
import { StoreInfoCard } from ".";

// API 모킹
vi.mock("@/apis/ssr/stores", () => ({
  getStoresDetail: vi.fn(),
}));

// Next.js router 모킹
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("StoreInfoCard", () => {
  const mockStore = {
    id: 1,
    name: "테스트 가게",
    mainImageUrl: "/test-image.jpg",
    foodCategory: ["한식", "분식"],
    minPrice: 10000,
    maxPrice: 20000,
    ratingAverage: 4.5,
    ratingCount: 100,
    status: "OPEN",
  };

  beforeEach(() => {
    // API 응답 모킹
    (getStoresDetail as Mock).mockResolvedValue({
      success: true,
      data: mockStore,
    });

    // Router 모킹
    (useRouter as Mock).mockReturnValue({
      push: vi.fn(),
    });
  });

  it("가게 정보가 올바르게 렌더링되어야 합니다", async () => {
    await act(async () => {
      render(<StoreInfoCard storeId={mockStore.id} />);
    });

    // 데이터 로드 후 확인
    expect(await screen.findByText("테스트 가게")).toBeInTheDocument();
    expect(screen.getByText("한식 / 분식")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
    expect(screen.getByText("(100)")).toBeInTheDocument();

    // statusBadge 확인
    const statusBadge = screen.getByText("영업중");
    expect(statusBadge).toHaveClass("storeMapInfo_statusBadge__hs6taa2");
    expect(statusBadge).toHaveClass("storeMapInfo_openStatus__hs6taa3");
  });

  it("썸네일이 없을 경우 기본 이미지가 표시되어야 합니다", async () => {
    const storeWithoutImage = {
      ...mockStore,
      mainImageUrl: "",
    };

    (getStoresDetail as Mock).mockResolvedValue({
      success: true,
      data: storeWithoutImage,
    });

    await act(async () => {
      render(<StoreInfoCard storeId={storeWithoutImage.id} />);
    });

    const image = await screen.findByAltText("테스트 가게");
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("/_next/image?url=%2Fimages%2Fthumb.png"),
    );
  });
});
