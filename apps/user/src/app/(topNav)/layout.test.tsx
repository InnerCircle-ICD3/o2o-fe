import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { vi } from "vitest";
import Layout from "./layout";

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
  useSelectedLayoutSegment: () => null,
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// TopNav 컴포넌트 모킹
vi.mock("@/components/ui/layout/topNav", () => ({
  default: ({ children }: { children: ReactNode }) => (
    <div>
      <div>TopNav</div>
      {children}
    </div>
  ),
}));

describe("TopNav Layout", () => {
  it("TopNav와 children이 렌더링된다", () => {
    const TestChild = () => <div>Test Content</div>;

    render(
      <Layout>
        <TestChild />
      </Layout>,
    );

    expect(screen.getByText("TopNav")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});
