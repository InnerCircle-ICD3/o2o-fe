import type { Result } from "@/apis/types";
import type { Customer } from "@/types/apis/accounts.type";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import * as style from "./mypage.css";
import Page from "./page";

// mockUser 변수를 활용해 동적으로 값 변경
let mockUser: {
  userId: string;
  roles: string[];
  nickname: string;
  customerId: number;
} | null = { userId: "1", roles: [], nickname: "재완", customerId: 1 };

vi.mock("@/apis/ssr/customers", () => ({
  getCustomer: vi.fn(),
}));
vi.mock("@/stores/userInfoStore", () => ({
  userInfoStore: () => ({
    user: mockUser,
    setUser: vi.fn(),
    clearUser: vi.fn(),
  }),
}));
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
}));

import { getCustomer } from "@/apis/ssr/customers";

const renderWithQueryClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe("Mypage Test", () => {
  it("로그인 정보가 있다면 shortcut, menus 메뉴가 나타난다.", async () => {
    // 로그인 상태로 mockUser 설정
    mockUser = { userId: "1", roles: [], nickname: "재완", customerId: 1 };
    // getCustomer mock - Customer 타입에 맞게 모든 필드 포함
    (getCustomer as ReturnType<typeof vi.fn>).mockResolvedValue({
      success: true,
      data: {
        id: 1,
        userAccountId: 1,
        nickname: "재완",
        createAt: "2024-01-01T00:00:00.000Z",
        updateAt: "2024-01-01T00:00:00.000Z",
      } as Customer,
    } as Result<Customer>);

    const { container } = renderWithQueryClient(<Page />);
    // 비동기 처리 기다림
    await waitFor(() => {
      expect(container.querySelector(`.${style.shortcuts}`)).toBeInTheDocument();
      expect(container.querySelector(`.${style.menus}`)).toBeInTheDocument();
    });
  });

  it("로그인 정보가 없다면 shortcut, menus 메뉴가 나타나지 않는다.", async () => {
    // 비로그인 상태로 mockUser 설정
    mockUser = null;
    // getCustomer가 비로그인 상황임을 명확히 반환
    (getCustomer as ReturnType<typeof vi.fn>).mockResolvedValue({
      success: false,
      data: null,
    });

    const { container, getByText } = renderWithQueryClient(<Page />);
    await waitFor(() => {
      expect(getByText("로그인")).toBeInTheDocument();
      expect(getByText("로그인을 하면 더 많은 서비스를 이용할 수 있어요.")).toBeInTheDocument();
      expect(container.querySelector(`.${style.shortcuts}`)).not.toBeInTheDocument();
      expect(container.querySelector(`.${style.menus}`)).not.toBeInTheDocument();
    });
  });
});
