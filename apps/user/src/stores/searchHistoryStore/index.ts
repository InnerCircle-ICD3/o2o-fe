import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SearchHistoryStore {
  searchHistory: string[];
  addSearchHistory: (keyword: string) => void;
  removeSearchHistory: (keyword: string) => void;
  clearSearchHistory: () => void;
}

export const useSearchHistoryStore = create<SearchHistoryStore>()(
  persist(
    (set) => ({
      searchHistory: [],
      addSearchHistory: (keyword: string) =>
        set((state) => {
          const deduped = state.searchHistory.filter((item) => item !== keyword);
          const updated = [keyword, ...deduped].slice(0, 10); // 최신순 + 10개 제한
          return { searchHistory: updated };
        }),
      removeSearchHistory: (keyword: string) =>
        set((state) => ({ searchHistory: state.searchHistory.filter((item) => item !== keyword) })),
      clearSearchHistory: () => set({ searchHistory: [] }),
    }),
    { name: "searchHistory", storage: createJSONStorage(() => localStorage) },
  ),
);
