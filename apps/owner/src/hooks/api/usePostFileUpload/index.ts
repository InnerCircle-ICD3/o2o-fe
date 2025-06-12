// utils/uploadImage.ts
import { uploadFile } from "@/apis/ssr/file-upload";
import { useMutation } from "@tanstack/react-query";

/**
 * S3 presigned URL을 받아오는 커스텀 훅
 * @returns { mutate, mutateAsync, isPending, isError, error, data }
 */
const usePostFileUpload = () => {
  const { mutate, mutateAsync, isPending, isError, error, data } = useMutation({
    mutationFn: async ({
      file,
      folderPath,
    }: {
      file: File;
      folderPath: string;
    }) => {
      const fileName = `store_${Date.now()}.${file.name.split(".").pop() || "jpg"}`;
      const contentType = file.type || "image/jpeg";
      const fileResult = await uploadFile({ fileName, contentType, folderPath });
      if (!fileResult.success) {
        throw new Error("presignedUrl 요청 실패");
      }
      return (fileResult.data as { preSignedUrl: string }).preSignedUrl;
    },
    onError: (error) => {
      console.error("presignedUrl 요청 실패", error);
    },
  });

  return {
    mutate, // (params: { file: File, folderPath: string })
    mutateAsync,
    isPending,
    isError,
    error,
    data, // presignedUrl(string)
  };
};

export default usePostFileUpload;
