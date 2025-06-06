export type ValidationRule = {
  pattern: RegExp;
  message: string;
};

export type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule;
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
  contact: "",
  description: "",
  mainImageUrl: "",
  storeCategory: [],
  foodCategory: [],
  pickUpDay: "TODAY",
  businessHours: [],
};

export const validationRules: ValidationRules<StoreFormData> = {
  name: {
    pattern: /^\S.{0,49}$/,
    message: "1~50자 사이의 공백 없는 이름을 입력해주세요.",
  },
  businessNumber: {
    pattern: /^\d{10}$/,
    message: "10자리 숫자로만 입력해주세요. (- 제외)",
  },
  contact: {
    pattern: /^\d{2,3}-\d{3,4}-\d{4}$/,
    message: "올바른 전화번호 형식으로 입력해주세요. 예: 010-1234-5678",
  },
  description: {
    pattern: /^.{0,500}$/,
    message: "설명은 최대 500자까지 입력 가능합니다.",
  },
};
