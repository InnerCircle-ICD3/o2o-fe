"use client";

import ErrorUi from "@/components/common/errorUi";
import * as style from "./not-found.css";

const NotFound = () => {
  return (
    <div className={style.container}>
      <ErrorUi message="잘못 찾아오셨어요!" />
    </div>
  );
};

export default NotFound;
