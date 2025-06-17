import { useSearchHistoryStore } from "@/stores/searchHistoryStore";
import { useFilterTab } from "@/stores/useFilterTab";
import { useState } from "react";
import { useSearchRecommendations } from "../api/useSearchRecommendations";

export const useAutoComplete = () => {
  const { search } = useFilterTab();
  const [inputValue, setInputValue] = useState(search || "");
  const [isFocused, setIsFocused] = useState(false);

  const { searchHistory, addSearchHistory, removeSearchHistory, clearSearchHistory } =
    useSearchHistoryStore();
  const { recommendations } = useSearchRecommendations(inputValue);

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
    finalSuggestions: [...recommendations].slice(0, 5),
    searchHistory,
    handleSelect,
    handleKeyDown,
    removeSearchHistory,
    clearSearchHistory,
    handleRemoveSearchHistory,
  };
};
