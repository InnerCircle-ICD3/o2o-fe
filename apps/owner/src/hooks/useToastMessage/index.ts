import { useState } from "react";

export function useToastMessage() {
  const [toastMessage, setToastMessage] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isError, setIsError] = useState(false);

  const showToast = (message: string, isError = false, callback?: () => void) => {
    setIsToastVisible(false);
    setTimeout(() => {
      setToastMessage(message);
      setIsError(isError);
      setIsToastVisible(true);
      setTimeout(() => {
        setIsToastVisible(false);
        if (callback) callback();
      }, 2000);
    }, 100);
  };

  const handleToastClose = () => {
    setIsToastVisible(false);
  };

  return {
    toastMessage,
    isToastVisible,
    isError,
    showToast,
    handleToastClose,
  };
}
