import * as style from "./storesDetail.css";

export default function StoreDetailLayout({ children }: { children: React.ReactNode }) {
  return <section className={style.container}>{children}</section>;
}
