import { apiClient } from "@/apis/client";
import { toSafeResult } from "@/apis/utils/result";
import type {
  CreateOrderRequest,
  CreateOrderResponse,
  OrderDetail,
  ReadyToOrderResponse,
} from "@/types/apis/order.type";

export const createOrder = (body: CreateOrderRequest) => {
  return apiClient.post<CreateOrderResponse>("orders", body);
};

export const getOrderDetail = async (id: string) => {
  return await toSafeResult(() => apiClient.get<OrderDetail>(`orders/${id}`));
};

export const readyToOrder = async (id: string) => {
  return await toSafeResult(() => apiClient.post<ReadyToOrderResponse>(`orders/${id}/ready`));
};

export const orderDone = async (id: string) => {
  return await toSafeResult(() => apiClient.post(`orders/${id}/done`));
};

export const cancelOrder = async (id: string) => {
  return await toSafeResult(() => apiClient.post(`orders/${id}/cancel`));
};
