import { http, HttpResponse } from "msw";
import { baseUrl } from "@/mocks/utils";
import type { StoreApiErrorResponse, StoreApiSuccessResponse } from "@/types/searchMap.type";

interface SearchLocationBody {
  viewPoint: {
    latitude: number;
    longitude: number;
  };
}

export const searchMapHandlers = [
  http.post(
    `${baseUrl}/search/location`,
    async (req): Promise<HttpResponse> => {
      const body = (await req.request.json()) as SearchLocationBody;
      const { viewPoint } = body;

      if (!viewPoint) {
        return HttpResponse.json<StoreApiErrorResponse>({ error: "Missing viewPoint" }, { status: 400 });
      }

      return HttpResponse.json<StoreApiSuccessResponse>({
        data: {
          box: {
            topLeft: { latitude: 37.566826, longitude: 126.9786567 },
            bottomRight: { latitude: 37.566826, longitude: 126.9786567 },
          },
          storeList: [
            {
              id: 101,
              name: "카페 도치",
              category: "CAFE",
              distance: 174.2,
              address: "서울특별시 강남구 테헤란로 124",
              latitude: 37.566826,
              longitude: 126.9786567,
              isOpen: true,
            },
            {
              id: 102,
              name: "카페 유어스",
              category: "CAFE",
              distance: 432.5,
              address: "서울 강남구 봉은사로 45",
              latitude: 37.503521,
              longitude: 127.038845,
              isOpen: false,
            },
            {
              id: 103,
              name: "카페 유어스",
              category: "CAFE",
              distance: 432.5,
              address: "서울 강남구 봉은사로 45",
              latitude: 37.474140,
              longitude: 126.88989,
              isOpen: true,
            },
            {
              id: 104,
              name: "카페 유어스",
              category: "CAFE",
              distance: 432.5,
              address: "서울 강남구 봉은사로 45",
              latitude: 37.475911,
              longitude: 126.892576,
              isOpen: false,
            },
          ],
        },
      });
    }
  ),
];
