import { useSearch } from "@/providers/search";
import { useFilterTab } from "@/stores/useFilterTab";
import Image from "next/image";
import * as styles from "./searchResult.css";

interface SearchResultProps {
  onSubmit: () => void;
}

export default function SearchResult(props: SearchResultProps) {
  const { onSubmit } = props;
  const { searchHistory, finalSuggestions, setInputValue, handleRemoveSearchHistory } = useSearch();
  const { onSearchChange } = useFilterTab();

  const handleSearch = (value: string) => {
    onSearchChange(value);
    setInputValue(value);
    onSubmit();
  };

  return (
    <>
      {finalSuggestions.length !== 0 && (
        <ol className={styles.recommendSearchContainer}>
          <h2 className={styles.searchTitle}>추천 검색어</h2>
          {finalSuggestions.map((suggestion, index) => {
            return (
              <li className={styles.listStyle} key={suggestion.storeId}>
                <button
                  className={styles.listItemButton}
                  type={"button"}
                  onClick={() => handleSearch(suggestion.value)}
                >
                  <span className={styles.emphasize}>{index + 1}</span>
                  <span>{suggestion.value}</span>
                </button>
              </li>
            );
          })}
        </ol>
      )}
      <ul className={styles.recentSearchContainer}>
        <h2 className={styles.searchTitle}>최근 검색어</h2>
        {searchHistory.map((history, index) => (
          <li key={`${index}-${history}`} className={styles.listStyle}>
            <button
              className={styles.listItemButton}
              type={"button"}
              onClick={() => handleSearch(history)}
            >
              <span className={styles.listItemText}>
                <Image src={"/icons/clock.svg"} alt="recent" width={14} height={14} />
                {history}
              </span>
            </button>
            <button type="button" onClick={() => handleRemoveSearchHistory(history)}>
              <Image src={"/icons/btn_close.svg"} alt="close" width={14} height={14} />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
