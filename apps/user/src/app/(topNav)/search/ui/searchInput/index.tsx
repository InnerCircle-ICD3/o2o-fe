import Image from "next/image";
import * as styles from "./searchInput.css";

export default function SearchInput() {
  return (
    <div className={styles.containerStyle}>
      <input className={styles.inputStyle} type="text" placeholder="검색어를 입력해주세요" />
      <button type="button">
        <Image src="/icons/search.svg" alt="search" width={24} height={24} />
      </button>
    </div>
  );
}
