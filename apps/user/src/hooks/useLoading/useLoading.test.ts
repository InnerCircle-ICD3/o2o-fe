import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";
import useLoading from ".";

describe("useLoading", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("isLoading이 true일 때 항상 true를 반환한다.", () => {
    const { result } = renderHook(() => useLoading(true));
    expect(result.current).toBe(true);
  });

  it("isLoading이 false로 변경되면 500ms 후에 false를 반환한다.", () => {
    const { result, rerender } = renderHook(({ isLoading }) => useLoading(isLoading), {
      initialProps: { isLoading: true },
    });
    expect(result.current).toBe(true);
    rerender({ isLoading: false });

    act(() => {
      vi.advanceTimersByTime(499);
    });
    expect(result.current).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe(false);
  });

  it("isLoading이 다시 true로 바뀌면 즉시 true로 리셋이 된다.", () => {
    const { result, rerender } = renderHook(({ isLoading }) => useLoading(isLoading), {
      initialProps: { isLoading: true },
    });
    expect(result.current).toBe(true);
    rerender({ isLoading: false });
    act(() => {
      vi.advanceTimersByTime(250);
    });
    rerender({ isLoading: true });
    expect(result.current).toBe(true);
  });
});
