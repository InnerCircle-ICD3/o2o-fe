import { baseUrl } from "@/mocks/utils";
import { http, HttpResponse } from "msw";

const mockOrder = [
  {
    orderId: 1,
    store: {
      storeId: 1001,
      name: "냠냠 샌드위치",
      roadAddress: {
        addressName: "서울 강남구 테헤란로 123",
        zoneNo: "06232",
        buildingName: "카카오뱅크",
      },
      lotAddress: {
        addressName: "서울 강남구 역삼동 123-45",
        mainAddressNo: "123",
        subAddressNo: "45",
      },
      addressType: "ROAD",
      location: {
        lat: 37.12345,
        lng: 127.12345,
      },
      businessNumber: "123-45-67890",
      openTime: "09:00",
      closeTime: "21:00",
      contact: "02-123-4567",
      description: "정성 가득 김밥집",
      mainImageUrl: "/images/thumb.png",
      status: "OPEN",
    },
    products: [
      {
        id: 1,
        createdAt: "2025-05-06T10:15:30Z",
        description: "신선한 제철 과일 및 계절 채소로 구성된 특별 럭키백입니다.",
        foodType: ["크림빵", "야채빵"],
        imageUrl: "/images/thumb.png",
        inventory: {
          quantity: 1,
          stock: 10,
        },
        storeId: 1,
        name: "빅사이즈 럭키백",
        price: {
          originalPrice: 20000,
          discountRate: 0.5,
          finalPrice: 10000,
        },
        size: "L",
        status: "ACTIVE",
      },
    ],
    totalPrice: 20000,
    status: "PENDING",
    createdAt: "2025-05-06T10:15:30Z",
    orderDate: "2025-05-06T10:15:30Z",
  },
  {
    orderId: 2,
    store: {
      storeId: 1001,
      name: "냠냠 치킨",
      roadAddress: {
        addressName: "서울 강남구 테헤란로 123",
        zoneNo: "06232",
        buildingName: "카카오뱅크",
      },
      lotAddress: {
        addressName: "서울 강남구 역삼동 123-45",
        mainAddressNo: "123",
        subAddressNo: "45",
      },
      addressType: "ROAD",
      location: {
        lat: 37.12345,
        lng: 127.12345,
      },
      businessNumber: "123-45-67890",
      openTime: "09:00",
      closeTime: "21:00",
      contact: "02-123-4567",
      description: "정성 가득 김밥집",
      mainImageUrl: "/images/thumb2.png",
      status: "OPEN",
    },
    products: [
      {
        id: 1,
        createdAt: "2025-05-06T10:15:30Z",
        description: "갓 튀긴 바삭한 치킨과 달달한 소스가 어우러진 특별 럭키백입니다.",
        foodType: ["후라이드 치킨", "양념 치킨"],
        imageUrl: "/images/thumb.png",
        inventory: {
          quantity: 1,
          stock: 10,
        },
        storeId: 1,
        name: "빅사이즈 럭키백",
        price: {
          originalPrice: 20000,
          discountRate: 0.5,
          finalPrice: 10000,
        },
        size: "L",
        status: "ACTIVE",
      },
      {
        id: 2,
        createdAt: "2025-05-06T10:15:30Z",
        description: "갓 튀긴 바삭한 치킨과 달달한 소스가 어우러진 특별 럭키백입니다.",
        foodType: ["후라이드 치킨", "양념 치킨"],
        imageUrl: "/images/thumb.png",
        inventory: {
          quantity: 1,
          stock: 10,
        },
        storeId: 1,
        name: "작은 사이즈 럭키백",
        price: {
          originalPrice: 20000,
          discountRate: 0.5,
          finalPrice: 10000,
        },
        size: "S",
        status: "ACTIVE",
      },
    ],
    totalPrice: 26000,
    status: "COMPLETED",
    createdAt: "2025-05-06T10:15:30Z",
    orderDate: "2025-05-06T10:15:30Z",
    pickupDate: "2025-05-06T12:15:30Z",
  },
  {
    orderId: 3,
    store: {
      storeId: 1001,
      name: "냠냠 디저트",
      roadAddress: {
        addressName: "서울 강남구 테헤란로 123",
        zoneNo: "06232",
        buildingName: "카카오뱅크",
      },
      lotAddress: {
        addressName: "서울 강남구 역삼동 123-45",
        mainAddressNo: "123",
        subAddressNo: "45",
      },
      addressType: "ROAD",
      location: {
        lat: 37.12345,
        lng: 127.12345,
      },
      businessNumber: "123-45-67890",
      openTime: "09:00",
      closeTime: "21:00",
      contact: "02-123-4567",
      description: "정성 가득 김밥집",
      mainImageUrl: "/images/thumb3.png",
      status: "OPEN",
    },
    products: [
      {
        id: 1,
        createdAt: "2025-05-06T10:15:30Z",
        description: "달달한 크림과 신선한 과일이 어우러진 특별 럭키백입니다.",
        foodType: ["과일 푸딩", "크림 케이크"],
        imageUrl: "/images/thumb.png",
        inventory: {
          quantity: 1,
          stock: 10,
        },
        storeId: 1,
        name: "중간 사이즈 럭키백",
        price: {
          originalPrice: 20000,
          discountRate: 0.5,
          finalPrice: 10000,
        },
        size: "M",
        status: "ACTIVE",
      },
      {
        id: 2,
        createdAt: "2025-05-06T10:15:30Z",
        description: "달달한 크림과 신선한 과일이 어우러진 특별 럭키백입니다.",
        foodType: ["과일 푸딩", "크림 케이크"],
        imageUrl: "/images/thumb.png",
        inventory: {
          quantity: 1,
          stock: 10,
        },
        storeId: 1,
        name: "작은 사이즈 럭키백",
        price: {
          originalPrice: 20000,
          discountRate: 0.5,
          finalPrice: 10000,
        },
        size: "S",
        status: "ACTIVE",
      },
    ],
    totalPrice: 19000,
    status: "CANCELLED",
    createdAt: "2025-05-06T10:15:30Z",
    orderDate: "2025-05-06T10:15:30Z",
    cancelDate: "2025-05-06T13:15:30Z",
  },
  {
    orderId: 4,
    store: {
      storeId: 1001,
      name: "냠냠 떡볶이",
      roadAddress: {
        addressName: "서울 강남구 테헤란로 123",
        zoneNo: "06232",
        buildingName: "카카오뱅크",
      },
      lotAddress: {
        addressName: "서울 강남구 역삼동 123-45",
        mainAddressNo: "123",
        subAddressNo: "45",
      },
      addressType: "ROAD",
      location: {
        lat: 37.12345,
        lng: 127.12345,
      },
      businessNumber: "123-45-67890",
      openTime: "09:00",
      closeTime: "21:00",
      contact: "02-123-4567",
      description: "정성 가득 김밥집",
      mainImageUrl: "/images/thumb4.png",
      status: "OPEN",
    },

    status: "COMPLETED",
    createdAt: "2024-05-02T10:15:30Z",
    orderDate: "2024-05-02T10:15:30Z",
    pickupDate: "2024-05-02T12:15:30Z",
    totalPrice: 21000,
  },
  {
    orderId: 5,
    store: {
      storeId: 1001,
      name: "냠냠 장어덮밥",
      roadAddress: {
        addressName: "서울 강남구 테헤란로 123",
        zoneNo: "06232",
        buildingName: "카카오뱅크",
      },
      lotAddress: {
        addressName: "서울 강남구 역삼동 123-45",
        mainAddressNo: "123",
        subAddressNo: "45",
      },
      addressType: "ROAD",
      location: {
        lat: 37.12345,
        lng: 127.12345,
      },
      businessNumber: "123-45-67890",
      openTime: "09:00",
      closeTime: "21:00",
      contact: "02-123-4567",
      description: "정성 가득 김밥집",
      mainImageUrl: "/images/thumb5.png",
      status: "OPEN",
    },
    status: "COMPLETED",
    createdAt: "2024-04-06T10:15:30Z",
    orderDate: "2024-04-12T10:15:30Z",
    pickupDate: "2024-04-12T12:15:30Z",
    totalPrice: 31000,
  },
  {
    orderId: 6,
    store: {
      storeId: 1001,
      name: "냠냠 비빔밥",
      roadAddress: {
        addressName: "서울 강남구 테헤란로 123",
        zoneNo: "06232",
        buildingName: "카카오뱅크",
      },
      lotAddress: {
        addressName: "서울 강남구 역삼동 123-45",
        mainAddressNo: "123",
        subAddressNo: "45",
      },
      addressType: "ROAD",
      location: {
        lat: 37.12345,
        lng: 127.12345,
      },
      businessNumber: "123-45-67890",
      openTime: "09:00",
      closeTime: "21:00",
      contact: "02-123-4567",
      description: "정성 가득 김밥집",
      mainImageUrl: "/images/thumb6.png",
      status: "OPEN",
    },
    status: "COMPLETED",
    createdAt: "2024-03-06T10:15:30Z",
    orderDate: "2024-03-06T10:15:30Z",
    pickupDate: "2024-03-06T12:15:30Z",
    totalPrice: 12000,
  },
];

const handlers = [
  http.post(`${baseUrl}/orders`, () => {
    return HttpResponse.json({ orderId: 1 });
  }),

  http.get(`${baseUrl}/customer/:id/orders`, () => {
    return HttpResponse.json(mockOrder);
  }),

  http.get(`${baseUrl}/orders/:id`, ({ params }) => {
    const id = Number(params.id);

    return HttpResponse.json(mockOrder.find((order) => order.orderId === id));
  }),
];

export default handlers;
