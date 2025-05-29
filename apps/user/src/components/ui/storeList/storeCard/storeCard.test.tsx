import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { StoreCard } from ".";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: (url: string) => mockPush(url),
  }),
}));

describe("StoreCard Test", () => {
  it("스토어 이름, 가격이 렌더링된다.", () => {
    render(
      <StoreCard
        id={1}
        imageUrl="/test.png"
        title="테스트 매장"
        subtitle="김밥 / 주먹밥 / 가정식"
        originalPrice={10000}
        salePrice={5000}
        rating={4.7}
        reviews={257}
        distance="1km"
      />,
    );
    expect(screen.getByText("테스트 매장")).toBeInTheDocument();
    expect(screen.getByText("10,000₩")).toBeInTheDocument();
  });

  it("스토어카드를 클릭하면 스토어 상세 페이지로 이동한다.", () => {
    render(
      <StoreCard
        id={1}
        imageUrl="/test.png"
        title="테스트 매장"
        subtitle="김밥 / 주먹밥 / 가정식"
        originalPrice={10000}
        salePrice={5000}
        rating={4.7}
        reviews={257}
        distance="1km"
      />,
    );
    const storeCard = screen.getByText("테스트 매장").closest("div");
    if (!storeCard) throw new Error("Store card element not found");
    fireEvent.click(storeCard);
    expect(mockPush).toHaveBeenCalledWith("/stores/1");
  });
});
