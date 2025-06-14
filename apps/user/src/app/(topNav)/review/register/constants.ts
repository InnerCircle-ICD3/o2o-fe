export const REVIEW_FORM = {
  INITIAL_STATE: {
    rating: 0,
    content: "",
    images: [] as string[],
  },
  VALIDATION: {
    MIN_RATING: 1,
    MAX_RATING: 5,
    MIN_CONTENT_LENGTH: 1,
    MAX_CONTENT_LENGTH: 500,
    MAX_IMAGES: 3,
  },
  API: {
    ENDPOINTS: {
      UPLOAD_IMAGES: "/api/review/images",
      REGISTER_REVIEW: "/api/review",
    },
  },
} as const;

export const RATING_TEXTS = ["매우 불만족", "불만족", "보통", "만족", "매우 만족"] as const;

export const ERROR_MESSAGES = {
  RATING: {
    REQUIRED: "별점을 선택해주세요",
    INVALID: "유효하지 않은 별점입니다",
  },
  CONTENT: {
    REQUIRED: "리뷰 내용을 입력해주세요",
    TOO_SHORT: "리뷰 내용이 너무 짧습니다",
    TOO_LONG: "리뷰는 500자를 초과할 수 없습니다",
  },
  IMAGES: {
    TOO_MANY: "이미지는 최대 3장까지 첨부할 수 있습니다",
    INVALID_TYPE: "유효하지 않은 이미지 형식입니다",
    TOO_LARGE: "이미지 크기는 5MB를 초과할 수 없습니다",
  },
} as const;
