import Image from "next/image";
import * as styles from "./page.css";

export default function Page() {
  return (
    <section className={styles.sectionContainerStyle}>
      <div className={styles.recommendationStyle}>
        <ol>
          <h2>
            추천 검색어 <span>Top 3</span>
          </h2>
          {["김밥", "피자", "반찬"].map((item) => (
            <li key={item}>
              <button type="button">
                <span>{item}</span>
                <Image src="/icons/search.svg" alt="search" width={24} height={24} />
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.searchHistoryStyle}>
        <ul>
          <li>
            <button type="button">
              <span>최근 검색어</span>
              <Image src="/icons/search.svg" alt="search" width={24} height={24} />
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
}
