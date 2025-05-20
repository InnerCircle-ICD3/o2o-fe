import { apiClient } from "@/apis/client";
import type { OrderDetail } from "@/types/apis/order.type";

export const getOrderDetail = async (id: string) => {
  const data = await apiClient.get<OrderDetail>(`orders/${id}`);

  return data;
};
