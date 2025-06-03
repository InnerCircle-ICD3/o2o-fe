import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import TextInput from ".";
import { inputStatus, inputWithIcon } from "./textInput.css";

// 아이콘 컴포넌트 목업
const MockIcon = () => <div data-testid="mock-icon">Icon</div>;

describe("TextInput 테스트", () => {
  afterEach(() => {
    cleanup();
  });

  it("기본 status(common)으로 렌더링된다", () => {
    render(<TextInput placeholder="입력하세요" />);
    const input = screen.getByPlaceholderText("입력하세요");
    expect(input).toBeInTheDocument();
    expect(input.className).toContain(inputStatus.common);
  });

  it("지정한 status(disabled)가 스타일에 적용된다", () => {
    render(<TextInput status="disabled" placeholder="비활성" />);
    const input = screen.getByPlaceholderText("비활성") as HTMLInputElement;
    expect(input.className).toContain(inputStatus.disabled);
    expect(input.disabled).toBe(true);
  });

  it.each(Object.keys(inputStatus) as Array<keyof typeof inputStatus>)(
    "inputStatus의 '%s' 상태에 대해 렌더링이 된다.",
    (status) => {
      render(<TextInput status={status} placeholder={status} />);
      const element = screen.getByPlaceholderText(status);
      expect(element).toBeInTheDocument();
      expect(element.className).toContain(inputStatus[status]);
    },
  );

  it("status가 disabled일 때 입력이 불가능하다", () => {
    render(<TextInput status="disabled" placeholder="비활성" />);
    const input = screen.getByPlaceholderText("비활성") as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it("placeholder가 올바르게 표시된다", () => {
    const placeholderText = "테스트 입력";
    render(<TextInput placeholder={placeholderText} />);
    const input = screen.getByPlaceholderText(placeholderText);
    expect(input).toBeInTheDocument();
  });

  it("입력값이 변경되면 onChange가 호출된다", () => {
    const handleChange = vi.fn();
    render(<TextInput placeholder="입력하세요" onChange={handleChange} />);
    const input = screen.getByPlaceholderText("입력하세요");
    fireEvent.change(input, { target: { value: "테스트 입력값" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("label이 올바르게 표시된다", () => {
    const labelText = "이름";
    render(<TextInput labelText={labelText} placeholder="입력하세요" />);
    const label = screen.getByText(labelText);
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe("LABEL");
  });

  it("prefixIcon이 올바르게 표시된다", () => {
    render(<TextInput prefixIcon={MockIcon} placeholder="아이콘 테스트" />);
    const input = screen.getByPlaceholderText("아이콘 테스트");
    const icon = screen.getByTestId("mock-icon");
    expect(icon).toBeInTheDocument();
    expect(input.className).toContain(inputWithIcon);
  });

  it("suffixIcon이 올바르게 표시된다", () => {
    render(<TextInput suffixIcon={MockIcon} placeholder="아이콘 테스트" />);
    const icon = screen.getByTestId("mock-icon");
    expect(icon).toBeInTheDocument();
  });
});
