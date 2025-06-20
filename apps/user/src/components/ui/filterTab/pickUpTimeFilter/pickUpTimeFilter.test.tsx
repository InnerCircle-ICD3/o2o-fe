import { useFilterTab } from "@/stores/useFilterTab";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import PickUpTimeFilter from "./index";

vi.mock("@/stores/useFilterTab");

const mockOnSelectedPickupTime = vi.fn();
const mockOnResetPickupTime = vi.fn();

const setup = () => {
  (useFilterTab as unknown as jest.Mock).mockReturnValue({
    onSelectedPickupTime: mockOnSelectedPickupTime,
    onResetPickupTime: mockOnResetPickupTime,
  });
  return render(
    <>
      <div id={"bottom-sheet"} />
      <PickUpTimeFilter isOpen={true} onClose={vi.fn()} />
    </>,
  );
};

describe("PickUpTimeFilter", () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("시간 선택 UI와 버튼이 정상적으로 렌더링된다", () => {
    setup();
    expect(screen.getByText("오전")).toBeInTheDocument();
    expect(screen.getByText("오후")).toBeInTheDocument();
    expect(screen.getByText("시간 적용")).toBeInTheDocument();
    expect(screen.getByText("초기화")).toBeInTheDocument();
  });

  it("시간(오전/시/분) 선택 후 '시간 적용' 클릭 시 onSelectedPickupTime과 onClose가 호출된다", () => {
    const onClose = vi.fn();
    (useFilterTab as unknown as jest.Mock).mockReturnValue({
      onSelectedPickupTime: mockOnSelectedPickupTime,
      onResetPickupTime: mockOnResetPickupTime,
    });
    render(
      <>
        <div id={"bottom-sheet"} />
        <PickUpTimeFilter isOpen={true} onClose={onClose} />
      </>,
    );
    fireEvent.click(screen.getByText("오전"));
    fireEvent.click(screen.getByText("06"));
    fireEvent.click(screen.getByText("15"));
    fireEvent.click(screen.getByText("시간 적용"));
    expect(mockOnSelectedPickupTime).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it("'초기화' 클릭 시 onResetPickupTime과 onClose가 호출된다", () => {
    const onClose = vi.fn();
    (useFilterTab as unknown as jest.Mock).mockReturnValue({
      onSelectedPickupTime: mockOnSelectedPickupTime,
      onResetPickupTime: mockOnResetPickupTime,
    });
    render(
      <>
        <div id={"bottom-sheet"} />
        <PickUpTimeFilter isOpen={true} onClose={onClose} />
      </>,
    );
    fireEvent.click(screen.getByText("초기화"));
    expect(mockOnResetPickupTime).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});

Object.defineProperty(window.HTMLElement.prototype, "scrollTo", {
  value: () => {},
  writable: true,
});
