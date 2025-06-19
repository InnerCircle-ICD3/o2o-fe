"use client";

import Button from "@/components/common/button";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useKakaoLoader } from "@/hooks/useKakaoLoader";
import { useSelectedAddressStore } from "@/stores/selectedAddressStore";
import type { Coordinate, SearchAddressResult } from "@/types/locations.type";
import { getFullAddressByCoords, searchAddress } from "@/utils/locations";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as styles from "./addressSearch.css";

export default function AddressSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchAddressResult[]>([]);
  const location = useGeolocation();
  const isLoaded = useKakaoLoader();
  const router = useRouter();
  const setSelectedAddress = useSelectedAddressStore((state) => state.setSelectedAddress);
  const searchParams = useSearchParams();
  const addressType = (searchParams.get("address_type") || "HOME") as "HOME" | "WORK";

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query) {
        const res = await searchAddress(query);
        setResults(res);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = async (location: Coordinate) => {
    if (!location || !isLoaded) return;

    try {
      const address = await getFullAddressByCoords(location.lat, location.lng);

      if (address) {
        setSelectedAddress(address, addressType);
        router.push(`/locations/my-location?address_type=${addressType}`);
      }
    } catch (error) {
      console.error("지역 정보를 가져오는 데 실패했습니다:", error);
    }
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder="동네 이름을 검색하세요"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul className={styles.resultList}>
        <Button status="primary" onClick={() => handleSelect(location)} style={{ height: "40px" }}>
          <div className={styles.buttonContent}>
            <Image src="/icons/my_location_white.svg" alt="" width={24} height={24} />
            현재 위치로 등록
          </div>
        </Button>
        {results.map((item, index) => (
          <li
            key={`${item.address}-${index}`}
            className={styles.resultItem}
            onClick={() => handleSelect(item.location)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSelect(item.location);
            }}
          >
            {item.address}
          </li>
        ))}

        {query && results.length === 0 && (
          <li className={styles.noResultItem}>검색 결과가 없습니다</li>
        )}
      </ul>
    </div>
  );
}
