import { uploadFile } from "@/apis/ssr/file-upload";
import type { FileUploadResponse } from "@/types/file-upload";

export const getS3UploadUrl = async (file: File, folderPath: string) => {
  if (!file || typeof file === "string") {
    throw new Error("파일이 없습니다.");
  }
  const realFile = file as File;
  const result = await uploadFile({
    fileName: realFile.name,
    contentType: realFile.type,
    folderPath: folderPath,
  });

  if (!result.success) {
    alert("파일 업로드에 실패했습니다.");
    return;
  }

  const { preSignedUrl } = result.data as FileUploadResponse;

  //s3 업로드 로직 추가
  const response = await fetch(preSignedUrl, {
    method: "PUT",
    headers: { "Content-Type": realFile.type || "image/jpeg" },
    body: realFile,
  });
  if (!response.ok) {
    alert("S3 업로드 실패");
    return null;
  }

  const imageUrl = preSignedUrl.split("?")[0];
  return imageUrl;
};
