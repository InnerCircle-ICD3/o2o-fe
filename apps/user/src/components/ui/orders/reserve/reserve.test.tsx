import * as ordersApi from "@/apis/ssr/orders";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Reserve from ".";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

const mockReplace = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    replace: mockReplace,
  })),
}));

describe("Reserve", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("예약 대기하기 버튼 클릭 시 readyToOrder API 호출 후 성공 페이지로 이동한다", async () => {
    // readyToOrder API spy 설정
    const readyToOrderSpy = vi.spyOn(ordersApi, "readyToOrder").mockResolvedValue({
      success: true,
      data: {
        orderId: 123,
        userId: 456,
        status: "READY",
      },
    });

    render(<Reserve id="123" />);
    const button = screen.getByRole("button", { name: /예약 대기하기/ });

    fireEvent.click(button);

    // API 호출이 완료되고 router.replace가 호출될 때까지 대기
    await waitFor(() => {
      expect(readyToOrderSpy).toHaveBeenCalledWith("123");
      expect(mockReplace).toHaveBeenCalledWith("/orders/123/success");
    });
  });

  it("readyToOrder API 실패 시 에러 처리를 한다", async () => {
    // readyToOrder API가 실패하도록 spy 설정
    const readyToOrderSpy = vi.spyOn(ordersApi, "readyToOrder").mockResolvedValue({
      success: false,
      name: "ApiError",
      code: "TEST_ERROR",
      errorCode: "TEST_ERROR",
      message: "API 에러",
      statusCode: 500,
      timestamp: new Date(),
    });

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(<Reserve id="123" />);
    const button = screen.getByRole("button", { name: /예약 대기하기/ });

    fireEvent.click(button);

    await waitFor(() => {
      expect(readyToOrderSpy).toHaveBeenCalledWith("123");
      expect(consoleSpy).toHaveBeenCalled();
      expect(mockReplace).not.toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });

  it("로딩 중에는 버튼이 비활성화된다", async () => {
    // API 호출이 지연되도록 spy 설정
    const readyToOrderSpy = vi.spyOn(ordersApi, "readyToOrder").mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                success: true,
                data: { orderId: 123, userId: 456, status: "READY" },
              }),
            100,
          ),
        ),
    );

    render(<Reserve id="123" />);
    const button = screen.getByRole("button", { name: /예약 대기하기/ });

    fireEvent.click(button);

    // 로딩 중일 때 버튼 상태 확인
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /처리 중/ })).toBeDisabled();
    });

    // API 완료 후 버튼 상태 복원 확인
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /예약 대기하기/ })).not.toBeDisabled();
    });

    readyToOrderSpy.mockRestore();
  });
});
