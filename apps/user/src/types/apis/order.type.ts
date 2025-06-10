import type { ORDER_STATUS } from "@/constants/my-orders";

export type OrderStatus = keyof typeof ORDER_STATUS;

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
}
export interface OrderDetail {
  id: number;
  orderNumber: number;
  customerId: number;
  storeId: number;
  status: OrderStatus;
  orderItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderList {
  contents: OrderDetail[];
  lastId: number;
}
