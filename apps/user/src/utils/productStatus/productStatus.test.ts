import generateProductStatus from ".";

describe("generateProductStatus", () => {
  describe("ProductStatus", () => {
    it("INACTIVE는 '판매 대기'로 반환한다.", () => {
      expect(generateProductStatus("INACTIVE", { quantity: 10, stock: 10 })).toEqual({
        status: "INACTIVE",
        uiStatus: "pending",
        label: "판매 대기",
      });
    });
    it("SOLD_OUT은 '품절'로 반환한다.", () => {
      expect(generateProductStatus("SOLD_OUT", { quantity: 0, stock: 10 })).toEqual({
        status: "SOLD_OUT",
        uiStatus: "soldOut",
        label: "품절",
      });
    });
    it("ACTIVE + quantity=0은 '품절'로 반환한다.", () => {
      expect(generateProductStatus("ACTIVE", { quantity: 0, stock: 10 })).toEqual({
        status: "SOLD_OUT",
        uiStatus: "soldOut",
        label: "품절",
      });
    });
    it("ACTIVE + quantity=1은 '마감 임박'으로 반환한다.", () => {
      expect(generateProductStatus("ACTIVE", { quantity: 1, stock: 10 })).toEqual({
        status: "ACTIVE",
        uiStatus: "endSoon",
        label: "마감 임박",
      });
    });
    it("ACTIVE + quantity>1은 '판매 중'으로 반환한다.", () => {
      expect(generateProductStatus("ACTIVE", { quantity: 5, stock: 10 })).toEqual({
        status: "ACTIVE",
        uiStatus: "sales",
        label: "판매 중",
      });
    });
  });

  describe("StoreStatus", () => {
    it("OPEN + stock<=5는 '마감 임박'으로 반환한다.", () => {
      expect(generateProductStatus("OPEN", { quantity: 10, stock: 3 })).toEqual({
        status: "OPEN",
        uiStatus: "endSoon",
        label: "마감 임박",
      });
    });
    it("OPEN + stock>5는 '영업 중'으로 반환한다.", () => {
      expect(generateProductStatus("OPEN", { quantity: 10, stock: 10 })).toEqual({
        status: "OPEN",
        uiStatus: "open",
        label: "영업 중",
      });
    });
    it("CLOSED는 '영업 종료'로 반환한다.", () => {
      expect(generateProductStatus("CLOSED", { quantity: 10, stock: 10 })).toEqual({
        status: "CLOSED",
        uiStatus: "close",
        label: "영업 종료",
      });
    });
  });

  it("정의되지 않은 status는 에러를 던진다", () => {
    // @ts-expect-error 테스트용 잘못된 값
    expect(() => generateProductStatus("UNKNOWN", { quantity: 1, stock: 1 })).toThrow();
  });
});
