"use client";

import { useToastStore } from "@/stores/useToastStore";
import { useEffect, useState } from "react";
import * as styles from "./toastMessage.css";

export function ToastMessage() {
  const { message, isVisible, isError, hideToast } = useToastStore();
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsFading(false);
      const timer = setTimeout(() => {
        setIsFading(true);
        setTimeout(hideToast, 300);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, hideToast]);

  if (!isVisible) return null;

  return (
    <div
      className={`${styles.toastContainer} ${isError ? styles.errorToast : styles.successToast} ${
        isFading ? styles.fadeOut : styles.fadeIn
      }`}
    >
      {message}
    </div>
  );
}
