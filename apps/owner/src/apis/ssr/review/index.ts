import { apiClient } from "@/apis/client";
import { toSafeResult } from "@/apis/utils/result";
import type { StoreFormData } from "@/types/store";

export interface Review {
  id: number;
  orderId: number;
  content: string;
  images: string[];
  score: number;
  nickname: string;
  createdAt: string;
}

interface ReviewResponse {
  contents: Review[];
  lastId: number;
}

export const postStore = async (storeOwnerId: string, data: StoreFormData) => {
  return await toSafeResult(() =>
    apiClient.post<StoreFormData>(`stores?storeOwnerId=${storeOwnerId}`, data),
  );
};

export const getReviews = async (storeId: number, storeOwnerId: number) => {
  return await toSafeResult(() =>
    apiClient.get<ReviewResponse>(`stores/${storeId}/reviews?storeOwnerId=${storeOwnerId}`),
  );
};
