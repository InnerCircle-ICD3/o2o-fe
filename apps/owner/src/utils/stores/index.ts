import { STORE_STATUS_OPTIONS, initialStoreData } from "@/constants/store";
import type { StoreResponse } from "@/types/store";

export function getDefaultStoreFormValues(storeData?: StoreResponse) {
  if (!storeData) return initialStoreData;

  const address = storeData?.address ?? {};
  const coordinate = address.coordinate ?? {};

  return {
    name: storeData?.name ?? "",
    businessNumber: storeData?.businessNumber ?? "",
    roadNameAddress: address.roadNameAddress ?? "",
    lotNumberAddress: address.lotNumberAddress ?? "",
    buildingName: address.buildingName ?? "",
    zipCode: address.zipCode ?? "",
    region1DepthName: address.region1DepthName ?? "",
    region2DepthName: address.region2DepthName ?? "",
    region3DepthName: address.region3DepthName ?? "",
    latitude: coordinate.latitude ?? "",
    longitude: coordinate.longitude ?? "",
    businessHours: storeData?.businessHours ?? [],
    pickupDay: storeData?.pickupDay ?? "TODAY",
    contact: storeData?.contact ?? "",
    description: storeData.description ?? "",
    mainImageUrl: storeData.mainImageUrl ?? "",
    storeCategory: storeData.storeCategory ?? [],
    foodCategory: storeData.foodCategory ?? [],
    status: storeData.status ?? "OPEN",
  };
}

export function getStoreStatusLabel(status: "OPEN" | "CLOSED") {
  return (
    STORE_STATUS_OPTIONS.find((opt) => opt.value === status)?.label ??
    (status === "OPEN" ? "영업중" : "영업종료")
  );
}

export const formatContactNumber = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  const len = numbers.length;

  if (len === 11) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
  }

  if (len === 10) {
    if (numbers.startsWith("02")) {
      return `${numbers.slice(0, 2)}-${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    }
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
  }

  if (len === 9) {
    if (numbers.startsWith("02")) {
      return `${numbers.slice(0, 2)}-${numbers.slice(2, 5)}-${numbers.slice(5)}`;
    }
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`;
  }

  if (len === 8) {
    return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
  }

  if (len <= 7) {
    if (len <= 3) return numbers;
    return `${numbers.slice(0, len - 4)}-${numbers.slice(len - 4)}`;
  }

  // 12자리 이상이면 잘라
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
};
