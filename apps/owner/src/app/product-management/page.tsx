"use client";

import { deleteProduct, getProducts } from "@/apis/ssr/product";
import StoreRegisterLink from "@/components/common/storeRegisterLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetOwnerStore from "@/hooks/api/useGetOwnerStore";
import type { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 5;

export default function LuckyBagList() {
  const { data: storeData } = useGetOwnerStore();
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!storeData?.id) return;
      const result = await getProducts(storeData.id);
      if (result.success) {
        console.log(result.data);
        setProducts(result.data);
      } else {
        console.error("상품 조회 실패:", result);
      }
    };
    fetchProducts();
  }, [storeData]);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const paginatedData = products.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleDelete = async (id: number) => {
    if (!storeData?.id) return;
    const result = await deleteProduct(storeData.id, id);
    if (confirm("정말 삭제하시겠습니까?")) {
      if (result.success) {
        console.log("상품 삭제 성공");
        setProducts(products.filter((product) => product.id !== id));
      } else {
        console.error("상품 삭제 실패:", result);
      }
    }
  };

  if (!storeData) {
    return <StoreRegisterLink />;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">잇고백 목록</h2>

      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">이름</TableHead>
                <TableHead>원가</TableHead>
                <TableHead>할인율</TableHead>
                <TableHead>수량</TableHead>
                <TableHead>사이즈</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((bag) => (
                <TableRow key={bag.id} onClick={() => router.push(`/product-management/${bag.id}`)}>
                  <TableCell className="font-semibold">{bag.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {bag.price.originalPrice.toLocaleString()}원
                  </TableCell>
                  <TableCell>
                    {(
                      (bag.price.discountRate * 100).toFixed(0) as unknown as number
                    ).toLocaleString()}
                    %
                  </TableCell>
                  <TableCell>{bag.inventory.quantity}개</TableCell>
                  <TableCell>{bag.size}</TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(bag.id);
                      }}
                    >
                      삭제
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => setPage((p) => Math.max(p - 1, 1))} />
                </PaginationItem>
                <PaginationItem className="px-4 py-1 text-sm">
                  {page} / {totalPages}
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext onClick={() => setPage((p) => Math.min(p + 1, totalPages))} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
