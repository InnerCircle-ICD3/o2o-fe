import type { ORDER_STATUS } from "@/constants/my-orders";

export type OrderStatus = keyof typeof ORDER_STATUS;

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  originPrice: number;
  finalPrice: number;
  quantity: number;
  imageUrl: number;
}
export interface OrderDetail {
  id: number;
  storeName: string;
  orderNumber: number;
  customerId: number;
  storeId: number;
  status: OrderStatus;
  orderItems: OrderItem[];
  canceledAt: string;
  readiedAt: string;
  doneAt: string;
  hasReview: boolean;
}

export interface OrderList {
  contents: OrderDetail[];
  lastId: number;
}
