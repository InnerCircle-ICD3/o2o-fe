import { worker } from "@/mocks/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { useInfiniteScroll } from "./index";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useInfiniteScroll", () => {
  beforeAll(() => worker.listen());
  afterAll(() => worker.close());

  it("should fetch and return stores data", async () => {
    const { result } = renderHook(
      () =>
        useInfiniteScroll({
          size: 10,
          api: "search/store",
          queryKey: ["stores"],
        }),
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.items).toHaveLength(10);
      expect(result.current.isLoading).toBe(false);
    });
  });
});
