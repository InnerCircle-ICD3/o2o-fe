import Image from "next/image";
import * as styles from "../page.css";

export const LoadingMap = () => {
  return (
    <div className={styles.loadingMap}>
      <Image src="/images/character2.png" alt="loading" width={100} height={100} />
      <div className={styles.loadingMapText}>지도를 불러오는 중입니다...</div>
    </div>
  );
};
