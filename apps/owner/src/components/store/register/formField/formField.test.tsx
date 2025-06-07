import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormField } from "./index";

describe("FormField", () => {
  it("라벨과 입력 필드가 올바르게 렌더링되어야 합니다", () => {
    render(<FormField type="input" label="테스트" name="test" id="test" />);

    const label = screen.getByText("테스트");
    const input = label.parentElement?.querySelector("input");

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it("오류 메시지가 표시되어야 합니다", () => {
    render(
      <FormField type="input" label="테스트" name="test" id="test" error="오류가 발생했습니다" />,
    );

    expect(screen.getByText("오류가 발생했습니다")).toBeInTheDocument();
  });

  it("오른쪽 요소가 렌더링되어야 합니다", () => {
    render(
      <FormField
        type="input"
        label="테스트"
        name="test"
        id="test"
        rightElement={<button type="button">버튼</button>}
      />,
    );

    expect(screen.getByRole("button", { name: "버튼" })).toBeInTheDocument();
  });

  it("textarea로 렌더링되어야 합니다", () => {
    render(<FormField type="textarea" label="테스트" name="test" id="test" />);

    const label = screen.getByText("테스트");
    const textarea = label.parentElement?.querySelector("textarea");

    expect(label).toBeInTheDocument();
    expect(textarea).toBeInTheDocument();
  });

  it("입력값이 변경되어야 합니다", () => {
    render(<FormField type="input" label="테스트" name="test" id="test" />);

    const label = screen.getByText("테스트");
    const input = label.parentElement?.querySelector("input");

    expect(label).toBeInTheDocument();
    fireEvent.change(input ?? document.createElement("input"), {
      target: { value: "테스트 입력" },
    });
    expect(input).toHaveValue("테스트 입력");
  });
});
