import { render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";
import Page from "./page";

vi.mock("@/components/ui/mypage/completeProfile", () => ({
  default: () => <div>닉네임 변경</div>,
}));

describe("complete-profile page", () => {
  it("페이지가 렌더되면 CompleteProfile 컴포넌트를 렌더한다.", () => {
    render(<Page />);
    expect(screen.getByText("닉네임 변경")).toBeInTheDocument();
  });
});
