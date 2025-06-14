import { api } from "@/apis/client";
import { toSafeResult } from "@/apis/utils/result";

export const confirmOrder = async (storeId: number, orderId: number) => {
  return await toSafeResult(() => api.post<unknown>(`stores/${storeId}/orders/${orderId}/confirm`));
};

export const cancelOrder = async (storeId: number, orderId: number) => {
  return await toSafeResult(() => api.post<unknown>(`stores/${storeId}/orders/${orderId}/cancel`));
};

export const getOrders = async (storeId: number) => {
  return await toSafeResult(() => api.get<unknown>(`stores/${storeId}/orders`));
};
