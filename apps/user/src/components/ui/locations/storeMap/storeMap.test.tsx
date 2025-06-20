import { useKakaoLoader } from "@/hooks/useKakaoLoader";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import StoreMap from ".";

const mockMapInstance = {
  setMinLevel: vi.fn(),
  setMaxLevel: vi.fn(),
  setCenter: vi.fn(),
};

const mockKakaoMaps = {
  Map: vi.fn().mockReturnValue(mockMapInstance),
  LatLng: vi.fn(),
  event: {
    addListener: vi.fn(),
  },
};

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));
vi.mock("@/components/common/kakaoMap", () => ({
  KakaoMap: ({ lat, lng }: { lat: number; lng: number }) => (
    <div data-testid="kakao-map" data-lat={lat} data-lng={lng} />
  ),
}));
vi.mock("@/hooks/useKakaoLoader", () => ({
  useKakaoLoader: vi.fn(),
}));

beforeAll(() => {
  global.kakao = {
    maps: mockKakaoMaps,
  } as unknown as typeof kakao;
});

describe("StoreMap", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("lat/lng가 없으면 에러 UI가 보인다", () => {
    // useKakaoLoader는 true로 가정
    vi.mocked(useKakaoLoader).mockReturnValue(true);

    render(<StoreMap lat={0} lng={0} />);
    expect(screen.getByText("위치 정보를 불러오는데 실패했습니다.")).toBeInTheDocument();
  });

  it("로딩 중이면 LoadingMap이 보인다", () => {
    vi.mocked(useKakaoLoader).mockReturnValue(false);

    render(<StoreMap lat={37.123456} lng={127.123456} />);
    expect(screen.getByText("지도를 불러오는 중입니다...")).toBeInTheDocument();
  });

  it("정상 lat/lng, 로딩 완료면 KakaoMap이 렌더링된다", () => {
    vi.mocked(useKakaoLoader).mockReturnValue(true);

    render(<StoreMap lat={37.123456} lng={127.123456} />);

    expect(screen.getByTestId("kakao-map")).toBeInTheDocument();
    expect(screen.getByTestId("kakao-map")).toHaveAttribute("data-lat", "37.123456");
    expect(screen.getByTestId("kakao-map")).toHaveAttribute("data-lng", "127.123456");
  });
});
