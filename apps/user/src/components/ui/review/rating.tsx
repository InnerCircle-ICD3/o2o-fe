"use client";

import { RATING_TEXTS } from "@/app/(topNav)/review/register/constants";
import Image from "next/image";
import { useState } from "react";
import * as styles from "./rating.css";

export interface RatingProps {
  value: number;
  onChange: (rating: number) => void;
  error?: string;
}

export default function Rating({ value, onChange, error }: RatingProps) {
  const [hoverRating, setHoverRating] = useState<number>(0);

  const displayRating = hoverRating || value;

  return (
    <div className={styles.container}>
      <div className={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            className={styles.starButton}
            onClick={() => onChange(rating)}
            onMouseEnter={() => setHoverRating(rating)}
            onMouseLeave={() => setHoverRating(0)}
          >
            <Image
              src={`/icons/star${rating <= displayRating ? "" : "-empty"}.svg`}
              alt={`${rating}점`}
              width={32}
              height={32}
            />
          </button>
        ))}
      </div>
      {displayRating > 0 && (
        <span className={styles.ratingText}>{RATING_TEXTS[displayRating - 1]}</span>
      )}
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
