import { productApi } from "@/apis/client";
import { toSafeResult } from "@/apis/utils/result";
import type { Product } from "@/types/product";

export const getProducts = async (storeId: number) => {
  return await toSafeResult(() => productApi.get<Product[]>(`stores/${storeId}/products`));
};

export const deleteProduct = async (storeId: number, productId: number) => {
  return await toSafeResult(() => productApi.delete(`stores/${storeId}/products/${productId}`));
};

export const getProduct = async (storeId: number, productId: number) => {
  return await toSafeResult(() =>
    productApi.get<Product>(`stores/${storeId}/products/${productId}`),
  );
};

export const createProduct = async (storeId: number, data: Partial<Product>) => {
  return await toSafeResult(() => productApi.post(`stores/${storeId}/products`, data));
};

export const updateProduct = async (storeId: number, productId: number, data: Product) => {
  return await toSafeResult(() => productApi.post(`stores/${storeId}/products/${productId}`, data));
};
