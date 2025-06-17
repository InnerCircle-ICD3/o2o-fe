import { apiClient } from "@/apis/client";
import { toSafeResult } from "@/apis/utils/result";
import type { UserInfo } from "@/types/apis/accounts.type";

export const getReview = async (id: string) => {
  return await toSafeResult(() => apiClient.get<UserInfo>(`orders/${id}/reviews`));
};

export const setReview = async (
  id: string,
  data: { score: number; content: string; images: string[] },
) => {
  return await toSafeResult(() => apiClient.post<UserInfo>(`orders/${id}/reviews`, data));
};
