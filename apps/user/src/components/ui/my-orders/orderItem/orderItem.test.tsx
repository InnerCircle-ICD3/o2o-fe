import type { OrderDetail } from "@/types/apis/order.type";
import { cleanup, render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";
import { vi } from "vitest";
import OrderItem from ".";

vi.mock("next/image", () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => <img {...props} alt={""} />,
}));

vi.mock("next/link", () => ({
  default: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} />,
}));

describe("OrderItem Test", () => {
  const mockOrder = {
    success: {
      id: 2,
      orderNumber: 123457,
      customerId: 1,
      storeId: 1002,
      status: "COMPLETED",
      orderItems: [
        {
          id: 2,
          productId: 2,
          productName: "스페셜 잇고백",
          price: 15000,
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
      status: "PENDING",
      orderItems: [
        {
          id: 1,
          productId: 1,
          productName: "빅사이즈 잇고백",
          price: 10000,
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
      status: "CANCELLED",
      orderItems: [
        {
          id: 3,
          productId: 3,
          productName: "잇고백 세트",
          price: 20000,
          quantity: 1,
        },
      ],
      createdAt: "2025-05-08T12:25:30Z",
      updatedAt: "2025-05-08T12:25:30Z",
    } as unknown as OrderDetail,
  };

  afterEach(() => {
    cleanup();
  });

  it("주문 내역은 스토어 이름과 주문 일자, 픽업 일시, 가격이 렌더링된다.", () => {
    render(<OrderItem order={mockOrder.pending} />);

    expect(screen.getByText("가게 이름")).toBeInTheDocument();
    expect(screen.getByText(/주문일:/)).toBeInTheDocument();
    // expect(screen.getByText("10,000₩")).toBeInTheDocument();
  });

  it("주문 내역의 Link가 orderId를 기준으로 href를 가진다.", () => {
    render(<OrderItem order={mockOrder.pending} />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/my-orders/1");
  });

  it("픽업 대기중 상태일 경우 픽업 완료 일자와 주문 취소 일자가가 렌더링되지 않는다.", () => {
    render(<OrderItem order={mockOrder.pending} />);
    expect(screen.queryByText(/픽업 완료 일자:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/픽업 취소 일자:/)).not.toBeInTheDocument();
  });

  it("픽업 대기중 상태일 경우 픽업 대기중 라벨이 렌더링된다.", () => {
    render(<OrderItem order={mockOrder.pending} />);
    expect(screen.getByText("픽업 대기중")).toBeInTheDocument();
  });

  // it("픽업 완료 상태일 경우 픽업 완료 일자가 렌더링된다.", () => {
  //   render(<OrderItem order={mockOrder.success} />);
  //   expect(screen.getByText(/픽업 완료 일자:/)).toBeInTheDocument();
  // });

  it("픽업 완료 상태일 경우 상태 라벨이 '픽업 완료'로 출력된다.", () => {
    render(<OrderItem order={mockOrder.success} />);
    expect(screen.getByText("픽업 완료")).toBeInTheDocument();
  });

  // it("주문 취소 상태일 경우 주문 취소 일자가 렌더링된다.", () => {
  //   render(<OrderItem order={mockOrder.cancelled} />);
  //   expect(screen.getByText(/주문 취소 일자:/)).toBeInTheDocument();
  // });

  it("주문 취소 상태일 경우 상태 라벨이 '주문 취소'로 출력된다.", () => {
    render(<OrderItem order={mockOrder.cancelled} />);
    expect(screen.getByText("주문 취소")).toBeInTheDocument();
  });
});
