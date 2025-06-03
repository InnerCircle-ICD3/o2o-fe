import { apiClient } from "@/apis/client";
import { toSafeResult } from "@/apis/utils/result";
import type { StoreFormData } from "@/types/store";

export const postStore = async (storeOwnerId: number, data: StoreFormData) => {
  const params = new URLSearchParams({ storeOwnerId: storeOwnerId.toString() });
  return await toSafeResult(() =>
    apiClient.post<StoreFormData>(`/stores?${params.toString()}`, data),
  );
};
