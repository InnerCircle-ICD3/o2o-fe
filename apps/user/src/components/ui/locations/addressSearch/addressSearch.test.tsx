import { searchAddress } from "@/utils/locations";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import AddressSearch from ".";

vi.mock("@/hooks/useGeolocation");
vi.mock("@/hooks/useKakaoLoader");
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn().mockReturnValue("HOME"),
  }),
}));
vi.mock("@/utils/locations", () => ({
  searchAddress: vi.fn().mockResolvedValue([
    {
      address: "서울 강남구 강남대로",
      location: {
        lat: 37.123456,
        lng: 127.123456,
      },
    },
  ]),
}));

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

  it("검색 결과를 클릭하면 주소를 선택하고 홈 주소로 이동한다.", () => {});

  it("현재 위치로 등록을 클릭하면 현재 위치 좌표를 선택하고 홈 주소로 이동한다.", () => {});
});
