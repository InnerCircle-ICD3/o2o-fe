import { foodTypeList } from "@/constants/filterTab";
import { useFilterTab } from "@/stores/useFilterTab";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import FoodTypeFilter from ".";
import * as style from "./foodTypeFilter.css";

vi.mock("@/stores/useFilterTab", () => ({
  useFilterTab: vi.fn(),
}));

describe("FoodTypeFilter", () => {
  const onClose = vi.fn();
  const mockOnSelectedFoodType = vi.fn();
  const mockOnResetFoodType = vi.fn();

  beforeEach(() => {
    (useFilterTab as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      selectedFoodType: undefined,
      onSelectedFoodType: mockOnSelectedFoodType,
      onResetFoodType: mockOnResetFoodType,
    });

    const bottomElement = document.createElement("div");
    bottomElement.id = "bottom-sheet";

    document.body.appendChild(bottomElement);

    vi.clearAllMocks();
  });

  it("음식 종류 리스트가 렌더링된다.", () => {
    render(<FoodTypeFilter isOpen={true} onClose={onClose} />);

    for (const foodType of foodTypeList) {
      expect(screen.getByText(foodType.label)).toBeInTheDocument();
    }
  });

  it("음식 종류 버튼 클릭 시 onSelectedFoodType과 onClose가 호출된다.", () => {
    render(<FoodTypeFilter isOpen={true} onClose={onClose} />);
    const button = screen.getByRole("button", { name: /베이커리 선택/ });
    fireEvent.click(button);
    expect(mockOnSelectedFoodType).toHaveBeenCalledWith("BREAD");
    expect(onClose).toHaveBeenCalled();
  });

  it("초기화 버튼 클릭 시 onResetFoodType이 호출된다.", () => {
    render(<FoodTypeFilter isOpen={true} onClose={onClose} />);
    const resetButton = screen.getByRole("button", { name: "초기화" });
    fireEvent.click(resetButton);
    expect(mockOnResetFoodType).toHaveBeenCalled();
  });

  it("선택된 음식 종류는 filterListItemSelected, 나머지는 filterListItem 클래스를 가진다.", () => {
    (useFilterTab as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      selectedFoodType: "BREAD",
      onSelectedFoodType: mockOnSelectedFoodType,
      onResetFoodType: mockOnResetFoodType,
    });
    render(<FoodTypeFilter isOpen={true} onClose={onClose} />);
    const listItems = screen.getAllByRole("listitem");
    foodTypeList.forEach((foodType, idx) => {
      if (foodType.value === "BREAD") {
        expect(listItems[idx].className).toMatch(style.filterListItemSelected);
      } else {
        expect(listItems[idx].className).toMatch(style.filterListItem);
        expect(listItems[idx].className).not.toMatch(style.filterListItemSelected);
      }
    });
  });
});
