import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Page from "./page";

type InfoDetailProps = { infoDetail?: { title?: string; content?: string } | undefined };

type ErrorUiProps = { message: string };

const mockPush = vi.fn();
vi.mock("next/navigation", () => {
  return {
    useRouter: () => ({
      push: mockPush,
    }),
  };
});

vi.mock("@/components/ui/mypage/infoDetail", () => ({
  default: ({ infoDetail }: InfoDetailProps) => (
    <div data-testid="info-detail">
      <div>{infoDetail?.title}</div>
      <div>{infoDetail?.content}</div>
    </div>
  ),
}));

vi.mock("@/components/common/errorUi", () => ({
  default: ({ message }: ErrorUiProps) => <div data-testid="error-ui">{message}</div>,
}));

describe("[id]/notice/page", () => {
  it("id에 맞는 공지 상세가 InfoDetail에 전달되어 렌더링된다", async () => {
    const params = Promise.resolve({ id: "2" });
    // @ts-ignore
    render(await Page({ params }));
    expect(screen.getByTestId("info-detail")).toHaveTextContent("시스템 점검 안내");
    expect(screen.getByTestId("info-detail")).toHaveTextContent("시스템 점검이 예정되어 있습니다.");
  });

  it("존재하지 않는 id면 ErrorUi가 렌더링된다", async () => {
    const params = Promise.resolve({ id: "999" });
    // @ts-ignore
    render(await Page({ params }));
    expect(screen.getByTestId("error-ui")).toHaveTextContent(
      "문제가 생겼나봐요! 다시 시도해주세요.",
    );
  });
});
