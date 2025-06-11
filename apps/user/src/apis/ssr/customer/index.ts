import { apiClient } from "@/apis/client";
import { toSafeResult } from "@/apis/utils/result";
import type { UserInfo } from "@/types/apis/accounts.type";

export const getCustomerInfo = async ({ customerId }: { customerId: number }) => {
  return await toSafeResult(() => apiClient.get<UserInfo>(`customers/me?customerId=${customerId}`));
};
