import { searchAddress } from "@/utils/locations";
import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { useKakaoAddressSearch } from ".";

// ⛳️ mock API
vi.mock("@/utils/locations", () => ({
  searchAddress: vi.fn(),
}));

describe("useKakaoAddressSearch", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("query가 없으면 searchAddress를 호출하지 않는다", () => {
    renderHook(() => useKakaoAddressSearch(""));

    expect(searchAddress).not.toHaveBeenCalled();
  });

  it("query가 주어지면 300ms 후 searchAddress가 호출된다", async () => {
    (searchAddress as ReturnType<typeof vi.fn>).mockResolvedValue([{ address: "서울 강남구" }]);

    const { result } = renderHook(() => useKakaoAddressSearch("서울"));

    // 300ms 경과
    await act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(searchAddress).toHaveBeenCalledWith("서울");
    expect(result.current).toEqual(["서울 강남구"]);
  });
});
