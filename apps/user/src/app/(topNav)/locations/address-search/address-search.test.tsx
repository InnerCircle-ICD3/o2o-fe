import { render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";
import Page from "./page";

vi.mock("@/components/ui/locations/addressSearch", () => ({
  default: () => <div>주소 검색</div>,
}));

describe("address-search page", () => {
  it("페이지가 렌더되면 AddressSearch 컴포넌트를 렌더한다.", () => {
    render(<Page />);
    expect(screen.getByText("주소 검색")).toBeInTheDocument();
  });
});
