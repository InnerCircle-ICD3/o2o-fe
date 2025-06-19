import { render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";
import Page from "./page";

vi.mock("@/components/ui/locations/searchMap", () => ({
  default: () => <div>지도 검색</div>,
}));

describe("locations-search page", () => {
  it("페이지가 렌더되면 SearchMap 컴포넌트를 렌더한다.", () => {
    render(<Page />);
    expect(screen.getByText("지도 검색")).toBeInTheDocument();
  });
});
