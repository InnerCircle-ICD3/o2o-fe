import { baseUrl } from "@/mocks/utils";
import type { MapStore } from "@/types/locations.type";
import { http, HttpResponse } from "msw";

const storeList: MapStore[] = [
  {
    storeId: 101,
    storeName: "카페 도치",
    coordinate: {
      latitude: 37.566826,
      longitude: 126.9786567,
    },
  },
  {
    storeId: 105,
    storeName: "025BAKERY",
    coordinate: {
      latitude: 37.541199,
      longitude: 127.051778,
    },
  },
  {
    storeId: 107,
    storeName: "한양대 CAFE",
    coordinate: {
      latitude: 37.554915,
      longitude: 127.044838,
    },
  },
  {
    storeId: 108,
    storeName: "뚝섬 CAFE",
    coordinate: {
      latitude: 37.547976,
      longitude: 127.04712,
    },
  },
  {
    storeId: 109,
    storeName: "카페 도치",
    coordinate: {
      latitude: 37.555918,
      longitude: 127.058035,
    },
  },
  {
    storeId: 110,
    storeName: "밀도 BAKERY",
    coordinate: {
      latitude: 37.5432,
      longitude: 127.0491,
    },
  },
  {
    storeId: 111,
    storeName: "빵집 오월",
    coordinate: {
      latitude: 37.5467,
      longitude: 127.0533,
    },
  },
  {
    storeId: 112,
    storeName: "브레드 앤 커피",
    coordinate: {
      latitude: 37.5446,
      longitude: 127.0571,
    },
  },
  {
    storeId: 113,
    storeName: "소금빵연구소",
    coordinate: {
      latitude: 37.5409,
      longitude: 127.0502,
    },
  },
  {
    storeId: 114,
    storeName: "베이커리 도토루",
    coordinate: {
      latitude: 37.5484,
      longitude: 127.0568,
    },
  },
];

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

const searchMapHandlers = [
  http.get(`${baseUrl}/search/store/map`, async (req): Promise<HttpResponse> => {
    const url = new URL(req.request.url);
    const latitude = Number(url.searchParams.get("latitude"));
    const longitude = Number(url.searchParams.get("longitude"));

    if (!latitude || !longitude) {
      return HttpResponse.json(
        {
          success: false,
          errorCode: "MISSING_PARAMETERS",
          errorMessage: "latitude와 longitude가 누락되었습니다.",
        },
        { status: 400 },
      );
    }

    const filteredStoreList = storeList.filter((store) => {
      const distance = getDistanceInMeters(
        latitude,
        longitude,
        store.coordinate.latitude,
        store.coordinate.longitude,
      );
      return distance <= 1000;
    });

    return HttpResponse.json({
      success: true,
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
