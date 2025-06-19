"use client";
import { BottomButton } from "@/components/ui/storesDetail/bottomButton";
import StoresInfo from "@/components/ui/storesDetail/storesInfo";
import { useStoreDetail } from "@/hooks/api/useStoreDetail";
import { useParams } from "next/navigation";
import {} from "react";

const Page = () => {
  const { id } = useParams();
  const { storeDetail, isError } = useStoreDetail(id as string);

  if (!storeDetail || isError) {
    return (
      <div>
        <h2>매장 정보를 불러오는 데 실패했습니다.</h2>
      </div>
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
