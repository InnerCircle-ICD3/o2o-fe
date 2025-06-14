import { apiClient } from "@/apis/client";
import { toSafeResult } from "@/apis/utils/result";

interface UploadUrlsRequest {
  files: {
    fileName: string;
    contentType: string;
    folderPath: string;
  }[];
}

interface UploadUrlsResponse {
  preSignedUrl: string;
  s3Key: string;
}

export const uploadUrls = async (data: UploadUrlsRequest) => {
  return await toSafeResult(() =>
    apiClient.post<UploadUrlsResponse[]>("image/presigned-urls", data),
  );
};
