import { render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";
import Page from "./page";

vi.mock("@/components/store/register", () => ({
  default: () => <div>매장 등록 페이지</div>,
}));

describe("store/register page", () => {
  it("페이지가 렌더되면 StoreRegisterForm 컴포넌트를 렌더한다.", () => {
    render(<Page />);
    expect(screen.getByText("매장 등록 페이지")).toBeInTheDocument();
  });
});
