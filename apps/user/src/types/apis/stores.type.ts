// 도로명 주소
interface RoadAddress {
  addressName: string;
  zoneNo: string;
  buildingName: string;
}

// 지번 주소
interface LotAddress {
  addressName: string;
  mainAddressNo: string;
  subAddressNo: string;
}

// 위/경도 정보
interface Location {
  lat: number;
  lng: number;
}

// 주소 타입: 도로명(ROAD) 혹은 지번(LOT)
type AddressType = "ROAD" | "LOT";

// 매장 상태
type StoreStatus = "OPEN" | "CLOSED";

export interface StoresDetail {
  storeId: number;
  name: string;

  roadAddress: RoadAddress;
  lotAddress: LotAddress;

  addressType: AddressType;

  location: Location;

  businessNumber: string;

  openTime: string; // "HH:mm" 형식
  closeTime: string; // "HH:mm" 형식

  contact: string;
  description: string;
  mainImageUrl: string;

  status: StoreStatus;
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

export interface StoreListResponse {
  pageNumber?: number;
  storeList: StoreList[];
}
