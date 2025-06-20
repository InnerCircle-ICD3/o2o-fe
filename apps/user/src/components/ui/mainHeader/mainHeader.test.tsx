import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import MainHeader from "./index";

const mockUser = { customerId: 1, name: "홍길동" };
const mockLocationList = {
  success: true,
  data: ["서울시 강남구", "서울시 송파구"],
};

vi.mock("@/stores/userInfoStore", () => ({
  userInfoStore: () => ({ user: mockUser }),
}));

vi.mock("@/hooks/api/useAddressList", () => ({
  default: () => ({ data: mockLocationList, isError: false }),
}));

vi.mock("@/stores/useFilterTab", () => ({
  useFilterTab: () => ({ location: "서울시 강남구" }),
}));

const mockShowBottomSheet = new Set<string>();
const mockHandleShowBottomSheet = vi.fn();
const mockHandleCloseBottomSheet = vi.fn();

vi.mock("@/hooks/useBottomSheet", () => ({
  useBottomSheet: () => ({
    showBottomSheet: mockShowBottomSheet,
    handleShowBottomSheet: mockHandleShowBottomSheet,
    handleCloseBottomSheet: mockHandleCloseBottomSheet,
  }),
}));

vi.mock("./locationFilter", () => ({
  default: (props: { isOpen: boolean; locationList?: string[] }) => (
    <div data-testid="location-filter">
      {props.isOpen ? "OPEN" : "CLOSE"}
      {props.locationList?.join(",")}
    </div>
  ),
}));

describe("MainHeader", () => {
  afterEach(() => {
    vi.clearAllMocks();
    mockShowBottomSheet.clear();
  });

  it("로그인 상태에서 지역명과 아이콘, 링크가 정상적으로 렌더링된다", () => {
    render(<MainHeader />);
    expect(screen.getByText("서울시 강남구의 가게")).toBeInTheDocument();
    expect(screen.getByAltText("store")).toBeInTheDocument();
    expect(screen.getByAltText("찜")).toBeInTheDocument();
    expect(screen.getByAltText("search")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "찜" })).toHaveAttribute("href", "/subscribes");
    expect(screen.getByRole("link", { name: "search" })).toHaveAttribute("href", "/search");
  });

  it("지역 버튼 클릭 시 handleShowBottomSheet가 호출된다", () => {
    render(<MainHeader />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockHandleShowBottomSheet).toHaveBeenCalledWith("location");
  });

  it("locationList가 있으면 LocationFilter가 렌더링된다", () => {
    mockShowBottomSheet.add("location");
    render(<MainHeader />);
    expect(screen.getByTestId("location-filter")).toHaveTextContent("OPEN");
    expect(screen.getByTestId("location-filter")).toHaveTextContent("서울시 강남구,서울시 송파구");
  });
});
