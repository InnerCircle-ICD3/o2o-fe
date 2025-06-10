import InfoList from "@/components/ui/mypage/infoList";
import type { Info } from "@/types/apis/mypage.type";

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
] as Info[];

const Page = () => {
  return <InfoList infos={mockList} basePath={"notice"} />;
};

export default Page;
