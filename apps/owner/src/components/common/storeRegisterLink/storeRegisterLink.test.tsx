import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StoreRegisterLink from ".";

describe("StoreRegisterLink", () => {
  it("안내 문구와 매장 등록하기 버튼 링크를 올바르게 렌더링한다.", () => {
    render(<StoreRegisterLink />);

    expect(screen.getByText("매장 정보를 불러올 수 없습니다.")).toBeInTheDocument();

    // next/link는 a 태그로 렌더링되므로 'link' role 이용
    const registerLink = screen.getByRole("link", { name: "매장 등록하기" });

    expect(registerLink).toHaveAttribute("href", "/store/register");

    const buttonInsideLink = screen.getByRole("button", { name: "매장 등록하기" });
    expect(buttonInsideLink).toBeInTheDocument();
  });
});
