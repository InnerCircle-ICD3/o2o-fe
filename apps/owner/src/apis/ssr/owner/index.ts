import { apiClient } from "@/apis/client";
import { toSafeResult } from "@/apis/utils/result";

export const postLogout = async () => {
  return await toSafeResult(() => apiClient.post("oauth2/logout", {}));
};
