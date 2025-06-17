import { apiClient } from "@/apis/client";
import type { Recommendation, SearchResult } from "@/types/apis/search.type";
import { useEffect, useState } from "react";
import { useQuery } from "../utils/useQuery";

interface UseSearchRecommendationsResult {
  recommendations: Recommendation[];
}

const searchRecommendations = (searchTerm: string) => {
  return apiClient.get<SearchResult>(`search/suggestions?keyword=${searchTerm}`);
};

export const useSearchRecommendations = (searchTerm: string): UseSearchRecommendationsResult => {
  const [search, setSearch] = useState<string>("");
  const { data: searchValue } = useQuery<SearchResult>({
    queryKey: ["searchRecommendations", search],
    queryFn: () => searchRecommendations(search),
    enabled: !!search,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return { recommendations: searchValue?.success ? searchValue.data.suggestionList : [] };
};
