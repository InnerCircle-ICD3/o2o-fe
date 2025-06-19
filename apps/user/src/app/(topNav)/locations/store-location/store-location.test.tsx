import { render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";
import Page from "./page";

vi.mock("@/components/ui/locations/storeMap", () => ({
  default: ({ lat, lng }: { lat: number; lng: number }) => (
    <div>
      매장 위치 {lat} {lng}
    </div>
  ),
}));

describe("Page (비정규 테스트)", () => {
  it("비동기 Page 렌더링", async () => {
    const searchParams = Promise.resolve({ lat: "37.5665", lng: "126.9780" });
    const PageComponent = await Page({ searchParams });
    render(PageComponent);
    expect(screen.getByText("매장 위치 37.5665 126.978")).toBeInTheDocument();
  });
});
