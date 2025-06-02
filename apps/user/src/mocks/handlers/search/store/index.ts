import { baseUrl } from "@/mocks/utils";
import type { StoreList } from "@/types/apis/stores.type";
import { http, HttpResponse } from "msw";
// Mock 데이터 생성
const stores = Array.from(Array(1024).keys()).map(
  (id): StoreList => ({
    storeId: id,
    storeName: `store ${id}`,
    storeImage: "/images/thumb6.png",
    category: ["김밥", "주먹밥", "가정식"],
    distanceKm: 0.1,
    open: true,
    stock: 10,
    roadAddress: {
      addressName: "string",
      zoneNo: "string",
      buildingName: "string",
    },
    lotAddress: {
      addressName: "string",
      mainAddressNo: "string",
      subAddressNo: "string",
    },
    addressType: "ROAD",
    location: {
      lat: 37.514575,
      lng: 127.049555,
    },
    businessHours: {
      openTime: "2025-05-21T11:00:46.191Z",
      closeTime: "2025-05-21T19:00:46.191Z",
    },
    reviewCount: 1073741824,
    reviewScore: 1.5,
    isFavorite: true,
  }),
);

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
        contents: stores.slice(page * size, (page + 1) * size),
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
