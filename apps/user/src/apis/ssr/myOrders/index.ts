import { apiClient } from "@/apis/client";
import type { OrderDetail } from "@/types/apis/order.type";

export const getOrderList = async (id: number) => {
  const data = await apiClient.get<OrderDetail[]>(`customer/${id}/orders`);

  return data;
};
