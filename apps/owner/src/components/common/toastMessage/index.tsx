"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

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
      className={cn(
        "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        "text-white px-6 py-3 rounded-lg",
        "transition-opacity duration-300",
        isFading ? "opacity-0" : "opacity-100",
        isError ? "bg-red-900/80" : "bg-black/80",
      )}
    >
      {message}
    </div>
  );
}
