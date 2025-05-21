import { ORDER_STATUS } from "@/constants/my-orders";
import type { OrderDetail } from "@/types/apis/order.type";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
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
  status: ORDER_STATUS.pending,
} as unknown as OrderDetail;

describe("ActionButtons Test", () => {
  afterEach(() => {
    cleanup();
  });

  it("status가 pending이면 버튼 2개가 보여야 한다", () => {
    render(<ActionButtons orderDetail={{ ...baseOrder, status: ORDER_STATUS.pending }} />);

    expect(screen.getByRole("button", { name: "주문 취소" })).not.toBeNull();
    expect(screen.getByRole("button", { name: "픽업 완료" })).not.toBeNull();
  });

  it("status가 pending이 아니면 아무것도 렌더링되지 않아야 한다", () => {
    render(<ActionButtons orderDetail={{ ...baseOrder, status: ORDER_STATUS.completed }} />);

    expect(screen.queryByRole("button", { name: "주문 취소" })).toBeNull();
    expect(screen.queryByRole("button", { name: "픽업 완료" })).toBeNull();
  });
});
