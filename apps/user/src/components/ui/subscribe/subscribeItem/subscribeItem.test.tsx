import type { SubscribeDetail } from "@/types/apis/subscribe.type";
import { render, screen } from "@testing-library/react";
import SubscribeItem from "./index";

const mockSubscribe = {
  storeId: 1,
  storeName: "테스트 매장",
  status: "OPEN",
  totalStockCount: 10,
  mainImageUrl: "/images/thumb.png",
  foodCategory: ["한식", "분식"],
  description: "테스트 설명입니다.",
  originalPrice: 10000,
  discountedPrice: 8000,
} as unknown as SubscribeDetail;

describe("SubscribeItem", () => {
  it("매장명, 상태, 카테고리, 설명, 가격, 이미지가 정상적으로 렌더링된다", () => {
    render(<SubscribeItem subscribe={mockSubscribe} />);
    expect(screen.getByText("테스트 매장")).toBeInTheDocument();
    expect(screen.getByText("한식 | 분식")).toBeInTheDocument();
    expect(screen.getByText("테스트 설명입니다.")).toBeInTheDocument();
  });

  it("Link가 매장 상세 페이지로 연결된다", () => {
    render(<SubscribeItem subscribe={mockSubscribe} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/stores/1");
  });
});
