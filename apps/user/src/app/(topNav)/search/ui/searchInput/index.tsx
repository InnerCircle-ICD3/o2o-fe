import { useSearch } from "@/providers/search";
import { useFilterTab } from "@/stores/useFilterTab";
import Image from "next/image";
import * as styles from "./searchInput.css";

interface SearchInputProps {
  onSubmit: () => void;
}

export default function SearchInput(props: SearchInputProps) {
  const { onSubmit } = props;
  const { inputValue, setInputValue, setIsFocused, handleKeyDown } = useSearch();
  const { onSearchChange } = useFilterTab();

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSearchChange(inputValue.trim());
      onSubmit();
    }
  };

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
      <button type="button" className={styles.searchButton} onClick={handleSubmit}>
        <Image src="/icons/search.svg" alt="search" width={24} height={24} />
      </button>
    </div>
  );
}
