import { beforeEach, describe, expect, it, vi } from "vitest";
import { useToastStore } from ".";

describe("useToastStore", () => {
  beforeEach(() => {
    useToastStore.setState({
      message: "",
      isVisible: false,
      isError: false,
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("showToast를 호출하면 메시지와 상태가 설정된다", () => {
    useToastStore.getState().showToast("테스트 메시지");

    const state = useToastStore.getState();
    expect(state.message).toBe("테스트 메시지");
    expect(state.isVisible).toBe(true);
    expect(state.isError).toBe(false);
  });

  it("showToast를 isError=true로 호출하면 에러 상태로 설정된다", () => {
    useToastStore.getState().showToast("에러 메시지", true);

    const state = useToastStore.getState();
    expect(state.message).toBe("에러 메시지");
    expect(state.isVisible).toBe(true);
    expect(state.isError).toBe(true);
  });

  it("showToast 호출 후 2초 뒤에 isVisible이 false로 변경된다", () => {
    useToastStore.getState().showToast("타이머 메시지");

    expect(useToastStore.getState().isVisible).toBe(true);

    vi.advanceTimersByTime(2000);

    expect(useToastStore.getState().isVisible).toBe(false);
  });

  it("hideToast를 호출하면 isVisible이 false가 된다", () => {
    useToastStore.setState({ isVisible: true });
    useToastStore.getState().hideToast();

    expect(useToastStore.getState().isVisible).toBe(false);
  });
});
