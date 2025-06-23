"use client";

import { getOrders } from "@/apis/ssr/orders";
import { formatHourTo12HourText } from "@/apis/utils/format";
import StoreRegisterLink from "@/components/common/storeRegisterLink";
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
import type { Order } from "@/types/order";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 10;

export default function PickupManagementList() {
  const [page, setPage] = useState(1);
  const [orderList, setOrderList] = useState<Order[]>([]);

  const { data: storeData } = useGetOwnerStore();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!storeData?.id) return;
      const result = await getOrders(storeData.id);
      if (result.success) {
        setOrderList(result.data.contents);
      } else {
        console.error("주문 조회 실패:", result);
      }
    };
    fetchOrders();
  }, [storeData?.id]);

  const totalPages = Math.ceil(orderList.length / ITEMS_PER_PAGE);

  const paginatedData = orderList.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  if (!storeData) {
    return <StoreRegisterLink />;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">픽업 목록</h2>

      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">구분</TableHead>
                <TableHead>주문 번호</TableHead>
                <TableHead>주문 메뉴</TableHead>
                <TableHead>주문자 정보</TableHead>
                <TableHead>픽업 시간</TableHead>
                <TableHead>픽업완료 여부</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.orderNumber}</TableCell>
                  <TableCell>
                    {order.orderItems.map((item) => item.productName).join(", ")}
                  </TableCell>
                  <TableCell>{order.nickname}</TableCell>
                  <TableCell>{formatHourTo12HourText(order.pickupDateTime ?? "0")}</TableCell>
                  <TableCell>{order.status}</TableCell>
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
