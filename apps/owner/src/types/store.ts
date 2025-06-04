import { z } from "zod";

export const storeFormSchema = z.object({
  name: z
    .string()
    .min(1, "매장명을 입력해주세요")
    .max(50, "매장명은 50자 이하여야 합니다")
    .regex(/^\S+$/, "공백을 포함할 수 없습니다"),

  businessNumber: z
    .string()
    .min(1, "사업자 등록번호를 입력해주세요")
    .regex(/^\d+$/, "숫자만 입력해주세요")
    .length(10, "사업자 등록번호는 10자리여야 합니다"),

  roadNameAddress: z.string().optional(),
  lotNumberAddress: z.string().optional(),
  buildingName: z.string().optional(),
  zipCode: z
    .string()
    .regex(/^\d{5}$/, "우편번호는 5자리 숫자여야 합니다.")
    .optional(),

  region1DepthName: z.string().optional(),
  region2DepthName: z.string().optional(),
  region3DepthName: z.string().optional(),

  latitude: z.string().optional(),
  longitude: z.string().optional(),

  contact: z
    .string()
    .min(1, "연락처를 입력해주세요")
    .regex(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/, "올바른 연락처 형식이 아닙니다"),

  description: z.string().max(500, "설명은 500자 이하로 입력해주세요.").optional(),
  mainImageUrl: z.string().optional(),

  storeCategory: z.array(z.string().min(1, "매장 카테고리를 입력해주세요.")),
  foodCategory: z.array(z.string().min(1, "음식 카테고리를 입력해주세요.")),

  pickUpDay: z.enum(["TODAY", "TOMORROW"]).default("TODAY"),

  businessHours: z
    .array(
      z.object({
        dayOfWeek: z.enum([
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
          "SUNDAY",
        ]),
        openTime: z.string().regex(/^\d{2}:\d{2}:\d{2}$/, "올바른 시간 형식이 아닙니다 (HH:MM:SS)"),
        closeTime: z
          .string()
          .regex(/^\d{2}:\d{2}:\d{2}$/, "올바른 시간 형식이 아닙니다 (HH:MM:SS)"),
      }),
    )
    .min(1, "영업 시간을 하나 이상 설정해주세요."),
});

export type StoreFormData = z.infer<typeof storeFormSchema>;

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
