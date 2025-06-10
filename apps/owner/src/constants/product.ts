export const VALIDATION_PRODUCT_RULES = {
  name: {
    pattern: /^.{2,50}$/,
    message: "이름은 2자 이상 50자 이하여야 합니다.",
  },
  foodType: {
    pattern: /^.{1,}$/,
    message: "음식 종류를 1개 이상 입력해주세요. 콤마(,)로 구분",
  },
  quantity: {
    pattern: /^[1-9][0-9]*$/,
    message: "수량은 1개 이상이어야 합니다.",
  },
  originalPrice: {
    pattern: /^[1-9][0-9]*$/,
    message: "가격은 1원 이상이어야 합니다.",
  },
  image: {
    pattern: /^.{1}$/,
    message: "사진을 선택해주세요.",
  },
};
