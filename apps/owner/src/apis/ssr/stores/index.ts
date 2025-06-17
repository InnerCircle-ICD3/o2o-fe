import { api } from "@/apis/client";
import { toSafeResult } from "@/apis/utils/result";
import type {
  CreateStoreRequest,
  StoreResponse,
  StoreStatus,
  UpdateStoreRequest,
} from "@/types/store";

export const postStore = async (storeOwnerId: number, data: CreateStoreRequest) => {
  return await toSafeResult(() =>
    api.post<CreateStoreRequest>("stores", data, {
      searchParams: { storeOwnerId },
    }),
  );
};

export const getStore = async () => {
  return await toSafeResult(() => api.get<StoreResponse[]>("stores"));
};

export const putStore = async (storeOwnerId: number, storeId: number, data: UpdateStoreRequest) => {
  return await toSafeResult(() =>
    api.put(`stores/${storeId}`, data, {
      searchParams: { storeOwnerId },
    }),
  );
};

export const patchStoreStatus = async (
  storeOwnerId: number,
  storeId: number,
  data: StoreStatus,
) => {
  return await toSafeResult(() =>
    api.patch(`stores/${storeId}/status`, data, {
      searchParams: { storeOwnerId },
    }),
  );
};

export const deleteStore = async (storeId: number) => {
  return await toSafeResult(() =>
    api.delete(`stores/${storeId}`),
  );
};

