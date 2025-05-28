import { apiClient } from "@/apis/client";
import { toSafeResult } from "@/apis/utils/result";
import type { UserInfo } from "@/types/apis/accounts.type";

export const getAuthMe = async () => {
  return await toSafeResult(() => apiClient.get<UserInfo>("accounts/auth/me"));
};
