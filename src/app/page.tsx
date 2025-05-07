"use client";

import Counter from "@/app/components/sample/Counter";
import * as styles from "./page.css";
export default function Home() {
  return (
    <div className={styles.myStyle}>
      <h1>Home</h1>
      <Counter />
    </div>
  );
}
