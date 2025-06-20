import { VirtualScrollContext } from "@/components/common/virtualScroll";
import { useFilterTab } from "@/stores/useFilterTab";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Categories from "./index";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock("@/stores/useFilterTab");

const mockOnSelectedFoodType = vi.fn();
const mockOnResetFoodType = vi.fn();

const renderWithContext = (children: React.ReactNode) => {
  return render(
    <VirtualScrollContext.Provider value={{ containerRef: { current: null } }}>
      {children}
    </VirtualScrollContext.Provider>,
  );
};

class ResizeObserver {
  callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element) {
    this.callback(
      [
        {
          target,
          contentRect: {
            width: 500,
            height: 300,
            top: 0,
            left: 0,
            bottom: 300,
            right: 500,
            x: 0,
            y: 0,
            toJson: () => {},
          },
        },
      ] as unknown as ResizeObserverEntry[],
      this,
    );
  }

  disconnect() {}
  unobserve() {}
}

describe("Categories", () => {
  beforeEach(() => {
    (useFilterTab as unknown as jest.Mock).mockReturnValue({
      onSelectedFoodType: mockOnSelectedFoodType,
      onResetFoodType: mockOnResetFoodType,
    });

    let mockCallback: IntersectionObserverCallback;

    class IntersectionObserver {
      readonly root: Element | null = null;
      readonly rootMargin: string = "0px";
      readonly thresholds: ReadonlyArray<number> = [];

      constructor(callback: IntersectionObserverCallback) {
        mockCallback = callback;
      }

      observe(target: Element) {
        mockCallback(
          [
            {
              isIntersecting: true,
              target,
              intersectionRatio: 1,
              time: 0,
              boundingClientRect: {} as DOMRectReadOnly,
              intersectionRect: {} as DOMRectReadOnly,
              rootBounds: {} as DOMRectReadOnly,
            },
          ],
          this,
        );
      }

      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    }

    global.ResizeObserver = ResizeObserver;
    global.IntersectionObserver = IntersectionObserver;
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("카테고리 버튼과 찜 목록 버튼, 전체 버튼이 렌더링된다", () => {
    renderWithContext(<Categories />);
    expect(screen.getByText("전체")).toBeInTheDocument();
    expect(screen.getByText("찜 목록")).toBeInTheDocument();
    // foodTypeList의 label 일부 예시
    expect(screen.getByText("한식")).toBeInTheDocument();
  });

  it("전체 버튼 클릭 시 onResetFoodType이 호출된다", () => {
    renderWithContext(<Categories />);
    fireEvent.click(screen.getByText("전체"));
    expect(mockOnResetFoodType).toHaveBeenCalled();
  });

  it("카테고리 버튼 클릭 시 onSelectedFoodType이 호출된다", () => {
    renderWithContext(<Categories />);
    fireEvent.click(screen.getByText("한식"));
    expect(mockOnSelectedFoodType).toHaveBeenCalled();
  });

  it("찜 목록 버튼 클릭 시 router.push가 호출된다", () => {
    renderWithContext(<Categories />);
    fireEvent.click(screen.getByText("찜 목록"));
    expect(mockPush).toHaveBeenCalledWith("/subscribes");
  });
});
