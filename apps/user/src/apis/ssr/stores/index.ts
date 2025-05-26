import { apiClient } from "@/apis/client";
import { toSafeResult } from "@/apis/utils/result";
import type { Product, StoresDetail } from "@/types/apis/stores.type";

export const getStoresDetail = async (id: string) => {
  return await toSafeResult(() => apiClient.get<StoresDetail>(`stores/${id}`));
};

export const getStoresDetailProducts = async (id: string) => {
  return await toSafeResult(() => apiClient.get<Product[]>(`stores/${id}/products`));
};
