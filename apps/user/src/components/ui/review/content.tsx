"use client";

import * as styles from "./content.css";

interface ReviewContentProps {
  value: string;
  onChange: (content: string) => void;
}

export default function ReviewContent({ value, onChange }: ReviewContentProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="review" className={styles.label}>
        리뷰 작성
      </label>
      <textarea
        id="review"
        className={styles.textarea}
        placeholder="음식의 맛, 양, 포장 상태 등 음식에 대한 솔직한 리뷰를 남겨주세요."
        value={value}
        onChange={handleChange}
        maxLength={500}
      />
    </div>
  );
}
