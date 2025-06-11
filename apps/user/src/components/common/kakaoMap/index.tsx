import { memo, useEffect, useRef } from "react";
import * as styles from "./kakaoMap.css";

interface KakaoMapProps {
  /**
   * 지도 중심에 사용할 위도 값 (ex: 37.5665)
   */
  lat: number;

  /**
   * 지도 중심에 사용할 경도 값 (ex: 126.9780)
   */
  lng: number;

  /**
   * 지도가 이동/확대/축소 후 정지했을 때 호출되는 콜백
   * 지도 중심 좌표가 바뀌었는지 확인하는 데 유용함
   */
  onMapIdle?: (map: kakao.maps.Map) => void | Promise<void>;

  /**
   * 지도가 최초 로드되었을 때 호출되는 콜백
   * 지도 인스턴스를 외부에서 저장하거나 초기 fetch 등에 사용
   */
  onMapReady?: (map: kakao.maps.Map) => void | Promise<void>;
}

/**
 * 카카오 지도를 렌더링하는 공통 컴포넌트
 *
 * 지도 중심 좌표(`lat`, `lng`)를 기준으로 지도를 생성하고,
 * `onMapIdle`, `onMapReady` 콜백을 통해 상호작용을 제공합니다.
 *
 * 이 컴포넌트는 공통적으로 지도가 필요한 페이지에서 사용할 수 있으며,
 * 지도를 직접 제어하거나 마커를 렌더링하는 로직은 부모에서 수행합니다.
 */
export const KakaoMap = memo(({ lat, lng, onMapIdle, onMapReady }: KakaoMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<kakao.maps.Map | null>(null);
  const isInitialized = useRef(false);

  // 지도 초기화
  useEffect(() => {
    if (!kakao?.maps?.Map || !mapRef.current || isInitialized.current) return;

    const kakaoMaps = kakao.maps;
    const center = new kakaoMaps.LatLng(lat, lng);
    const map = new kakaoMaps.Map(mapRef.current, {
      center,
      level: 3,
    });

    map.setMinLevel(1);
    map.setMaxLevel(6);

    mapInstance.current = map;
    isInitialized.current = true;

    kakaoMaps.event.addListener(map, "idle", () => {
      onMapIdle?.(map);
    });

    onMapReady?.(map);
  }, [onMapIdle, onMapReady, lat, lng]);

  // 위치 업데이트
  useEffect(() => {
    if (!mapInstance.current || !isInitialized.current) return;

    const center = new kakao.maps.LatLng(lat, lng);
    mapInstance.current.setCenter(center);
  }, [lat, lng]);

  return <div ref={mapRef} className={styles.kakaoMap} />;
});
