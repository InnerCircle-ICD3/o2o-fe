import ErrorUi from "@/components/common/errorUi";
import InfoDetail from "@/components/ui/mypage/infoDetail";

const mockDetail = [
  {
    id: 1,
    title: "주문 취소은 어떻게 하나요?",
    content:
      "주문 취소는 마이페이지 > 주문 내역에서 직접 신청하실 수 있습니다.\n\n1. 마이페이지 접속\n2. 취소할 주문 선택\n3. '주문 취소' 버튼 클릭\n4. 사유 선택 후 취소 요청\n\n※ 일부 상품은 출고 이후 취소가 불가능합니다.",
    createdAt: "2025-05-28T10:00:00Z",
  },
  {
    id: 2,
    title: "픽업 방법은 어떻게 하나요?",
    content:
      "픽업은 아래 절차에 따라 진행됩니다.\n\n1. 주문 완료 후 알림톡 또는 마이페이지에서 준비 완료 확인\n2. 지정된 매장 방문\n3. 주문 번호 또는 QR코드 제시\n4. 상품 수령\n\n※ 운영 시간 내 방문해 주세요.",
    createdAt: "2025-05-26T10:00:00Z",
  },
  {
    id: 3,
    title: "픽업 시간 변경은 어떻게 하나요?",
    content:
      "픽업 시간 변경은 마이페이지 > 주문 상세에서 가능합니다.\n\n1. 주문 상세 페이지 진입\n2. '픽업 시간 변경' 버튼 선택\n3. 변경할 시간 선택 및 저장\n\n※ 일부 매장은 시간 변경이 제한될 수 있습니다.",
    createdAt: "2025-05-25T10:00:00Z",
  },
  {
    id: 4,
    title: "주문 방법은 어떻게 하나요?",
    content:
      "간단하게 아래 단계로 주문할 수 있습니다.\n\n1. 원하는 상품 선택\n2. 수량 및 옵션 설정\n3. 장바구니 또는 바로 주문 선택\n4. 결제 수단 선택 및 결제 진행\n5. 주문 완료 후 확인 페이지로 이동",
    createdAt: "2025-05-24T10:00:00Z",
  },
  {
    id: 5,
    title: "지역 인증은 어떻게 하나요?",
    content:
      "지역 인증은 서비스 사용을 위한 필수 절차입니다.\n\n1. 위치 정보 수집 동의\n2. 인증 버튼 클릭 시 자동 위치 인증\n3. 위치 확인 후 지역 서비스 자동 활성화\n\n※ 위치 정보 접근을 허용해 주세요.",
    createdAt: "2025-05-23T10:00:00Z",
  },
  {
    id: 6,
    title: "지역 검색은 어떻게 하나요?",
    content:
      "지역 검색은 메인 화면 또는 검색 화면에서 가능합니다.\n\n1. 상단 검색창 클릭\n2. 지역명 입력 (예: 강남구, 서울시 등)\n3. 검색 결과에서 원하는 지역 선택\n4. 해당 지역에 맞는 서비스 제공",
    createdAt: "2025-05-22T10:00:00Z",
  },
];

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async (props: PageProps) => {
  const { params } = props;
  const { id } = await params;

  const notice = mockDetail.find((item) => item.id === Number(id));

  if (!notice) {
    return <ErrorUi message={"문제가 생겼나봐요! 다시 시도해주세요."} />;
  }

  return <InfoDetail infoDetail={notice} />;
};

export default Page;
