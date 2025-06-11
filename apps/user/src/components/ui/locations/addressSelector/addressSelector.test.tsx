import type { CustomerAddressRequest, CustomerAddressResponse } from "@/types/locations.type";
import { fireEvent, render } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { vi } from "vitest";
import AddressSelector from "./index";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

const mockRouter = () => ({
  push: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
});

describe("AddressSelector", () => {
  const baseProps = {
    selectedIndex: 0,
    setSelectedIndex: vi.fn(),
    customerAddress: [
      {
        id: 1,
        customerId: 123,
        customerAddressType: "HOME",
        region1DepthName: "서울특별시",
        region2DepthName: "강남구",
        region3DepthName: "역삼동",
        latitude: 37.123,
        longitude: 127.123,
        radiusInKilometers: 0.5,
        zipCode: "12345",
        roadNameAddress: "서울특별시 강남구 테헤란로",
        lotNumberAddress: "강남구 역삼동 123-45",
        buildingName: "테스트빌딩",
        description: "우리집이에요",
      },
    ] as CustomerAddressResponse[],
    selectedAddress: {
      HOME: undefined,
      WORK: undefined,
    } as Record<"HOME" | "WORK", CustomerAddressRequest | undefined>,
    deleteCustomerAddress: vi.fn(),
    clearSelectedAddress: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue(mockRouter());
  });

  it("등록된 주소가 있으면 주소명이 보인다", () => {
    const { getByText } = render(<AddressSelector {...baseProps} />);
    expect(getByText("강남구 역삼동")).toBeTruthy();
  });

  it("주소 버튼 클릭 시 setSelectedIndex가 호출된다", () => {
    const { getByText } = render(<AddressSelector {...baseProps} />);
    fireEvent.click(getByText("강남구 역삼동"));
    expect(baseProps.setSelectedIndex).toHaveBeenCalledWith(0);
  });

  it("삭제 아이콘 클릭 시 deleteCustomerAddress가 호출된다", () => {
    const { getByAltText } = render(<AddressSelector {...baseProps} />);
    fireEvent.click(getByAltText("close"));
    expect(baseProps.deleteCustomerAddress).toHaveBeenCalled();
  });

  it("주소가 없으면 + 버튼이 보인다", () => {
    const props = { ...baseProps, customerAddress: [] };
    const { getAllByText } = render(<AddressSelector {...props} />);
    expect(getAllByText("+").length).toBeGreaterThan(0);
  });

  it("+ 버튼 클릭 시 주소 검색 페이지로 이동한다", () => {
    const router = mockRouter();
    vi.mocked(useRouter).mockReturnValue(router);
    const props = { ...baseProps, customerAddress: [] };
    const { getAllByText } = render(<AddressSelector {...props} />);
    fireEvent.click(getAllByText("+")[0]);
    expect(router.push).toHaveBeenCalled();
  });
});
