import type { Price } from "./apis/stores.type";

export interface OrderSummary {
  count: number;
  originalPrice: number;
  finalPrice: number;
}

export interface SelectedProduct {
  id: string;
  name: string;
  price: Price;
  quantity: number;
  selectedCount: number;
}
