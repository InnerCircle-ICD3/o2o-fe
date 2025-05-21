import type { ORDER_STATUS } from "@/constants/my-orders";
import type { Product, StoresDetail } from "./stores.type";

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
export interface OrderDetail {
  orderId: number;
  store: StoresDetail;
  products: Product[];
  status: OrderStatus;
}
