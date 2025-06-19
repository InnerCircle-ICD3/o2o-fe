"use client";

import ErrorUi from "@/components/common/errorUi";
import { BottomButton } from "@/components/ui/storesDetail/bottomButton";
import StoresInfo from "@/components/ui/storesDetail/storesInfo";
import { useStoreDetail } from "@/hooks/api/useStoreDetail";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();
  const { storeDetail, isPending, isError } = useStoreDetail(id as string);

  if (isPending || !storeDetail) {
    return null;
  }

  if (isError) {
    return (
      <ErrorUi
        message="가게 정보를 불러오는데 실패했어요. 잠시 후 다시 시도해주세요."
        isButton={false}
      />
    );
  }

  return (
    <>
      <StoresInfo storeDetail={storeDetail} />
      <BottomButton buttonText="잇고백 상세보기" href={`/stores/${storeDetail.id}/products`} />
    </>
  );
};

export default Page;
