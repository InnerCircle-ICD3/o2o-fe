import type { Price } from "./apis/stores.type";

export interface OrderSummary {
  count: number;
  originalPrice: number;
  finalPrice: number;
}

export interface SelectedProduct {
  id: number;
  name: string;
  price: Price;
  quantity: number;
  selectedCount: number;
}
