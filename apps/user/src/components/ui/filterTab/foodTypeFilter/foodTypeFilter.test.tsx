import { useFilterTab } from "@/stores/useFilterTab";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import FoodTypeFilter from "./index";

vi.mock("@/stores/useFilterTab");

const mockOnSelectedFoodType = vi.fn();
const mockOnResetFoodType = vi.fn();

const setup = (selectedFoodType: string | null = null) => {
  (useFilterTab as unknown as jest.Mock).mockReturnValue({
    selectedFoodType,
    onSelectedFoodType: mockOnSelectedFoodType,
    onResetFoodType: mockOnResetFoodType,
  });
  return render(
    <>
      <div id={"bottom-sheet"} />
      <FoodTypeFilter isOpen={true} onClose={vi.fn()} />
    </>,
  );
};

describe("FoodTypeFilter", () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("모든 음식 종류 옵션과 전체 버튼이 렌더링된다", () => {
    setup();
    expect(screen.getByText("전체")).toBeInTheDocument();
    // foodTypeList의 label이 모두 렌더링되는지 확인 (예시)
    expect(screen.getByText("한식")).toBeInTheDocument();
  });

  it("음식 종류를 클릭하면 onSelectedFoodType과 onClose가 호출된다", () => {
    const onClose = vi.fn();
    (useFilterTab as unknown as jest.Mock).mockReturnValue({
      selectedFoodType: null,
      onSelectedFoodType: mockOnSelectedFoodType,
      onResetFoodType: mockOnResetFoodType,
    });
    render(
      <>
        <div id={"bottom-sheet"} />
        <FoodTypeFilter isOpen={true} onClose={onClose} />
      </>,
    );
    const btn = screen.getByRole("button", { name: /한식 선택/ });
    fireEvent.click(btn);
    expect(mockOnSelectedFoodType).toHaveBeenCalledWith("KOREAN");
    expect(onClose).toHaveBeenCalled();
  });

  it("전체를 클릭하면 onResetFoodType과 onClose가 호출된다", () => {
    const onClose = vi.fn();
    (useFilterTab as unknown as jest.Mock).mockReturnValue({
      selectedFoodType: "korean",
      onSelectedFoodType: mockOnSelectedFoodType,
      onResetFoodType: mockOnResetFoodType,
    });
    render(
      <>
        <div id={"bottom-sheet"} />
        <FoodTypeFilter isOpen={true} onClose={onClose} />
      </>,
    );
    const btn = screen.getByText("전체");
    fireEvent.click(btn);
    expect(mockOnResetFoodType).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});
