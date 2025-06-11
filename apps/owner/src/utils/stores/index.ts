import { STORE_STATUS_OPTIONS } from "@/constants/store";
import type { StoreResponse, UpdateStoreRequest } from "@/types/store";

export function getDefaultStoreFormValues(storeData: {
  success?: boolean;
  data?: StoreResponse;
}): UpdateStoreRequest {
  if (!storeData?.success || !storeData.data) return { storeCategory: [], foodCategory: [] };
  const store = storeData.data;
  const { roadNameAddress, lotNumberAddress, zipCode, buildingName } = store.address;
  const { latitude, longitude } = store.address.coordinate;
  return {
    ...store,
    businessNumber: store.businessNumber ?? "",
    storeCategory: store.storeCategory ?? [],
    foodCategory: store.foodCategory ?? [],
    latitude: latitude ? Number(latitude) : undefined,
    longitude: longitude ? Number(longitude) : undefined,
    pickupDay: store.pickupDay as "TODAY" | "TOMORROW",
    roadNameAddress: roadNameAddress ?? "",
    lotNumberAddress: lotNumberAddress ?? "",
    zipCode: zipCode ?? "",
    buildingName: buildingName ?? "",
  };
}

export function getStoreStatusLabel(status: "OPEN" | "CLOSED") {
  return (
    STORE_STATUS_OPTIONS.find((opt) => opt.value === status)?.label ??
    (status === "OPEN" ? "영업중" : "영업종료")
  );
}
