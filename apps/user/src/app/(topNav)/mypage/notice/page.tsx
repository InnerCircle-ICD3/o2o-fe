import NoticeItem from "@/components/ui/notice/noticeItem";
import * as globalStyle from "@/styles/global.css";
import type { Notice } from "@/types/apis/notice.type";
import classNames from "classnames";
import * as style from "./notice.css";

const mockList = [
  {
    id: 1,
    title: "서비스 이용 방법 안내",
    createdAt: "2025-05-28T10:00:00Z",
  },
  {
    id: 2,
    title: "시스템 점검 안내",
    createdAt: "2025-05-26T10:00:00Z",
  },
  {
    id: 3,
    title: "서비스 이용 약관 변경 안내",
    createdAt: "2025-05-25T10:00:00Z",
  },
] as Notice[];

const Page = () => {
  return (
    <section className={classNames(globalStyle.innerPadding, style.container)}>
      <ul>
        {mockList.map((notice) => (
          <NoticeItem key={notice.id} notice={notice} />
        ))}
      </ul>
    </section>
  );
};

export default Page;
