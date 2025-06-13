"use client";

import { useEffect, useState } from "react";
import * as styles from "./toastMessage.css";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  isError?: boolean;
}

export function ToastMessage({ message, isVisible, onClose, isError = false }: ToastProps) {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsFading(false);
      const timer = setTimeout(() => {
        setIsFading(true);
        setTimeout(onClose, 300);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

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
