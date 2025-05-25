import { apiClient } from "@/apis/client";
import { toResultWithError } from "@/apis/utils/result";
import type { OrderDetail } from "@/types/apis/order.type";

export const getOrderDetail = async (id: string) => {
  const data = await toResultWithError(() => apiClient.get<OrderDetail>(`orders/${id}`));

  return data;
};
