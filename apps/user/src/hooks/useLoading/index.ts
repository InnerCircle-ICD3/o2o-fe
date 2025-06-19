import { useEffect, useState } from "react";

const useLoading = (isLoading: boolean) => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 500); // Delay to show loading for at least 500ms

      return () => clearTimeout(timer);
    }

    setShowLoading(true);
  }, [isLoading]);

  return showLoading;
};

export default useLoading;
