import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Checkbox from ".";

describe("Checkbox Test", () => {
  afterEach(() => {
    cleanup();
  });

  it("체크가 되어 있을 경우 'check_on.svg' 이미지가 보여야 한다", () => {
    render(<Checkbox checked={true} onChange={() => {}} />);
    const img = screen.getByAltText("체크박스 취소");
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toMatch(/check_on\.svg/);
  });

  it("체크가 안 되어 있을 경우 'check_off.svg' 이미지가 보여야 한다", () => {
    render(<Checkbox checked={false} onChange={() => {}} />);
    const img = screen.getByAltText("체크박스 선택");
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toMatch(/check_off\.svg/);
  });

  it("체크박스를 클릭하면 onChange가 호출되어야 한다", () => {
    const mock = vi.fn();
    render(<Checkbox checked={false} onChange={mock} />);

    const img = screen.getByAltText("체크박스 선택");
    fireEvent.click(img);

    expect(mock).toHaveBeenCalledWith(true);
  });

  it("체크된 상태에서 클릭하면 false로 onChange가 호출되어야 한다", () => {
    const mock = vi.fn();
    render(<Checkbox checked={true} onChange={mock} />);

    const img = screen.getByAltText("체크박스 취소");
    fireEvent.click(img);

    expect(mock).toHaveBeenCalledWith(false);
  });
});
