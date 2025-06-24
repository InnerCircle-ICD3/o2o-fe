"use client";
import { getReviews } from "@/apis/ssr/review";
import type { Review } from "@/apis/ssr/review";
import { formatLocalizedDate } from "@/apis/utils/format";
import StoreRegisterLink from "@/components/common/storeRegisterLink";
import RegisterLink from "@/components/common/storeRegisterLink";
import { Card, CardContent } from "@/components/ui/card";
import useGetOwnerStore from "@/hooks/api/useGetOwnerStore";
import { useOwnerStore } from "@/stores/ownerInfoStore";
import { Star, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ReviewCardProps {
  nickname: string;
  createdAt: string;
  content: string;
  score: number;
  images: string[];
  onImageClick: (image: string) => void;
}

export default function page() {
  const { owner } = useOwnerStore();
  const { data: storeData } = useGetOwnerStore();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!storeData?.id || !owner?.storeOwnerId) return;
      const result = await getReviews(storeData?.id, owner?.storeOwnerId);
      if (result.success) {
        setReviews(result.data.contents);
      }
    };
    fetchReviews();
  }, []);

  if (!owner?.storeOwnerId) {
    return <RegisterLink />;
  }

  if (!storeData) {
    return <StoreRegisterLink />;
  }

  return (
    <div>
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          nickname={review.nickname}
          createdAt={review.createdAt}
          content={review.content}
          score={review.score}
          images={review.images}
          onImageClick={setSelectedImage}
        />
      ))}
      {reviews.length === 0 && <div>리뷰가 없습니다.</div>}
      {/* 이미지 팝업 */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setSelectedImage(null);
            }
          }}
        >
          <button
            type="button"
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.stopPropagation();
                setSelectedImage(null);
              }
            }}
          >
            <button
              type="button"
              className="absolute -top-4 -right-4 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100"
              onClick={() => setSelectedImage(null)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  e.stopPropagation();
                  setSelectedImage(null);
                }
              }}
            >
              <X className="w-6 h-6" />
            </button>
            <Image
              src={selectedImage}
              alt="review full size"
              width={800}
              height={800}
              className="rounded-lg object-contain max-h-[90vh]"
            />
          </button>
        </div>
      )}
    </div>
  );
}

const ReviewCard = ({
  nickname,
  createdAt,
  content,
  score,
  images,
  onImageClick,
}: ReviewCardProps) => {
  return (
    <Card className="w-full max-w-md p-4 rounded-2xl shadow-md mb-4">
      <CardContent className="flex flex-col gap-3 p-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">{nickname}</p>
            <p className="text-sm text-muted-foreground">{formatLocalizedDate(createdAt)}</p>
          </div>
          <div className="flex items-center gap-1 text-yellow-500">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={`star-${i}-${score}`}
                className={`w-4 h-4 ${i < score ? "fill-yellow-500" : "text-gray-300"}`}
              />
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-800">{content}</p>
        <div className="flex flex-wrap gap-2">
          {images.map((image) => (
            <button
              key={`review-image-${image}`}
              type="button"
              className="relative w-[100px] h-[100px] rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => image && onImageClick(image)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  image && onImageClick(image);
                }
              }}
            >
              {image ? (
                <Image src={image} alt="review" fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span className="text-sm">No image</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
