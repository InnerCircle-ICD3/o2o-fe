import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Subscribe from "./index";

const mockToggleSubscribe = vi.fn();

vi.mock("@/hooks/api/useSubscribe", () => ({
  default: () => mockToggleSubscribe,
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe("Subscribe", () => {
  it("찜하기 상태에 따라 올바른 아이콘과 alt가 렌더링된다", () => {
    const { rerender } = render(<Subscribe isFavorite={false} storeId={1} customerId={2} />);
    const img = screen.getByAltText("찜하기") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain("/icons/subscribe_off.svg");

    rerender(<Subscribe isFavorite={true} storeId={1} customerId={2} />);
    const imgOn = screen.getByAltText("찜하기 취소") as HTMLImageElement;
    expect(imgOn).toBeInTheDocument();
    expect(imgOn.src).toContain("/icons/subscribe_on.svg");
  });

  it("버튼 클릭 시 toggleSubscribe가 storeId, customerId와 함께 호출된다", () => {
    render(<Subscribe isFavorite={false} storeId={10} customerId={20} />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockToggleSubscribe).toHaveBeenCalledWith(10, 20);
  });
});
