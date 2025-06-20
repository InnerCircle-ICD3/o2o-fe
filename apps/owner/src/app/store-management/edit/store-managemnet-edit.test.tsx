import { render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";
import Page from "./page";

vi.mock("@/components/store/edit", () => ({
  default: () => <div>매장 수정 페이지</div>,
}));

describe("store-managemnet/edit page", () => {
  it("페이지가 렌더되면 StoreEdit 컴포넌트를 렌더한다.", () => {
    render(<Page />);
    expect(screen.getByText("매장 수정 페이지")).toBeInTheDocument();
  });
});
