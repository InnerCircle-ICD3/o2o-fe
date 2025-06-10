import { apiClient } from "@/apis/client";
import { toSafeResult } from "@/apis/utils/result";
import type { CreateStoreRequest, StoreResponse, UpdateStoreRequest } from "@/types/store";

export const postStore = async (storeOwnerId: string, data: CreateStoreRequest) => {
  return await toSafeResult(() =>
    apiClient.post<CreateStoreRequest>(`stores?storeOwnerId=${storeOwnerId}`, data),
  );
};

export const getStore = async (storeOwnerId: string) => {
  return await toSafeResult(() =>
    apiClient.get<StoreResponse>(`stores?storeOwnerId=${storeOwnerId}`),
  );
};

export const putStore = async (storeOwnerId: string, data: UpdateStoreRequest) => {
  return await toSafeResult(() =>
    apiClient.put(`stores?storeOwnerId=${storeOwnerId}`, data),
  );
};