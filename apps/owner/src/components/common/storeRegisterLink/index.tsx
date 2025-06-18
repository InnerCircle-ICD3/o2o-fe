import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function StoreRegisterLink() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] gap-4">
      <p className="text-gray-600">매장 정보를 불러올 수 없습니다.</p>
      <Button onClick={() => router.push("/store/register")} variant="default">
        매장 등록하기
      </Button>
    </div>
  );
}
