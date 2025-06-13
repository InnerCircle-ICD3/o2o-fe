import { useFilterTab } from "@/stores/useFilterTab";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import FilterTab from ".";

vi.mock("@/stores/useFilterTab", () => ({
  useFilterTab: vi.fn(),
}));

describe("FilterTab", () => {
  const mockOnToggleReservable = vi.fn();
  beforeEach(() => {
    (useFilterTab as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      reservable: false,
      selectedFoodType: undefined,
      selectedPickupTime: undefined,
      onToggleReservable: mockOnToggleReservable,
    });

    const bottomElement = document.createElement("div");
    bottomElement.id = "bottom-sheet";

    document.body.appendChild(bottomElement);

    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    const el = document.querySelector("#bottom-sheet");
    if (el) {
      document.body.removeChild(el);
      el.remove();
    }
  });

  it("예약가능만 버튼이 렌더링되고 클릭 시 onToggleReservable이 호출된다.", () => {
    render(<FilterTab />);
    const reservableBtn = screen.getByRole("button", { name: /예약가능만/ });

    expect(reservableBtn).toBeInTheDocument();
    fireEvent.click(reservableBtn);

    expect(mockOnToggleReservable).toHaveBeenCalled();
  });

  it("음식 종류 탭 클릭 시 span이 활성화 스타일을 가진다.", () => {
    render(<FilterTab />);
    const foodTypeTab = screen.getByRole("button", { name: /foodType 필터 탭/ });
    fireEvent.click(foodTypeTab);

    const activeSpans = screen.getAllByText("음식 종류");
    const found = activeSpans.some((el) => el.className.includes("parentActive_true"));
    expect(found).toBe(true);
  });

  it("픽업 가능시간 탭 클릭 시 span이 활성화 스타일을 가진다.", () => {
    render(<FilterTab />);
    const pickupTimeTab = screen.getByRole("button", { name: /pickupTime 필터 탭/ });
    fireEvent.click(pickupTimeTab);

    const activeSpans = screen.getAllByText("픽업 가능시간");
    const found = activeSpans.some((el) => el.className.includes("parentActive_true"));
    expect(found).toBe(true);
  });
});
