export interface StoreFormData {
  name: string;
  businessNumber: string;
  roadNameAddress: string;
  lotNumberAddress: string;
  buildingName: string;
  zipCode: string;
  region1DepthName: string;
  region2DepthName: string;
  region3DepthName: string;
  latitude: string;
  longitude: string;
  pickupStartTime: string;
  pickupEndTime: string;
  pickupDay: string;
  contact: string;
  description: string;
  mainImageUrl: string;
  storeCategory: string[];
  foodCategory: string[];
  addressType: "R" | "J" | ""; // R: 도로명, J: 지번
  businessHours: Array<{
    dayOfWeek: string;
    openTime: string;
    closeTime: string;
  }>;
}

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
  pickupStartTime: "",
  pickupEndTime: "",
  pickupDay: "TOMORROW",
  contact: "",
  description: "",
  mainImageUrl: "",
  storeCategory: [],
  foodCategory: [],
  addressType: "",
  businessHours: [],
};
