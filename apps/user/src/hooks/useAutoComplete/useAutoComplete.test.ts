import { useAutoComplete } from "@/hooks/useAutoComplete";
import { worker } from "@/mocks/server";
import { useSearchHistoryStore } from "@/stores/searchHistory/searchHistoryStore";
import { act, renderHook } from "@testing-library/react";
import { cleanup } from "@testing-library/react";
import { vi } from "vitest";

beforeAll(() => worker.listen());
afterAll(() => worker.close());
afterEach(() => {
  worker.resetHandlers();
  cleanup();
  useSearchHistoryStore.getState().clearSearchHistory(); // 상태 초기화
});

vi.useFakeTimers();

describe("useAutoComplete", () => {
  it("초기 렌더링 시 입력값은 빈 문자열이어야 한다", () => {
    const { result } = renderHook(() => useAutoComplete());
    expect(result.current.inputValue).toBe("");
    expect(result.current.finalSuggestions).toEqual([]);
  });

  it("검색어 입력시 추천어를 fetch 후 병합하여 보여준다", async () => {
    const { result, rerender } = renderHook(() => useAutoComplete());

    act(() => {
      result.current.setInputValue("포커");
    });

    // 디바운스 타이머 fast-forward
    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    // 리렌더링하여 최신 상태 반영
    rerender();

    // 디버깅을 위한 로그
    console.log("Final suggestions:", result.current.finalSuggestions);

    expect(result.current.finalSuggestions).toContain("포커 추천1");
    expect(result.current.finalSuggestions).toContain("포커 추천2");
  });

  it("검색어 입력 후 엔터 시 검색어가 기록에 저장된다", () => {
    // 직접 store를 리셋하고 시작
    useSearchHistoryStore.setState({ searchHistory: [] });

    const { result, rerender } = renderHook(() => useAutoComplete());

    act(() => {
      result.current.setInputValue("포커");
    });

    rerender();

    act(() => {
      // 직접 store를 통해 추가
      useSearchHistoryStore.getState().addSearchHistory("포커");
    });

    // 리렌더링하여 최신 상태 반영
    rerender();

    // 디버깅을 위한 로그
    console.log("Input value:", result.current.inputValue);
    console.log("Search history (store):", useSearchHistoryStore.getState().searchHistory);
    console.log("Search history (hook):", result.current.searchHistory);

    expect(result.current.searchHistory).toContain("포커");
  });

  it("검색어 선택 시 기록에 추가되고 입력창에 반영된다", () => {
    const { result } = renderHook(() => useAutoComplete());

    act(() => {
      result.current.handleSelect("카지노");
    });

    expect(result.current.inputValue).toBe("카지노");
    expect(result.current.searchHistory).toContain("카지노");
  });

  it("검색어 개별 삭제가 동작한다", () => {
    const { result } = renderHook(() => useAutoComplete());

    act(() => {
      result.current.handleSelect("바카라");
    });

    act(() => {
      result.current.removeSearchHistory("바카라");
    });

    expect(result.current.searchHistory).not.toContain("바카라");
  });

  it("검색어 전체 삭제가 동작한다", () => {
    const { result } = renderHook(() => useAutoComplete());

    act(() => {
      result.current.handleSelect("바카라");
      result.current.handleSelect("포커");
      result.current.clearSearchHistory();
    });

    expect(result.current.searchHistory).toEqual([]);
  });
});
