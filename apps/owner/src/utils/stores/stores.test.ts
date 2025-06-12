import { PICKUP_DAY, initialStoreData } from "@/constants/store";
import { getDefaultStoreFormValues, getStoreStatusLabel } from "./index";

describe("stores utils", () => {
  describe("getDefaultStoreFormValues()", () => {
    it("storeData가 없으면 기본값을 반환한다", () => {
      expect(getDefaultStoreFormValues(undefined as unknown as never)).toEqual(initialStoreData);
      expect(getDefaultStoreFormValues({} as unknown as never)).toEqual(initialStoreData);
    });

    it("storeData가 있으면 값을 잘 매핑한다", () => {
      const storeData = {
        success: true,
        data: [
          {
            id: 1,
            businessHours: [],
            businessNumber: "123",
            storeCategory: ["BREAD"],
            foodCategory: ["B"],
            address: {
              coordinate: { latitude: 37.11233, longitude: 127.11233 },
              roadNameAddress: "도로명",
              lotNumberAddress: "지번",
              zipCode: "12345",
              buildingName: "건물",
            },
            pickupDay: PICKUP_DAY.TODAY,
            name: "매장명",
            contact: "010-0000-0000",
            mainImageUrl: "url",
            description: "설명",
            status: "OPEN" as const,
          },
        ],
      };
      const result = getDefaultStoreFormValues(storeData.data[0]);
      expect(result).toMatchObject({
        businessNumber: "123",
        storeCategory: ["BREAD"],
        foodCategory: ["B"],
        latitude: 37.11233,
        longitude: 127.11233,
        roadNameAddress: "도로명",
        lotNumberAddress: "지번",
        zipCode: "12345",
        buildingName: "건물",
        pickupDay: "TODAY",
        name: "매장명",
        contact: "010-0000-0000",
        mainImageUrl: "url",
        description: "설명",
      });
    });
  });

  describe("getStoreStatusLabel()", () => {
    it("OPEN이면 영업중을 반환한다", () => {
      expect(getStoreStatusLabel("OPEN")).toBe("영업중");
    });
    it("CLOSED면 영업종료를 반환한다", () => {
      expect(getStoreStatusLabel("CLOSED")).toBe("영업종료");
    });
  });
});
