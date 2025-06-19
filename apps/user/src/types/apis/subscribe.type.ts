import type { StoreStatus } from "./stores.type";

export interface SubscribeDetail {
  id: number;
  storeId: number;
  storeName: string;
  mainImageUrl: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  totalStockCount: number;
  todayPickupStartTime: string; // "HH:mm:ss" 형식
  todayPickupEndTime: string; // "HH:mm:ss" 형식
  status: StoreStatus;
  ratingAverage: number;
  ratingCount: number;
  foodCategory: string[]; // (예: ["커피", "디저트"])
  storeCategory: string[]; // (예: ["BREAD"])
}

export interface SubscribeList {
  contents: SubscribeDetail[];
  lastId: number;
}

export interface SubscribeSuccess {
  id: number;
  userId: number;
  storeId: number;
  subscribed: boolean;
}
