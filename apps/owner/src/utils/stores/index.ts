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
