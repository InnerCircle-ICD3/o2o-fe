import { act, renderHook } from "@testing-library/react";
import { useBottomSheet } from ".";

describe("useBottomSheet", () => {
  it("초기 상태는 빈 Set이다", () => {
    const { result } = renderHook(() => useBottomSheet());

    expect(result.current.showBottomSheet.size).toBe(0);
  });

  it("handleShowBottomSheet를 호출하면 bottom sheet key가 추가된다", () => {
    const { result } = renderHook(() => useBottomSheet());

    act(() => {
      result.current.handleShowBottomSheet("test-sheet");
    });

    expect(result.current.showBottomSheet.has("test-sheet")).toBe(true);
    expect(result.current.showBottomSheet.size).toBe(1);
  });

  it("handleCloseBottomSheet를 호출하면 bottom sheet key가 제거된다", () => {
    const { result } = renderHook(() => useBottomSheet());

    act(() => {
      result.current.handleShowBottomSheet("test-sheet");
    });

    act(() => {
      result.current.handleCloseBottomSheet("test-sheet");
    });

    expect(result.current.showBottomSheet.has("test-sheet")).toBe(false);
    expect(result.current.showBottomSheet.size).toBe(0);
  });

  it("여러 개의 bottom sheet를 관리할 수 있다", () => {
    const { result } = renderHook(() => useBottomSheet());

    act(() => {
      result.current.handleShowBottomSheet("sheet-1");
    });

    act(() => {
      result.current.handleShowBottomSheet("sheet-2");
    });

    act(() => {
      result.current.handleShowBottomSheet("sheet-3");
    });

    expect(result.current.showBottomSheet.size).toBe(3);

    act(() => {
      result.current.handleCloseBottomSheet("sheet-2");
    });

    expect(result.current.showBottomSheet.size).toBe(2);
    expect(result.current.showBottomSheet.has("sheet-1")).toBe(true);
    expect(result.current.showBottomSheet.has("sheet-2")).toBe(false);
    expect(result.current.showBottomSheet.has("sheet-3")).toBe(true);
  });
});
