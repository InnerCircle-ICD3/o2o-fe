import type { Info } from "@/types/apis/mypage.type";
import { formatDate } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";
import * as style from "./infoItem.css";

interface InfoItemProps {
  info: Info;
  basePath: string;
}

const InfoItem = (props: InfoItemProps) => {
  const { info, basePath } = props;
  const href = `/mypage/${basePath}/${info.id}`;

  return (
    <li className={style.container}>
      <Link href={href} className={style.wrapper}>
        <div>
          <div className={style.title}>{info.title}</div>
          <div className={style.date}>{formatDate(info.createdAt)}</div>
        </div>
        <Image src="/icons/right_arrow.svg" alt="" width={20} height={20} />
      </Link>
    </li>
  );
};

export default InfoItem;
