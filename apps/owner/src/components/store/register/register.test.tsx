import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import StoreRegisterForm from "./index";

const mockOpenPostcode = vi.fn();

vi.mock("@/hooks/useStoreAddress", () => ({
  useStoreAddress: () => ({
    openPostcode: mockOpenPostcode,
  }),
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

function renderWithQueryClient(ui: React.ReactNode) {
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
}

describe("StoreRegisterForm", () => {
  it("첫 번째 스텝에서 기본 필드들이 렌더링되어야 합니다", () => {
    renderWithQueryClient(<StoreRegisterForm />);

    expect(screen.getByText("매장명")).toBeInTheDocument();
    expect(screen.getByText("사업자 등록번호")).toBeInTheDocument();
    expect(screen.getByText("연락처")).toBeInTheDocument();
    expect(screen.getByText("대표 이미지 업로드")).toBeInTheDocument();
  });

  it("다음 버튼을 클릭하면 두 번째 스텝으로 이동해야 합니다", () => {
    renderWithQueryClient(<StoreRegisterForm />);

    const nextButton = screen.getByText("다음");
    fireEvent.click(nextButton);

    expect(screen.getByText("주소 검색")).toBeInTheDocument();
    expect(screen.getByText("우편번호")).toBeInTheDocument();
    expect(screen.getByText("건물명")).toBeInTheDocument();
    expect(screen.getByText("음식 카테고리 (Enter 구분)")).toBeInTheDocument();
    expect(screen.getByText("매장 카테고리")).toBeInTheDocument();
    expect(screen.getByText("설명")).toBeInTheDocument();
  });

  it("이전 버튼을 클릭하면 첫 번째 스텝으로 돌아가야 합니다", () => {
    renderWithQueryClient(<StoreRegisterForm />);

    // 두 번째 스텝으로 이동
    const nextButton = screen.getByText("다음");
    fireEvent.click(nextButton);

    // 이전 버튼 클릭
    const prevButton = screen.getByText("이전");
    fireEvent.click(prevButton);

    // 첫 번째 스텝의 필드들이 다시 보여야 함
    expect(screen.getByText("매장명")).toBeInTheDocument();
  });

  it("세 번째 스텝에서는 영업시간 섹션이 보여야 합니다", () => {
    renderWithQueryClient(<StoreRegisterForm />);

    // 두 번째 스텝으로 이동
    const nextButton = screen.getByText("다음");
    fireEvent.click(nextButton);

    // 세 번째 스텝으로 이동
    fireEvent.click(nextButton);

    // 등록하기 버튼이 보여야 함
    expect(screen.getByText("등록하기")).toBeInTheDocument();
  });

  it("주소 검색 버튼을 클릭하면 openPostcode가 호출되어야 합니다", () => {
    renderWithQueryClient(<StoreRegisterForm />);

    // 두 번째 스텝으로 이동
    const nextButton = screen.getByText("다음");
    fireEvent.click(nextButton);

    const searchButton = screen.getByRole("button", { name: "검색" });
    fireEvent.click(searchButton);

    expect(mockOpenPostcode).toHaveBeenCalled();
  });
});
