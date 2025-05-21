import Image from "next/image";
import * as styles from "./mainHeader.css";

export default function MainHeader() {
  return (
    <header className={styles.mainHeader}>
      <div className={styles.mainHeaderLeft}>
        <Image src="/icons/store.svg" alt="store" width={24} height={24} />
        <h1 className={styles.mainTitle}>모든 지역의 가게</h1>
      </div>
      <div className={styles.mainHeaderRight}>
        <button type="button">
          <Image src="/icons/notice.svg" alt="notice" width={24} height={24} />
        </button>
        <button type="button">
          <Image src="/icons/bookmark.svg" alt="bookmark" width={24} height={24} />
        </button>
        <button type="button">
          <Image src="/icons/search.svg" alt="search" width={24} height={24} />
        </button>
      </div>
    </header>
  );
}
