import { api } from "@/apis/client";
import { toSafeResult } from "@/apis/utils/result";
import type { FileUploadRequest } from "@/types/file-upload";

export const uploadFile = async (data: FileUploadRequest) => {
  return await toSafeResult(() => api.post("image/presigned-url", data));
};
