import { deleteCustomer } from "@/apis/ssr/customers";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { type Mock, vi } from "vitest";
import DeleteAccount from ".";

// ⛳️ Mock 준비
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/apis/ssr/customers", () => ({
  deleteCustomer: vi.fn(),
}));

const clearUser = vi.fn();
vi.mock("@/stores/userInfoStore", () => ({
  userInfoStore: () => ({ clearUser }),
}));

describe("DeleteAccount", () => {
  const push = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as unknown as Mock).mockReturnValue({ push });
  });

  it("체크박스를 선택하지 않으면 버튼이 비활성화된다", () => {
    render(<DeleteAccount />);
    const button = screen.getByRole("button", { name: /탈퇴하기/i });
    expect(button).toBeDisabled();
  });

  it("체크박스를 선택하면 버튼이 활성화된다", async () => {
    render(<DeleteAccount />);
    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button", { name: /탈퇴하기/i });

    fireEvent.click(checkbox);
    expect(button).not.toBeDisabled();
  });

  it("탈퇴 버튼을 누르면 모달이 열린다", () => {
    render(<DeleteAccount />);
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    const deleteButton = screen.getByRole("button", { name: /잇고잇고 탈퇴하기/i });
    fireEvent.click(deleteButton);

    expect(screen.getByText("계정 탈퇴 확인")).toBeInTheDocument();
  });

  it("모달에서 '취소'를 누르면 모달이 닫힌다", async () => {
    render(<DeleteAccount />);
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /잇고잇고 탈퇴하기/i }));

    const cancelButton = screen.getByRole("button", { name: "취소" });
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByText("계정 탈퇴 확인")).toBeNull();
    });
  });

  it("모달에서 '탈퇴하기'를 누르면 API 호출 및 리디렉션", async () => {
    (deleteCustomer as Mock).mockResolvedValue({ success: true });

    render(<DeleteAccount />);
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /잇고잇고 탈퇴하기/i }));
    fireEvent.click(screen.getByRole("button", { name: "탈퇴하기" }));

    await waitFor(() => {
      expect(deleteCustomer).toHaveBeenCalled();
      expect(clearUser).toHaveBeenCalled();
      expect(push).toHaveBeenCalledWith("/");
    });
  });
});
