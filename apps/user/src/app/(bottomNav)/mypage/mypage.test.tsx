import { getAuthMe } from "@/apis/ssr/account";
import { render } from "@testing-library/react";
import { vi } from "vitest";
import * as style from "./mypage.css";
import Page from "./page";

vi.mock("@/apis/ssr/account", () => ({
  getAuthMe: vi.fn(),
}));

describe("Mypage Test", () => {
  it("로그인 정보가 있다면 shortcut, menus 메뉴가 나타난다.", async () => {
    (getAuthMe as jest.Mock).mockResolvedValue({
      success: true,
      data: {
        id: 1,
        name: "재완",
        email: "jaewan@test.com",
      },
    });

    const { container } = render(await Page());

    const shortcuts = container.querySelector(`.${style.shortcuts}`);
    expect(shortcuts).toBeInTheDocument();

    const menus = container.querySelector(`.${style.menus}`);
    expect(menus).toBeInTheDocument();
  });

  it("로그인 정보가 없다면 shortcut, menus 메뉴가 나타나지 않는다.", async () => {
    (getAuthMe as jest.Mock).mockResolvedValue({
      success: false,
      data: null,
    });

    const { container } = render(await Page());

    const shortcuts = container.querySelector(`.${style.shortcuts}`);
    expect(shortcuts).not.toBeInTheDocument();

    const menus = container.querySelector(`.${style.menus}`);
    expect(menus).not.toBeInTheDocument();
  });
});
