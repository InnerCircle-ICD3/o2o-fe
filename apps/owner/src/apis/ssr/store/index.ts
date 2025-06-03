import { apiClient } from "@/apis/client";
import { toSafeResult } from "@/apis/utils/result";
import type { StoreFormData } from "@/types/store";

export const postStore = async (storeOwnerId: number, data: StoreFormData) => {
  return await toSafeResult(() =>
    apiClient.post<StoreFormData>(`/stores?storeOwnerId=${storeOwnerId}`, data),
  );
};
