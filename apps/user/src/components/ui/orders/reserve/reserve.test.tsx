import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Reserve from ".";

const mockReplace = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    replace: mockReplace,
  })),
}));

describe("Reserve", () => {
  it("예약 대기하기 버튼 클릭 시 router.replace가 호출된다", async () => {
    render(<Reserve id="123" />);
    const button = screen.getByRole("button", { name: /예약 대기하기/ });

    fireEvent.click(button);

    expect(mockReplace).toHaveBeenCalledWith("/orders/123/success");
  });
});
