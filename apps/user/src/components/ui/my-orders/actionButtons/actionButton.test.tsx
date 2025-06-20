import { ORDER_STATUS } from "@/constants/my-orders";
import type { OrderDetail } from "@/types/apis/order.type";
import { cleanup, render, screen } from "@testing-library/react";
import ActionButtons from ".";

const baseOrder: OrderDetail = {
  id: 1,
  store: {
    id: 1,
    name: "테스트 매장",
    roadAddress: {
      addressName: "서울시 강남구",
    },
  },
  status: ORDER_STATUS.READY,
} as unknown as OrderDetail;

describe("ActionButtons Test", () => {
  afterEach(() => {
    cleanup();
  });

  it("status가 READY이면 주문 취소 버튼만 보여야 한다", () => {
    render(<ActionButtons orderDetail={{ ...baseOrder, status: "READY" }} />);

    expect(screen.getByRole("button", { name: "주문 취소" })).toBeInTheDocument();
  });

  it("status가 CONFIRMED이면 주문 취소 버튼과 픽업 완료 버튼이 보여야 한다", () => {
    render(<ActionButtons orderDetail={{ ...baseOrder, status: "CONFIRMED" }} />);

    expect(screen.queryByRole("button", { name: "픽업 완료" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "주문 취소" })).toBeInTheDocument();
  });

  it("status가 DONE이 아니면 아무것도 렌더링되지 않아야 한다", () => {
    render(<ActionButtons orderDetail={{ ...baseOrder, status: "DONE" }} />);

    expect(screen.queryByRole("button", { name: "주문 취소" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "픽업 완료" })).not.toBeInTheDocument();
  });

  it("status가 CANCELED이 아니면 아무것도 렌더링되지 않아야 한다", () => {
    render(<ActionButtons orderDetail={{ ...baseOrder, status: "CANCELED" }} />);

    expect(screen.queryByRole("button", { name: "주문 취소" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "픽업 완료" })).not.toBeInTheDocument();
  });
});
