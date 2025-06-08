import { apiClient } from "@/apis/client";
import { toSafeResult } from "@/apis/utils/result";
import type { UserInfo } from "@/types/apis/accounts.type";

interface CustomerAddress {
  address: {
    roadNameAddress: string;
    lotNumberAddress: string;
    buildingName: string;
    zipCode: string;
    region1DepthName: string;
    region2DepthName: string;
    region3DepthName: string;
    coordinate: {
      first: number;
      second: number;
    };
  };
  customerAddressType: "HOME" | "WORK";
  description: string;
}

export const getCustomerInfo = async ({ customerId }: { customerId: number }) => {
  return await toSafeResult(() => apiClient.get<UserInfo>(`customers/me?customerId=${customerId}`));
};

export const getCustomerAddress = async ({ customerId }: { customerId: number }) => {
  return await toSafeResult(() =>
    apiClient.get<UserInfo>(`customers/address?customerId=${customerId}`),
  );
};

export const postCustomerAddress = async ({
  customerId,
  address,
}: { customerId: number; address: CustomerAddress }) => {
  return await toSafeResult(() =>
    apiClient.post<UserInfo>(`customers/address?customerId=${customerId}`, address),
  );
};
