import useGetCustomerAddress from "@/hooks/api/useGetCustomerAddress";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useKakaoLoader } from "@/hooks/useKakaoLoader";
import * as locationUtils from "@/utils/locations";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { type Mock, beforeEach, describe, expect, it, vi } from "vitest";
import MyLocation from ".";

vi.mock("@/hooks/useGeolocation");
vi.mock("@/hooks/useKakaoLoader");
vi.mock("@/hooks/api/useGetCustomerAddress");
vi.mock("@/components/common/kakaoMap", () => ({
  // biome-ignore lint/style/useNamingConvention: false
  KakaoMap: ({
    lat,
    lng,
    onMapIdle,
  }: { lat: number; lng: number; onMapIdle: (map: kakao.maps.Map) => void }) => {
    setTimeout(() => {
      onMapIdle?.({
        getCenter: () => ({
          getLat: () => lat,
          getLng: () => lng,
        }),
        setMinLevel: () => {},
        setMaxLevel: () => {},
        setCenter: () => {},
        setLevel: () => {},
        setBounds: () => {},
      });
    }, 0);
    return (
      <div data-testid="mock-kakao-map">
        Map at {lat},{lng}
      </div>
    );
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
}));

const queryClient = new QueryClient();

function renderWithQueryClient(ui: React.ReactElement) {
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
}

describe("MyLocation", () => {
  const mockLocation = { lat: 37.123456, lng: 127.123456 };

  beforeEach(() => {
    vi.clearAllMocks();
    (useGeolocation as Mock).mockReturnValue(mockLocation);
    (useKakaoLoader as Mock).mockReturnValue(true);

    vi.spyOn(locationUtils, "getFullAddressByCoords").mockResolvedValue({
      address: {
        roadNameAddress: "",
        lotNumberAddress: "",
        buildingName: "",
        zipCode: "",
        region1DepthName: "",
        region2DepthName: "",
        region3DepthName: "",
        coordinate: {
          latitude: 0,
          longitude: 0,
        },
      },
      distanceInKilometers: 0.5,
      customerAddressType: "",
      description: "",
    });

    (useGetCustomerAddress as Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });
  });

  it("useKakaoLoader나 useGeolocation이 로드되지 않으면 LoadingMap을 보여준다", () => {
    (useGeolocation as Mock).mockReturnValue(null);
    (useKakaoLoader as Mock).mockReturnValue(false);

    renderWithQueryClient(<MyLocation />);

    expect(screen.queryByTestId("mock-kakao-map")).toBeNull();
    expect(screen.getByText((text) => text.includes("지도를 불러오는 중"))).toBeTruthy();
  });

  it("지도가 렌더링되면 KakaoMap이 좌표에 맞춰 렌더링된다.", () => {
    renderWithQueryClient(<MyLocation />);

    const map = screen.getByText((text) =>
      text.includes(`Map at ${mockLocation.lat},${mockLocation.lng}`),
    );
    expect(map).toBeTruthy();
  });

  it("거리 옵션을 클릭하면 선택 상태가 변경된다", () => {
    renderWithQueryClient(<MyLocation />);
    const radios = screen.getAllByRole("radio") as HTMLInputElement[];

    expect(radios[3].checked).toBe(false);
    fireEvent.change(radios[3], { target: { checked: true } });
    expect(radios[3].checked).toBe(true);
  });

  it("지도가 customerAddress의 좌표에 맞춰 렌더링된다", () => {
    const customerAddress = {
      id: 1,
      customerId: 123,
      roadNameAddress: "서울특별시 강남구 역삼동",
      lotNumberAddress: "서울특별시 강남구 역삼동 123-45",
      buildingName: "테스트빌딩",
      zipCode: "12345",
      region1DepthName: "서울특별시",
      region2DepthName: "강남구",
      region3DepthName: "역삼동",
      latitude: 37.123,
      longitude: 127.456,
      customerAddressType: "HOME",
      description: "",
    };
    (useGetCustomerAddress as Mock).mockReturnValue({
      data: [customerAddress],
      isLoading: false,
      isError: false,
    });

    renderWithQueryClient(<MyLocation />);

    const map = screen.getByText((text) =>
      text.includes(`Map at ${mockLocation.lat},${mockLocation.lng}`),
    );
    expect(map).toBeTruthy();
  });
});
