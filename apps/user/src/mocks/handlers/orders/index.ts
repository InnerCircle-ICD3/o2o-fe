import { baseUrl } from "@/mocks/utils";
import { http, HttpResponse } from "msw";

const handlers = [
  http.post(`${baseUrl}/orders`, () => {
    return HttpResponse.json({ orderId: 1 });
  }),

  http.get(`${baseUrl}/customer/:id/orders`, () => {
    return HttpResponse.json([
      {
        orderId: 1,
        store: {
          storeId: 1001,
          name: "happyKimbap",
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
        totalPrice: 10000,
        status: "PENDING",
        createdAt: "2025-05-06T10:15:30Z",
      },
      {
        orderId: 2,
        store: {
          storeId: 1001,
          name: "happyKimbap",
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
        totalPrice: 10000,
        status: "COMPLATED",
        createdAt: "2025-05-06T10:15:30Z",
      },
      {
        orderId: 3,
        store: {
          storeId: 1001,
          name: "happyKimbap",
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
        totalPrice: 10000,
        status: "CANCELLED",
        createdAt: "2025-05-06T10:15:30Z",
      },
    ]);
  }),

  http.get(`${baseUrl}/orders/:id`, () => {
    return HttpResponse.json({
      id: 1,
      store: {
        storeId: 1001,
        name: "happyKimbap",
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
        {
          id: 3,
          createdAt: "2025-05-06T10:15:30Z",
          description: "신선한 제철 과일 및 계절 채소로 구성된 특별 럭키백입니다.",
          foodType: ["크림빵", "야채빵"],
          imageUrl: "/images/thumb.png",
          inventory: {
            quantity: 10,
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
      totalPrice: 10000,
      status: "PENDING",
      createdAt: "2025-05-06T10:15:30Z",
    });
  }),
];

export default handlers;
