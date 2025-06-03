import { apiClient } from "@/apis/client";
import type { Result } from "@/apis/types";
import { toSafeResult } from "@/apis/utils/result";
import type { StoreResponseData } from "@/types/searchMap.type";

type ViewPoint = {
  latitude: number;
  longitude: number;
};

export const fetchStoresByCenter = async (
  center: kakao.maps.LatLng,
): Promise<Result<StoreResponseData>> => {
  const viewPoint: ViewPoint = {
    latitude: center.getLat(),
    longitude: center.getLng(),
  };

  return await toSafeResult(() =>
    apiClient.post<StoreResponseData>("search/stores/map", { viewPoint }),
  );
};
