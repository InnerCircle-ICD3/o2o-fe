"use client";

import { getStoresDetail } from "@/apis/ssr/stores";
import { BottomButton } from "@/components/ui/storesDetail/bottomButton";
import StoresInfo from "@/components/ui/storesDetail/storesInfo";
import type { StoresDetail } from "@/types/apis/stores.type";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { id } = useParams();
  const [storeDetails, setStoreDetails] = useState<StoresDetail | null>(null);

  useEffect(() => {
    const fetchStoresDetail = async () => {
      try {
        const storesResponse = await getStoresDetail(id as string);
        if (storesResponse.success) {
          setStoreDetails(storesResponse.data);
        } else {
          throw storesResponse;
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchStoresDetail();
  }, [id]);

  if (!storeDetails) {
    return (
      <div>
        <h2>매장 정보를 불러오는 데 실패했습니다.</h2>
      </div>
    );
  }

  return (
    <>
      <StoresInfo storesDetail={storeDetails} />
      <BottomButton buttonText="잇고백 상세보기" href={`/stores/${storeDetails.id}/products`} />
    </>
  );
};

export default Page;
