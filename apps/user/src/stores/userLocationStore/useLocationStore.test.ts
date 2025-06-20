import { beforeEach, describe, expect, it } from "vitest";
import { useUserLocation } from ".";

describe("useUserLocation", () => {
  beforeEach(() => {
    sessionStorage.clear();

    useUserLocation.persist.clearStorage();
    useUserLocation.setState({ lat: 0, lng: 0 });
  });

  it("초기 상태는 lat: 0, lng: 0이다", () => {
    const { lat, lng } = useUserLocation.getState();
    expect(lat).toBe(0);
    expect(lng).toBe(0);
  });

  it("updateLocations를 호출하면 위치 정보가 업데이트된다", () => {
    useUserLocation.getState().updateLocations({ lat: 37.1234, lng: 127.5678 });

    const { lat, lng } = useUserLocation.getState();
    expect(lat).toBe(37.1234);
    expect(lng).toBe(127.5678);
  });

  it("getLocations는 현재 위치를 반환한다", () => {
    useUserLocation.getState().updateLocations({ lat: 35.1, lng: 129.1 });

    const location = useUserLocation.getState().getLocations();
    expect(location).toEqual({ lat: 35.1, lng: 129.1 });
  });

  it("resetLocations를 호출하면 lat/lng가 0으로 초기화된다", () => {
    useUserLocation.getState().updateLocations({ lat: 33.3, lng: 126.5 });
    useUserLocation.getState().resetLocations();

    const { lat, lng } = useUserLocation.getState();
    expect(lat).toBe(0);
    expect(lng).toBe(0);
  });

  it("데이터가 sessionStorage에 저장된다", () => {
    useUserLocation.getState().updateLocations({ lat: 37.5, lng: 126.9 });

    const stored = sessionStorage.getItem("userLocation");
    expect(stored).not.toBeNull();

    const parsed = JSON.parse(stored ?? "");
    expect(parsed.state).toEqual({ lat: 37.5, lng: 126.9 });
  });
});
