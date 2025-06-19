"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useOwnerStore } from "@/stores/ownerInfoStore";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const owner = useOwnerStore((state) => state.owner);
  const router = useRouter();

  return (
    <div className="max-w-md mx-auto mt-16">
      <Card className="w-full shadow-md">
        <CardHeader className="flex flex-col items-center gap-2 pb-2">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-2">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <CardTitle className="text-xl font-bold">{owner?.nickname ?? "-"}</CardTitle>
          <CardDescription className="text-gray-500 text-sm">
            ID: {owner?.userId ?? "-"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 pt-0">
          <Button
            variant="ghost"
            className="text-red-500 hover:bg-red-50"
            onClick={() => router.push("/store-owner/delete")}
          >
            회원탈퇴
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
