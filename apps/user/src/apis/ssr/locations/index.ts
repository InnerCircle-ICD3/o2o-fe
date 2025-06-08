import { apiClient } from "@/apis/client";
import type { Result } from "@/apis/types";
import { toSafeResult } from "@/apis/utils/result";
import type { CustomerAddress, StoreResponseData } from "@/types/locations.type";

type ViewPoint = {
  latitude: number;
  longitude: number;
};

export const getStoresByCenter = async (
  center: kakao.maps.LatLng,
): Promise<Result<StoreResponseData>> => {
  const viewPoint: ViewPoint = {
    latitude: Number(center.getLat().toFixed(6)),
    longitude: Number(center.getLng().toFixed(6)),
  };

  return await toSafeResult(() =>
    apiClient.get<StoreResponseData>(
      `search/store/map?latitude=${viewPoint.latitude}&longitude=${viewPoint.longitude}`,
    ),
  );
};

export const postCustomerAddress = async ({
  customerId,
  address,
}: { customerId: number; address: CustomerAddress }) => {
  return await toSafeResult(() =>
    apiClient.post(`customers/address?customerId=${customerId}`, address),
  );
};
