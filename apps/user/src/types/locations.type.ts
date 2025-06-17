export interface MapStore {
  storeId: number;
  storeName: string;
  coordinate: {
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

export type AddressType = "HOME" | "WORK";

// 고객 주소 타입
export interface CustomerAddressRequest {
  address: {
    roadNameAddress: string | null;
    lotNumberAddress: string;
    buildingName: string | null;
    zipCode: string;
    region1DepthName: string;
    region2DepthName: string;
    region3DepthName: string;
    coordinate: {
      latitude: number;
      longitude: number;
    };
  };
  radiusInKilometers: number;
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
  radiusInKilometers: number;
}

export interface SearchAddressResult {
  address: string;
  location: Coordinate;
}

export interface Coordinate {
  lat: number;
  lng: number;
}
