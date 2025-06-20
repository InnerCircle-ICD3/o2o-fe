import { searchAddress } from "@/utils/locations";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { type Mock, vi } from "vitest";
import AddressSearch from ".";

const mockPush = vi.fn();
const mockSetSelectedAddress = vi.fn();

vi.mock("@/hooks/useGeolocation", () => ({
  useGeolocation: () => ({
    lat: 37.123456,
    lng: 127.123456,
  }),
}));
vi.mock("@/hooks/useKakaoLoader", () => ({
  useKakaoLoader: () => true,
}));
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => ({
    get: () => "HOME",
  }),
}));
vi.mock("@/stores/selectedAddressStore", () => ({
  useSelectedAddressStore: (
    selector: (store: { setSelectedAddress: typeof mockSetSelectedAddress }) => unknown,
  ) => selector({ setSelectedAddress: mockSetSelectedAddress }),
}));
vi.mock("@/utils/locations", () => {
  const mockLocation = {
    lat: 37.123456,
    lng: 127.123456,
  };
  const mockAddressResult = {
    address: "서울 강남구 강남대로",
    location: mockLocation,
  };
  return {
    searchAddress: vi.fn().mockResolvedValue([mockAddressResult]),
    getFullAddressByCoords: vi.fn().mockReturnValue("서울 강남구 강남대로 123"),
  };
});

describe("AddressSearch", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("동네 이름을 검색하면 searchAddress 함수가 호출된다.", async () => {
    render(<AddressSearch />);

    const input = screen.getByPlaceholderText("동네 이름을 검색하세요");
    await fireEvent.change(input, { target: { value: "서울" } });

    // debounce 처리 때문에 바로 호출되지 않음
    await waitFor(() => {
      expect(searchAddress).toHaveBeenCalledWith("서울");
    });
  });

  it("검색 결과가 있으면 검색 결과를 목록이 보인다.", async () => {
    render(<AddressSearch />);

    const input = screen.getByPlaceholderText("동네 이름을 검색하세요");
    await fireEvent.change(input, { target: { value: "서울" } });

    const resultItem = await screen.findByText("서울 강남구 강남대로");
    expect(resultItem).toBeInTheDocument();
  });

  it("검색 결과가 없으면 검색 결과가 없다는 메시지를 보여준다.", async () => {
    render(<AddressSearch />);

    const input = screen.getByPlaceholderText("동네 이름을 검색하세요");
    await fireEvent.change(input, { target: { value: "서울" } });

    const resultItem = await screen.findByText("검색 결과가 없습니다");
    expect(resultItem).toBeInTheDocument();
  });

  it("검색 결과를 클릭하면 주소를 선택하고 홈 주소로 이동한다.", async () => {
    render(<AddressSearch />);

    const input = screen.getByPlaceholderText("동네 이름을 검색하세요");
    await fireEvent.change(input, { target: { value: "서울" } });

    const resultItem = await screen.findByText("서울 강남구 강남대로");
    await fireEvent.click(resultItem);

    await waitFor(() => {
      expect(mockSetSelectedAddress).toHaveBeenCalledWith("서울 강남구 강남대로 123", "HOME");
      expect(mockPush).toHaveBeenCalledWith("/locations/my-location?address_type=HOME");
    });
  });

  it("현재 위치로 등록을 클릭하면 현재 위치 좌표를 선택하고 홈 주소로 이동한다.", async () => {
    (searchAddress as Mock).mockResolvedValueOnce([]);

    render(<AddressSearch />);

    const currentLocationButton = screen.getByText("현재 위치로 등록");
    await fireEvent.click(currentLocationButton);

    await waitFor(() => {
      expect(mockSetSelectedAddress).toHaveBeenCalledWith("서울 강남구 강남대로 123", "HOME");
      expect(mockPush).toHaveBeenCalledWith("/locations/my-location?address_type=HOME");
    });
  });
});
