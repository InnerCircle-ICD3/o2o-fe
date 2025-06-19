import { render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";
import Page from "./page";

vi.mock("@/components/ui/login", () => ({
  default: () => <div>로그인</div>,
}));

describe("login page", () => {
  it("페이지가 렌더되면 Login 컴포넌트를 렌더한다.", () => {
    render(<Page />);
    expect(screen.getByText("로그인")).toBeInTheDocument();
  });
});
