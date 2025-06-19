import type { ORDER_STATUS } from "@/constants/my-orders";

export type OrderStatus = keyof typeof ORDER_STATUS;

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  originPrice: number;
  finalPrice: number;
  quantity: number;
  imageUrl: string;
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

export interface CreateOrderRequest {
  storeId: string;
  orderItems: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }[];
}

export interface CreateOrderResponse {
  id: number;
  orderNumber: number;
  customerId: number;
  nickname: string;
  storeId: number;
  status: string;
  orderItems: {
    id: number;
    productId: number;
    productName: string;
    originPrice: number;
    finalPrice: number;
    imageUrl: string;
    quantity: number;
  }[];
  pickupDateTime: string;
  createdAt: string;
  updatedAt: string;
  readiedAt: string | null;
  canceledAt: string | null;
  confirmedAt: string | null;
  doneAt: string | null;
  hasReview: boolean;
}

export interface OrderDetailResponse {
  contents: OrderDetail[];
  lastId: number;
}

export interface ReadyToOrderResponse {
  orderId: number;
  userId: number;
  status: "READY" | "DONE" | "CANCELED";
}
