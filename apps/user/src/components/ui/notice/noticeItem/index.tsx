import type { Notice } from "@/types/apis/notice.type";
import { formatDate } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";
import * as style from "./noticeItem.css";

interface NoticeItemProps {
  notice: Notice;
}

const NoticeItem = (props: NoticeItemProps) => {
  const { notice } = props;

  return (
    <li className={style.container}>
      <Link href={`/mypage/notice/${notice.id}`} className={style.wrapper}>
        <div>
          <div className={style.title}>{notice.title}</div>
          <div className={style.date}>{formatDate(notice.createdAt)}</div>
        </div>
        <Image src="/icons/right_arrow.svg" alt="" width={20} height={20} />
      </Link>
    </li>
  );
};

export default NoticeItem;
