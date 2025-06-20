import { render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";
import Page from "./page";

vi.mock("@/components/store/login", () => ({
  default: () => <div>매장 로그인</div>,
}));

describe("store/login page", () => {
  it("페이지가 렌더되면 Login 컴포넌트를 렌더한다.", () => {
    render(<Page />);
    expect(screen.getByText("매장 로그인")).toBeInTheDocument();
  });
});
