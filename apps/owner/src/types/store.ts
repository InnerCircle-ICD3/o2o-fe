export interface ValidationRule {
  pattern: RegExp;
  message: string;
}

export type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule;
};

export interface StoreCategory {
  value: string;
  label: string;
}

export interface CreateStoreRequest {
  name: string;
  businessNumber: string;
  roadNameAddress?: string;
  lotNumberAddress?: string;
  buildingName?: string;
  zipCode?: string;
  region1DepthName?: string;
  region2DepthName?: string;
  region3DepthName?: string;
  latitude?: string;
  longitude?: string;
  contact: string;
  description?: string;
  mainImageUrl?: string;
  storeCategory: string[];
  foodCategory: string[];
  pickupDay: "TODAY" | "TOMORROW";
  businessHours: {
    dayOfWeek: string;
    openTime: string;
    closeTime: string;
  }[];
}

export interface StoreResponse {
  id: number;
  name: string;
  businessNumber: string;
  address: StoreAddress;
  contact: string;
  description?: string;
  mainImageUrl?: string;
  storeCategory: string[];
  foodCategory: string[];
  pickupDay: "TODAY" | "TOMORROW";
  businessHours: {
    dayOfWeek: string;
    openTime: string;
    closeTime: string;
  }[];
}

export interface StoreAddress {
  roadNameAddress?: string;
  lotNumberAddress?: string;
  buildingName?: string;
  zipCode?: string;
  region1DepthName?: string;
  region2DepthName?: string;
  region3DepthName?: string;
  coordinate: {
    longitude: number;
    latitude: number;
  };
}
export interface UpdateStoreRequest {
  name?: string;
  businessNumber?: string;
  roadNameAddress?: string;
  lotNumberAddress?: string;
  buildingName?: string;
  zipCode?: string;
  region1DepthName?: string;
  region2DepthName?: string;
  region3DepthName?: string;
  latitude?: number;
  longitude?: number;
  businessHours?: {
    dayOfWeek: string;
    openTime: string;
    closeTime: string;
  }[];
  pickupDay?: "TODAY" | "TOMORROW";
  contact?: string;
  description?: string;
  mainImageUrl?: string;
  storeCategory: string[];
  foodCategory: string[];
}

export interface StoreStatus {
  status: "OPEN" | "CLOSED";
}

export const initialStoreFormData: CreateStoreRequest = {
  name: "",
  businessNumber: "",
  roadNameAddress: "",
  lotNumberAddress: "",
  buildingName: "",
  zipCode: "",
  region1DepthName: "",
  region2DepthName: "",
  region3DepthName: "",
  latitude: "",
  longitude: "",
  pickupDay: "TODAY",
  businessHours: [],
  contact: "",
  description: "",
  mainImageUrl: "",
  storeCategory: [],
  foodCategory: [],
};
