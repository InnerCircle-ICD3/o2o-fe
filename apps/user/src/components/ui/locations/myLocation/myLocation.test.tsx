import { useGeolocation } from "@/hooks/useGeolocation";
import { useKakaoLoader } from "@/hooks/useKakaoLoader";
import * as locationUtils from "@/utils/locations/locationUtils";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { type Mock, beforeEach, describe, expect, it, vi } from "vitest";
import MyLocation from ".";

vi.mock("@/hooks/useGeolocation");
vi.mock("@/hooks/useKakaoLoader");
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

describe("MyLocation", () => {
  const mockLocation = { lat: 37.123456, lng: 127.123456 };

  beforeEach(() => {
    vi.clearAllMocks();
    (useGeolocation as Mock).mockReturnValue(mockLocation);
    (useKakaoLoader as Mock).mockReturnValue(true);

    vi.spyOn(locationUtils, "getRegionByCoords").mockResolvedValue("제주특별자치도 제주시 아라동");
  });

  it("useKakaoLoader나 useGeolocation이 로드되지 않으면 LoadingMap을 보여준다", () => {
    (useGeolocation as Mock).mockReturnValue(null);
    (useKakaoLoader as Mock).mockReturnValue(false);

    render(<MyLocation />);

    expect(screen.queryByTestId("mock-kakao-map")).toBeNull();
    expect(screen.getByText((text) => text.includes("지도를 불러오는 중"))).toBeTruthy();
  });

  it("지도가 렌더링되면 KakaoMap이 좌표에 맞춰 렌더링된다.", () => {
    render(<MyLocation />);

    const map = screen.getByTestId("mock-kakao-map");
    expect(map.textContent).toContain(`${mockLocation.lat},${mockLocation.lng}`);
  });

  it("거리 옵션을 클릭하면 선택 상태가 변경된다", () => {
    render(<MyLocation />);
    const radios = screen.getAllByRole("radio") as HTMLInputElement[];

    expect(radios[3].checked).toBe(false);
    fireEvent.change(radios[3], { target: { checked: true } });
    expect(radios[3].checked).toBe(true);
  });

  it("설정하기 버튼을 클릭하면 getRegionByCoords가가 호출된다", async () => {
    render(<MyLocation />);

    const span = screen.getAllByText("설정하기");
    const button = span[0].closest("button");
    if (!button) throw new Error("button not found");
    fireEvent.click(button);

    await waitFor(() => {
      expect(locationUtils.getRegionByCoords).toHaveBeenCalledWith(
        mockLocation.lat,
        mockLocation.lng,
      );
    });
  });
});
