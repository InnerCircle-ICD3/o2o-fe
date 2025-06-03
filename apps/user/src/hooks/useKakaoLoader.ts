import { useEffect, useState } from "react";

export const useKakaoLoader = (): boolean => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window?.kakao?.maps) {
      setIsLoaded(true);
      return;
    }

    const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false&libraries=services`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsLoaded(true);
      });
    };
  }, []);

  return isLoaded;
};
