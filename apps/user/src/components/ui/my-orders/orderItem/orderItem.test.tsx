import type { OrderDetail } from "@/types/apis/order.type";
import { cleanup, render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import OrderItem from ".";
import * as style from "./orderItem.css";

vi.mock("next/image", () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => <img {...props} alt={""} />,
}));

vi.mock("next/link", () => ({
  default: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} />,
}));

describe("OrderItem Test", () => {
  const mockOrder = {
    success: {
      orderId: 1,
      orderDate: "2025-05-06T10:15:30Z",
      pickupDate: "2025-05-07T15:00:00Z",
      status: "COMPLETED",
      totalPrice: 12000,
      store: {
        name: "테스트 매장",
        mainImageUrl: "/test.png",
      } as unknown as OrderDetail["store"],
    } as unknown as OrderDetail,
    pending: {
      orderId: 1,
      orderDate: "2025-05-06T10:15:30Z",
      status: "PENDING",
      totalPrice: 12000,
      store: {
        name: "테스트 매장",
        mainImageUrl: "/test.png",
      } as unknown as OrderDetail["store"],
    } as unknown as OrderDetail,
    cancelled: {
      orderId: 1,
      orderDate: "2025-05-06T10:15:30Z",
      cancelDate: "2025-05-07T15:00:00Z",
      status: "CANCELLED",
      totalPrice: 12000,
      store: {
        name: "테스트 매장",
        mainImageUrl: "/test.png",
      } as unknown as OrderDetail["store"],
    } as unknown as OrderDetail,
  };

  afterEach(() => {
    cleanup();
  });

  it("주문 내역은 스토어 이름과 주문 일자, 픽업 일시, 가격이 렌더링된다.", () => {
    render(<OrderItem order={mockOrder.pending} />);

    expect(screen.getByText("테스트 매장")).not.toBeNull();
    expect(screen.getByText(/주문 일자:/)).not.toBeNull();
    expect(screen.getByText("12,000₩")).not.toBeNull();
  });

  it("주문 내역의 Link가 orderId를 기준으로 href를 가진다.", () => {
    render(<OrderItem order={mockOrder.pending} />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/my-orders/1");
  });

  it("픽업 대기중 상태일 경우 픽업 완료 일자와 주문 취소 일자가가 렌더링되지 않는다.", () => {
    render(<OrderItem order={mockOrder.pending} />);
    expect(screen.queryByText(/픽업 완료 일자:/)).toBeNull();
    expect(screen.queryByText(/픽업 취소 일자:/)).toBeNull();
  });

  it("픽업 대기중 상태일 경우 픽업 대기중 라벨이 렌더링된다.", () => {
    render(<OrderItem order={mockOrder.pending} />);
    expect(screen.getByText("픽업 대기중")).not.toBeNull();
  });

  it("픽업 대기중 상태일 경우 cover가 렌더링되지 않는다.", () => {
    const { container } = render(<OrderItem order={mockOrder.pending} />);
    const cover = container.querySelector(`.${"cover"}`);
    expect(cover).toBeNull();
  });

  it("픽업 완료 상태일 경우 픽업 완료 일자가 렌더링된다.", () => {
    render(<OrderItem order={mockOrder.success} />);
    expect(screen.getByText(/픽업 완료 일자:/)).not.toBeNull();
  });

  it("픽업 완료 상태일 경우 상태 라벨이 '픽업 완료'로 출력된다.", () => {
    render(<OrderItem order={mockOrder.success} />);
    expect(screen.getByText("픽업 완료")).not.toBeNull();
  });

  it("픽업 완료 상태일 경우 cover가 렌더링된다.", () => {
    const { container } = render(<OrderItem order={mockOrder.success} />);
    const cover = container.querySelector(`.${style.cover}`);
    expect(cover).not.toBeNull();
  });

  it("주문 취소 상태일 경우 주문 취소 일자가 렌더링된다.", () => {
    render(<OrderItem order={mockOrder.cancelled} />);
    expect(screen.getByText(/주문 취소 일자:/)).not.toBeNull();
  });

  it("주문 취소 상태일 경우 상태 라벨이 '주문 취소'로 출력된다.", () => {
    render(<OrderItem order={mockOrder.cancelled} />);
    expect(screen.getByText("주문 취소")).not.toBeNull();
  });

  it("주문 취소 상태일 경우 cover가 렌더링된다.", () => {
    const { container } = render(<OrderItem order={mockOrder.cancelled} />);
    const cover = container.querySelector(`.${style.cover}`);
    expect(cover).not.toBeNull();
  });
});
