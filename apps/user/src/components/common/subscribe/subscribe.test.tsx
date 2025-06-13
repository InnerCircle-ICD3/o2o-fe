import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Subscribe from ".";

vi.mock("@/hooks/api/useSubsctibe", () => () => vi.fn());

const mockToggleSubscribe = vi.fn();

vi.mock("@/hooks/api/useSubsctibe", () => ({
  default: () => mockToggleSubscribe,
}));

describe("Subscribe", () => {
  const defaultProps = {
    isFavorite: false,
    storeId: 1,
    customerId: 2,
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("찜하기 아이콘이 정상적으로 렌더링된다.", () => {
    render(<Subscribe {...defaultProps} />);
    expect(screen.getByAltText("찜하기")).toBeInTheDocument();
  });

  it("isFavorite이 true면 찜하기 취소 아이콘이 렌더링된다.", () => {
    render(<Subscribe {...defaultProps} isFavorite={true} />);
    expect(screen.getByAltText("찜하기 취소")).toBeInTheDocument();
  });

  it("버튼 클릭 시 toggleSubscribe가 호출된다.", () => {
    render(<Subscribe {...defaultProps} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockToggleSubscribe).toHaveBeenCalledWith(defaultProps.storeId, defaultProps.customerId);
  });
});
