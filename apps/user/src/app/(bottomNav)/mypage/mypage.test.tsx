import { userInfoStore } from "@/stores/userInfoStore";
import { render } from "@testing-library/react";
import { vi } from "vitest";
import * as style from "./mypage.css";
import Page from "./page";

vi.mock("@/apis/ssr/account", () => ({
  getAuthMe: vi.fn(),
}));

vi.mock("@/stores/userInfoStore", () => ({
  userInfoStore: vi.fn(),
}));

describe("Mypage Test", () => {
  it("로그인 정보가 있다면 shortcut, menus 메뉴가 나타난다.", () => {
    vi.mocked(userInfoStore).mockReturnValue({
      user: { id: 1, nickname: "재완", customerId: 1 },
    });

    const { container } = render(<Page />);
    const shortcuts = container.querySelector(`.${style.shortcuts}`);
    expect(shortcuts).toBeInTheDocument();

    const menus = container.querySelector(`.${style.menus}`);
    expect(menus).toBeInTheDocument();
  });

  it("로그인 정보가 없다면 shortcut, menus 메뉴가 나타나지 않는다.", () => {
    vi.mocked(userInfoStore).mockReturnValue({
      user: null,
    });

    const { container } = render(<Page />);
    const shortcuts = container.querySelector(`.${style.shortcuts}`);
    expect(shortcuts).not.toBeInTheDocument();

    const menus = container.querySelector(`.${style.menus}`);
    expect(menus).not.toBeInTheDocument();
  });
});
