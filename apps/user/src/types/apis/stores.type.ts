// 요일을 나타내는 문자열 리터럴 타입
type DayOfWeek = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";

// 영업시간 한 건을 나타내는 인터페이스
interface BusinessHour {
  dayOfWeek: DayOfWeek;
  openTime: string; // "HH:mm:ss" 형식
  closeTime: string; // "HH:mm:ss" 형식
}

// 위/경도 정보를 담는 인터페이스
interface Coordinate {
  latitude: number;
  longitude: number;
}

// 주소 정보를 담는 인터페이스
interface Address {
  roadNameAddress: string; // 도로명 주소
  lotNumberAddress: string; // 지번 주소
  buildingName: string | null; // 건물명 (없으면 null)
  zipCode: string; // 우편번호
  region1DepthName: string; // 시/도 (예: 북태평양)
  region2DepthName: string; // 시/군/구 (예: 해저기지)
  region3DepthName: string; // 동/읍/면 (예제에서는 빈 문자열)
  coordinate: Coordinate; // 위/경도
}

// 픽업 가능일을 나타내는 리터럴 타입
type PickupDay = "TODAY" | "TOMORROW";

// 가게 상태를 나타내는 리터럴 타입
export type StoreStatus = "OPEN" | "CLOSED";

export interface StoresDetail {
  id: number;
  name: string;
  mainImageUrl: string;
  contact: string;
  description: string;
  businessNumber: string;
  businessHours: BusinessHour[];
  address: Address;
  pickupDay: PickupDay;
  todayPickupStartTime: string; // "HH:mm:ss" 형식
  todayPickupEndTime: string; // "HH:mm:ss" 형식
  status: StoreStatus;
  ratingAverage: number;
  ratingCount: number;
  foodCategory: string[]; // (예: ["커피", "디저트"])
  storeCategory: string[]; // (예: ["BREAD"])
  isFavorite: boolean;
}

export interface Inventory {
  quantity: number;
  stock: number;
}

export interface Price {
  originalPrice: number;
  discountRate: number;
  finalPrice: number;
}

type ProductSize = "S" | "M" | "L";
export type ProductStatus = "ACTIVE" | "INACTIVE" | "SOLD_OUT";

export interface Product {
  id: string;
  createdAt: string;
  description: string;
  foodType: string[];
  image: string;
  inventory: Inventory;
  storeId: string;
  storeName: string;
  name: string;
  price: Price;
  size: ProductSize;
  status: ProductStatus;
}

export interface StoreList {
  storeId: number;
  storeName: string;
  storeImage: string;
  foodCategory: string[];
  distanceKm: number;
  totalStockCount: number;
  open: boolean;
  status: StoreStatus;
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
  ratingAverage: number;
  ratingCount: number;
  isFavorite: boolean;
}

export interface StoreListResponse {
  lastId: string;
  contents: StoreList[];
}

export interface StoreProductsResponse {
  storeName: string;
  products: Product[];
}

export interface StoreProductsResponse {
  storeName: string;
  products: Product[];
}

export interface StoreReviewResponse {
  id: number;
  orderId: number;
  content: string;
  images: string[];
  score: number;
  nickname: string;
  createdAt: string;
}

export interface StoreReviewListResponse {
  contents: StoreReviewResponse[];
  lastId: number;
}
