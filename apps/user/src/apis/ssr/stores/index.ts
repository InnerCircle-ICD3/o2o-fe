import { apiClient } from "@/apis/client";
import { ownerApiClient } from "@/apis/ownerClient";
import { toSafeResult } from "@/apis/utils/result";
import type { Product, StoreListResponse, StoresDetail } from "@/types/apis/stores.type";

export const getStoresDetail = async (id: string) => {
  return await toSafeResult(() => apiClient.get<StoresDetail>(`stores/${id}`));
};

export const getStoresDetailProducts = async (id: string) => {
  return await toSafeResult(() => ownerApiClient.get<Product[]>(`stores/${id}/products`));
};

export const getStoreList = async (params: string) => {
  return await toSafeResult(() => apiClient.get<StoreListResponse>(`search/store?${params}`));
};

export const getSearchStoreList = async (keyword: string, size: number, page: number) => {
  return await toSafeResult(() =>
    apiClient.get<StoreListResponse>(`search/store?keyword=${keyword}&size=${size}&page=${page}`),
  );
};
