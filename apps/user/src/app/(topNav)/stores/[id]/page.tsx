import { getStoresDetail } from "@/apis/ssr/stores";
import { BottomButton } from "@/components/ui/storesDetail/bottomButton";
import StoresInfo from "@/components/ui/storesDetail/storesInfo";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async (props: PageProps) => {
  const { params } = props;
  const { id } = await params;

  const storesResponse = await getStoresDetail(id);

  if (!storesResponse.success) {
    return (
      <div>
        <h2>매장 정보를 불러오는 데 실패했습니다.</h2>
      </div>
    );
  }

  const { data: storesData } = storesResponse;

  return (
    <>
      <StoresInfo storesDetail={storesData} />
      <BottomButton buttonText="잇고백 상세보기" href={`/stores/${storesData.id}/products`} />
    </>
  );
};

export default Page;
