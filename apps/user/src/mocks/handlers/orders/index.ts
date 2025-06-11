import { baseUrl } from "@/mocks/utils";
import { http, HttpResponse } from "msw";

const firstMockOrder = {
  contents: [
    {
      id: 1,
      orderNumber: 123456,
      customerId: 1,
      storeId: 1001,
      status: "PENDING",
      orderItems: [
        {
          id: 1,
          productId: 1,
          productName: "빅사이즈 잇고백",
          price: 10000,
          quantity: 1,
        },
      ],
      createdAt: "2025-05-06T10:15:30Z",
      updatedAt: "2025-05-06T10:15:30Z",
    },
    {
      id: 2,
      orderNumber: 123457,
      customerId: 1,
      storeId: 1002,
      status: "COMPLETED",
      orderItems: [
        {
          id: 2,
          productId: 2,
          productName: "스페셜 잇고백",
          price: 15000,
          quantity: 2,
        },
      ],
      createdAt: "2025-05-07T11:20:30Z",
      updatedAt: "2025-05-07T11:20:30Z",
    },
    {
      id: 3,
      orderNumber: 123458,
      customerId: 1,
      storeId: 1003,
      status: "CANCELLED",
      orderItems: [
        {
          id: 3,
          productId: 3,
          productName: "잇고백 세트",
          price: 20000,
          quantity: 1,
        },
      ],
      createdAt: "2025-05-08T12:25:30Z",
      updatedAt: "2025-05-08T12:25:30Z",
    },
    {
      id: 4,
      orderNumber: 123459,
      customerId: 1,
      storeId: 1004,
      status: "COMPLETED",
      orderItems: [
        {
          id: 4,
          productId: 4,
          productName: "잇고백 프리미엄",
          price: 25000,
          quantity: 3,
        },
      ],
      createdAt: "2025-05-09T13:30:30Z",
      updatedAt: "2025-05-09T13:30:30Z",
    },
    {
      id: 5,
      orderNumber: 123460,
      customerId: 1,
      storeId: 1005,
      status: "COMPLETED",
      orderItems: [
        {
          id: 5,
          productId: 5,
          productName: "잇고백 베스트",
          price: 30000,
          quantity: 2,
        },
      ],
      createdAt: "2025-05-10T14:35:30Z",
      updatedAt: "2025-05-10T14:35:30Z",
    },
    {
      id: 6,
      orderNumber: 123461,
      customerId: 1,
      storeId: 1006,
      status: "CANCELLED",
      orderItems: [
        {
          id: 6,
          productId: 6,
          productName: "잇고백 클래식",
          price: 12000,
          quantity: 1,
        },
      ],
      createdAt: "2025-05-11T15:40:30Z",
      updatedAt: "2025-05-11T15:40:30Z",
    },
    {
      id: 7,
      orderNumber: 123462,
      customerId: 1,
      storeId: 1007,
      status: "COMPLETED",
      orderItems: [
        {
          id: 7,
          productId: 7,
          productName: "잇고백 스페셜",
          price: 18000,
          quantity: 2,
        },
      ],
      createdAt: "2025-05-12T16:45:30Z",
      updatedAt: "2025-05-12T16:45:30Z",
    },
    {
      id: 8,
      orderNumber: 123463,
      customerId: 1,
      storeId: 1008,
      status: "COMPLETED",
      orderItems: [
        {
          id: 8,
          productId: 8,
          productName: "잇고백 프리미엄 플러스",
          price: 35000,
          quantity: 1,
        },
      ],
      createdAt: "2025-05-13T17:50:30Z",
      updatedAt: "2025-05-13T17:50:30Z",
    },
    {
      id: 9,
      orderNumber: 123464,
      customerId: 1,
      storeId: 1009,
      status: "CANCELLED",
      orderItems: [
        {
          id: 9,
          productId: 9,
          productName: "잇고백 베스트 셀렉션",
          price: 40000,
          quantity: 1,
        },
      ],
      createdAt: "2025-05-14T18:55:30Z",
      updatedAt: "2025-05-14T18:55:30Z",
    },
    {
      id: 10,
      orderNumber: 123465,
      customerId: 1,
      storeId: 1010,
      status: "COMPLETED",
      orderItems: [
        {
          id: 10,
          productId: 10,
          productName: "잇고백 슈퍼 스페셜",
          price: 50000,
          quantity: 2,
        },
      ],
      createdAt: "2025-05-15T19:00:30Z",
      updatedAt: "2025-05-15T19:00:30Z",
    },
  ],
  lastId: 1,
};

const secondMockOrder = {
  contents: [
    {
      id: 11,
      orderNumber: 123466,
      customerId: 1,
      storeId: 1011,
      status: "COMPLETED",
      orderItems: [
        {
          id: 11,
          productId: 11,
          productName: "잇고백 얼티밋",
          price: 60000,
          quantity: 1,
        },
      ],
      createdAt: "2025-05-16T20:05:30Z",
      updatedAt: "2025-05-16T20:05:30Z",
    },
    {
      id: 12,
      orderNumber: 123467,
      customerId: 1,
      storeId: 1012,
      status: "COMPLETED",
      orderItems: [
        {
          id: 12,
          productId: 12,
          productName: "잇고백 프리미엄 스페셜",
          price: 70000,
          quantity: 2,
        },
      ],
      createdAt: "2025-05-17T21:10:30Z",
      updatedAt: "2025-05-17T21:10:30Z",
    },
    {
      id: 13,
      orderNumber: 123468,
      customerId: 1,
      storeId: 1013,
      status: "CANCELLED",
      orderItems: [
        {
          id: 13,
          productId: 13,
          productName: "잇고백 클래식 스페셜",
          price: 80000,
          quantity: 1,
        },
      ],
      createdAt: "2025-05-18T22:15:30Z",
      updatedAt: "2025-05-18T22:15:30Z",
    },
    {
      id: 14,
      orderNumber: 123469,
      customerId: 1,
      storeId: 1014,
      status: "COMPLETED",
      orderItems: [
        {
          id: 14,
          productId: 14,
          productName: "잇고백 슈퍼 프리미엄",
          price: 90000,
          quantity: 3,
        },
      ],
      createdAt: "2025-05-19T23:20:30Z",
      updatedAt: "2025-05-19T23:20:30Z",
    },
    {
      id: 15,
      orderNumber: 123470,
      customerId: 1,
      storeId: 1015,
      status: "COMPLETED",
      orderItems: [
        {
          id: 15,
          productId: 15,
          productName: "잇고백 얼티밋 프리미엄 스페셜 에디션",
          price: 100000,
          quantity: 2,
        },
      ],
      createdAt: "2025-05-20T00:25:30Z",
      updatedAt: "2025-05-20T00:25:30Z",
    },
  ],
  lastId: 15,
};

const handlers = [
  http.post(`${baseUrl}/orders`, () => {
    return HttpResponse.json({ success: true, data: { orderId: 1 } });
  }),

  http.get(`${baseUrl}/customers/orders`, ({ request }) => {
    const url = new URL(request.url);
    const lastId = url.searchParams.get("lastId");

    const orders = lastId === "1" ? secondMockOrder : firstMockOrder;

    return HttpResponse.json({ success: true, data: orders });
  }),

  http.get(`${baseUrl}/orders/:id`, ({ params }) => {
    const id = Number(params.id);

    return HttpResponse.json({
      success: true,
      data: firstMockOrder.contents.find((order) => order.id === id),
    });
  }),
];

export default handlers;
