import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getCustomerAddress } from "@/apis/ssr/locations";
import useGetCustomerAddress from ".";
import { type Mock, vi } from "vitest";
import type { ReactNode } from "react";

vi.mock("@/apis/ssr/locations");

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const mockSuccessData = {
  success: true,
  data: [{ id: 1, address: "우리집" }],
};

const mockErrorData = {
  success: false,
  message: "주소 조회 실패",
};

describe("useGetCustomerAddress", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("customerId가 없으면 쿼리를 실행하지 않는다.", () => {
    const { result } = renderHook(() => useGetCustomerAddress(undefined), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(getCustomerAddress).not.toHaveBeenCalled();
  });

  it("성공적으로 데이터를 가져오면 data를 반환한다.", async () => {
    (getCustomerAddress as Mock).mockResolvedValue(mockSuccessData);

    const { result } = renderHook(() => useGetCustomerAddress(123), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(mockSuccessData.data);
    expect(result.current.isError).toBe(false);
  });

  it("데이터 가져오기를 실패하면 isError와 error를 반환한다.", async () => {
    (getCustomerAddress as Mock).mockResolvedValue(mockErrorData);

    const { result } = renderHook(() => useGetCustomerAddress(123), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isError).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toEqual(new Error("주소 조회 실패"));
  });
});
