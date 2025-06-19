import { render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";
import Page from "./page";

vi.mock("@/components/ui/locations/myLocation", () => ({
  default: () => <div>내 위치</div>,
}));

describe("my-location page", () => {
  it("페이지가 렌더되면 MyLocation 컴포넌트를 렌더한다.", () => {
    render(<Page />);
    expect(screen.getByText("내 위치")).toBeInTheDocument();
  });
});
