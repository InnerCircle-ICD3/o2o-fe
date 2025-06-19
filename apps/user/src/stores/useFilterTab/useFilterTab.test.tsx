import type { FoodType, PickupTime } from "@/components/ui/filterTab/type";
import { act } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useFilterTab } from ".";

describe("useFilterTab", () => {
  beforeEach(() => {
    act(() => {
      useFilterTab.getState().onResetFoodType();
      useFilterTab.getState().onResetPickupTime();
      useFilterTab.getState().onResetLocation();
      useFilterTab.getState().onSearchChange("");
      if (useFilterTab.getState().reservable) useFilterTab.getState().onToggleReservable();
    });
  });

  it("음식 타입을 선택/초기화할 수 있다", () => {
    act(() => {
      useFilterTab.getState().onSelectedFoodType("한식" as FoodType);
    });
    expect(useFilterTab.getState().selectedFoodType).toBe("한식");
    act(() => {
      useFilterTab.getState().onResetFoodType();
    });
    expect(useFilterTab.getState().selectedFoodType).toBeUndefined();
  });

  it("픽업 시간을 선택/초기화할 수 있다", () => {
    const pickup = { day: "오전", hour: 10, minute: 30 } as unknown as PickupTime;
    act(() => {
      useFilterTab.getState().onSelectedPickupTime(pickup);
    });
    expect(useFilterTab.getState().selectedPickupTime).toEqual(pickup);
    act(() => {
      useFilterTab.getState().onResetPickupTime();
    });
    expect(useFilterTab.getState().selectedPickupTime).toBeUndefined();
  });

  it("예약가능 여부를 토글할 수 있다", () => {
    expect(useFilterTab.getState().reservable).toBe(false);
    act(() => {
      useFilterTab.getState().onToggleReservable();
    });
    expect(useFilterTab.getState().reservable).toBe(true);
    act(() => {
      useFilterTab.getState().onToggleReservable();
    });
    expect(useFilterTab.getState().reservable).toBe(false);
  });

  it("위치를 변경/초기화할 수 있다", () => {
    act(() => {
      useFilterTab.getState().onLocationChange("서울시 강남구");
    });
    expect(useFilterTab.getState().location).toBe("서울시 강남구");
    act(() => {
      useFilterTab.getState().onResetLocation();
    });
    expect(useFilterTab.getState().location).toBeUndefined();
  });

  it("검색어를 변경할 수 있다", () => {
    act(() => {
      useFilterTab.getState().onSearchChange("치킨");
    });
    expect(useFilterTab.getState().search).toBe("치킨");
  });

  describe("getPickupTimeString", () => {
    it("선택된 픽업 시간이 없으면 빈 문자열을 반환한다", () => {
      expect(useFilterTab.getState().getPickupTimeString()).toBe("");
    });
    it("오전 10:05 → 10:05 반환", () => {
      act(() => {
        useFilterTab
          .getState()
          .onSelectedPickupTime({ day: "오전", hour: 10, minute: 5 } as unknown as PickupTime);
      });
      expect(useFilterTab.getState().getPickupTimeString()).toBe("10:05");
    });
    it("오후 3:30 → 15:30 반환", () => {
      act(() => {
        useFilterTab
          .getState()
          .onSelectedPickupTime({ day: "오후", hour: 3, minute: 30 } as unknown as PickupTime);
      });
      expect(useFilterTab.getState().getPickupTimeString()).toBe("15:30");
    });
    it("오전 12:15 → 00:15 반환", () => {
      act(() => {
        useFilterTab
          .getState()
          .onSelectedPickupTime({ day: "오전", hour: 12, minute: 15 } as unknown as PickupTime);
      });
      expect(useFilterTab.getState().getPickupTimeString()).toBe("00:15");
    });
    it("오후 12:45 → 12:45 반환", () => {
      act(() => {
        useFilterTab
          .getState()
          .onSelectedPickupTime({ day: "오후", hour: 12, minute: 45 } as unknown as PickupTime);
      });
      expect(useFilterTab.getState().getPickupTimeString()).toBe("12:45");
    });
  });
});
