import StoreEdit from "./index";

import { vi } from "vitest";

vi.mock("@/stores/ownerInfoStore", () => ({
  useOwnerStore: vi.fn(),
}));
vi.mock("@/hooks/api/useGetOwnerStore", () => ({
  default: vi.fn(),
}));
vi.mock("@/hooks/api/usePatchOwnerStoreStatus", () => ({
  default: vi.fn(),
}));

import useGetOwnerStore from "@/hooks/api/useGetOwnerStore";
import usePatchOwnerStoreStatus from "@/hooks/api/usePatchOwnerStoreStatus";
import { useOwnerStore } from "@/stores/ownerInfoStore";
import type { StoreResponse } from "@/types/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";

type Owner = { userId: number };

const mockOwner: Owner = { userId: 1 };
const mockStoreData: StoreResponse = {
  id: 1,
  name: "테스트매장",
  status: "OPEN",
  businessNumber: "123-45-67890",
  contact: "010-1234-5678",
  mainImageUrl: "",
  description: "",
  address: {
    roadNameAddress: "도로명주소",
    lotNumberAddress: "지번주소",
    zipCode: "12345",
    buildingName: "건물명",
    coordinate: {
      latitude: 37.11233,
      longitude: 127.11233,
    },
  },
  pickupDay: "TODAY",
  storeCategory: [],
  foodCategory: [],
  businessHours: [],
};

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
}

describe("StoreEdit", () => {
  beforeEach(() => {
    (useGetOwnerStore as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => ({
      data: undefined,
      isLoading: false,
    }));
    (usePatchOwnerStoreStatus as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => ({
      mutate: () => {},
    }));
    (useOwnerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ owner: null });
    vi.clearAllMocks();
  });

  it("유저 정보 없을 때 메시지 렌더링", () => {
    renderWithClient(<StoreEdit />);
    screen.getByText("유저 정보가 없습니다.");
  });

  it("로딩 중일 때 Loading 메시지 렌더링", () => {
    (useOwnerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ owner: mockOwner });
    (useGetOwnerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: null,
      isLoading: true,
    });
    renderWithClient(<StoreEdit />);
    screen.getByText("Loading...");
  });

  it("폼 필드들이 정상적으로 렌더링", () => {
    (useOwnerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ owner: mockOwner });
    (useGetOwnerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { data: mockStoreData },
      isLoading: false,
    });
    renderWithClient(<StoreEdit />);
    screen.getByLabelText("매장명");
    screen.getByLabelText("도로명 주소");
  });

  it("영업중/영업종료 토글 동작", () => {
    (useOwnerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ owner: mockOwner });
    (useGetOwnerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { data: mockStoreData },
      isLoading: false,
    });
    const patchMutate = vi.fn();
    (usePatchOwnerStoreStatus as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      mutateAsync: patchMutate,
    });
    renderWithClient(<StoreEdit />);
    const switchButton = screen.getByRole("switch");
    fireEvent.click(switchButton);
    expect(patchMutate).toHaveBeenCalled();
  });
});
