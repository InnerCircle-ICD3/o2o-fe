import { apiClient } from "@/apis/client";
import type { Result } from "@/apis/types";
import { toSafeResult } from "@/apis/utils/result";
import type {
  CustomerAddressRequest,
  CustomerAddressResponse,
  StoreResponseData,
} from "@/types/locations.type";

type ViewPoint = {
  latitude: number;
  longitude: number;
};

export interface CustomerAddress {
  id: number;
  region3DepthName: string;
  latitude: number;
  longitude: number;
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

export const getStoresByCenterRefresh = async (
  center: kakao.maps.LatLng,
): Promise<Result<StoreResponseData>> => {
  const viewPoint: ViewPoint = {
    latitude: Number(center.getLat().toFixed(6)),
    longitude: Number(center.getLng().toFixed(6)),
  };

  return await toSafeResult(() =>
    apiClient.get<StoreResponseData>(
      `search/store/map/refresh?latitude=${viewPoint.latitude}&longitude=${viewPoint.longitude}`,
    ),
  );
};

export const postCustomerAddress = async ({
  customerId,
  address,
}: { customerId: number; address: CustomerAddressRequest }) => {
  return await toSafeResult(() =>
    apiClient.post(`customers/address?customerId=${customerId}`, address),
  );
};

export const getCustomerAddress = async ({ customerId }: { customerId: number }) => {
  return await toSafeResult(() =>
    apiClient.get<CustomerAddressResponse[]>(`customers/address?customerId=${customerId}`),
  );
};

export const deleteCustomerAddress = async ({
  customerId,
  addressId,
}: { customerId: number; addressId: number }) => {
  return await toSafeResult(() =>
    apiClient.delete(`customers/address/${addressId}?customerId=${customerId}`),
  );
};
