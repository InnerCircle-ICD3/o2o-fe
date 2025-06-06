import { apiClient } from "@/apis/client";
import { toSafeResult } from "@/apis/utils/result";

interface Customer {
  nickname: string;
}

export const getCustomer = async (customerId: number, nickname: string) => {
  return await toSafeResult(() =>
    apiClient.patch<Customer>(`customers/${customerId}`, { nickname }),
  );
};
