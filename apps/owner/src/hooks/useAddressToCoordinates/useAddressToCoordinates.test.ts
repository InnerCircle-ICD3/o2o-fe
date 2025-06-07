import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAddressToCoordinates } from "./index";

global.fetch = vi.fn();

describe("useAddressToCoordinates()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("주소를 좌표로 변환할 수 있어야 합니다", async () => {
    const mockResponse = {
      documents: [
        {
          x: "127.123456",
          y: "37.123456",
        },
      ],
    };

    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as Response);

    const onSuccess = vi.fn();
    renderHook(() => useAddressToCoordinates({ address: "서울시 강남구", onSuccess }));

    await vi.waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith({
        latitude: "37.123456",
        longitude: "127.123456",
      });
    });
  });

  it("API 호출이 실패하면 에러를 처리해야 합니다", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error("API Error"));

    const onSuccess = vi.fn();
    renderHook(() => useAddressToCoordinates({ address: "서울시 강남구", onSuccess }));

    // 비동기 작업이 완료될 때까지 대기
    await vi.waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith("주소 변환 중 오류 발생:", expect.any(Error));
    });

    consoleSpy.mockRestore();
  });
});
