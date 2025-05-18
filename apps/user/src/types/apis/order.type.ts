import type { Product, StoreDetail } from "./store.type";

export interface OrderDetail {
  orderId: number;
  store: StoreDetail;
  products: Product[];
}
