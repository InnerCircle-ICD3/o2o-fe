"use client";
import { getStoreReviews } from "@/apis/ssr/stores";
import type { StoreReviewResponse } from "@/types/apis/stores.type";
import Image from "next/image";
import { useEffect, useState } from "react";
import * as style from "./storeReview.css";

export const StoreReview = ({ id }: { id: string }) => {
  const [storeReviews, setStoreReviews] = useState<StoreReviewResponse[]>([]);
  const [popup, setPopup] = useState<{
    images: string[];
    mainIdx: number;
  } | null>(null);
  const [imgError, setImgError] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchStoreReviews = async () => {
      const response = await getStoreReviews(id);
      if (response.success) {
        setStoreReviews(response.data.contents);
      }
    };
    fetchStoreReviews();
  }, [id]);

  const handleKeyDown = (e: React.KeyboardEvent | null, callback?: () => void) => {
    if (!e) return;
    if (e.key === "Escape" || e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      if (callback) callback();
    }
  };

  return (
    <>
      {/* 이미지 팝업 모달 */}
      {popup && (
        <div
          className={style.popupOverlay}
          onClick={() => setPopup(null)}
          onKeyDown={(e) => handleKeyDown(e, () => setPopup(null))}
        >
          <div
            className={style.popupContent}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => handleKeyDown(e, () => setPopup(null))}
          >
            <button
              className={style.popupClose}
              type="button"
              onClick={() => setPopup(null)}
              aria-label="닫기"
            >
              ×
            </button>
            {/* 메인 이미지 */}
            {popup.images[popup.mainIdx] ? (
              <img
                src={popup.images[popup.mainIdx]}
                alt="리뷰 이미지 확대"
                className={style.popupMainImage}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <div className={style.popupNoImage}>No Image</div>
            )}
            {/* 썸네일 리스트 */}
            <div className={style.popupThumbnails}>
              {popup.images.map((img, idx) => (
                <img
                  key={img}
                  src={img}
                  alt={`썸네일${idx + 1}`}
                  className={`${style.popupThumbnail}${
                    popup.mainIdx === idx ? ` ${style.popupThumbnailActive}` : ""
                  }`}
                  onClick={() => setPopup({ ...popup, mainIdx: idx })}
                  onKeyDown={(e) => handleKeyDown(e, () => setPopup({ ...popup, mainIdx: idx }))}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className={style.reviewList}>
        {storeReviews.map((review) => (
          <div key={review.id} className={style.reviewCard}>
            <div className={style.reviewImageBox}>
              {review.images?.[0] && !imgError[review.id] ? (
                <Image
                  src={review.images[0]}
                  alt="리뷰 이미지"
                  className={style.reviewImage}
                  onClick={() => setPopup({ images: review.images, mainIdx: 0 })}
                  onError={() => setImgError((prev) => ({ ...prev, [review.id]: true }))}
                  width={80}
                  height={80}
                />
              ) : (
                <div className={style.reviewImageEmpty}>No Image</div>
              )}
            </div>
            <div className={style.reviewContent}>
              <div className={style.reviewStars}>
                {Array.from({ length: 5 }).map((_, i) =>
                  i < review.score ? (
                    <Image
                      key={`${review.id}_star_${i}`}
                      src="/icons/star.svg"
                      alt="별"
                      width={18}
                      height={18}
                    />
                  ) : (
                    <Image
                      key={`${review.id}_star_empty_${i}`}
                      src="/icons/star-empty.svg"
                      alt="빈별"
                      width={18}
                      height={18}
                    />
                  ),
                )}
              </div>
              <div className={style.reviewNickname}>{review.nickname}</div>
              <div className={style.reviewText}>{review.content}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
