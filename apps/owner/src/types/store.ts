export type ValidationRule = {
  pattern: RegExp;
  message: string;
};

export type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule;
};

export type StoreCategory = {
  value: string;
  label: string;
};

export type StoreFormData = {
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
  pickUpDay: "TODAY" | "TOMORROW";
  businessHours: {
    dayOfWeek: string;
    openTime: string;
    closeTime: string;
  }[];
};

export const initialStoreFormData: StoreFormData = {
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
  pickUpDay: "TODAY",
  businessHours: [],
  contact: "",
  description: "",
  mainImageUrl: "",
  storeCategory: [],
  foodCategory: [],
};
