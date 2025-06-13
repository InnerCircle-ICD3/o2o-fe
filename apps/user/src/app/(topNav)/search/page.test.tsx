import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { vi } from "vitest";
import Page from "./page";

// Next.js 라우터 모킹
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/search",
  useSearchParams: () => new URLSearchParams(),
}));

// 하위 컴포넌트들 모킹
vi.mock("./ui/searchInput", () => ({
  default: () => <div>SearchInput</div>,
}));

vi.mock("./ui/searchResult", () => ({
  default: () => <div>SearchResult</div>,
}));

vi.mock("@/providers/search", () => {
  const MockSearchProvider = ({ children }: { children: ReactNode }) => <>{children}</>;
  return {
    SearchProvider: MockSearchProvider,
  };
});

describe("Search Page", () => {
  it("검색 페이지 구조가 올바르게 렌더링된다", () => {
    render(<Page />);

    // 뒤로가기 버튼
    expect(screen.getByAltText("뒤로가기")).toBeInTheDocument();

    // 검색 입력 컴포넌트
    expect(screen.getByText("SearchInput")).toBeInTheDocument();

    // 검색 결과 컴포넌트
    expect(screen.getByText("SearchResult")).toBeInTheDocument();
  });
});
