import type { CustomerAddressRequest } from "@/types/locations.type";
import { act } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useSelectedAddressStore } from ".";

const mockTypeA = "HOME";
const mockTypeB = "WORK";
const addressA = { address: "서울시 강남구", detail: "101호" } as unknown as CustomerAddressRequest;
const addressB = { address: "서울시 서초구", detail: "202호" } as unknown as CustomerAddressRequest;

describe("useSelectedAddressStore", () => {
  beforeEach(() => {
    act(() => {
      useSelectedAddressStore.getState().clearSelectedAddress(mockTypeA);
      useSelectedAddressStore.getState().clearSelectedAddress(mockTypeB);
    });
  });

  it("setSelectedAddress로 주소를 타입별로 저장할 수 있다", () => {
    act(() => {
      useSelectedAddressStore.getState().setSelectedAddress(addressA, mockTypeA);
    });
    expect(useSelectedAddressStore.getState().selectedAddress[mockTypeA]).toEqual(addressA);
  });

  it("같은 타입에 setSelectedAddress를 여러 번 호출하면 마지막 값으로 덮어쓴다", () => {
    act(() => {
      useSelectedAddressStore.getState().setSelectedAddress(addressA, mockTypeA);
      useSelectedAddressStore.getState().setSelectedAddress(addressB, mockTypeA);
    });
    expect(useSelectedAddressStore.getState().selectedAddress[mockTypeA]).toEqual(addressB);
  });

  it("여러 타입의 주소를 각각 저장할 수 있다", () => {
    act(() => {
      useSelectedAddressStore.getState().setSelectedAddress(addressA, mockTypeA);
      useSelectedAddressStore.getState().setSelectedAddress(addressB, mockTypeB);
    });
    expect(useSelectedAddressStore.getState().selectedAddress[mockTypeA]).toEqual(addressA);
    expect(useSelectedAddressStore.getState().selectedAddress[mockTypeB]).toEqual(addressB);
  });

  it("clearSelectedAddress로 타입별 주소를 삭제할 수 있다", () => {
    act(() => {
      useSelectedAddressStore.getState().setSelectedAddress(addressA, mockTypeA);
      useSelectedAddressStore.getState().clearSelectedAddress(mockTypeA);
    });
    expect(useSelectedAddressStore.getState().selectedAddress[mockTypeA]).toBeUndefined();
  });
});
