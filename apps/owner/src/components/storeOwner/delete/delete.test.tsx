import { deleteStoreOwner } from "@/apis/ssr/store-owner";
import { useOwnerStore } from "@/stores/ownerInfoStore";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { type Mock, vi } from "vitest";
import OwnerDeleteForm from ".";

vi.mock("@/stores/ownerInfoStore");
vi.mock("@/apis/ssr/store-owner");
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

const mockUseOwnerStore = useOwnerStore as unknown as Mock;
const mockDeleteStoreOwner = deleteStoreOwner as Mock;
const mockUseRouter = useRouter as Mock;

const mockRouter = {
  push: vi.fn(),
};
const mockStore = {
  clearOwner: vi.fn(),
  clearStore: vi.fn(),
};

describe("OwnerDeleteForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseRouter.mockReturnValue(mockRouter);
    mockUseOwnerStore.mockReturnValue(mockStore);
  });

  it("동의 체크박스를 클릭하기 전에는 삭제 버튼이 비활성화 상태여야 한다.", () => {
    render(<OwnerDeleteForm />);
    const deleteButton = screen.getByRole("button", { name: "점주 계정 삭제하기" });
    expect(deleteButton).toBeDisabled();
  });

  it("동의 체크박스를 클릭하면 삭제 버튼이 활성화된다.", async () => {
    render(<OwnerDeleteForm />);
    const checkbox = screen.getByRole("checkbox");
    const deleteButton = screen.getByRole("button", { name: "점주 계정 삭제하기" });

    await fireEvent.click(checkbox);

    expect(deleteButton).not.toBeDisabled();
  });

  it("활성화된 삭제 버튼을 클릭하면 확인 다이얼로그(추가 확인 창)가 열린다.", async () => {
    render(<OwnerDeleteForm />);

    await fireEvent.click(screen.getByRole("checkbox"));
    await fireEvent.click(screen.getByRole("button", { name: "점주 계정 삭제하기" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("점주 계정 삭제 확인")).toBeInTheDocument();
  });

  it("다이얼로그(추가 확인 창)에서 '삭제하기'를 클릭하면 API가 호출되고, 성공 시 /store/login으로 이동한다.", async () => {
    mockDeleteStoreOwner.mockResolvedValue({ success: true });

    render(<OwnerDeleteForm />);

    await fireEvent.click(screen.getByRole("checkbox"));
    await fireEvent.click(screen.getByRole("button", { name: "점주 계정 삭제하기" }));

    const confirmButton = screen.getByRole("button", { name: "삭제하기" });
    await fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockDeleteStoreOwner).toHaveBeenCalledTimes(1);
      expect(mockStore.clearOwner).toHaveBeenCalled();
      expect(mockStore.clearStore).toHaveBeenCalled();
      expect(mockRouter.push).toHaveBeenCalledWith("/store/login");
    });
  });

  it("다이얼로그(추가 확인 창)에서 '취소'를 클릭하면 다이얼로그가 닫힌다.", async () => {
    render(<OwnerDeleteForm />);

    await fireEvent.click(screen.getByRole("checkbox"));
    await fireEvent.click(screen.getByRole("button", { name: "점주 계정 삭제하기" }));

    // 다이얼로그가 열렸는지 확인
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    const cancelButton = screen.getByRole("button", { name: "취소" });
    await fireEvent.click(cancelButton);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
