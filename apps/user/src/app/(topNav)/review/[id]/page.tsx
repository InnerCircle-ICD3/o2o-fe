"use client";

import { getReview } from "@/apis/ssr/review";
import type { Result } from "@/apis/types";
import { RATING_TEXTS } from "@/app/(topNav)/review/register/constants";
import ErrorUi from "@/components/common/errorUi";
import SkeletonStoreCard from "@/components/ui/storeList/storeCard/skeletonStoreCard";
import * as globalStyle from "@/styles/global.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import * as styles from "./page.css";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface ReviewData {
  id: number;
  content: string;
  score: number;
  images: string[];
}

interface ImageError {
  [key: string]: boolean;
}

export default function Page(props: PageProps) {
  const [review, setReview] = useState<ReviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<ImageError>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { id } = await props.params;
        const response = (await getReview(id)) as Result<ReviewData>;

        if (!response.success) {
          if (response.statusCode === 404) {
            notFound();
          }
          throw new Error(response.message);
        }

        setReview(response.data);
      } catch (error) {
        setError("리뷰를 불러오는데 실패했습니다.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [props.params]);

  const handleImageError = (imageUrl: string) => {
    setImageErrors((prev) => ({ ...prev, [imageUrl]: true }));
  };

  if (loading)
    return (
      <div className={globalStyle.innerPadding}>
        <SkeletonStoreCard hasImage={false} textLength={3} />
      </div>
    );
  if (error) return <ErrorUi message={error} />;
  if (!review) return null;

  return (
    <div className={globalStyle.innerPadding}>
      <div className={styles.container}>
        <div className={styles.ratingContainer}>
          <div className={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((rating) => (
              <div key={rating} className={styles.starButton}>
                <Image
                  src={`/icons/star${rating <= review.score ? "" : "-empty"}.svg`}
                  alt={`${rating}점`}
                  width={32}
                  height={32}
                />
              </div>
            ))}
          </div>
          <span className={styles.ratingText}>{RATING_TEXTS[review.score - 1]}</span>
        </div>

        <div className={styles.contentContainer}>
          <p className={styles.content}>{review.content}</p>
        </div>

        {review.images.length > 0 && (
          <div className={styles.imageContainer}>
            <div className={styles.imageGrid}>
              {review.images.map((image, index) => (
                <div key={`${index}-${image}`} className={styles.imageWrapper}>
                  {imageErrors[image] ? (
                    <div className={styles.imageError}>
                      <Image
                        src="/icons/image-error.svg"
                        alt="이미지를 불러올 수 없습니다"
                        width={48}
                        height={48}
                        className={styles.errorIcon}
                      />
                      <span className={styles.errorText}>이미지를 불러올 수 없습니다</span>
                    </div>
                  ) : (
                    <Image
                      src={image}
                      alt={`리뷰 이미지 ${index + 1}`}
                      width={200}
                      height={200}
                      className={styles.image}
                      onError={() => handleImageError(image)}
                      unoptimized
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
