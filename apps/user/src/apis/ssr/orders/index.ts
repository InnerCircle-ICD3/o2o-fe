import { apiClient } from "@/apis/client";
import { toSafeResult } from "@/apis/utils/result";
import type { OrderDetail } from "@/types/apis/order.type";

export const getOrderDetail = async (id: string) => {
  return await toSafeResult(() => apiClient.get<OrderDetail>(`orders/${id}`));
};
