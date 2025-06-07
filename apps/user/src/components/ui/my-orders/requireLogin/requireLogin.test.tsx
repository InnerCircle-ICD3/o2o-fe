import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import RequireLogin from "./index";

// userInfoStore를 mock 처리
vi.mock("@/stores/userInfoStore", () => ({
  userInfoStore: () => ({ user: null }),
}));

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("RequireLogin", () => {
  const text = "주문 내역";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("로그인하지 않은 경우 안내 문구와 버튼이 보인다", () => {
    render(<RequireLogin text={text} />);

    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByText("로그인을 하면 더 많은 서비스를 이용할 수 있어요")).toBeInTheDocument();
    expect(screen.getByText(`로그인 후 ${text} 확인`)).toBeInTheDocument();
    expect(screen.getByText(`내 계정으로 ${text}을 확인할 수 있어요`)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("로그인 버튼 클릭 시 /login으로 이동한다", () => {
    render(<RequireLogin text={text} />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockPush).toHaveBeenCalledWith("/login");
  });
});
