export interface Store {
  id: number;
  name: string;
  thumbnailUrl: string;
  category: string;
  distance: number;
  address: string;
  latitude: number;
  longitude: number;
  isOpen: boolean;
  minPrice: number;
  maxPrice: number;
  pickupTime: string;
}

export interface BoundingBox {
  topLeft: { latitude: number; longitude: number };
  bottomRight: { latitude: number; longitude: number };
}

export interface StoreResponseData {
  box: BoundingBox;
  storeList: Store[];
}

// 성공 응답: success + data
export interface StoreApiSuccessResponse {
  success: true;
  data: StoreResponseData;
}

// 실패 응답: success + errorCode + errorMessage
export interface StoreApiErrorResponse {
  success: false;
  errorCode: string;
  errorMessage: string;
}

// union type으로 사용할 경우
export type StoreApiResponse = StoreApiSuccessResponse | StoreApiErrorResponse;
