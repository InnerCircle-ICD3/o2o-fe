import { useFilterTab } from "@/stores/useFilterTab";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import PickUpTimeFilter from ".";
import * as styles from "./pickUpTimeFilter.css";

// jsdom 환경에서 scrollTo를 mock 처리
window.HTMLElement.prototype.scrollTo = () => {};

vi.mock("@/stores/useFilterTab", () => ({
  useFilterTab: vi.fn(),
}));

describe("PickUpTimeFilter", () => {
  const onClose = vi.fn();
  const mockOnSelectedPickupTime = vi.fn();
  const mockOnResetPickupTime = vi.fn();

  beforeEach(() => {
    (useFilterTab as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      onSelectedPickupTime: mockOnSelectedPickupTime,
      onResetPickupTime: mockOnResetPickupTime,
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

  it("오전/오후, 시간, 분 리스트가 렌더링된다.", () => {
    render(<PickUpTimeFilter isOpen={true} onClose={onClose} />);
    expect(screen.getByText("오전")).toBeInTheDocument();
    expect(screen.getByText("오후")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("55")).toBeInTheDocument();
  });

  it("오전/오후, 시간, 분 선택 시 UI에 선택 클래스가 적용된다.", () => {
    render(<PickUpTimeFilter isOpen={true} onClose={onClose} />);
    const amBtn = screen.getByRole("button", { name: "오전" });
    fireEvent.click(amBtn);
    expect(amBtn.className).toMatch(styles.timeItemSelected);

    const hourBtn = screen.getByText("03").closest("button") as HTMLButtonElement;
    fireEvent.click(hourBtn);
    expect(hourBtn.className).toMatch(styles.timeItemSelected);

    const minBtn = screen.getByText("15").closest("button") as HTMLButtonElement;
    fireEvent.click(minBtn);
    expect(minBtn.className).toMatch(styles.timeItemSelected);
  });

  it("초기화 버튼 클릭 시 onResetPickupTime이 호출되고 값이 초기화된다.", () => {
    render(<PickUpTimeFilter isOpen={true} onClose={onClose} />);
    const amBtn = screen.getByRole("button", { name: "오전" });
    fireEvent.click(amBtn);
    const resetBtn = screen.getByRole("button", { name: "초기화" });
    fireEvent.click(resetBtn);

    expect(mockOnResetPickupTime).toHaveBeenCalled();
    expect(amBtn.className).toMatch(styles.timeItem);
    expect(amBtn.className).not.toMatch(styles.timeItemSelected);
  });

  it("시간 적용 버튼 클릭 시 onSelectedPickupTime과 onClose가 호출된다.", () => {
    render(<PickUpTimeFilter isOpen={true} onClose={onClose} />);
    const amBtn = screen.getByRole("button", { name: "오전" });
    fireEvent.click(amBtn);

    const hourBtn = screen.getByText("01").closest("button") as HTMLButtonElement;
    fireEvent.click(hourBtn);

    const minBtn = screen.getByText("30").closest("button") as HTMLButtonElement;
    fireEvent.click(minBtn);

    const applyBtn = screen.getByRole("button", { name: "시간 적용" });
    fireEvent.click(applyBtn);

    expect(mockOnSelectedPickupTime).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});
