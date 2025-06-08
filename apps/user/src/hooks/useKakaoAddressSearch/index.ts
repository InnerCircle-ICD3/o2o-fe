import { searchAddress } from "@/utils/locations/locationUtils";
import { useEffect, useState } from "react";

export function useKakaoAddressSearch(query: string) {
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        searchAddress(query).then(setResults);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return results;
}
