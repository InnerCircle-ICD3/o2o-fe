import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Page from "./page";

// 모의 컴포넌트
vi.mock("./ui/mainHeader", () => ({
  default: () => <div>MainHeader</div>,
}));

vi.mock("./ui/filterTab", () => ({
  default: () => <div>FilterTab</div>,
}));

vi.mock("./stores/StoreListContainer", () => ({
  default: () => <div>StoreListContainer</div>,
}));

describe("Home Page", () => {
  it("모든 주요 컴포넌트들이 렌더링된다", () => {
    render(<Page />);

    expect(screen.getByText("MainHeader")).toBeInTheDocument();
    expect(screen.getByText("FilterTab")).toBeInTheDocument();
    expect(screen.getByText("StoreListContainer")).toBeInTheDocument();
  });
});
