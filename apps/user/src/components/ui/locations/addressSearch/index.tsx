"use client";

import type { SearchAddressResult } from "@/types/locations.type";
import { searchAddress } from "@/utils/locations/locationUtils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as styles from "./addressSearch.css";

export default function LocationSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchAddressResult[]>([]);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query) {
        const res = await searchAddress(query);
        console.log(res);
        setResults(res);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (selected: SearchAddressResult) => {
    // 예시: 쿼리 문자열로 주소만 전달
    router.push(`/locations/my-location?selectedRegion=${encodeURIComponent(selected.address)}`);

    // 또는 sessionStorage/zustand 등에 selected 저장 가능
    // sessionStorage.setItem("selectedRegion", JSON.stringify(selected));
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
        {results.map((item, index) => (
          <li
            key={`${item.address}-${index}`}
            className={styles.resultItem}
            onClick={() => handleSelect(item)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSelect(item);
            }}
          >
            {item.address}
          </li>
        ))}
      </ul>
    </div>
  );
}
