import { getStore } from "@/apis/ssr/stores";
import { PICKUP_DAY } from "@/constants/store";
import { useQuery } from "@/hooks/api/utils/useQuery";
import type { StoreResponse } from "@/types/store";

const storeData = {
  success: true,
  data: {
    id: 123,
    name: "맛있는 분식집",
    mainImageUrl: "https://example.com/image.jpg",
    contact: "010-1234-5678",
    description: "분식 전문점입니다.",
    businessNumber: "1234567890",
    businessHours: [
      {
        dayOfWeek: "MONDAY",
        openTime: "09:00:00",
        closeTime: "18:00:00",
      },
    ],
    address: {
      roadNameAddress: "서울특별시 강남구 테헤란로 427",
      lotNumberAddress: "서울특별시 강남구 삼성동 143-48",
      buildingName: "위워크타워",
      zipCode: "06159",
      region1DepthName: "서울특별시",
      region2DepthName: "강남구",
      region3DepthName: "삼성동",
      coordinate: {
        longitude: 127.0276368,
        latitude: 37.497942,
      },
    },
    pickupDay: PICKUP_DAY.TOMORROW,
    todayPickupStartTime: "10:00:00",
    todayPickupEndTime: "20:00:00",
    status: "OPEN",
    ratingAverage: 4.5,
    ratingCount: 123,
    foodCategory: ["소금빵", "메론빵"],
    storeCategory: ["BREAD"],
  },
};
const useGetOwnerStore = (userId?: number) => {
  const { isLoading, isError, error } = useQuery<StoreResponse>({
    queryKey: ["OwnerStore", userId],
    queryFn: async () => {
      if (!userId) throw new Error("사용자 정보가 없습니다");
      const result = await getStore(userId);
      if (!result.success) {
        throw new Error(result.message || "매장 정보를 불러오지 못했습니다.");
      }
      return result;
    },
    enabled: !!userId,
    retry: false,
  });

  return { data: storeData, isLoading, isError, error };
};

export default useGetOwnerStore;
