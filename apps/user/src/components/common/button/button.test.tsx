import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Button from ".";
import { buttonStatus } from "./button.css";

describe("Button Test", () => {
  afterEach(() => {
    cleanup();
  });

  it("기본 status(common)으로 렌더링된다", () => {
    render(<Button>기본</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button.className).toContain(buttonStatus.common);
  });

  it("지정한 status(disabled)가 스타일에 적용된다", () => {
    render(<Button status="disabled">비활성</Button>);
    const button = screen.getByRole("button") as HTMLButtonElement;
    expect(button.className).toContain(buttonStatus.disabled);
    expect(button.disabled).toBe(true);
  });

  it.each(Object.keys(buttonStatus) as Array<keyof typeof buttonStatus>)(
    "buttonStatus의 '%s' 상태에 대해 렌더링이 된다.",
    (status) => {
      render(<Button status={status}>{status}</Button>);
      const element = screen.getByText(status);
      expect(element).toBeInTheDocument();
      expect(element.className).toContain(buttonStatus[status]);
    },
  );

  it("status가 disabled일 때 클릭해도 onClick이 호출되지 않아야 한다", () => {
    const mock = vi.fn();
    render(
      <Button status="disabled" onClick={mock}>
        클릭X
      </Button>,
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mock).not.toHaveBeenCalled();
  });

  it("onClick이 정상적으로 호출된다", () => {
    const mock = vi.fn();
    render(<Button onClick={mock}>클릭</Button>);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mock).toHaveBeenCalled();
  });
});
