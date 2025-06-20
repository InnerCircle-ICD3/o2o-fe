import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Page from "./page";

type InfoDetailProps = { infoDetail?: { title?: string; content?: string } | undefined };

type ErrorUiProps = { message: string };

vi.mock("@/components/common/errorUi", () => ({
  default: ({ message }: ErrorUiProps) => <div data-testid="error-ui">{message}</div>,
}));

vi.mock("@/components/ui/mypage/infoDetail", () => ({
  default: ({ infoDetail }: InfoDetailProps) => (
    <div data-testid="info-detail">
      <div>{infoDetail?.title}</div>
      <div>{infoDetail?.content}</div>
    </div>
  ),
}));

describe("[id]/page", () => {
  it("id에 맞는 FAQ 상세가 InfoDetail에 전달되어 렌더링된다", async () => {
    const params = Promise.resolve({ id: "2" });
    // @ts-ignore
    render(await Page({ params }));
    expect(screen.getByTestId("info-detail")).toHaveTextContent("픽업 방법은 어떻게 하나요?");
    expect(screen.getByTestId("info-detail")).toHaveTextContent(
      "픽업은 아래 절차에 따라 진행됩니다.",
    );
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
