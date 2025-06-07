import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import TopNav from "./index";

// Next.js 라우터 모킹
const mockBack = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mockBack,
  }),
  usePathname: () => "/mypage",
}));

// ROUTE 상수 모킹
vi.mock("@/constants/route", () => ({
  default: {
    topNav: {
      mypage: {
        path: ["/mypage"],
        name: "마이페이지",
      },
    },
  },
}));

describe("TopNav", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("타이틀이 올바르게 표시된다", () => {
    render(
      <TopNav>
        <div>Test Content</div>
      </TopNav>,
    );

    expect(screen.getByText("마이페이지")).toBeInTheDocument();
  });

  it("뒤로가기 버튼을 클릭하면 router.back이 호출된다", () => {
    render(
      <TopNav>
        <div>Test Content</div>
      </TopNav>,
    );

    const backButton = screen.getByRole("button", { name: /뒤로가기/i });
    fireEvent.click(backButton);

    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it("children이 올바르게 렌더링된다", () => {
    render(
      <TopNav>
        <div>Test Content</div>
      </TopNav>,
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});
