import { useSearchHistoryStore } from "@/stores/searchHistory/searchHistoryStore";
import { useMemo, useState } from "react";
import { useSearchRecommendations } from "./useSearchRecommendations";

export const useAutoComplete = () => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const { searchHistory, addSearchHistory, removeSearchHistory, clearSearchHistory } =
    useSearchHistoryStore();
  const { recommendations } = useSearchRecommendations(inputValue);

  const finalSuggestions = useMemo(() => {
    if (!inputValue.trim()) return searchHistory;

    const filteredHistory = searchHistory.filter((item) =>
      item.toLowerCase().includes(inputValue.toLowerCase()),
    );
    const dedupedRecommendations = recommendations.filter(
      (item) => !filteredHistory.includes(item),
    );

    return [...filteredHistory, ...dedupedRecommendations].slice(0, 10);
  }, [inputValue, searchHistory, recommendations]);

  const handleSelect = (value: string) => {
    addSearchHistory(value);
    setInputValue(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      addSearchHistory(inputValue.trim());
    }
  };

  const handleRemoveSearchHistory = (value: string) => {
    removeSearchHistory(value);
  };

  return {
    inputValue,
    setInputValue,
    isFocused,
    setIsFocused,
    finalSuggestions,
    searchHistory,
    handleSelect,
    handleKeyDown,
    removeSearchHistory,
    clearSearchHistory,
    handleRemoveSearchHistory,
  };
};
