import { apiClient } from "@/apis/client";
import { toResultWithError } from "@/apis/utils/result";
import type { Product, StoresDetail } from "@/types/apis/stores.type";

export const getStoresDetail = async (id: string) => {
  const data = await toResultWithError(() => apiClient.get<StoresDetail>(`stores/${id}`));

  return data;
};

export const getStoresDetailProducts = async (id: string) => {
  const data = await toResultWithError(() => apiClient.get<Product[]>(`stores/${id}/products`));

  return data;
};
