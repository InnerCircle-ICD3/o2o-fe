import { baseUrl } from "@/mocks/utils";
import { http, HttpResponse } from "msw";

const mockOrder = {
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
          productName: "빅사이즈 럭키백",
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
          productName: "스페셜 럭키백",
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
          productName: "럭키백 세트",
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
      status: "PENDING",
      orderItems: [
        {
          id: 4,
          productId: 4,
          productName: "럭키백 프리미엄",
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
          productName: "럭키백 베스트",
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
          productName: "럭키백 클래식",
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
      status: "PENDING",
      orderItems: [
        {
          id: 7,
          productId: 7,
          productName: "럭키백 스페셜",
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
          productName: "럭키백 프리미엄 플러스",
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
          productName: "럭키백 베스트 셀렉션",
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
      status: "PENDING",
      orderItems: [
        {
          id: 10,
          productId: 10,
          productName: "럭키백 슈퍼 스페셜",
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

const handlers = [
  http.post(`${baseUrl}/orders`, () => {
    return HttpResponse.json({ success: true, data: { orderId: 1 } });
  }),

  http.get(`${baseUrl}/customers/orders`, () => {
    return HttpResponse.json({ success: true, data: mockOrder });
  }),

  http.get(`${baseUrl}/orders/:id`, ({ params }) => {
    const id = Number(params.id);

    return HttpResponse.json({
      success: true,
      data: mockOrder.contents.find((order) => order.id === id),
    });
  }),
];

export default handlers;
