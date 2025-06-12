export interface FileUploadResponse {
  preSignedUrl: string;
}

export interface FileUploadRequest {
  fileName: string;
  contentType: string;
  folderPath: string;
}
