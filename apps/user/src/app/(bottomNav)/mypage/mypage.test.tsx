import type { Result } from "@/apis/types";
import type { Customer } from "@/types/apis/accounts.type";
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

    const { container } = render(<Page />);
    // 비동기 처리 기다림
    await waitFor(() => {
      expect(container.querySelector(`.${style.shortcuts}`)).toBeInTheDocument();
      expect(container.querySelector(`.${style.menus}`)).toBeInTheDocument();
    });
  });

  it("로그인 정보가 없다면 shortcut, menus 메뉴가 나타나지 않는다.", async () => {
    // 비로그인 상태로 mockUser 설정
    mockUser = null;
    // getCustomer는 호출되지 않으므로 mock 필요 없음

    const { container, getByText } = render(<Page />);
    // userInfo가 없으므로 ErrorUi가 떠야 함
    await waitFor(() => {
      expect(getByText("사용자 정보를 불러오는데 실패했습니다.")).toBeInTheDocument();
      expect(container.querySelector(`.${style.shortcuts}`)).not.toBeInTheDocument();
      expect(container.querySelector(`.${style.menus}`)).not.toBeInTheDocument();
    });
  });
});
