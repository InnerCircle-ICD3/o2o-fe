"use client";

import { uploadUrls } from "@/apis/ssr/image-upload";
import { setReview } from "@/apis/ssr/review";
import Button from "@/components/common/button";
import ReviewContent from "@/components/ui/review/content";
import ReviewImages, { type ImageData } from "@/components/ui/review/images";
import Rating from "@/components/ui/review/rating";
import * as globalStyle from "@/styles/global.css";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useState } from "react";
import * as styles from "./page.css";

interface ReviewFormData {
  rating: number;
  content: string;
  files: ImageData[];
}

type FormField = keyof ReviewFormData;

export default function ReviewRegisterPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const router = useRouter();
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 0,
    content: "",
    files: [],
  });

  const handleFormChange = (field: FormField, value: ReviewFormData[FormField]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataToUpload = formData.files.map((file) => ({
      fileName: file.file.fileName,
      contentType: file.file.contentType,
      folderPath: file.file.folderPath,
    }));

    //이미지변환 api 호출
    const getS3UploadUrls = await uploadUrls({ files: formDataToUpload });
    if (!getS3UploadUrls.success) {
      alert("이미지 업로드에 실패했습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    //s3업로드
    await Promise.all(
      formData.files.map(async (fileData, idx) => {
        const response = await fetch(getS3UploadUrls.data[idx].preSignedUrl, {
          method: "PUT",
          headers: { "Content-Type": fileData.file.contentType },
          body: fileData.origin,
        });

        if (!response.ok) {
          console.error(`File ${idx + 1} upload failed: ${response.statusText}`);
        }

        return response;
      }),
    );

    const combineUrls = getS3UploadUrls.data.map((item) => {
      const baseUrl = item.preSignedUrl.split("/reviews")[0];
      return `${baseUrl}/${item.s3Key}`;
    });
    //등록 api 호출
    const result = await setReview(id as string, {
      score: formData.rating,
      content: formData.content,
      images: combineUrls,
    });

    if (result.success) {
      alert("리뷰등록이 완료되었습니다.");
      router.push("/my-orders");
    }
  };

  const isSubmitDisabled =
    formData.rating === 0 || formData.content.length === 0 || formData.files.length === 0;

  return (
    <form onSubmit={handleSubmit} className={globalStyle.innerPadding}>
      <Rating value={formData.rating} onChange={(rating) => handleFormChange("rating", rating)} />
      <div className={styles.section}>
        <ReviewContent
          value={formData.content}
          onChange={(content) => handleFormChange("content", content)}
        />
      </div>
      <div className={styles.section}>
        <ReviewImages
          images={formData.files}
          onChange={(files) => handleFormChange("files", files)}
        />
      </div>
      <div className={styles.section}>
        {isSubmitDisabled ? (
          <Button type="submit" status="disabled" disabled>
            등록하기
          </Button>
        ) : (
          <Button type="submit" status="primary">
            등록하기
          </Button>
        )}
      </div>
    </form>
  );
}
