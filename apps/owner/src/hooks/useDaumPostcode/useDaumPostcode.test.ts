import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useDaumPostcode } from "./index";

describe("useDaumPostcode()", () => {
  const mockDaumPostcode = {
    open: vi.fn(),
  };

  const mockPostcodeConstructor = vi.fn().mockReturnValue(mockDaumPostcode);

  beforeEach(() => {
    window.daum = {
      Postcode: mockPostcodeConstructor,
    } as Window["daum"];

    vi.clearAllMocks();
  });

  it("주소 검색 창을 열 수 있어야 합니다", () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() => useDaumPostcode(onComplete));

    result.current();

    expect(mockPostcodeConstructor).toHaveBeenCalledWith({
      oncomplete: onComplete,
    });
    expect(mockDaumPostcode.open).toHaveBeenCalled();
  });

  it("검색어와 함께 주소 검색 창을 열 수 있어야 합니다", () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() => useDaumPostcode(onComplete));
    const searchQuery = "강남구";

    result.current(searchQuery);

    expect(mockPostcodeConstructor).toHaveBeenCalledWith({
      oncomplete: onComplete,
      q: searchQuery,
    });
    expect(mockDaumPostcode.open).toHaveBeenCalled();
  });

  it("onComplete 콜백이 올바르게 전달되어야 합니다", () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() => useDaumPostcode(onComplete));

    result.current();

    expect(mockPostcodeConstructor).toHaveBeenCalledWith({
      oncomplete: onComplete,
    });
  });
});
