import { act, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { ToastMessage } from ".";

describe("ToastMessage", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it("isVisible이 true일 때 메시지를 렌더링한다.", () => {
    render(<ToastMessage message="테스트 메시지" isVisible={true} onClose={() => {}} />);
    expect(screen.getByText("테스트 메시지")).toBeInTheDocument();
  });

  it("isVisible이 false일 때는 아무것도 렌더링하지 않는다.", () => {
    render(<ToastMessage message="테스트 메시지" isVisible={false} onClose={() => {}} />);
    expect(screen.queryByText("테스트 메시지")).not.toBeInTheDocument();
  });

  it("isError가 true일 때 에러 스타일(빨간 배경) 클래스를 적용한다.", () => {
    render(<ToastMessage message="에러" isVisible={true} onClose={() => {}} isError={true} />);
    const toast = screen.getByText("에러");
    expect(toast.className).toContain("bg-red-900/80");
  });

  it("isError가 false일 때 기본 스타일(검은 배경) 클래스를 적용한다.", () => {
    render(<ToastMessage message="성공" isVisible={true} onClose={() => {}} isError={false} />);
    const toast = screen.getByText("성공");
    expect(toast.className).toContain("bg-black/80");
  });

  it("초기에는 불투명(opacity-100) 상태이고, 2초 후에 투명해지기 시작(opacity-0)한다.", () => {
    render(<ToastMessage message="페이드 테스트" isVisible={true} onClose={() => {}} />);

    let toast = screen.getByText("페이드 테스트");
    expect(toast.className).toContain("opacity-100");

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    toast = screen.getByText("페이드 테스트");
    expect(toast.className).toContain("opacity-0");
  });

  it("총 2.3초 후에 onClose 콜백 함수가 호출된다.", () => {
    const handleClose = vi.fn();
    render(<ToastMessage message="콜백 테스트" isVisible={true} onClose={handleClose} />);

    expect(handleClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(2300);
    });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
