import { useFilterTab } from "@/stores/useFilterTab";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import FilterTab from "./index";

vi.mock("@/stores/useFilterTab");

const mockOnToggleReservable = vi.fn();

const defaultStore = {
  reservable: false,
  selectedFoodType: null,
  selectedPickupTime: null,
  onToggleReservable: mockOnToggleReservable,
};

const setup = (storeOverrides = {}) => {
  (useFilterTab as unknown as jest.Mock).mockReturnValue({
    ...defaultStore,
    ...storeOverrides,
  });
  return render(
    <>
      <div id={"bottom-sheet"} />
      <FilterTab />
    </>,
  );
};

describe("FilterTab", () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("예약가능만 버튼이 렌더링되고 클릭 시 onToggleReservable이 호출된다", () => {
    setup();
    const btn = screen.getByText("예약가능만");
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(mockOnToggleReservable).toHaveBeenCalled();
  });

  it("음식 종류 탭 클릭 시 FoodTypeFilter가 열린다", () => {
    setup();
    const foodTypeTab = screen.getByLabelText("foodType 필터 탭");
    fireEvent.click(foodTypeTab);
    expect(screen.getByText("전체")).toBeInTheDocument();
  });

  it("픽업 가능시간 탭 클릭 시 PickUpTimeFilter가 열린다", () => {
    setup();
    const pickupTimeTab = screen.getByLabelText("pickupTime 필터 탭");
    fireEvent.click(pickupTimeTab);
    expect(screen.getByText("시간 적용")).toBeInTheDocument();
  });

  it("선택된 음식 종류가 있으면 해당 label이 탭에 표시된다", () => {
    setup({ selectedFoodType: "KOREAN" });
    const foodTypeTab = screen.getByLabelText("foodType 필터 탭");
    expect(foodTypeTab).toHaveTextContent("한식");
  });

  it("선택된 픽업 시간이 있으면 탭에 시간 정보가 표시된다", () => {
    setup({ selectedPickupTime: { day: "오전", hour: 9, minute: 30 } });
    const pickupTimeTab = screen.getByLabelText("pickupTime 필터 탭");
    expect(pickupTimeTab).toHaveTextContent("오전 09:30");
  });
});
