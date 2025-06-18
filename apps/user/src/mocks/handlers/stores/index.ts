import { baseUrl } from "@/mocks/utils";
import { http, HttpResponse } from "msw";

// const mockStore = {
//   1001: {
//     id: 1001,
//     name: "happyKimbap",
//     mainImageUrl: "/images/thumb.png",
//     contact: "02-123-4567",
//     description: "정성 가득 김밥집",
//     businessNumber: "123-45-67890",
//     businessHours: [
//       {
//         dayOfWeek: "MONDAY",
//         openTime: "09:00:00",
//         closeTime: "21:00:00",
//       },
//     ],
//     address: {
//       roadNameAddress: "서울 강남구 테헤란로 123",
//       lotNumberAddress: "서울 강남구 역삼동 123-45",
//       buildingName: "카카오뱅크",
//       zipCode: "06232",
//       region1DepthName: "서울특별시",
//       region2DepthName: "강남구",
//       region3DepthName: "역삼동",
//       coordinate: {
//         latitude: 37.12345,
//         longitude: 127.12345,
//       },
//     },
//     pickupDay: "TODAY",
//     todayPickupStartTime: "09:00:00",
//     todayPickupEndTime: "21:00:00",
//     status: "OPEN",
//     ratingAverage: 4.8,
//     ratingCount: 250,
//     foodCategory: ["김밥", "한식"],
//     storeCategory: ["RESTAURANT"],
//   },
// };

const mockProduct = [
  {
    id: 1,
    createdAt: "2025-05-06T10:15:30Z",
    description: "신선한 제철 과일 및 계절 채소로 구성된 특별 잇고백입니다.",
    foodType: ["크림빵", "야채빵"],
    imageUrl: "/images/thumb.png",
    inventory: {
      quantity: 1,
      stock: 10,
    },
    storeId: 1,
    name: "빅사이즈 잇고백",
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
    description: "신선한 제철 과일 및 계절 채소로 구성된 특별 잇고백입니다.",
    foodType: ["크림빵", "야채빵"],
    imageUrl: "/images/thumb.png",
    inventory: {
      quantity: 0,
      stock: 10,
    },
    storeId: 1,
    name: "중간 사이즈 잇고백",
    price: {
      originalPrice: 20000,
      discountRate: 0.5,
      finalPrice: 10000,
    },
    size: "M",
    status: "ACTIVE",
  },
  {
    id: 3,
    createdAt: "2025-05-06T10:15:30Z",
    description: "신선한 제철 과일 및 계절 채소로 구성된 특별 잇고백입니다.",
    foodType: ["크림빵", "야채빵"],
    imageUrl: "/images/thumb.png",
    inventory: {
      quantity: 10,
      stock: 10,
    },
    storeId: 1,
    name: "작은 사이즈 잇고백",
    price: {
      originalPrice: 20000,
      discountRate: 0.5,
      finalPrice: 10000,
    },
    size: "S",
    status: "ACTIVE",
  },
];

// StoreList 타입에 맞는 Store List 데이터 생성
const createNewStoreData = (id: number) => ({
  storeId: id,
  storeName: `Mock Store ${id}`,
  storeImage: "https://eatngo-app.s3.ap-northeast-2.amazonaws.com/store/pu.png",
  category: ["호밀빵", "케이크"], // StoreList 타입의 category 필드
  distanceKm: 0.1,
  open: true, // StoreList 타입의 open 필드 (boolean)
  stock: 10,
  roadAddress: {
    addressName: "서울시 강남구 테헤란로 123",
    zoneNo: "06234",
    buildingName: "테스트빌딩",
  },
  lotAddress: {
    addressName: "서울시 강남구 역삼동 123-45",
    mainAddressNo: "123",
    subAddressNo: "45",
  },
  addressType: "ROAD",
  location: {
    lat: 37.001 + id * 0.00001,
    lng: 127.001 + id * 0.00001,
  },
  businessHours: {
    openTime: "08:00:00",
    closeTime: "20:00:00",
  },
  reviewCount: 3 + (id % 10), // 3-12 순환
  reviewScore: 3.0 + (id % 3) * 0.5, // 3.0, 3.5, 4.0 순환
  isFavorite: false,
});

// StoreList 타입의 Store List 생성 (10개)
const newStoreList = Array.from({ length: 10 }, (_, index) => createNewStoreData(index + 1));

// StoresDetail 타입에 맞는 개별 Store 데이터 생성
const createStoreDetailData = (id: number) => ({
  id: id,
  name: `Mock Store ${id}`,
  mainImageUrl: "https://eatngo-app.s3.ap-northeast-2.amazonaws.com/store/pu.png",
  contact: "02-1234-5678",
  description: `Mock Store ${id}에서 제공하는 신선한 음식들입니다.`,
  businessNumber: "123-45-67890",
  businessHours: [
    { dayOfWeek: "MONDAY", openTime: "08:00:00", closeTime: "20:00:00" },
    { dayOfWeek: "TUESDAY", openTime: "08:00:00", closeTime: "20:00:00" },
    { dayOfWeek: "WEDNESDAY", openTime: "08:00:00", closeTime: "20:00:00" },
    { dayOfWeek: "THURSDAY", openTime: "08:00:00", closeTime: "20:00:00" },
    { dayOfWeek: "FRIDAY", openTime: "08:00:00", closeTime: "20:00:00" },
    { dayOfWeek: "SATURDAY", openTime: "11:00:00", closeTime: "14:00:00" },
    { dayOfWeek: "SUNDAY", openTime: "10:00:00", closeTime: "14:00:00" },
  ],
  address: {
    roadNameAddress: "서울시 강남구 테헤란로 123",
    lotNumberAddress: "서울시 강남구 역삼동 123-45",
    buildingName: "테스트빌딩",
    zipCode: "06234",
    region1DepthName: "서울특별시",
    region2DepthName: "강남구",
    region3DepthName: "역삼동",
    coordinate: {
      latitude: 37.001 + id * 0.00001,
      longitude: 127.001 + id * 0.00001,
    },
  },
  pickupDay: "TODAY",
  todayPickupStartTime: "08:00:00",
  todayPickupEndTime: "20:00:00",
  status: "OPEN",
  ratingAverage: 3.0 + (id % 3) * 0.5,
  ratingCount: 3 + (id % 10),
  foodCategory: ["호밀빵", "케이크"],
  storeCategory: [["PIZZA", "FRUIT", "BREAD", "RICECAKE", "KOREAN", "SALAD"][id % 7]],
});

const handlers = [
  // Store List API 핸들러 추가
  http.get(`${baseUrl}/store/list`, async ({ request }) => {
    const url = new URL(request.url);
    const size = Number(url.searchParams.get("size")) || 10;
    const page = Number(url.searchParams.get("page")) || 0;

    const totalCount = newStoreList.length;
    const totalPages = Math.ceil(totalCount / size);

    // 500ms 지연 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 500));

    return HttpResponse.json({
      success: true,
      data: {
        storeList: newStoreList.slice(page * size, (page + 1) * size).map((store) => ({
          ...store,
          id: store.storeId, // 기존 코드 호환성을 위해 id 필드 추가
        })),
        pageNumber: page,
        pageSize: size,
        totalPages,
        totalCount,
        isLastPage: page === totalPages - 1,
        isFirstPage: page === 0,
      },
    });
  }),

  // 개별 Store 조회 API (기존 경로 유지)
  http.get(`${baseUrl}/stores/:id`, ({ params }) => {
    const { id } = params;
    const storeId = Number(id);

    // storeId가 1-10 범위에 있는지 확인
    if (storeId < 1 || storeId > 10) {
      return HttpResponse.json(
        {
          success: false,
          message: "Store not found",
        },
        { status: 404 },
      );
    }

    const storeDetail = createStoreDetailData(storeId);

    return HttpResponse.json({
      success: true,
      data: storeDetail,
    });
  }),

  // Store별 Products 조회 API (기존 경로 유지)
  http.get(`${baseUrl}/stores/:id/products`, ({ params }) => {
    const { id } = params;
    const storeId = Number(id);

    // storeId가 1-10 범위에 있는지 확인
    if (storeId < 1 || storeId > 10) {
      return HttpResponse.json(
        {
          success: false,
          message: "Store not found",
        },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      success: true,
      data: mockProduct,
    });
  }),
];

export default handlers;
