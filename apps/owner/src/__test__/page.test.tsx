import Page from "@/app/page";
import { redirect } from "next/navigation";
import { expect, test, vi } from "vitest";

// Next.js의 redirect 함수를 모킹
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

test("Page should redirect to store management edit page", () => {
  Page();
  expect(redirect).toHaveBeenCalledWith("/store-management/edit");
});
