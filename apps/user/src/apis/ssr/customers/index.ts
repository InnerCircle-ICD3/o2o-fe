import { apiClient } from "@/apis/client";
import { toSafeResult } from "@/apis/utils/result";
import type { Customer } from "@/types/apis/accounts.type";

export const patchCustomer = async (customerId: number, nickname: string) => {
  return await toSafeResult(() =>
    apiClient.patch(`customers/modify?customerId=${customerId}`, { nickname }),
  );
};

export const getCustomer = async () => {
  return await toSafeResult(() => apiClient.get<Customer>("customers/me"));
};

export const deleteCustomer = async () => {
  return await toSafeResult(() => apiClient.delete("customers/sign-out"));
};
