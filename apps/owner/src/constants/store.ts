import type { StoreCategory, StoreFormData, ValidationRules } from "@/types/store";

export const VALIDATION_RULES: ValidationRules<StoreFormData> = {
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

export const STORE_CATEGORIES: StoreCategory[] = [
  { value: "BREAD", label: "빵" },
  { value: "BAKERY", label: "베이커리" },
  { value: "CAFE", label: "카페" },
  { value: "DESSERT", label: "디저트" },
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
