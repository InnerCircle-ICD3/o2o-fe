import { useFilterTab } from "@/stores/useFilterTab";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Categories from ".";
import { foodTypeList } from "../../../../constants/filterTab";

// IntersectionObserver mock with instance tracking
const intersectionObserverInstances: MockIntersectionObserver[] = [];
class MockIntersectionObserver {
  cb: (entries: IntersectionObserverEntry[]) => void;
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
  constructor(cb: (entries: IntersectionObserverEntry[]) => void) {
    this.cb = cb;
    intersectionObserverInstances.push(this);
  }
  trigger(entry: IntersectionObserverEntry) {
    this.cb([entry]);
  }
}

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

vi.mock("@/stores/useFilterTab", () => ({
  useFilterTab: vi.fn(),
}));
const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe("Categories", () => {
  const mockOnSelectedFoodType = vi.fn();
  const mockOnResetFoodType = vi.fn();

  beforeEach(() => {
    (useFilterTab as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      onSelectedFoodType: mockOnSelectedFoodType,
      onResetFoodType: mockOnResetFoodType,
    });
    intersectionObserverInstances.length = 0;
    vi.clearAllMocks();
  });

  it('"전체", "찜 목록", 각 foodType 버튼이 렌더링된다.', () => {
    render(<Categories />);
    expect(screen.getByText("전체")).toBeInTheDocument();
    expect(screen.getByText("찜 목록")).toBeInTheDocument();
    for (const f of foodTypeList) {
      expect(screen.getByText(f.label)).toBeInTheDocument();
    }
  });

  it('"전체" 버튼 클릭 시 onResetFoodType이 호출된다.', () => {
    render(<Categories />);
    fireEvent.click(screen.getByText("전체"));
    expect(mockOnResetFoodType).toHaveBeenCalled();
  });

  it("foodType 버튼 클릭 시 onSelectedFoodType이 호출된다.", () => {
    render(<Categories />);
    for (const f of foodTypeList) {
      fireEvent.click(screen.getByText(f.label));
      expect(mockOnSelectedFoodType).toHaveBeenCalledWith(f.value);
    }
  });

  it("찜 목록 버튼 클릭 시 router.push가 호출된다.", () => {
    render(<Categories />);
    fireEvent.click(screen.getByText("찜 목록"));
    expect(mockPush).toHaveBeenCalledWith("/subscribes");
  });

  it("IntersectionObserver로 opacity 상태가 변경된다.", async () => {
    render(<Categories />);
    const observer = intersectionObserverInstances[0];
    observer.trigger({ intersectionRatio: 0.5 } as IntersectionObserverEntry);
    const container = screen.getByText("전체").closest("div");
    await waitFor(() => {
      expect(container?.style.opacity).toBe("0.5");
    });
  });
});
