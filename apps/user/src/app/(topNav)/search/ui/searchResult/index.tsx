import { useSearch } from "@/providers/search";
import Image from "next/image";
import * as styles from "./searchResult.css";

export default function SearchResult() {
  const { searchHistory, finalSuggestions, handleRemoveSearchHistory } = useSearch();

  return (
    <>
      <ol className={styles.recommendSearchContainer}>
        <h2 className={styles.searchTitle}>
          추천 검색어 <span className={styles.emphasize}>Top 3</span>
        </h2>
        {finalSuggestions.slice(0, 3).map((suggestion, index) => {
          return (
            <li className={styles.listStyle} key={suggestion}>
              <span className={styles.emphasize}>{index + 1}</span>
              <span>{suggestion}</span>
            </li>
          );
        })}
      </ol>
      <ul className={styles.recentSearchContainer}>
        <h2 className={styles.searchTitle}>최근 검색어</h2>
        {searchHistory.map((history, index) => (
          <li key={`${index}-${history}`} className={styles.listStyle}>
            <Image src={"/icons/clock.svg"} alt="recent" width={14} height={14} />
            <span className={styles.listItemText}>{history}</span>
            <button type="button" onClick={() => handleRemoveSearchHistory(history)}>
              <Image src={"/icons/btn_close.svg"} alt="close" width={14} height={14} />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
