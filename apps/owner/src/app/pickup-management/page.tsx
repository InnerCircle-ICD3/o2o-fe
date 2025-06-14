"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  // biome-ignore lint/correctness/noUnusedImports: <explanation>
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
const ITEMS_PER_PAGE = 10;

export default function LuckyBagList() {
  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  const [page, setPage] = useState(1);
  // const [orderList, setOrderList] = useState<Order[]>([]);
  // const router = useRouter();

  // const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  // const paginatedData = products.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">픽업 목록</h2>

      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">구분</TableHead>
                <TableHead>주문 정보</TableHead>
                <TableHead>주문 메뉴</TableHead>
                <TableHead>주문자 정보</TableHead>
                <TableHead>픽업완료 여부</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/*{paginatedData.map((bag) => (*/}
              {/*  <TableRow key={bag.id} onClick={() => router.push(`/product-management/${bag.id}`)}>*/}
              {/*    <TableCell className="font-semibold">{bag.name}</TableCell>*/}
              {/*    <TableCell className="text-muted-foreground">*/}
              {/*      {bag.price.originalPrice.toLocaleString()}원*/}
              {/*    </TableCell>*/}
              {/*    <TableCell>{bag.price.discountRate.toLocaleString()}원</TableCell>*/}
              {/*    <TableCell>{bag.inventory.quantity}개</TableCell>*/}
              {/*    <TableCell>{bag.size}</TableCell>*/}
              {/*    <TableCell className="text-right space-x-2">*/}
              {/*      <Button variant="destructive" size="sm">*/}
              {/*        수정*/}
              {/*      </Button>*/}
              {/*      <Button*/}
              {/*        variant="outline"*/}
              {/*        size="sm"*/}
              {/*        onClick={(e) => {*/}
              {/*          e.stopPropagation();*/}
              {/*          handleDelete(bag.id);*/}
              {/*        }}*/}
              {/*      >*/}
              {/*        삭제*/}
              {/*      </Button>*/}
              {/*    </TableCell>*/}
              {/*  </TableRow>*/}
              {/*))}*/}
            </TableBody>
          </Table>

          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => setPage((p) => Math.max(p - 1, 1))} />
                </PaginationItem>
                <PaginationItem className="px-4 py-1 text-sm">
                  {/*{page} / {totalPages}*/}
                </PaginationItem>
                <PaginationItem>
                  {/*<PaginationNext onClick={() => setPage((p) => Math.min(p + 1, totalPages))} />*/}
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
