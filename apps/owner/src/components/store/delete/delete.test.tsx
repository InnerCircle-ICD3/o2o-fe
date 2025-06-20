import { deleteStore } from "@/apis/ssr/stores";
import useGetOwnerStore from "@/hooks/api/useGetOwnerStore";
import { useOwnerStore } from "@/stores/ownerInfoStore";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { type Mock, vi } from "vitest";
import StoreDeleteForm from ".";

vi.mock("@/hooks/api/useGetOwnerStore");
vi.mock("@/stores/ownerInfoStore");
vi.mock("@/apis/ssr/stores");
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

const mockUseGetOwnerStore = useGetOwnerStore as Mock;
const mockUseOwnerStore = useOwnerStore as unknown as Mock;
const mockDeleteStore = deleteStore as Mock;
const mockUseRouter = useRouter as Mock;

const mockRouter = {
  push: vi.fn(),
};
const mockStore = {
  clearOwner: vi.fn(),
  clearStore: vi.fn(),
};

describe("StoreDeleteForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseRouter.mockReturnValue(mockRouter);
    mockUseOwnerStore.mockReturnValue(mockStore);
  });

  it("가게 정보가 없으면 StoreRegisterLink 컴포넌트를 렌더링한다.", () => {
    mockUseGetOwnerStore.mockReturnValue({ data: null });
    render(<StoreDeleteForm />);
    expect(screen.getByText("매장 정보를 불러올 수 없습니다.")).toBeInTheDocument();
  });

  it("가게 정보가 있으면 삭제 폼을 렌더링한다.", () => {
    mockUseGetOwnerStore.mockReturnValue({ data: { id: 1, name: "내 가게" } });
    render(<StoreDeleteForm />);
    expect(screen.getByText("매장 삭제 전에 꼭 확인하세요.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "매장 삭제하기" })).toBeInTheDocument();
  });

  it("동의 체크박스를 클릭하기 전에는 삭제 버튼이 비활성화 상태여야 한다.", () => {
    mockUseGetOwnerStore.mockReturnValue({ data: { id: 1, name: "내 가게" } });
    render(<StoreDeleteForm />);
    const deleteButton = screen.getByRole("button", { name: "매장 삭제하기" });
    expect(deleteButton).toBeDisabled();
  });

  it("동의 체크박스를 클릭하면 삭제 버튼이 활성화된다.", async () => {
    mockUseGetOwnerStore.mockReturnValue({ data: { id: 1, name: "내 가게" } });
    render(<StoreDeleteForm />);
    const checkbox = screen.getByRole("checkbox");
    const deleteButton = screen.getByRole("button", { name: "매장 삭제하기" });

    await fireEvent.click(checkbox);

    expect(deleteButton).not.toBeDisabled();
  });

  it("활성화된 삭제 버튼을 클릭하면 확인 다이얼로그(추가 확인 창)가 열린다.", async () => {
    mockUseGetOwnerStore.mockReturnValue({ data: { id: 1, name: "내 가게" } });
    render(<StoreDeleteForm />);
    await fireEvent.click(screen.getByRole("checkbox"));
    await fireEvent.click(screen.getByRole("button", { name: "매장 삭제하기" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("매장 삭제 확인")).toBeInTheDocument();
  });

  it("다이얼로그(추가 확인 창)에서 '삭제하기'를 클릭하면 API가 호출되고, 성공 시 /store/login으로 이동한다.", async () => {
    mockUseGetOwnerStore.mockReturnValue({ data: { id: 1, name: "내 가게" } });
    mockDeleteStore.mockResolvedValue({ success: true });
    render(<StoreDeleteForm />);

    await fireEvent.click(screen.getByRole("checkbox"));
    await fireEvent.click(screen.getByRole("button", { name: "매장 삭제하기" }));
    const confirmButton = screen.getByRole("button", { name: "삭제하기" });
    await fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockDeleteStore).toHaveBeenCalledWith(1);
      expect(mockStore.clearOwner).toHaveBeenCalled();
      expect(mockStore.clearStore).toHaveBeenCalled();
      expect(mockRouter.push).toHaveBeenCalledWith("/store/login");
    });
  });

  it("다이얼로그(추가 확인 창)에서 '취소'를 클릭하면 다이얼로그가 닫힌다.", async () => {
    mockUseGetOwnerStore.mockReturnValue({ data: { id: 1, name: "내 가게" } });
    render(<StoreDeleteForm />);
    await fireEvent.click(screen.getByRole("checkbox"));
    await fireEvent.click(screen.getByRole("button", { name: "매장 삭제하기" }));

    // 다이얼로그가 열렸는지 확인
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    const cancelButton = screen.getByRole("button", { name: "취소" });
    await fireEvent.click(cancelButton);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
