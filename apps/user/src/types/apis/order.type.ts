import type { ORDER_STATUS } from "@/constants/my-orders";
import type { Product, StoresDetail } from "./stores.type";

export type OrderStatus = keyof typeof ORDER_STATUS;
export interface OrderDetail {
  orderId: number;
  store: StoresDetail;
  products: Product[];
  status: OrderStatus;
  orderDate: string;
  pickupDate?: string;
  cancelDate?: string;
  totalPrice: number;
}
