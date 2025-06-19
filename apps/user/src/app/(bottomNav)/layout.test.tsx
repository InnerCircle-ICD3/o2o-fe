import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { vi } from "vitest";
import Layout from "./layout";

// BottomNav 컴포넌트 모킹
vi.mock("@/components/ui/layout/bottomNav", () => ({
  default: ({ children }: { children: ReactNode }) => (
    <div data-testid="bottom-nav">
      <div>BottomNav</div>
      {children}
    </div>
  ),
}));

describe("BottomNav Layout", () => {
  it("BottomNav와 children이 렌더링된다", () => {
    const TestChild = () => <div>Test Content</div>;

    render(
      <Layout>
        <TestChild />
      </Layout>,
    );

    expect(screen.getByTestId("bottom-nav")).toBeInTheDocument();
    expect(screen.getByText("BottomNav")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});
