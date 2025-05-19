export interface Store {
  id: number;
  name: string;
  category: string;
  distance: number;
  address: string;
  latitude: number;
  longitude: number;
  isOpen: boolean;
}

export interface BoundingBox {
  topLeft: { latitude: number; longitude: number };
  bottomRight: { latitude: number; longitude: number };
}

export interface StoreResponseData {
  box: BoundingBox;
  storeList: Store[];
}

export interface StoreApiSuccessResponse {
  data: StoreResponseData;
}

export interface StoreApiErrorResponse {
  error: string;
}
