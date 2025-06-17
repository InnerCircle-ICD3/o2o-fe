import { api } from "@/apis/client";
import { toSafeResult } from "@/apis/utils/result";

export const postLogout = async () => {
  return await toSafeResult(() => api.post("oauth2/logout", {}));
};
