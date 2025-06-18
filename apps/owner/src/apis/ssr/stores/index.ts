import { api } from "@/apis/client";
import { toSafeResult } from "@/apis/utils/result";
import type {
  CreateStoreRequest,
  StoreResponse,
  StoreStatus,
  UpdateStoreRequest,
} from "@/types/store";

export const postStore = async (data: CreateStoreRequest) => {
  return await toSafeResult(() => api.post<CreateStoreRequest>("stores", data));
};

export const getStore = async () => {
  return await toSafeResult(() => api.get<StoreResponse[]>("stores"));
};

export const putStore = async (storeId: number, data: UpdateStoreRequest) => {
  return await toSafeResult(() => api.put(`stores/${storeId}`, data));
};

export const patchStoreStatus = async (storeId: number, data: StoreStatus) => {
  return await toSafeResult(() => api.patch(`stores/${storeId}/status`, data));
};

export const deleteStore = async (storeId: number) => {
  return await toSafeResult(() => api.delete(`stores/${storeId}`));
};
