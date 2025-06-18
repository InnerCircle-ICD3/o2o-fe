import type {
  CreateStoreRequest,
  StoreCategory,
  UpdateStoreRequest,
  ValidationRules,
} from "@/types/store";

export const VALIDATION_RULES: ValidationRules<CreateStoreRequest> = {
  name: {
    pattern: /^\S.{0,49}$/,
    message: "1~50자 이내로 입력해주세요.",
  },
  businessNumber: {
    pattern: /^\d{10}$/,
    message: "10자리 숫자로만 입력해주세요. (- 제외)",
  },
  description: {
    pattern: /^.{0,500}$/,
    message: "설명은 최대 500자까지 입력 가능합니다.",
  },
};

export const STORE_CATEGORIES: StoreCategory[] = [
  { value: "BREAD", label: "빵" },
  { value: "CAFE", label: "카페" },
  { value: "KOREAN", label: "한식" },
  { value: "FRUIT", label: "과일" },
  { value: "PIZZA", label: "피자" },
  { value: "SALAD", label: "샐러드" },
  { value: "RICECAKE", label: "떡" },
];

export const WEEKDAYS = ["월", "화", "수", "목", "금", "토", "일"] as const;
export type WeekdayKor = (typeof WEEKDAYS)[number];
export type WeekdayEng =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export const WEEKDAY_MAP: Record<WeekdayKor, WeekdayEng> = {
  월: "MONDAY",
  화: "TUESDAY",
  수: "WEDNESDAY",
  목: "THURSDAY",
  금: "FRIDAY",
  토: "SATURDAY",
  일: "SUNDAY",
};

export const PICKUP_DAY = {
  TODAY: "TODAY",
  TOMORROW: "TOMORROW",
} as const;

export const STORE_STATUS_OPTIONS = [
  { value: "OPEN", label: "영업중" },
  { value: "CLOSED", label: "영업종료" },
] as const;

export const initialCreateStoreFormData: CreateStoreRequest = {
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

export const initialUpdateStoreFormData: UpdateStoreRequest = {
  name: "",
  roadNameAddress: "",
  lotNumberAddress: "",
  buildingName: "",
  zipCode: "",
  region1DepthName: "",
  region2DepthName: "",
  region3DepthName: "",
  latitude: 0,
  longitude: 0,
  businessHours: [],
  pickupDay: "TODAY",
  contact: "",
  description: "",
  mainImageUrl: "",
  storeCategory: [],
  foodCategory: [],
};

export const initialStoreData = {
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
  businessHours: [],
  pickupDay: "TODAY",
  contact: "",
  description: "",
  mainImageUrl: "",
  storeCategory: [],
  foodCategory: [],
  status: "OPEN",
};
