import { act } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useSearchHistoryStore } from ".";

// localStorage mock (any 없이 타입 명시)
const localStorageMock: Storage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  key: vi.fn(),
  length: 0,
};
global.localStorage = localStorageMock;

describe("useSearchHistoryStore", () => {
  beforeEach(() => {
    useSearchHistoryStore.getState().clearSearchHistory();
    (localStorage.getItem as ReturnType<typeof vi.fn>).mockClear();
    (localStorage.setItem as ReturnType<typeof vi.fn>).mockClear();
  });

  it("검색어를 추가하면 searchHistory에 반영된다", () => {
    act(() => {
      useSearchHistoryStore.getState().addSearchHistory("apple");
    });
    expect(useSearchHistoryStore.getState().searchHistory).toEqual(["apple"]);
  });

  it("중복된 검색어는 맨 앞으로 이동하고 중복 저장되지 않는다", () => {
    act(() => {
      useSearchHistoryStore.getState().addSearchHistory("apple");
      useSearchHistoryStore.getState().addSearchHistory("banana");
      useSearchHistoryStore.getState().addSearchHistory("apple");
    });
    expect(useSearchHistoryStore.getState().searchHistory).toEqual(["apple", "banana"]);
  });

  it("검색어는 최대 10개까지만 저장된다", () => {
    act(() => {
      for (let i = 0; i < 12; i++) {
        useSearchHistoryStore.getState().addSearchHistory(`item${i}`);
      }
    });
    expect(useSearchHistoryStore.getState().searchHistory.length).toBe(10);
    expect(useSearchHistoryStore.getState().searchHistory[0]).toBe("item11");
    expect(useSearchHistoryStore.getState().searchHistory[9]).toBe("item2");
  });

  it("검색어를 삭제하면 searchHistory에서 제거된다", () => {
    act(() => {
      useSearchHistoryStore.getState().addSearchHistory("apple");
      useSearchHistoryStore.getState().addSearchHistory("banana");
      useSearchHistoryStore.getState().removeSearchHistory("apple");
    });
    expect(useSearchHistoryStore.getState().searchHistory).toEqual(["banana"]);
  });

  it("전체 삭제 시 searchHistory가 빈 배열이 된다", () => {
    act(() => {
      useSearchHistoryStore.getState().addSearchHistory("apple");
      useSearchHistoryStore.getState().addSearchHistory("banana");
      useSearchHistoryStore.getState().clearSearchHistory();
    });
    expect(useSearchHistoryStore.getState().searchHistory).toEqual([]);
  });
});
