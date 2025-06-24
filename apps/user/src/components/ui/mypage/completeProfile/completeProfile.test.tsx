import type { Result } from "@/apis/types";
import { fireEvent, render } from "@testing-library/react";
import { vi } from "vitest";
import { create } from "zustand";
import CompleteProfile from ".";

const mockRouter = { push: vi.fn() };
vi.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}));

const mockShowToast = vi.fn();
vi.mock("@/stores/useToastStore", () => ({
  useToastStore: () => ({
    showToast: mockShowToast,
  }),
}));

type UserState = {
  user: {
    userId: string;
    roles: string[];
    nickname: string;
    customerId: number;
  } | null;
  setUser: (user: UserState["user"]) => void;
  clearUser: () => void;
};

const mockUserState: UserState = {
  user: {
    userId: "1",
    roles: ["user"],
    nickname: "기존닉네임",
    customerId: 123,
  },
  setUser: () => {},
  clearUser: () => {},
};
const mockUseUserStore = create<UserState>(() => mockUserState);
let patchCustomerCalledWith: [number, string][] = [];
const mockPatchCustomer = async (customerId: number, nickname: string) => {
  patchCustomerCalledWith.push([customerId, nickname]);
  // ResultSuccess 타입에 맞게 success: true로 고정
  return { success: true as const, data: { nickname } };
};

beforeEach(() => {
  patchCustomerCalledWith = [];
  mockShowToast.mockClear();
  mockRouter.push.mockClear();
});

describe("CompleteProfile", () => {
  it("input에 값을 입력하면 상태가 변경된다", () => {
    const { getByPlaceholderText } = render(
      <CompleteProfile useUserStore={mockUseUserStore} patchCustomer={mockPatchCustomer} />,
    );
    const input = getByPlaceholderText("닉네임을 입력하세요") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "새닉네임" } });
    if (input.value !== "새닉네임") {
      throw new Error("input 값이 변경되지 않았습니다.");
    }
  });

  it("등록하기 버튼 클릭 시 patchCustomer가 호출된다", async () => {
    const { getByPlaceholderText, getByText } = render(
      <CompleteProfile useUserStore={mockUseUserStore} patchCustomer={mockPatchCustomer} />,
    );
    const input = getByPlaceholderText("닉네임을 입력하세요");
    fireEvent.change(input, { target: { value: "테스트닉네임" } });
    const button = getByText("등록하기");
    await fireEvent.click(button);
    if (
      patchCustomerCalledWith.length !== 1 ||
      patchCustomerCalledWith[0][0] !== 123 ||
      patchCustomerCalledWith[0][1] !== "테스트닉네임"
    ) {
      throw new Error("patchCustomer가 올바르게 호출되지 않았습니다.");
    }
  });

  it("patchCustomer 성공 시 /로 이동한다", async () => {
    mockRouter.push.mockClear();

    const { getByPlaceholderText, getByText } = render(
      <CompleteProfile useUserStore={mockUseUserStore} patchCustomer={mockPatchCustomer} />,
    );
    const input = getByPlaceholderText("닉네임을 입력하세요");
    fireEvent.change(input, { target: { value: "테스트닉네임" } });
    const button = getByText("등록하기");
    await fireEvent.click(button);

    expect(mockRouter.push).toHaveBeenCalledWith("/mypage");
  });

  it("patchCustomer 실패 시 에러 메시지가 표시된다", async () => {
    const failPatchCustomer = async (
      _customerId: number,
      _nickname: string,
    ): Promise<Result<unknown>> => ({
      success: false as const,
      name: "Error",
      code: "ERROR",
      errorCode: "ERROR",
      message: "에러",
      statusCode: 400,
      timestamp: new Date(),
    });
    const { getByPlaceholderText, getByText } = render(
      <CompleteProfile useUserStore={mockUseUserStore} patchCustomer={failPatchCustomer} />,
    );
    const input = getByPlaceholderText("닉네임을 입력하세요");
    fireEvent.change(input, { target: { value: "테스트닉네임" } });
    const button = getByText("등록하기");
    await fireEvent.click(button);

    expect(mockShowToast).toHaveBeenCalledWith("닉네임 변경 실패", true);
  });
});
