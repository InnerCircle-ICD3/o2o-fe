import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function StoreRegisterLink() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] gap-4">
      <p className="text-gray-600">매장 정보를 불러올 수 없습니다.</p>
      <Link href="/store/register">
        <Button variant="default">매장 등록하기</Button>
      </Link>
    </div>
  );
}
