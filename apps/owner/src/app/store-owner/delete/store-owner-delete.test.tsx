import { render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";
import Page from "./page";

vi.mock("@/components/storeOwner/delete", () => ({
  default: () => <div>점주 계정 삭제 페이지</div>,
}));

describe("store-owner/delete page", () => {
  it("페이지가 렌더되면 OwnerDeleteForm 컴포넌트를 렌더한다.", () => {
    render(<Page />);
    expect(screen.getByText("점주 계정 삭제 페이지")).toBeInTheDocument();
  });
});
