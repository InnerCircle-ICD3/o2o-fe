import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { useToastMessage } from ".";

describe("useToastMessage", () => {
  beforeEach(() => {
    vi.useFakeTimers(); // 가짜 타이머 사용
  });

  afterEach(() => {
    vi.useRealTimers(); // 실제 타이머로 복구
  });

  it("초기 상태는 메시지가 없고, 보이지 않는 상태여야 한다.", () => {
    const { result } = renderHook(() => useToastMessage());

    expect(result.current.toastMessage).toBe("");
    expect(result.current.isToastVisible).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("showToast를 호출하면, 100ms 후에 메시지가 보이는 상태로 변경된다.", () => {
    const { result } = renderHook(() => useToastMessage());

    // showToast 호출
    act(() => {
      result.current.showToast("성공 메시지");
    });

    // 100ms 전에는 상태 변화가 없어야 함
    expect(result.current.isToastVisible).toBe(false);

    // 100ms 타이머 진행
    act(() => {
      vi.advanceTimersByTime(100);
    });

    // 상태가 올바르게 변경되었는지 확인
    expect(result.current.toastMessage).toBe("성공 메시지");
    expect(result.current.isToastVisible).toBe(true);
    expect(result.current.isError).toBe(false);
  });

  it("showToast 호출 후, 총 2100ms가 지나면 메시지가 다시 사라진다.", () => {
    const { result } = renderHook(() => useToastMessage());

    act(() => {
      result.current.showToast("사라질 메시지");
    });

    // 총 2100ms (100ms + 2000ms) 타이머 진행
    act(() => {
      vi.advanceTimersByTime(2100);
    });

    // 메시지가 사라졌는지 확인
    expect(result.current.isToastVisible).toBe(false);
  });

  it("showToast에 isError=true를 전달하면 isError 상태가 true가 된다.", () => {
    const { result } = renderHook(() => useToastMessage());

    act(() => {
      result.current.showToast("에러 메시지", true);
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.isError).toBe(true);
  });

  it("showToast에 전달된 콜백 함수는 2100ms 후에 호출된다.", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useToastMessage());

    act(() => {
      result.current.showToast("콜백 테스트", false, callback);
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(2100);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("handleToastClose를 호출하면 즉시 메시지가 사라진다.", () => {
    const { result } = renderHook(() => useToastMessage());

    // 먼저 토스트를 보이게 함
    act(() => {
      result.current.showToast("성공 메시지");
    });
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current.isToastVisible).toBe(true);

    // handleToastClose 호출
    act(() => {
      result.current.handleToastClose();
    });

    // 즉시 사라졌는지 확인
    expect(result.current.isToastVisible).toBe(false);
  });
});
