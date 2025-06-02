import type { Result } from "@/apis/utils/result";

export interface StoresDetail {
  storeId: number;
  name: string;
  roadAddress: {
    addressName: string;
    zoneNo: string;
    buildingName: string;
  };
  lotAddress: {
    addressName: string;
    mainAddressNo: string;
    subAddressNo: string;
  };
  addressType: string;
  location: {
    lat: number;
    lng: number;
  };
  businessNumber: string;
  openTime: string;
  closeTime: string;
  contact: string;
  description: string;
  mainImageUrl: string;
  status: string;
}

export interface Price {
  originalPrice: number;
  discountRate: number;
  finalPrice: number;
}

export interface Product {
  id: number;
  createdAt: string;
  description: string;
  foodType: string[];
  imageUrl: string;
  inventory: {
    quantity: number;
    stock: number;
  };
  storeId: number;
  name: string;
  price: Price;
  size: "S" | "M" | "L";
  status: string;
}

export interface StoreList {
  storeId: number;
  storeName: string;
  storeImage: string;
  category: string[];
  distanceKm: number;
  open: boolean;
  stock: number;
  roadAddress: {
    addressName: string;
    zoneNo: string;
    buildingName: string;
  };
  lotAddress: {
    addressName: string;
    mainAddressNo: string;
    subAddressNo: string;
  };
  addressType: string;
  location: {
    lat: number;
    lng: number;
  };
  businessHours: {
    openTime: string;
    closeTime: string;
  };
  reviewCount: number;
  reviewScore: number;
  isFavorite: boolean;
}

export interface StoreSearchResponse {
  pageNumber: number;
  contents: StoreList[];
}

export interface InfiniteQueryResponse {
  pages: Result<StoreSearchResponse>[];
  pageParams: number[];
}
