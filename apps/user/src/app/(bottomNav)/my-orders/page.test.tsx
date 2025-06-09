import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Page from "./page";

const mockUseGetMyOrder = vi.fn();
vi.mock("@/hooks/api/useGetMyOrder", () => ({
  default: () => mockUseGetMyOrder(),
}));

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
      error: { message: "네트워크 오류" },
      isError: true,
      isLoading: false,
    });

    render(<Page />);

    expect(screen.getByText("주문 내역을 불러오는 데 실패했습니다.")).toBeInTheDocument();
    expect(screen.getByText("네트워크 오류")).toBeInTheDocument();
  });

  it("주문 내역이 정상적으로 표시된다", () => {
    mockUseGetMyOrder.mockReturnValue({
      data: [{ orderId: 1 }, { orderId: 2 }, { orderId: 3 }],
      error: null,
      isError: false,
      isLoading: false,
    });

    render(<Page />);

    expect(screen.getByText("나의 주문 내역")).toBeInTheDocument();
    expect(screen.getByText("OrderItem - 1")).toBeInTheDocument();
    expect(screen.getByText("OrderItem - 2")).toBeInTheDocument();
    expect(screen.getByText("OrderItem - 3")).toBeInTheDocument();
  });
});
