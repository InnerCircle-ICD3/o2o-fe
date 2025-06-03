import { render, screen } from "@testing-library/react";
import { StoreInfoCard } from ".";

describe("StoreInfoCard", () => {
  const mockStore = {
    id: 1,
    name: "테스트 가게",
    thumbnailUrl: "/test-image.jpg",
    category: "한식,분식",
    minPrice: 10000,
    maxPrice: 20000,
    distance: 0.5,
    address: "서울시 강남구",
    latitude: 37.5665,
    longitude: 126.978,
    isOpen: true,
    pickupTime: "10:00",
  };

  it("가게 정보가 올바르게 렌더링되어야 합니다", () => {
    render(<StoreInfoCard store={mockStore} />);

    // 가게 이름 확인
    expect(screen.getByText("테스트 가게")).toBeInTheDocument();

    // 카테고리 확인
    expect(screen.getByText("한식 / 분식")).toBeInTheDocument();

    // 가격 정보 확인
    expect(screen.getByText("20,000₩")).toBeInTheDocument(); // 원래 가격
    expect(screen.getByText("10,000₩")).toBeInTheDocument(); // 할인 가격

    // 거리 정보 확인
    expect(screen.getByText("0.5km")).toBeInTheDocument();
  });

  it("썸네일이 없을 경우 기본 이미지가 표시되어야 합니다", () => {
    const storeWithoutThumbnail = {
      ...mockStore,
      thumbnailUrl: "",
    };

    render(<StoreInfoCard store={storeWithoutThumbnail} />);

    const image = screen.getByAltText("테스트 가게");
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("/_next/image?url=%2Fimages%2Fthumb.png"),
    );
  });
});
