import { baseUrl } from "@/mocks/utils";
import { http, HttpResponse } from "msw";

// SSE 목업 데이터
const sampleOrders = [
  {
    orderId: 12345,
    customerId: 1001,
    storeId: 2001,
    orderStatus: "PENDING",
    totalAmount: 25000,
    orderTime: new Date().toISOString(),
    customerName: "김고객",
    customerPhone: "010-1234-5678",
    orderItems: [
      {
        productId: 101,
        productName: "잇고백 세트",
        quantity: 2,
        price: 12500,
      },
    ],
  },
  {
    orderId: 12346,
    customerId: 1002,
    storeId: 2001,
    orderStatus: "PENDING",
    totalAmount: 18000,
    orderTime: new Date().toISOString(),
    customerName: "이손님",
    customerPhone: "010-9876-5432",
    orderItems: [
      {
        productId: 102,
        productName: "프리미엄 럭키백",
        quantity: 1,
        price: 18000,
      },
    ],
  },
];

const handlers = [
  // SSE 엔드포인트 목업
  http.get(`${baseUrl}/stores/:storeId/sse`, ({ params }) => {
    const storeId = params.storeId;
    console.log(`📡 SSE 연결 요청 받음 - Store ID: ${storeId}`);

    // 실제 SSE 응답을 시뮬레이션하기 위한 응답
    // 참고: MSW에서는 실제 SSE 스트림을 완전히 시뮬레이션하기 어려우므로
    // 일반 HTTP 응답으로 대체하여 연결 상태만 확인
    return new HttpResponse("SSE Connection Established", {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
      },
    });
  }),

  // SSE 테스트를 위한 임시 주문 생성 엔드포인트
  http.post(`${baseUrl}/test/create-order`, () => {
    const randomOrder = sampleOrders[Math.floor(Math.random() * sampleOrders.length)];
    const newOrder = {
      ...randomOrder,
      orderId: Date.now(), // 유니크한 ID 생성
      orderTime: new Date().toISOString(),
    };

    console.log("🆕 테스트 주문 생성:", newOrder);

    return HttpResponse.json({
      success: true,
      data: newOrder,
      message: "테스트 주문이 생성되었습니다. SSE를 통해 전송됩니다.",
    });
  }),
];

export default handlers;
