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

// 고객 주소 타입
export interface CustomerAddressRequest {
  address: {
    roadNameAddress: string;
    lotNumberAddress: string;
    buildingName: string;
    zipCode: string;
    region1DepthName: string;
    region2DepthName: string;
    region3DepthName: string;
    coordinate: {
      latitude: number;
      longitude: number;
    };
  };
  distanceInKilometers: number;
  customerAddressType: string;
  description: string;
}

export interface CustomerAddressResponse {
  id: number;
  customerId: number;
  roadNameAddress: string;
  lotNumberAddress: string;
  buildingName: string;
  zipCode: string;
  region1DepthName: string;
  region2DepthName: string;
  region3DepthName: string;
  latitude: number;
  longitude: number;
  customerAddressType: string;
  description: string;
}

export interface SearchAddressResult {
  address: string;
  location: Coordinates;
}

export interface Coordinates {
  lat: number;
  lng: number;
}
