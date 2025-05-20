import type { ORDER_STATUS } from "@/constants/my-orders";
import type { Product, StoreDetail } from "./store.type";

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
export interface OrderDetail {
  orderId: number;
  store: StoreDetail;
  products: Product[];
  status: OrderStatus;
}
