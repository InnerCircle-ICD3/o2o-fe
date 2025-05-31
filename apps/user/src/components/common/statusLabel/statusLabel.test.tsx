import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, it } from "vitest";
import StatusLabel from ".";
import { statusLabel } from "./statusLabel.css";

describe("StatusLabel Test", () => {
  afterEach(() => {
    cleanup();
  });

  it("status로 sales와 children 값이 들어오면 렌더링이 된다.", () => {
    const text = "판매중";
    render(<StatusLabel status="sales">{text}</StatusLabel>);

    const element = screen.getByText(text);
    expect(element.className).toContain(statusLabel.sales);
  });

  it.each(Object.keys(statusLabel) as Array<keyof typeof statusLabel>)(
    "statusLabel의 '%s' 상태에 대해 렌더링이 된다.",
    (status) => {
      render(<StatusLabel status={status}>{status}</StatusLabel>);
      const element = screen.getByText(status);
      expect(element).toBeInTheDocument();
      expect(element.className).toContain(statusLabel[status]);
    },
  );
});
