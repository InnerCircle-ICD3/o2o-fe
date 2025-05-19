import { useAutoComplete } from "@/hooks/useAutoComplete";
import * as styles from "./autoComplete.css";

export const AutoComplete = () => {
  const {
    inputValue,
    setInputValue,
    isFocused,
    setIsFocused,
    finalSuggestions,
    handleSelect,
    handleKeyDown,
    handleRemoveSearchHistory,
    clearSearchHistory,
    searchHistory,
  } = useAutoComplete();

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.input}
        placeholder="검색어를 입력하세요"
        value={inputValue}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 100)} // blur 이후 선택 허용
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {isFocused && (
        <ul className={styles.dropdown}>
          {finalSuggestions.length === 0 ? (
            <li className={styles.emptyMessage}>검색 기록이 없습니다</li>
          ) : (
            finalSuggestions.map((item) => {
              const isFromHistory = searchHistory.includes(item);
              return (
                <li
                  key={item}
                  className={styles.suggestionItem}
                  onMouseDown={(e) => {
                    // 버튼을 눌렀을 때는 처리하지 않음
                    if ((e.target as HTMLElement).closest("button")) return;
                    handleSelect(item);
                  }}
                >
                  <span>
                    {item}
                    <span className={styles.tagLabel}>{isFromHistory ? "기록" : "추천"}</span>
                  </span>
                  {isFromHistory && (
                    <button
                      type="button"
                      className={styles.clearButton}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemoveSearchHistory(item);
                      }}
                    >
                      ✖️
                    </button>
                  )}
                </li>
              );
            })
          )}

          {searchHistory.length > 0 && (
            <li className={styles.clearButtonContainer}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  clearSearchHistory();
                }}
                className={styles.clearButton}
              >
                전체 삭제
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
