"use client";

import Image from "next/image";
import { useRef } from "react";
import * as styles from "./images.css";

const MAX_IMAGES = 3;

export interface ImageData {
  preview: string; // Base64 이미지 데이터
  file: {
    fileName: string;
    contentType: string;
    folderPath: string;
  };
  origin: File;
}

interface ReviewImagesProps {
  images: ImageData[];
  onChange: (images: ImageData[]) => void;
}

export default function ReviewImages({ images, onChange }: ReviewImagesProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: ImageData[] = [];
    for (let i = 0; i < files.length; i++) {
      if (images.length + newImages.length >= MAX_IMAGES) break;

      const file = files[i];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            const imageData: ImageData = {
              preview: e.target.result as string,
              origin: file,
              file: {
                fileName: file.name,
                contentType: file.type,
                folderPath: "reviews", // 기본 폴더 경로 설정
              },
            };
            newImages.push(imageData);
            if (
              newImages.length === files.length ||
              images.length + newImages.length === MAX_IMAGES
            ) {
              onChange([...images, ...newImages].slice(0, MAX_IMAGES));
            }
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>사진 첨부</label>
      <div className={styles.uploadContainer}>
        {images.map((image, index) => (
          <div key={`${index}-${image.file.fileName}`} className={styles.previewContainer}>
            <Image
              src={image.preview}
              alt={`리뷰 이미지 ${index + 1}`}
              width={80}
              height={80}
              className={styles.preview}
            />
            <button
              type="button"
              className={styles.removeButton}
              onClick={() => handleRemoveImage(index)}
            >
              ×
            </button>
          </div>
        ))}
        {images.length < MAX_IMAGES && (
          <>
            <button type="button" className={styles.uploadBox} onClick={handleImageClick}>
              <Image
                src="/icons/camera.svg"
                alt="이미지 업로드"
                width={24}
                height={24}
                className={styles.uploadIcon}
              />
              <span className={styles.uploadText}>{images.length}/3</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </>
        )}
      </div>
    </div>
  );
}
