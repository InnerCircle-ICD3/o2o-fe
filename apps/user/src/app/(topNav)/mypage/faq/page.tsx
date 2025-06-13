import InfoList from "@/components/ui/mypage/infoList";
import type { Info } from "@/types/apis/mypage.type";

const mockList = [
  {
    id: 1,
    title: "주문 취소은 어떻게 하나요?",
    createdAt: "2025-05-28T10:00:00Z",
  },
  {
    id: 2,
    title: "픽업 방법은 어떻게 하나요?",
    createdAt: "2025-05-26T10:00:00Z",
  },
  {
    id: 3,
    title: "픽업 시간 변경은 어떻게 하나요?",
    createdAt: "2025-05-25T10:00:00Z",
  },
  {
    id: 4,
    title: "주문 방법은 어떻게 하나요?",
    createdAt: "2025-05-24T10:00:00Z",
  },
  {
    id: 5,
    title: "지역 인증은 어떻게 하나요?",
    createdAt: "2025-05-23T10:00:00Z",
  },
  {
    id: 6,
    title: "지역 검색은 어떻게 하나요?",
    createdAt: "2025-05-22T10:00:00Z",
  },
] as Info[];

const Page = () => {
  return <InfoList infos={mockList} basePath={"faq"} />;
};

export default Page;
