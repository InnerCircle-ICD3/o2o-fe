import { render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";
import Page from "./page";

vi.mock("@/components/ui/mypage/deleteAccount", () => ({
  default: () => <div>회원탈퇴</div>,
}));

describe("delete-account page", () => {
  it("페이지가 렌더되면 DeleteAccount 컴포넌트를 렌더한다.", () => {
    render(<Page />);
    expect(screen.getByText("회원탈퇴")).toBeInTheDocument();
  });
});
