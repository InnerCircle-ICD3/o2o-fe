import { apiClient } from "@/apis/client";
import { toSafeResult } from "@/apis/utils/result";
import type {
  CreateStoreRequest,
  StoreResponse,
  StoreStatus,
  UpdateStoreRequest,
} from "@/types/store";

export const postStore = async (storeOwnerId: number, data: CreateStoreRequest) => {
  return await toSafeResult(() =>
    apiClient.post<CreateStoreRequest>(`stores?storeOwnerId=${storeOwnerId}`, data),
  );
};

export const getStore = async (storeOwnerId: number) => {
  return await toSafeResult(() =>
    apiClient.get<StoreResponse>(`stores?storeOwnerId=${storeOwnerId}`),
  );
};

export const putStore = async (storeOwnerId: number, storeId: number, data: UpdateStoreRequest) => {
  return await toSafeResult(() =>
    apiClient.put(`stores/${storeId}?storeOwnerId=${storeOwnerId}`, data),
  );
};

export const patchStoreStatus = async (
  storeOwnerId: number,
  storeId: number,
  data: StoreStatus,
) => {
  return await toSafeResult(() =>
    apiClient.patch(`stores/${storeId}/status?storeOwnerId=${storeOwnerId}`, data),
  );
};
