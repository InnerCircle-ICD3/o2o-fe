import { baseUrl } from "@/mocks/utils";
import type { StoreApiErrorResponse, StoreApiSuccessResponse } from "@/types/searchMap.type";
import { http, HttpResponse } from "msw";

interface SearchLocationBody {
  viewPoint: {
    latitude: number;
    longitude: number;
  };
}

const getDistanceInMeters = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

const storeList = [
  {
    id: 101,
    name: "카페 도치",
    category: "건강빵, 샌드위치, 조리빵",
    thumbnailUrl: "/images/thumb.png",
    distance: 174.2,
    address: "서울특별시 강남구 테헤란로 124",
    latitude: 37.566826,
    longitude: 126.9786567,
    isOpen: true,
    minPrice: 4000,
    maxPrice: 10000,
    pickupTime: "17:00 - 18:00",
  },
  {
    id: 105,
    name: "025BAKERY",
    category: "브리오슈, 아메리칸쿠키, 치즈케이크",
    thumbnailUrl: "/images/thumb.png",
    distance: 432.5,
    address: "서울 강남구 봉은사로 45",
    latitude: 37.541199,
    longitude: 127.051778,
    isOpen: false,
    pickupTime: "18:00 - 19:00",
    minPrice: 6000,
    maxPrice: 12000,
  },
  {
    id: 107,
    name: "한양대 CAFE",
    category: "브리오슈, 아메리칸쿠키, 치즈케이크",
    thumbnailUrl: "/images/thumb.png",
    distance: 432.5,
    address: "서울 강남구 봉은사로 45",
    latitude: 37.554915,
    longitude: 127.044838,
    isOpen: false,
    pickupTime: "18:00 - 19:00",
    minPrice: 6000,
    maxPrice: 12000,
  },
  {
    id: 108,
    name: "뚝섬 CAFE",
    category: "브리오슈, 아메리칸쿠키, 치즈케이크",
    thumbnailUrl: "/images/thumb.png",
    distance: 432.5,
    address: "서울 강남구 봉은사로 45",
    latitude: 37.547976,
    longitude: 127.04712,
    isOpen: false,
    pickupTime: "18:00 - 19:00",
    minPrice: 6000,
    maxPrice: 12000,
  },
  {
    id: 109,
    name: "카페 도치",
    category: "건강빵, 샌드위치, 조리빵",
    thumbnailUrl: "/images/thumb.png",
    distance: 174.2,
    address: "서울 강남구 봉은사로 45",
    latitude: 37.555918,
    longitude: 127.058035,
    isOpen: false,
    pickupTime: "18:00 - 19:00",
    minPrice: 6000,
    maxPrice: 12000,
  },
  {
    id: 110,
    name: "밀도 BAKERY",
    category: "소금빵, 초코번, 크림도넛",
    thumbnailUrl: "/images/thumb.png",
    distance: 215.4,
    address: "서울 성동구 아차산로 12길 17",
    latitude: 37.5432,
    longitude: 127.0491,
    isOpen: true,
    pickupTime: "15:00 - 16:00",
    minPrice: 4500,
    maxPrice: 9000,
  },
  {
    id: 111,
    name: "빵집 오월",
    category: "앙버터, 깜빠뉴, 플랫화이트",
    thumbnailUrl: "/images/thumb.png",
    distance: 620.1,
    address: "서울 성동구 뚝섬로 5길 20",
    latitude: 37.5467,
    longitude: 127.0533,
    isOpen: true,
    pickupTime: "13:00 - 14:30",
    minPrice: 5000,
    maxPrice: 11000,
  },
  {
    id: 112,
    name: "브레드 앤 커피",
    category: "아메리카노, 크루아상, 휘낭시에",
    thumbnailUrl: "/images/thumb.png",
    distance: 850.9,
    address: "서울 성동구 상원길 45",
    latitude: 37.5446,
    longitude: 127.0571,
    isOpen: false,
    pickupTime: "17:00 - 18:30",
    minPrice: 4000,
    maxPrice: 9500,
  },
  {
    id: 113,
    name: "소금빵연구소",
    category: "소금빵, 앙버터, 카스테라",
    thumbnailUrl: "/images/thumb.png",
    distance: 300.0,
    address: "서울 성동구 연무장길 7",
    latitude: 37.5409,
    longitude: 127.0502,
    isOpen: true,
    pickupTime: "12:30 - 13:30",
    minPrice: 3800,
    maxPrice: 8500,
  },
  {
    id: 114,
    name: "베이커리 도토루",
    category: "스콘, 프레첼, 크림빵",
    thumbnailUrl: "/images/thumb.png",
    distance: 770.3,
    address: "서울 성동구 왕십리로 32",
    latitude: 37.5484,
    longitude: 127.0568,
    isOpen: false,
    pickupTime: "16:00 - 17:00",
    minPrice: 4200,
    maxPrice: 9700,
  },
];

const searchMapHandlers = [
  http.post(`${baseUrl}/search/stores/map`, async (req): Promise<HttpResponse> => {
    const body = (await req.request.json()) as SearchLocationBody;
    const { viewPoint } = body;

    if (!viewPoint) {
      return HttpResponse.json<StoreApiErrorResponse>(
        { error: "Missing viewPoint" },
        { status: 400 },
      );
    }

    const filteredStoreList = storeList.filter((store) => {
      const distance = getDistanceInMeters(
        viewPoint.latitude,
        viewPoint.longitude,
        store.latitude,
        store.longitude,
      );

      return distance <= 1000;
    });

    return HttpResponse.json<StoreApiSuccessResponse>({
      data: {
        box: {
          topLeft: { latitude: 37.566826, longitude: 126.9786567 },
          bottomRight: { latitude: 37.566826, longitude: 126.9786567 },
        },
        storeList: filteredStoreList,
      },
    });
  }),
];

export default searchMapHandlers;
