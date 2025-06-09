import { fireEvent, render } from "@testing-library/react";
import { vi } from "vitest";
import { create } from "zustand";
import CompleteProfile from ".";

const mockRouter = { push: vi.fn() };
vi.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
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

let consoleLogArgs: (object | string)[] = [];
const originalConsoleLog = console.log;
beforeAll(() => {
  console.log = (...args) => {
    consoleLogArgs.push(args.length === 1 ? args[0] : args);
  };
});
afterAll(() => {
  console.log = originalConsoleLog;
});
beforeEach(() => {
  patchCustomerCalledWith = [];
  consoleLogArgs = [];
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

    expect(mockRouter.push).toHaveBeenCalledWith("/");
  });

  it("patchCustomer 실패 시 콘솔에 에러메시지가 찍힌다", async () => {
    // 실패용 mock
    const failPatchCustomer = async () => ({
      success: false as const,
      errorCode: "ERROR",
      errorMessage: "에러",
    });
    const { getByPlaceholderText, getByText } = render(
      <CompleteProfile useUserStore={mockUseUserStore} patchCustomer={failPatchCustomer} />,
    );
    const input = getByPlaceholderText("닉네임을 입력하세요");
    fireEvent.change(input, { target: { value: "테스트닉네임" } });
    const button = getByText("등록하기");
    await fireEvent.click(button);
    // TODO: 에러 처리 로직 추가 필요
  });
});
