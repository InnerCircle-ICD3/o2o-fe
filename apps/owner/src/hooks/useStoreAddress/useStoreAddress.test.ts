import type { CreateStoreRequest } from "@/types/store";
import { renderHook } from "@testing-library/react";
import type { UseFormReturn } from "use-form-light";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAddressToCoordinates } from "../useAddressToCoordinates";
import type { DaumPostcodeData } from "../useDaumPostcode";
import { useDaumPostcode } from "../useDaumPostcode";
import { useStoreAddress } from "./index";

vi.mock("../useAddressToCoordinates", () => ({
  useAddressToCoordinates: vi.fn(),
}));

vi.mock("../useDaumPostcode", () => ({
  useDaumPostcode: vi.fn(),
}));

describe("useStoreAddress()", () => {
  const mockSetValue = vi.fn();
  const mockWatch = vi.fn();
  const mockForm: UseFormReturn<CreateStoreRequest> = {
    setValue: mockSetValue,
    watch: mockWatch,
  } as unknown as UseFormReturn<CreateStoreRequest>;

  const mockOpenPostcode = vi.fn();
  const mockDaumPostcodeCallback = vi.fn();
  let onSuccessCallback: (data: { latitude: string; longitude: string }) => void;

  beforeEach(() => {
    vi.clearAllMocks();
    mockWatch.mockReturnValue("");
    vi.mocked(useDaumPostcode).mockImplementation((callback: (data: DaumPostcodeData) => void) => {
      mockDaumPostcodeCallback.mockImplementation(callback);
      return mockOpenPostcode;
    });
  });

  it("useAddressToCoordinates가 올바른 파라미터로 호출되어야 합니다", () => {
    renderHook(() => useStoreAddress(mockForm));

    expect(useAddressToCoordinates).toHaveBeenCalledWith({
      address: "",
      onSuccess: expect.any(Function),
    });
  });

  it("주소가 변경되면 위도/경도가 자동으로 업데이트되어야 합니다", () => {
    vi.mocked(useAddressToCoordinates).mockImplementation(
      ({ onSuccess }: { onSuccess: (data: { latitude: string; longitude: string }) => void }) => {
        onSuccessCallback = onSuccess;
      },
    );

    renderHook(() => useStoreAddress(mockForm));

    onSuccessCallback({ latitude: "37.123456", longitude: "127.123456" });

    expect(mockSetValue).toHaveBeenCalledWith("latitude", "37.123456");
    expect(mockSetValue).toHaveBeenCalledWith("longitude", "127.123456");
  });

  it("다음 주소 API 콜백이 올바르게 동작해야 합니다", () => {
    renderHook(() => useStoreAddress(mockForm));

    const mockAddressData = {
      roadAddress: "서울시 강남구 테헤란로 123",
      jibunAddress: "서울시 강남구 역삼동 123",
      zonecode: "12345",
      sido: "서울시",
      sigungu: "강남구",
      bname: "역삼동",
      userSelectedType: "R" as const,
    };

    mockDaumPostcodeCallback(mockAddressData);

    expect(mockSetValue).toHaveBeenCalledWith("roadNameAddress", mockAddressData.roadAddress);
    expect(mockSetValue).toHaveBeenCalledWith("lotNumberAddress", mockAddressData.jibunAddress);
    expect(mockSetValue).toHaveBeenCalledWith("zipCode", mockAddressData.zonecode);
    expect(mockSetValue).toHaveBeenCalledWith("region1DepthName", mockAddressData.sido);
    expect(mockSetValue).toHaveBeenCalledWith("region2DepthName", mockAddressData.sigungu);
    expect(mockSetValue).toHaveBeenCalledWith("region3DepthName", mockAddressData.bname);
  });

  it("openPostcode 함수가 반환되어야 합니다", () => {
    const { result } = renderHook(() => useStoreAddress(mockForm));

    expect(result.current.openPostcode).toBe(mockOpenPostcode);
  });
});
