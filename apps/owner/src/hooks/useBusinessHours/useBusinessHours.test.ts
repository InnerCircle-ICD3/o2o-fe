import type { StoreFormData } from "@/types/store";
import { act, renderHook } from "@testing-library/react";
import type { UseFormReturn } from "use-form-light";
import { vi } from "vitest";
import { WEEKDAYS, useBusinessHours } from "./index";

describe("useBusinessHours()", () => {
  const mockForm = {
    setValue: vi.fn(),
    watch: vi.fn(),
    errors: {},
    validate: vi.fn(),
    handleSubmit: vi.fn(),
    register: vi.fn(),
  } as unknown as UseFormReturn<StoreFormData>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("초기 상태에서 선택된 요일이 없어야 합니다", () => {
    (mockForm.watch as ReturnType<typeof vi.fn>).mockReturnValue([]);
    const { result } = renderHook(() => useBusinessHours(mockForm));
    expect(result.current.selectedDays).toEqual([]);
  });

  it("요일을 토글할 수 있어야 합니다", () => {
    const mockWatch = vi.fn();
    mockForm.watch = mockWatch;

    mockWatch.mockReturnValue([]);
    const { result } = renderHook(() => useBusinessHours(mockForm));

    act(() => {
      result.current.toggleDay("월");
    });

    expect(mockForm.setValue).toHaveBeenCalledWith("businessHours", [
      { dayOfWeek: "월", openTime: "", closeTime: "" },
    ]);
  });

  it("영업시간을 변경할 수 있어야 합니다", () => {
    (mockForm.watch as ReturnType<typeof vi.fn>).mockReturnValue([
      { dayOfWeek: "월", openTime: "", closeTime: "" },
    ]);
    const { result } = renderHook(() => useBusinessHours(mockForm));

    act(() => {
      result.current.handleBusinessHoursChange("월", "openTime", "09:00");
    });

    expect(mockForm.setValue).toHaveBeenCalledWith("businessHours", [
      { dayOfWeek: "월", openTime: "09:00:00", closeTime: "" },
    ]);
  });

  it("모든 요일에 동일한 영업시간을 적용할 수 있어야 합니다", () => {
    (mockForm.watch as ReturnType<typeof vi.fn>).mockReturnValue([]);
    const { result } = renderHook(() => useBusinessHours(mockForm));

    act(() => {
      result.current.applyToAllDays("09:00", "18:00");
    });

    const expectedBusinessHours = WEEKDAYS.map((day) => ({
      dayOfWeek: day,
      openTime: "09:00:00",
      closeTime: "18:00:00",
    }));

    expect(mockForm.setValue).toHaveBeenCalledWith("businessHours", expectedBusinessHours);
  });

  it("5자리 시간 형식이 자동으로 8자리로 변환되어야 합니다", () => {
    (mockForm.watch as ReturnType<typeof vi.fn>).mockReturnValue([]);
    const { result } = renderHook(() => useBusinessHours(mockForm));

    act(() => {
      result.current.handleBusinessHoursChange("월", "openTime", "09:00");
    });

    expect(mockForm.setValue).toHaveBeenCalledWith("businessHours", [
      { dayOfWeek: "월", openTime: "09:00:00", closeTime: "" },
    ]);
  });
});
