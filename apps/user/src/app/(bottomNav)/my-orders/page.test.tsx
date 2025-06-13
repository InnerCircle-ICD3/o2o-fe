import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Page from "./page";

const mockPush = vi.fn();

const mockUseGetMyOrder = vi.fn();
vi.mock("@/hooks/api/useGetMyOrder", () => ({
  default: () => mockUseGetMyOrder(),
}));

vi.mock("next/navigation", () => {
  return {
    useRouter: () => ({
      push: mockPush,
    }),
  };
});

vi.mock("@/components/ui/my-orders/orderItem", () => ({
  default: ({ order }: { order: { orderId: number } }) => <div>OrderItem - {order.orderId}</div>,
}));

vi.mock("@/stores/userInfoStore", () => ({
  userInfoStore: vi.fn(() => ({
    user: { id: 1, nickname: "재완", customerId: 1 },
  })),
}));

describe("My Orders Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("로딩 중일 때 로딩 메시지가 표시된다", () => {
    mockUseGetMyOrder.mockReturnValue({
      data: undefined,
      error: null,
      isError: false,
      isLoading: true,
    });

    render(<Page />);

    const skeletonCard = document.querySelector('[class*="skeletonCardStyle"]');
    expect(skeletonCard).toBeInTheDocument();
  });

  it("에러가 발생했을 때 에러 메시지가 표시된다", () => {
    mockUseGetMyOrder.mockReturnValue({
      data: undefined,
      error: { message: "주문 내역을 불러오는 데 실패했습니다." },
      isError: true,
      isLoading: false,
    });

    render(<Page />);

    expect(screen.getByText("주문 내역을 불러오는 데 실패했습니다.")).toBeInTheDocument();
  });
});
