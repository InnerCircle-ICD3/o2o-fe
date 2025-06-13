import { useEffect, useRef } from "react";

const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

interface Options {
  address: string;
  onSuccess: (coords: { latitude: string; longitude: string }) => void;
}

export const useAddressToCoordinates = ({ address, onSuccess }: Options) => {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const prevAddressRef = useRef<string>("");

  useEffect(() => {
    if (!address || address === prevAddressRef.current) return;

    prevAddressRef.current = address;

    // 이전 타임아웃 취소
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 디바운스 적용
    timeoutRef.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`,
          {
            headers: {
              Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
            },
          },
        );

        const data = await response.json();
        if (data.documents?.length > 0) {
          const { x, y } = data.documents[0];
          onSuccess({ latitude: y, longitude: x });
        }
      } catch (error) {
        console.error("주소 변환 중 오류 발생:", error);
      }
    }, 500); // 500ms 디바운스

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [address, onSuccess]);
};
