import { STORE_STATUS_OPTIONS } from "@/constants/store";
import type { StoreResponse } from "@/types/store";

export function getDefaultStoreFormValues(storeData: StoreResponse) {
  if (!storeData) return { storeCategory: [], foodCategory: [] };

  const { address } = storeData;

  return {
    name: storeData.name,
    businessNumber: storeData.businessNumber,
    roadNameAddress: address.roadNameAddress,
    lotNumberAddress: address.lotNumberAddress,
    buildingName: address.buildingName,
    zipCode: address.zipCode,
    region1DepthName: address.region1DepthName,
    region2DepthName: address.region2DepthName,
    region3DepthName: address.region3DepthName,
    latitude: address.coordinate.latitude,
    longitude: address.coordinate.longitude,
    businessHours: storeData.businessHours,
    pickupDay: storeData.pickupDay,
    contact: storeData.contact,
    description: storeData.description,
    mainImageUrl: storeData.mainImageUrl,
    storeCategory: storeData.storeCategory,
    foodCategory: storeData.foodCategory,
  };
}

export function getStoreStatusLabel(status: "OPEN" | "CLOSED") {
  return (
    STORE_STATUS_OPTIONS.find((opt) => opt.value === status)?.label ??
    (status === "OPEN" ? "영업중" : "영업종료")
  );
}
