import type { OrderDetail } from "@/types/apis/order.type";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";
import { vi } from "vitest";
import OrderItem from ".";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: (url: string) => mockPush(url),
  }),
}));

vi.mock("next/image", () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => <img {...props} alt={""} />,
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("OrderItem Test", () => {
  const mockOrder = {
    success: {
      id: 2,
      orderNumber: 123457,
      customerId: 1,
      storeId: 1002,
      status: "DONE",
      storeName: "가게 이름",
      orderItems: [
        {
          id: 2,
          productId: 2,
          productName: "스페셜 럭키백",
          originPrice: 20000,
          finalPrice: 10000,
          quantity: 2,
        },
      ],
      createdAt: "2025-05-07T11:20:30Z",
      updatedAt: "2025-05-07T11:20:30Z",
    } as unknown as OrderDetail,
    pending: {
      id: 1,
      orderNumber: 123456,
      customerId: 1,
      storeId: 1001,
      status: "READY",
      storeName: "가게 이름",
      orderItems: [
        {
          id: 1,
          productId: 1,
          productName: "빅사이즈 럭키백",
          originPrice: 20000,
          finalPrice: 10000,
          quantity: 1,
        },
      ],
      createdAt: "2025-05-06T10:15:30Z",
      updatedAt: "2025-05-06T10:15:30Z",
    } as unknown as OrderDetail,
    cancelled: {
      id: 3,
      orderNumber: 123458,
      customerId: 1,
      storeId: 1003,
      status: "CANCELED",
      storeName: "가게 이름",
      orderItems: [
        {
          id: 3,
          productId: 3,
          productName: "럭키백 세트",
          originPrice: 20000,
          finalPrice: 10000,
          quantity: 1,
        },
      ],
      createdAt: "2025-05-08T12:25:30Z",
      updatedAt: "2025-05-08T12:25:30Z",
    } as unknown as OrderDetail,
  };

  afterEach(() => {
    cleanup();
    mockPush.mockClear();
  });

  it("주문 내역은 스토어 이름과 가격이 렌더링된다.", () => {
    render(<OrderItem order={mockOrder.pending} />);

    expect(screen.getByText("가게 이름")).toBeInTheDocument();
    expect(screen.getByText("10,000₩")).toBeInTheDocument();
  });

  it("주문 내역의 Link가 orderId를 기준으로 href를 가진다.", () => {
    render(<OrderItem order={mockOrder.pending} />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/my-orders/1");
  });

  it("픽업 대기중 상태일 경우 픽업 대기중 라벨이 렌더링된다.", () => {
    render(<OrderItem order={mockOrder.pending} />);
    expect(screen.getByText("픽업 대기중")).toBeInTheDocument();
  });

  it("픽업 완료 상태일 경우 상태 라벨이 '픽업 완료'로 출력된다.", () => {
    render(<OrderItem order={mockOrder.success} />);
    expect(screen.getByText("픽업 완료")).toBeInTheDocument();
  });

  it("주문 취소 상태일 경우 상태 라벨이 '주문 취소'로 출력된다.", () => {
    render(<OrderItem order={mockOrder.cancelled} />);
    expect(screen.getByText("주문 취소")).toBeInTheDocument();
  });

  it("픽업 완료 상태이고 리뷰가 있는 경우, 리뷰 확인하기 버튼을 클릭하면 해당 리뷰 페이지로 이동한다.", () => {
    const orderWithReview = {
      ...mockOrder.success,
      hasReview: true,
    };
    render(<OrderItem order={orderWithReview} />);

    const reviewButton = screen.getByText("리뷰 확인하기");
    fireEvent.click(reviewButton);

    expect(mockPush).toHaveBeenCalledWith("/review/2");
  });

  it("픽업 완료 상태이고 리뷰가 없는 경우, 리뷰 작성하기 버튼이 렌더링된다.", () => {
    const orderWithoutReview = {
      ...mockOrder.success,
      hasReview: false,
    };
    render(<OrderItem order={orderWithoutReview} />);

    const reviewButton = screen.getByText("리뷰 작성하기");
    expect(reviewButton).toBeInTheDocument();
    expect(reviewButton.closest("a")?.getAttribute("href")).toBe("/review/register?id=2");
  });
});
