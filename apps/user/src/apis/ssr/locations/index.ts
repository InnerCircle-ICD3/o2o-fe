import { apiClient } from "@/apis/client";
import type { Result } from "@/apis/types";
import { toSafeResult } from "@/apis/utils/result";
import type { StoreResponseData } from "@/types/searchMap.type";

type ViewPoint = {
  latitude: number;
  longitude: number;
};

export interface CustomerAddress {
  address: {
    roadNameAddress: string;
    lotNumberAddress: string;
    buildingName: string;
    zipCode: string;
    region1DepthName: string;
    region2DepthName: string;
    region3DepthName: string;
    coordinate: {
      latitude: number;
      longitude: number;
    };
  };
  customerAddressType: string;
  description: string;
}

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

export const postCustomerAddress = async (customerId: string, body: CustomerAddress) => {
  return await toSafeResult(() =>
    apiClient.post(`customers/address?customerId=${customerId}`, body),
  );
};
