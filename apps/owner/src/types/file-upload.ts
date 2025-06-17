export interface FileUploadResponse {
  preSignedUrl: string;
  s3Key: string;
}

export interface FileUploadRequest {
  fileName: string;
  contentType: string;
  folderPath: string;
}
