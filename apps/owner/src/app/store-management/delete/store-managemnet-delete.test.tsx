import { render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";
import Page from "./page";

vi.mock("@/components/store/delete", () => ({
  default: () => <div>매장 삭제 페이지</div>,
}));

describe("store-managemnet/delete page", () => {
  it("페이지가 렌더되면 StoreDeleteForm 컴포넌트를 렌더한다.", () => {
    render(<Page />);
    expect(screen.getByText("매장 삭제 페이지")).toBeInTheDocument();
  });
});
