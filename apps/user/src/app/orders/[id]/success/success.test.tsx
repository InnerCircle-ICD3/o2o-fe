// Page.test.tsx
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Page from "./page";

const mockReplace = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    replace: mockReplace,
  })),
  useParams: vi.fn(() => ({
    id: "1234",
  })),
}));

describe("Success Page Test", () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("성공 페이지 렌더링 및 버튼 확인", async () => {
    render(<Page />);

    const title = await screen.findByText("예약대기가 확정되었습니다.");
    const description = await screen.findByText(/예약 확정여부는 주문내역에서/);
    const homeButton = await screen.findByRole("button", { name: "홈으로" });
    const orderButton = await screen.findByRole("button", { name: "주문 내역 보러가기" });

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(homeButton).toBeInTheDocument();
    expect(orderButton).toBeInTheDocument();
  });

  it("홈으로 버튼 클릭 시 router.replace가 호출된다", async () => {
    render(<Page />);

    const homeButton = await screen.findByRole("button", { name: "홈으로" });
    fireEvent.click(homeButton);

    expect(mockReplace).toHaveBeenCalledWith("/");
  });

  it("주문 내역 보러가기 버튼 클릭 시 router.replace가 호출된다", async () => {
    render(<Page />);

    const orderButton = await screen.findByRole("button", { name: "주문 내역 보러가기" });
    fireEvent.click(orderButton);

    expect(mockReplace).toHaveBeenCalledWith("/my-orders");
  });
});
