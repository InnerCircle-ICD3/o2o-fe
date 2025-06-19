import { baseUrl } from "@/mocks/utils";
import { http, HttpResponse } from "msw";

// 새로운 형태의 Mock 데이터 생성
const createMockStore = (id: number) => ({
  storeId: id,
  storeName: `Mock Store ${id}`,
  storeImage: "https://eatngo-app.s3.ap-northeast-2.amazonaws.com/store/pu.png",
  storeCategory: [["PIZZA", "FRUIT", "BREAD", "RICECAKE", "KOREAN", "SALAD"][id % 7]],
  foodCategory: ["호밀빵", "케이크"],
  distanceKm: 0.1,
  status: "OPEN",
  roadNameAddress: "서울시 강남구 테헤란로 123",
  coordinate: {
    longitude: 127.001 + id * 0.00001,
    latitude: 37.001 + id * 0.00001,
  },
  businessHours: [
    {
      first: "MONDAY",
      second: "08:00:00",
      third: "20:00:00",
    },
    {
      first: "TUESDAY",
      second: "08:00:00",
      third: "20:00:00",
    },
    {
      first: "WEDNESDAY",
      second: "08:00:00",
      third: "20:00:00",
    },
    {
      first: "THURSDAY",
      second: "08:00:00",
      third: "20:00:00",
    },
    {
      first: "FRIDAY",
      second: "08:00:00",
      third: "20:00:00",
    },
    {
      first: "SATURDAY",
      second: "11:00:00",
      third: "14:00:00",
    },
    {
      first: "SUNDAY",
      second: "10:00:00",
      third: "14:00:00",
    },
  ],
  pickUpDay: "TODAY",
  todayPickupStartTime: "08:00:00",
  todayPickupEndTime: "20:00:00",
  stock: 0,
  ratingAverage: 3.0 + (id % 3) * 0.5, // 3.0, 3.5, 4.0 순환
  ratingCount: 3 + (id % 10), // 3-12 순환
  isFavorite: false,
});

// Mock 데이터 생성 (10개)
const stores = Array.from({ length: 10 }, (_, index) => createMockStore(index + 1));

const searchStoreHandlers = [
  http.get(`${baseUrl}/search/store`, async ({ request }) => {
    const url = new URL(request.url);
    const size = Number(url.searchParams.get("size")) || 10;
    const page = Number(url.searchParams.get("page")) || 0;

    const totalCount = stores.length;
    const totalPages = Math.ceil(totalCount / size);

    // 500ms 지연 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 500));

    return HttpResponse.json({
      success: true,
      data: {
        storeList: stores.slice(page * size, (page + 1) * size),
        pageNumber: page,
        pageSize: size,
        totalPages,
        totalCount,
        isLastPage: page === totalPages - 1,
        isFirstPage: page === 0,
      },
    });
  }),
];

export default searchStoreHandlers;
