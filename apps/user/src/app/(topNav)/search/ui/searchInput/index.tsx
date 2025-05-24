import { useSearch } from "@/providers/search";
import Image from "next/image";
import * as styles from "./searchInput.css";

export default function SearchInput() {
  const { inputValue, setInputValue, setIsFocused, handleKeyDown } = useSearch();

  return (
    <div className={styles.searchInputWrapper}>
      <input
        type="text"
        placeholder="검색어를 입력해주세요."
        className={styles.searchInput}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
      />
      <button type="button" className={styles.searchButton}>
        <Image src="/icons/search.svg" alt="search" width={24} height={24} />
      </button>
    </div>
  );
}
