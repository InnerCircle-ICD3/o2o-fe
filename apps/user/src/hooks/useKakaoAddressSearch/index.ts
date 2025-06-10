import { searchAddress } from "@/utils/locations";
import { useEffect, useState } from "react";

export function useKakaoAddressSearch(query: string) {
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        searchAddress(query).then((results) => setResults(results.map((r) => r.address)));
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return results;
}
