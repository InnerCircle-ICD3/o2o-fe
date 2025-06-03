export interface MapStore {
  storeId: number;
  storeName: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface BoundingBox {
  topLeft: { latitude: number; longitude: number };
  bottomRight: { latitude: number; longitude: number };
}

export interface StoreResponseData {
  box: BoundingBox;
  storeList: MapStore[];
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
